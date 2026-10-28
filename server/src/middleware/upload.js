import multer from 'multer';
import { uploadDir, safeFileName } from '../config/storage.js';

// Save uploads straight into server/media/uploads/<year>/<month>/
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir()),
    filename: (req, file, cb) => cb(null, safeFileName(file.originalname)),
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB (videos)
  // images, videos, PDF brochures and ZIP brochure packs
  fileFilter: (req, file, cb) =>
    /^(image|video)\/|^application\/(pdf|zip|x-zip-compressed)$/.test(file.mimetype) || /\.zip$/i.test(file.originalname)
      ? cb(null, true)
      : cb(Object.assign(new Error('Only images, videos, PDF and ZIP files are allowed'), { status: 400 })),
});

export default upload;
