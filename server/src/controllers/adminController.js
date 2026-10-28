import pool, { dialect } from '../config/db.js';
import { resources } from '../models/resources.js';
import fs from 'fs';
import path from 'path';
import { MEDIA_DIR, pathToUrl, resourceTypeOf, imageDimensions, removeFile } from '../config/storage.js';
import { storeChunks } from '../utils/mediaStore.js';
import { asyncHandler, httpError } from '../utils/helpers.js';

/* ---------- Generic collections ---------- */
const getRes = (name) => {
  const r = resources[name];
  if (!r) throw httpError(404, `Unknown resource: ${name}`);
  return r;
};

const pick = (body, r) => {
  const data = {};
  r.fields.forEach((f) => {
    if (body[f] === undefined) return;
    let v = body[f];
    if (r.json?.includes(f)) v = v == null ? null : JSON.stringify(v);
    if (typeof v === 'boolean') v = v ? 1 : 0;
    data[f] = v;
  });
  return data;
};

export const list = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  const order = r.order || 'sort_order, id';
  const [rows] = await pool.query(`SELECT * FROM ${r.table} ORDER BY ${order}`);
  res.json(rows);
});

export const getOne = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  const [[row]] = await pool.query(`SELECT * FROM ${r.table} WHERE id = ?`, [req.params.id]);
  if (!row) throw httpError(404, 'Not found');
  res.json(row);
});

export const create = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  const data = pick(req.body, r);
  if (r.fields.includes('sort_order') && data.sort_order === undefined) {
    const [[{ next }]] = await pool.query(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM ${r.table}`);
    data.sort_order = next;
  }
  const [result] = await pool.query(`INSERT INTO ${r.table} SET ?`, [data]);
  res.status(201).json({ id: result.insertId, message: 'Created' });
});

export const update = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  const data = pick(req.body, r);
  if (!Object.keys(data).length) throw httpError(400, 'Nothing to update');
  await pool.query(`UPDATE ${r.table} SET ? WHERE id = ?`, [data, req.params.id]);
  res.json({ message: 'Saved' });
});

export const remove = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  await pool.query(`DELETE FROM ${r.table} WHERE id = ?`, [req.params.id]);
  res.json({ message: 'Deleted' });
});

// PUT /c/:resource/reorder  { ids: [3,1,2] }
export const reorder = asyncHandler(async (req, res) => {
  const r = getRes(req.params.resource);
  const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
  await Promise.all(ids.map((id, i) => pool.query(`UPDATE ${r.table} SET sort_order = ? WHERE id = ?`, [i + 1, id])));
  res.json({ message: 'Order saved' });
});

/* ---------- Page sections ---------- */
export const listSections = asyncHandler(async (req, res) => {
  const page = req.query.page || 'home';
  const [rows] = await pool.query('SELECT * FROM sections WHERE page_slug = ? ORDER BY sort_order', [page]);
  res.json(rows);
});

export const getSection = asyncHandler(async (req, res) => {
  const [[row]] = await pool.query('SELECT * FROM sections WHERE page_slug = ? AND section_key = ?',
    [req.params.page, req.params.key]);
  if (!row) throw httpError(404, 'Section not found');
  res.json(row);
});

export const updateSection = asyncHandler(async (req, res) => {
  const data = {};
  if (req.body.content !== undefined) data.content = JSON.stringify(req.body.content);
  if (req.body.label !== undefined) data.label = req.body.label;
  if (req.body.is_active !== undefined) data.is_active = req.body.is_active ? 1 : 0;
  if (!Object.keys(data).length) throw httpError(400, 'Nothing to update');
  await pool.query('UPDATE sections SET ? WHERE id = ?', [data, req.params.id]);
  res.json({ message: 'Section saved' });
});

export const reorderSections = asyncHandler(async (req, res) => {
  const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
  await Promise.all(ids.map((id, i) => pool.query('UPDATE sections SET sort_order = ? WHERE id = ?', [i + 1, id])));
  res.json({ message: 'Section order saved' });
});

/* ---------- Settings ---------- */
export const getSettings = asyncHandler(async (req, res) => {
  const [[row]] = await pool.query('SELECT value FROM settings WHERE setting_key = ?', [req.params.key]);
  res.json(row?.value || {});
});

export const saveSettings = asyncHandler(async (req, res) => {
  const value = JSON.stringify(req.body || {});
  await pool.upsert('settings', ['setting_key'], { setting_key: req.params.key, value });
  res.json({ message: 'Settings saved' });
});

/* ---------- Dashboard ---------- */
export const dashboard = asyncHandler(async (req, res) => {
  const count = async (sql) => (await pool.query(sql))[0][0].c;
  const [recent] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 6');
  res.json({
    counts: {
      enquiries: await count('SELECT COUNT(*) c FROM enquiries'),
      newEnquiries: await count("SELECT COUNT(*) c FROM enquiries WHERE status = 'new'"),
      sections: await count("SELECT COUNT(*) c FROM sections WHERE page_slug = 'home' AND is_active = 1"),
      services: await count('SELECT COUNT(*) c FROM services WHERE is_active = 1'),
      solutions: await count('SELECT COUNT(*) c FROM solutions WHERE is_active = 1'),
      media: await count('SELECT COUNT(*) c FROM media'),
    },
    recentEnquiries: recent,
    storage: { folder: 'server/media', database: dialect === 'postgres' ? 'PostgreSQL' : 'MySQL' },
  });
});

/* ---------- Media library (server/media folder + database copy of uploads) ---------- */
export const listMedia = asyncHandler(async (req, res) => {
  const type = req.query.type;
  const [rows] = type
    ? await pool.query('SELECT * FROM media WHERE resource_type = ? ORDER BY created_at DESC', [type])
    : await pool.query('SELECT * FROM media ORDER BY created_at DESC');
  res.json(rows);
});

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw httpError(400, 'No file uploaded');
  const f = req.file;
  const type = resourceTypeOf(f.mimetype, f.originalname);
  const row = {
    url: pathToUrl(f.path),
    public_id: path.relative(MEDIA_DIR, f.path).split(path.sep).join('/'),
    resource_type: type,
    format: path.extname(f.originalname).slice(1).toLowerCase() || null,
    ...(type === 'image' ? imageDimensions(f.path) : { width: null, height: null }),
    bytes: f.size, original_name: f.originalname, alt: req.body.alt || '', mime: f.mimetype,
  };
  const [result] = await pool.query('INSERT INTO media SET ?', [row]);
  // keep a copy of the bytes in the database so the file survives a wiped disk (Render, redeploys)
  try {
    await storeChunks(result.insertId, await fs.promises.readFile(f.path));
  } catch (err) {
    await pool.query('DELETE FROM media WHERE id = ?', [result.insertId]);
    await removeFile(row.url);
    throw err;
  }
  res.status(201).json({ id: result.insertId, ...row });
});

export const updateMedia = asyncHandler(async (req, res) => {
  await pool.query('UPDATE media SET alt = ? WHERE id = ?', [req.body.alt || '', req.params.id]);
  res.json({ message: 'Saved' });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const [[row]] = await pool.query('SELECT * FROM media WHERE id = ?', [req.params.id]);
  if (!row) throw httpError(404, 'Not found');
  await pool.query('DELETE FROM media WHERE id = ?', [row.id]); // chunks go with it (ON DELETE CASCADE)
  await removeFile(row.url);
  res.json({ message: 'File deleted' });
});
