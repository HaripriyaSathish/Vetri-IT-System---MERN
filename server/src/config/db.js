// One database API, two engines:
//   - DATABASE_URL set (Render + Neon)  -> PostgreSQL
//   - otherwise (local development)     -> MySQL from DB_HOST / DB_USER / DB_PASSWORD / DB_NAME
// Controllers always call pool.query(sql, params) with MySQL-style SQL ("?" placeholders,
// "INSERT INTO t SET ?", "UPDATE t SET ? WHERE ..."); on PostgreSQL it is translated here.
import mysql from 'mysql2/promise';
import pg from 'pg';
import '../config/env.js';
import { schema, columnMigrations } from '../db/schema.js';

export const dialect = process.env.DATABASE_URL ? 'postgres' : 'mysql';
const DB_NAME = process.env.DB_NAME || 'vetri_website';

/* ---------- MySQL ---------- */
const mysqlBase = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const createMysqlPool = () => {
  const pool = mysql.createPool({ ...mysqlBase, database: DB_NAME, waitForConnections: true, connectionLimit: 10 });
  pool.upsert = (table, keyCols, data) => {
    const cols = Object.keys(data);
    const updates = cols.filter((c) => !keyCols.includes(c)).map((c) => `${c} = VALUES(${c})`).join(', ');
    return pool.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ${updates}`, [data]);
  };
  return pool;
};

/* ---------- PostgreSQL (Neon) ---------- */
pg.types.setTypeParser(20, (v) => parseInt(v, 10)); // COUNT(*) / BIGINT -> number, like mysql2
pg.types.setTypeParser(1700, (v) => parseFloat(v)); // NUMERIC -> number

// tables whose primary key is not an "id" column (no RETURNING id on insert)
const NO_ID = new Set(['settings', 'media_chunks']);

const toPgValue = (v) => {
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v && typeof v === 'object' && !(v instanceof Date) && !Buffer.isBuffer(v)) return JSON.stringify(v);
  return v;
};

// MySQL-style SQL + params -> PostgreSQL text + values
const translate = (sql, params = []) => {
  const values = [];
  const out = [];
  let i = 0;
  const parts = sql.split('?');
  parts.forEach((part, idx) => {
    out.push(part);
    if (idx === parts.length - 1) return;
    const p = params[i++];
    const prev = part.trimEnd();
    if (p && typeof p === 'object' && !Array.isArray(p) && !Buffer.isBuffer(p) && !(p instanceof Date) && /\bSET$/i.test(prev)) {
      const cols = Object.keys(p);
      if (/^\s*INSERT/i.test(sql)) {
        // "INSERT INTO t SET ?" -> "INSERT INTO t (a, b) VALUES ($1, $2)"
        out[out.length - 1] = part.replace(/\s*SET\s*$/i, ' ');
        out.push(`(${cols.join(', ')}) VALUES (${cols.map((c) => { values.push(toPgValue(p[c])); return `$${values.length}`; }).join(', ')})`);
      } else {
        // "UPDATE t SET ? WHERE" -> "UPDATE t SET a = $1, b = $2 WHERE"
        out.push(cols.map((c) => { values.push(toPgValue(p[c])); return `${c} = $${values.length}`; }).join(', '));
      }
      return;
    }
    values.push(toPgValue(p));
    out.push(`$${values.length}`);
  });
  let text = out.join('');
  if (/^\s*INSERT\s+IGNORE/i.test(text)) text = `${text.replace(/INSERT\s+IGNORE/i, 'INSERT')} ON CONFLICT DO NOTHING`;
  const table = text.match(/^\s*INSERT\s+INTO\s+(\w+)/i)?.[1];
  if (table && !NO_ID.has(table) && !/RETURNING/i.test(text)) text += ' RETURNING id';
  return { text, values };
};

const createPgPool = () => {
  const url = process.env.DATABASE_URL;
  const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
  const raw = new pg.Pool({ connectionString: url, ssl: local ? false : { rejectUnauthorized: false }, max: 10 });
  const query = async (sql, params) => {
    const { text, values } = translate(sql, params);
    const res = await raw.query(text, values);
    if (res.command === 'SELECT') return [res.rows, res.fields];
    return [{ insertId: res.rows?.[0]?.id, affectedRows: res.rowCount }, res.fields];
  };
  const upsert = (table, keyCols, data) => {
    const cols = Object.keys(data);
    const updates = cols.filter((c) => !keyCols.includes(c)).map((c) => `${c} = EXCLUDED.${c}`).join(', ');
    return raw.query(
      `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${cols.map((_, n) => `$${n + 1}`).join(', ')})
       ON CONFLICT (${keyCols.join(', ')}) DO ${updates ? `UPDATE SET ${updates}` : 'NOTHING'}`,
      cols.map((c) => toPgValue(data[c])));
  };
  return { query, upsert, end: () => raw.end() };
};

// MySQL DDL from schema.js -> PostgreSQL DDL
const toPgDdl = (sql) => sql
  .replace(/INT AUTO_INCREMENT PRIMARY KEY/gi, 'SERIAL PRIMARY KEY')
  .replace(/\bTINYINT\(1\)/gi, 'SMALLINT')
  .replace(/\bMEDIUMBLOB\b/gi, 'BYTEA')
  .replace(/\bJSON\b/g, 'JSONB')
  .replace(/\bTIMESTAMP\b/g, 'TIMESTAMPTZ')
  .replace(/\s+ON UPDATE CURRENT_TIMESTAMP/gi, '')
  .replace(/ENUM\(([^)]*)\)/gi, 'VARCHAR(20)')
  .replace(/UNIQUE KEY (\w+) \(/gi, 'CONSTRAINT $1 UNIQUE (')
  .replace(/\s+AFTER \w+$/i, '')
  .replace(/ADD COLUMN /i, 'ADD COLUMN IF NOT EXISTS ');

// keeps updated_at current on PostgreSQL (MySQL does this with ON UPDATE CURRENT_TIMESTAMP)
const pgUpdatedAtTriggers = async (tables) => {
  await pool.query(`CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
    BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql`);
  for (const t of tables)
    await pool.query(`CREATE OR REPLACE TRIGGER trg_${t}_updated_at BEFORE UPDATE ON ${t} FOR EACH ROW EXECUTE FUNCTION set_updated_at()`);
};

const pool = dialect === 'postgres' ? createPgPool() : createMysqlPool();

// Creates the database (MySQL only; Neon already has one) and all tables. Safe to run on every boot.
export const initDatabase = async () => {
  if (dialect === 'postgres') {
    for (const sql of schema) await pool.query(toPgDdl(sql));
    for (const m of columnMigrations) await pool.query(toPgDdl(m.ddl));
    await pgUpdatedAtTriggers(schema.filter((s) => /updated_at/.test(s)).map((s) => s.match(/EXISTS (\w+)/)[1]));
    console.log('✅ PostgreSQL ready (DATABASE_URL)');
    return;
  }
  const conn = await mysql.createConnection(mysqlBase);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.end();
  for (const sql of schema) await pool.query(sql);
  for (const m of columnMigrations) {
    const [[{ n }]] = await pool.query(
      'SELECT COUNT(*) n FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = ?',
      [DB_NAME, m.table, m.column]);
    if (!n) await pool.query(m.ddl);
  }
  console.log('✅ MySQL ready:', DB_NAME);
};

// mysql2 / pg return JSON columns already parsed; this keeps strings safe too.
export const parseJson = (v, fallback = null) => {
  if (v == null) return fallback;
  if (typeof v !== 'string') return v;
  try { return JSON.parse(v); } catch { return fallback; }
};

export default pool;
