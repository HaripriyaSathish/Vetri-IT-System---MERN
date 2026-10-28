// Copies everything from the local MySQL database into the PostgreSQL (Neon) database used on Render:
// page content, settings, services, products, SEO, enquiries, admin login and the media library
// (admin uploads are stored in the database, so they survive Render redeploys).
// The local MySQL database is only READ. Everything already in the target database is REPLACED.
//
//   cd server
//   TARGET_DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require" npm run copy-to-neon -- --yes
//
// Site images, videos and brochures in server/media are not copied: they deploy with the code from GitHub.
import fs from 'fs';
import mysql from 'mysql2/promise';
import '../config/env.js';
import { urlToPath } from '../config/storage.js';

const TABLES = ['admins', 'settings', 'pages', 'sections', 'services', 'solutions', 'enquiries', 'media', 'media_chunks'];
const NO_ID = new Set(['settings', 'media_chunks']);

const target = process.env.TARGET_DATABASE_URL;
if (!target || !/^postgres(ql)?:\/\//.test(target)) {
  console.error('Set TARGET_DATABASE_URL to the Neon connection string (postgresql://...).');
  process.exit(1);
}
const host = new URL(target).host;
if (!process.argv.includes('--yes')) {
  console.error(`This replaces ALL data in ${host} with the local MySQL content. Re-run with --yes to continue.`);
  process.exit(1);
}

// source: local MySQL (read only)
const source = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME || 'vetri_website',
});

// target: db.js switches to PostgreSQL when DATABASE_URL is set, so import it only after setting it
process.env.DATABASE_URL = target;
const { default: pg, initDatabase } = await import('../config/db.js');
const { storeChunks } = await import('../utils/mediaStore.js');

try {
  console.log(`Copying local MySQL (${process.env.DB_NAME}) -> ${host}`);
  await initDatabase();
  await pg.query(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY CASCADE`);

  for (const table of TABLES) {
    const [rows] = await source.query(`SELECT * FROM ${table}`);
    const [cols] = await pg.query('SELECT column_name FROM information_schema.columns WHERE table_name = ?', [table]);
    const keep = new Set(cols.map((c) => c.column_name));
    for (const row of rows) {
      const data = Object.fromEntries(Object.entries(row).filter(([k]) => keep.has(k)));
      await pg.query(`INSERT INTO ${table} SET ?`, [data]);
    }
    if (!NO_ID.has(table))
      await pg.query(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM ${table}`);
    console.log(`  ${table.padEnd(13)} ${rows.length} rows`);
  }

  // admin uploads that have no database copy yet (uploaded before copies were kept): store them now
  const [uploads] = await pg.query("SELECT id, url FROM media WHERE url LIKE '/media/uploads/%'");
  for (const m of uploads) {
    const [[{ n }]] = await pg.query('SELECT COUNT(*) n FROM media_chunks WHERE media_id = ?', [m.id]);
    if (n) continue;
    const full = urlToPath(m.url);
    if (full && fs.existsSync(full)) { await storeChunks(m.id, fs.readFileSync(full)); console.log(`  stored upload ${m.url}`); }
    else console.warn(`  ⚠️  upload missing on disk and in database: ${m.url}`);
  }
  console.log('✅ Copy complete. Local MySQL was not changed.');
} finally {
  await source.end();
  await pg.end();
}
