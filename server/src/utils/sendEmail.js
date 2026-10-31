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

// Confirmation to the visitor (only when they gave an email address)
export const sendEnquiryConfirmation = async (e) => {
  if (!process.env.SMTP_USER || !e.email) return false;
  await transporter.sendMail({
    from: `"Vetri IT Systems" <${process.env.SMTP_USER}>`,
    to: e.email,
    replyTo: process.env.MAIL_TO || process.env.SMTP_USER,
    subject: 'We received your enquiry - Vetri IT Systems',
    html: `<p>Hi ${h(e.name)},</p>
      <p>Thank you for contacting Vetri IT Systems. We have received your enquiry${e.service ? ` about <b>${h(e.service)}</b>` : ''} and our team will contact you shortly.</p>
      <p>Regards,<br/>Vetri IT Systems</p>`,
  });
  return true;
};

// Logged once at startup so a missing / blocked SMTP setup shows up in the server logs
export const checkMailer = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) { console.warn('⚠️  SMTP_USER / SMTP_PASS not set: enquiry emails are disabled'); return; }
  transporter.verify()
    .then(() => console.log('📧 SMTP ready, enquiries go to', process.env.MAIL_TO || process.env.SMTP_USER))
    .catch((err) => console.error('❌ SMTP check failed, enquiry emails will not be delivered:', err.code || '', err.message));
};
