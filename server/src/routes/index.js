import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import * as pub from '../controllers/publicController.js';
import * as auth from '../controllers/authController.js';
import * as admin from '../controllers/adminController.js';

/* Public */
export const publicRoutes = Router()
  .get('/site', pub.getSite)
  .get('/pages/:slug', pub.getPage)
  .post('/enquiries', pub.createEnquiry);

/* Auth */
export const authRoutes = Router()
  .post('/login', auth.login)
  .get('/me', protect, auth.me)
  .put('/password', protect, auth.changePassword);

/* Admin (JWT) */
const a = Router();
a.use(protect);
a.get('/dashboard', admin.dashboard);

a.get('/sections', admin.listSections);
a.put('/sections/reorder', admin.reorderSections);
a.get('/sections/:page/:key', admin.getSection);
a.put('/sections/:id', admin.updateSection);

a.get('/settings/:key', admin.getSettings);
a.put('/settings/:key', admin.saveSettings);

a.get('/media', admin.listMedia);
a.post('/media', upload.single('file'), admin.uploadMedia);
a.put('/media/:id', admin.updateMedia);
a.delete('/media/:id', admin.deleteMedia);

a.get('/c/:resource', admin.list);
a.put('/c/:resource/reorder', admin.reorder);
a.get('/c/:resource/:id', admin.getOne);
a.post('/c/:resource', admin.create);
a.put('/c/:resource/:id', admin.update);
a.delete('/c/:resource/:id', admin.remove);

export const adminRoutes = a;
