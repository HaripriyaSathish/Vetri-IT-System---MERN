import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { MEDIA_DIR, MEDIA_URL, urlToPath } from '../config/storage.js';

// "/media/items/a.png?w=900" -> a 900px-wide WebP copy, made once and cached on disk.
// Originals are untouched; anything else (no ?w, videos, PDFs, missing files) falls through.
const CACHE_DIR = path.resolve(MEDIA_DIR, '../.media-cache');
const WIDTHS = [320, 480, 640, 900, 1200, 1400, 1920];
const RESIZABLE = /\.(png|jpe?g|webp)$/i;
const pending = new Map();

const build = (src, out, width) => {
  if (!pending.has(out)) {
    const job = fs.promises.mkdir(path.dirname(out), { recursive: true })
      .then(() => sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${out}.tmp`))
      .then(() => fs.promises.rename(`${out}.tmp`, out))
      .finally(() => pending.delete(out));
    pending.set(out, job);
  }
  return pending.get(out);
};

export async function resizeImage(req, res, next) {
  const w = Number(req.query.w);
  if (!w || req.method !== 'GET') return next();
  const src = urlToPath(`${MEDIA_URL}${req.path}`);
  if (!src || !RESIZABLE.test(src)) return next();
  const width = WIDTHS.find((x) => x >= w) || WIDTHS[WIDTHS.length - 1];
  try {
    const stat = await fs.promises.stat(src);
    const out = path.join(CACHE_DIR, `${path.relative(MEDIA_DIR, src)}.${width}.${Math.round(stat.mtimeMs)}.webp`);
    if (!fs.existsSync(out)) await build(src, out, width);
    res.set('Cache-Control', 'public, max-age=2592000');
    res.type('image/webp');
    return res.sendFile(out);
  } catch {
    return next(); // file not on disk yet or not an image sharp can read: serve the original
  }
}
