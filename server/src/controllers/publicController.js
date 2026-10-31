import pool from '../config/db.js';
import { asyncHandler, httpError } from '../utils/helpers.js';
import { sendEnquiryMail, sendEnquiryConfirmation } from '../utils/sendEmail.js';

const active = async (table, where = '', params = []) =>
  (await pool.query(`SELECT * FROM ${table} WHERE is_active = 1 ${where} ORDER BY sort_order, id`, params))[0];

// Global data for header/footer: settings + nav lists
export const getSite = asyncHandler(async (req, res) => {
  const [[row]] = await pool.query("SELECT value FROM settings WHERE setting_key = 'site'");
  const services = await active('services');
  const solutions = await active('solutions');
  res.json({
    settings: row?.value || {},
    services: services.map(({ slug, title, nav_label, nav_icon, link }) => ({ slug, title, nav_label, nav_icon, link })),
    solutions: solutions.map(({ slug, tab_label, title }) => ({ slug, tab_label, title })),
  });
});

// Page meta + ordered active sections + collections the sections need
export const getPage = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const [[page]] = await pool.query('SELECT * FROM pages WHERE slug = ?', [slug]);
  const [sections] = await pool.query(
    'SELECT section_key, content FROM sections WHERE page_slug = ? AND is_active = 1 ORDER BY sort_order', [slug]);
  if (!page && !sections.length) throw httpError(404, 'Page not found');

  const keys = sections.map((s) => s.section_key);
  const data = { page: page || { slug }, sections };
  // home "Our Services" cards; menu-only services (show_on_home = 0) stay in the dropdown
  if (keys.includes('services')) data.services = (await active('services')).filter((s) => s.show_on_home !== 0);
  if (keys.includes('solutions')) data.solutions = await active('solutions');
  res.json(data);
});

export const createEnquiry = asyncHandler(async (req, res) => {
  const clean = (v, max) => String(v ?? '').trim().slice(0, max);
  const e = {
    name: clean(req.body.name, 150), email: clean(req.body.email, 150), phone: clean(req.body.phone, 30),
    service: clean(req.body.service, 150), message: clean(req.body.message, 5000), source: clean(req.body.source, 100),
  };
  // same rules as the website forms (client/src/lib/validate.js)
  if (!e.name || e.name.length < 2) throw httpError(400, 'Please enter your full name');
  if (!/^[\p{L} .'-]+$/u.test(e.name)) throw httpError(400, 'Name can only contain letters');
  // phone: numbers only; accept an optional +91 / 91 prefix, then a 10-digit Indian mobile number
  const digits = e.phone.replace(/^\+?91(?=\d{10}$)/, '');
  if (!/^\d+$/.test(e.phone.replace(/^\+/, '')) || !/^[6-9]\d{9}$/.test(digits)) throw httpError(400, 'Please enter a valid 10-digit mobile number');
  e.phone = digits;
  if (e.email && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(e.email)) throw httpError(400, 'Please enter a valid email');
  if (e.message.length > 2000) throw httpError(400, 'Project description is too long');
  const [r] = await pool.query('INSERT INTO enquiries SET ?', [e]);
  sendEnquiryMail(e)
    .then((sent) => sent && console.log('📧 Enquiry email sent to', process.env.MAIL_TO || process.env.SMTP_USER))
    .catch((err) => console.error('❌ Enquiry email failed:', err.message));
  sendEnquiryConfirmation(e).catch((err) => console.error('❌ Enquiry confirmation email failed:', err.message));
  res.status(201).json({ id: r.insertId, message: 'Thank you! Our team will contact you shortly.' });
});
