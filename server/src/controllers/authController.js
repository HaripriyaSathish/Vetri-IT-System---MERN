import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { asyncHandler, httpError } from '../utils/helpers.js';

const envUsername = () => process.env.ADMIN_USERNAME || 'admin';
const envPassword = () => process.env.ADMIN_PASSWORD || 'admin123';

// First boot: create the admin from .env (ADMIN_USERNAME / ADMIN_PASSWORD).
// After that the password lives (hashed) in the database and is changed from the admin panel.
export const ensureAdmin = async () => {
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM admins');
  if (total > 0) return;
  const hash = await bcrypt.hash(envPassword(), 10);
  await pool.query('INSERT INTO admins (username, password_hash, display_name) VALUES (?, ?, ?)',
    [envUsername(), hash, 'Administrator']);
  console.log(`👤 Admin created from .env: ${envUsername()}`);
};

// Used by `npm run reset-admin` when the password is forgotten
export const resetAdminFromEnv = async () => {
  const hash = await bcrypt.hash(envPassword(), 10);
  await pool.upsert('admins', ['username'], { username: envUsername(), password_hash: hash, display_name: 'Administrator' });
  return envUsername();
};

const sign = (admin) => jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

const publicAdmin = (a) => ({ id: a.id, username: a.username, display_name: a.display_name, updated_at: a.updated_at });

export const login = asyncHandler(async (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');
  if (!username || !password) throw httpError(400, 'Username and password are required');
  const [[admin]] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
  if (!admin || !(await bcrypt.compare(password, admin.password_hash)))
    throw httpError(401, 'Invalid username or password');
  res.json({ token: sign(admin), admin: publicAdmin(admin) });
});

export const me = asyncHandler(async (req, res) => {
  const [[admin]] = await pool.query('SELECT * FROM admins WHERE id = ?', [req.admin.id]);
  if (!admin) throw httpError(401, 'Account not found');
  res.json(publicAdmin(admin));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword = '', newPassword = '' } = req.body;
  if (newPassword.length < 6) throw httpError(400, 'New password must be at least 6 characters');
  const [[admin]] = await pool.query('SELECT * FROM admins WHERE id = ?', [req.admin.id]);
  if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash)))
    throw httpError(400, 'Current password is incorrect');
  if (currentPassword === newPassword) throw httpError(400, 'New password must be different');
  await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [await bcrypt.hash(newPassword, 10), admin.id]);
  res.json({ message: 'Password updated successfully' });
});
