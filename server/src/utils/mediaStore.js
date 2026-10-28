// Database copy of uploaded files, so they survive hosts whose disk is wiped on redeploy (e.g. Render).
// Files are split into 8MB chunks to stay under every MySQL host's max_allowed_packet.
import fs from 'fs';
import path from 'path';
import pool from '../config/db.js';
import { MEDIA_DIR, urlToPath, pathToUrl, resourceTypeOf, imageDimensions } from '../config/storage.js';

const CHUNK = 8 * 1024 * 1024;

export const storeChunks = async (mediaId, buffer) => {
  for (let seq = 0, off = 0; off < buffer.length; seq++, off += CHUNK) {
    await pool.query('INSERT INTO media_chunks (media_id, seq, data) VALUES (?, ?, ?)', [mediaId, seq, buffer.subarray(off, off + CHUNK)]);
  }
};

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
  mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', pdf: 'application/pdf', zip: 'application/zip' };

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

// On boot: list the site's own files (server/media, shipped with the code) in the Media Library so they
// can be picked and reused. They are not copied into the database; only admin uploads are.
export const registerSiteFiles = async () => {
  if (!fs.existsSync(MEDIA_DIR)) return;
  const [rows] = await pool.query('SELECT url FROM media');
  const known = new Set(rows.map((r) => r.url));
  let added = 0;
  for (const full of walk(MEDIA_DIR)) {
    const rel = path.relative(MEDIA_DIR, full).split(path.sep).join('/');
    const ext = path.extname(full).slice(1).toLowerCase();
    const mime = MIME[ext];
    if (rel.startsWith('uploads/') || !mime) continue;
    const url = pathToUrl(full);
    if (known.has(url)) continue;
    const type = resourceTypeOf(mime, full);
    await pool.query('INSERT INTO media SET ?', [{
      url, public_id: rel, resource_type: type, format: ext, mime,
      ...(type === 'image' ? imageDimensions(full) : { width: null, height: null }),
      bytes: fs.statSync(full).size, original_name: path.basename(full), alt: '',
    }]);
    added++;
  }
  if (added) console.log(`🖼️  ${added} site media files added to the Media Library`);
};

// "/media/..." -> full path on disk, rebuilding an upload from its database copy when the file is missing.
// Returns { full, mime } or null when the file exists nowhere.
export const ensureLocalFile = async (url) => {
  const full = urlToPath(url);
  if (!full) return null;
  if (fs.existsSync(full)) return { full, mime: MIME[path.extname(full).slice(1).toLowerCase()] };
  const [[row]] = await pool.query('SELECT id, mime FROM media WHERE url = ?', [url]);
  if (!row) return null;
  const [chunks] = await pool.query('SELECT data FROM media_chunks WHERE media_id = ? ORDER BY seq', [row.id]);
  if (!chunks.length) return null;
  await fs.promises.mkdir(path.dirname(full), { recursive: true });
  await fs.promises.writeFile(full, Buffer.concat(chunks.map((c) => c.data)));
  return { full, mime: row.mime };
};

// Express middleware for /media/*: runs only when the file is NOT on disk (express.static falls through).
// Rebuilds the file from the database, writes it back to the media folder, then serves it.
export const restoreFromDatabase = async (req, res, next) => {
  try {
    const found = await ensureLocalFile(`/media${req.path}`);
    if (!found) return next();
    res.sendFile(found.full, { maxAge: '30d', headers: found.mime ? { 'Content-Type': found.mime } : {} });
  } catch (err) {
    next(err);
  }
};
