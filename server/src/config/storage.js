// Local media storage: every image, video and brochure lives in server/media and is served at /media/...
// Admin uploads go to media/uploads/<year>/<month>/; site assets copied from the live site keep their
// original paths (media/sections, media/items, ...).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sizeOf from 'image-size';

export const MEDIA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../media');
export const MEDIA_URL = '/media';

// "/media/uploads/2026/10/a.png" <-> "<MEDIA_DIR>/uploads/2026/10/a.png" (never outside MEDIA_DIR)
export const urlToPath = (url = '') => {
  if (!url.startsWith(`${MEDIA_URL}/`)) return null;
  const full = path.resolve(MEDIA_DIR, decodeURIComponent(url.slice(MEDIA_URL.length + 1)));
  return full.startsWith(MEDIA_DIR + path.sep) ? full : null;
};
export const pathToUrl = (full) => `${MEDIA_URL}/${path.relative(MEDIA_DIR, full).split(path.sep).map(encodeURIComponent).join('/')}`;

// Folder for new uploads, e.g. media/uploads/2026/10
export const uploadDir = () => {
  const d = new Date();
  const dir = path.join(MEDIA_DIR, 'uploads', String(d.getFullYear()), String(d.getMonth() + 1).padStart(2, '0'));
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

// "My Brochure (Final).PDF" -> "my-brochure-final-1730112345678.pdf"
export const safeFileName = (original = 'file') => {
  const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, '');
  const base = path.basename(original, path.extname(original)).toLowerCase()
    .normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'file';
  return `${base}-${Date.now()}${ext}`;
};

export const resourceTypeOf = (mimetype = '', name = '') => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return /\.(pdf|zip)$/i.test(name) || /pdf|zip/.test(mimetype) ? 'raw' : 'raw';
};

// width/height for images (null for anything else or unreadable files)
export const imageDimensions = (full) => {
  try {
    const { width, height } = sizeOf(full);
    return { width: width || null, height: height || null };
  } catch {
    return { width: null, height: null };
  }
};

export const removeFile = async (url) => {
  const full = urlToPath(url);
  if (full) await fs.promises.rm(full, { force: true });
};
