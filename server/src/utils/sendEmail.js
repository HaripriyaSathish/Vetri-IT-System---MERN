import transporter from '../config/mailer.js';
import { escapeHtml as h } from './helpers.js';

export const sendEnquiryMail = async (e) => {
  if (!process.env.SMTP_USER) { console.warn('⚠️  SMTP_USER not set: enquiry email skipped'); return false; }
  await transporter.sendMail({
    from: `"Vetri Website" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    replyTo: e.email || undefined,
    subject: `New enquiry from ${e.name}`,
    html: `<h3>New Enquiry</h3>
      <p><b>Name:</b> ${h(e.name)}</p><p><b>Email:</b> ${h(e.email || '-')}</p>
      <p><b>Phone:</b> ${h(e.phone)}</p><p><b>Service:</b> ${h(e.service || '-')}</p>
      <p><b>Message:</b><br/>${h(e.message || '-')}</p>`,
  });
  return true;
};
