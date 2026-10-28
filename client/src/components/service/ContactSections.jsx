import { cloneElement, useEffect, useState } from 'react';
import {
  Phone, MapPin, Clock, Send, Loader2, CheckCircle2, ArrowUpRight, Navigation, User, Mail, MessageSquare,
  Copy, Check, ShieldCheck, Zap, BadgeCheck, Globe, Smartphone, Code2, Megaphone, Package, Sparkles, ClipboardList,
} from 'lucide-react';
import { Highlight, Eyebrow, Reveal } from '../common/Common';
import SmartLink from '../common/SmartLink';
import api, { errMsg } from '../../lib/api';
import { rules, validate, digitsOnly, MESSAGE_MIN, MESSAGE_MAX } from '../../lib/validate';

const WhatsAppGlyph = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.92L2 22l5.22-1.55A9.92 9.92 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.09-1.12l-.29-.17-3.1.92.94-3.02-.19-.31A8.02 8.02 0 1 1 12.04 19.98Zm4.4-6.01c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

// icon per service pill (falls back to a sparkle for custom options)
const SERVICE_ICONS = [
  [/web/i, Globe], [/app|mobile/i, Smartphone], [/software/i, Code2], [/marketing/i, Megaphone], [/product/i, Package],
];
const serviceIcon = (s) => SERVICE_ICONS.find(([re]) => re.test(s))?.[1] || Sparkles;

const DEFAULT_TRUST = ['Free technical estimate', 'Reply within 1 business day', '100% confidential'];
const TRUST_ICONS = [Zap, Clock, ShieldCheck];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Office open status in Indian time (Mon–Sat, 10:00–18:00 IST by default)
function useOpenStatus(openHour = 10, closeHour = 18) {
  const calc = () => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
    const day = parts.find((p) => p.type === 'weekday')?.value;
    const hour = Number(parts.find((p) => p.type === 'hour')?.value);
    const workday = day !== 'Sun';
    return { day, open: workday && hour >= openHour && hour < closeHour };
  };
  const [status, setStatus] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setStatus(calc()), 60000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return status;
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={`vcopy${done ? ' done' : ''}`} title={`Copy ${text}`} aria-label={`Copy ${text}`}
      onClick={() => { navigator.clipboard?.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}>
      {done ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

const empty = { name: '', email: '', phone: '', service: '', message: '' };

/* ---------- Consultation form + direct contact card ---------- */
const FIELDS = ['name', 'email', 'phone', 'service', 'message'];

export function ContactBlock({ c, page }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState({ loading: false, sent: false, error: '' });
  const { day, open } = useOpenStatus();

  // update a value; once a field has been visited, re-check it live as the user types
  const update = (k, v) => {
    const next = { ...form, [k]: v };
    setForm(next);
    if (touched[k] || errors[k]) setErrors((e) => ({ ...e, [k]: rules[k](v) }));
  };
  const set = (k) => (e) => update(k, k === 'phone' ? digitsOnly(e.target.value) : e.target.value);
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: rules[k](form[k]) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form, FIELDS);
    setErrors(errs);
    setTouched(Object.fromEntries(FIELDS.map((k) => [k, true])));
    if (Object.keys(errs).length) {
      // jump to the first problem
      const first = FIELDS.find((k) => errs[k]);
      const el = document.getElementById('contact-form')?.querySelector(`[data-field="${first}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus({ preventScroll: true });
      setState({ ...state, error: '' });
      return;
    }
    setState({ loading: true, sent: false, error: '' });
    try {
      await api.post('/enquiries', { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), source: `${page?.name || 'Contact'} page` });
      setForm(empty);
      setErrors({});
      setTouched({});
      setState({ loading: false, sent: true, error: '' });
    } catch (err) {
      setState({ loading: false, sent: false, error: errMsg(err) });
    }
  };

  const err = (k) => (touched[k] && errors[k]) || '';

  // floating-label field: label sits inside the box and lifts on focus / when filled
  const field = (key, label, Icon, input, extra) => (
    <div className={`vfl-wrap${err(key) ? ' invalid' : ''}${!err(key) && touched[key] && form[key] ? ' valid' : ''}`}>
      <label className={`vfl${form[key] ? ' filled' : ''}`}>
        <Icon size={17} className="vfl__icon" />
        {cloneElement(input, {
          'aria-label': label.replace(/\s*\*/g, ''),
          'aria-invalid': !!err(key),
          'aria-describedby': err(key) ? `err-${key}` : undefined,
          'data-field': key,
          onBlur: blur(key),
        })}
        <span className="vfl__label">{label}</span>
        <CheckCircle2 size={17} className="vfl__ok" aria-hidden="true" />
      </label>
      <div className="vfl__meta">
        {err(key) ? <span className="vfl__error" id={`err-${key}`} role="alert">{err(key)}</span> : <span />}
        {extra}
      </div>
    </div>
  );

  const trust = c.trust_points?.length ? c.trust_points : DEFAULT_TRUST;
  const phones = c.phones || [];
  const directions = c.directions_link || (c.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}` : '');

  return (
    <section className="section vcontact-section" id="contact-form">
      <div className="container vcontact">
        <Reveal as="form" className="vform" onSubmit={submit} noValidate>
          <span className="vform__glow" />
          {state.sent ? (
            <div className="vform__done">
              <span className="vform__plane"><Send size={34} /></span>
              <span className="vform__check"><CheckCircle2 size={64} /></span>
              <h3>Enquiry sent!</h3>
              <p>{c.success_message}</p>
              <button type="button" className="btn btn--outline" onClick={() => setState({ ...state, sent: false })}>Send another enquiry</button>
            </div>
          ) : (
            <>
              <header className="vform__head">
                <span className="vform__badge"><ClipboardList size={22} /></span>
                <div>
                  <h2>{c.form_title}</h2>
                  {c.form_intro && <p>{c.form_intro}</p>}
                </div>
              </header>
              <ul className="vform__trust">
                {trust.map((t, i) => { const I = TRUST_ICONS[i % TRUST_ICONS.length]; return <li key={t}><I size={14} />{t}</li>; })}
              </ul>

              <div className="vform__grid">
                {field('name', 'Full Name *', User, <input value={form.name} onChange={set('name')} placeholder=" " autoComplete="name" maxLength={80} />)}
                {field('email', 'Work Email *', Mail, <input type="email" value={form.email} onChange={set('email')} placeholder=" " autoComplete="email" maxLength={150} />)}
              </div>
              {field('phone', 'Phone Number * (10-digit mobile)', Phone, (
                <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={10} value={form.phone} onChange={set('phone')}
                  onKeyDown={(e) => { if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                  placeholder=" " autoComplete="tel-national" />
              ), <span className={`vfl__count${form.phone.length === 10 ? ' ok' : ''}`}>{form.phone.length}/10</span>)}

              <fieldset className={`vservices${err('service') ? ' invalid' : ''}`} data-field="service" tabIndex={-1}>
                <legend>Service Needed *</legend>
                <div className="vservices__list">
                  {(c.services || []).map((s) => {
                    const I = serviceIcon(s);
                    const on = form.service === s;
                    return (
                      <button type="button" key={s} className={`vservices__pill${on ? ' on' : ''}`} aria-pressed={on}
                        onClick={() => { setTouched((t) => ({ ...t, service: true })); update('service', s); setErrors((e) => ({ ...e, service: '' })); }}>
                        <I size={15} />{s}{on && <Check size={14} className="vservices__tick" />}
                      </button>
                    );
                  })}
                </div>
                {err('service') && <span className="vfl__error" role="alert">{err('service')}</span>}
              </fieldset>

              {field('message', 'Project Description & Goals *', MessageSquare, (
                <textarea rows={4} value={form.message} onChange={set('message')} placeholder=" " maxLength={MESSAGE_MAX} />
              ), <span className={`vfl__count${form.message.trim().length >= MESSAGE_MIN ? ' ok' : ''}`}>{form.message.trim().length}/{MESSAGE_MAX}</span>)}
              <small className="vform__hint">Tell us about your project, target audience, key features and desired timeline (at least {MESSAGE_MIN} characters).</small>

              {state.error && <p className="form-error">{state.error}</p>}
              <button className="btn btn--primary btn--lg btn--block vform__submit" disabled={state.loading}>
                {state.loading ? <Loader2 className="spin" size={18} /> : <Send size={18} className="vform__send" />}
                {state.loading ? 'Sending…' : c.button_text || 'Submit Project Enquiry'}
              </button>
              <p className="vform__privacy"><ShieldCheck size={14} />Your details are only used to respond to your enquiry.</p>
            </>
          )}
        </Reveal>

        <Reveal as="aside" className="vdetails">
          <div className="vdetails__head">
            <h2>{c.details_title}</h2>
            <span className={`vstatus${open ? ' open' : ''}`}><i />{open ? 'Open now' : 'Closed now · opens 10:00 AM'}</span>
          </div>

          <div className="vquick">
            {phones[0] && <a href={`tel:+91${phones[0]}`} className="vquick__btn" title={`Call Vetri IT Systems on ${phones[0]}`}><span><Phone size={19} /></span>Call</a>}
            {c.whatsapp && <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="vquick__btn vquick__btn--wa" title="Chat with Vetri IT Systems on WhatsApp"><span><WhatsAppGlyph size={19} /></span>WhatsApp</a>}
            {directions && <a href={directions} target="_blank" rel="noreferrer" className="vquick__btn vquick__btn--map" title="Get directions to Vetri IT Systems"><span><Navigation size={19} /></span>Directions</a>}
          </div>

          <div className="vdetails__list stagger">
            <Reveal className="vdetails__item">
              <span className="vdetails__icon vdetails__icon--ring"><Phone size={18} /></span>
              <div className="vdetails__body">
                <h3>Call / WhatsApp</h3>
                {phones.map((p) => (
                  <div key={p} className="vphone">
                    <a href={`tel:+91${p}`} title={`Call Vetri IT Systems on ${p}`}>{p.replace(/(\d{5})(\d{5})/, '$1 $2')}</a>
                    <CopyButton text={p} />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="vdetails__item">
              <span className="vdetails__icon vdetails__icon--pin"><MapPin size={18} /></span>
              <div className="vdetails__body">
                <h3>{c.office_title}</h3>
                {c.office_name && <strong>{c.office_name}</strong>}
                <p>{c.address}</p>
              </div>
            </Reveal>
            <Reveal className="vdetails__item">
              <span className="vdetails__icon vdetails__icon--clock"><Clock size={18} /></span>
              <div className="vdetails__body">
                <h3>Working Hours</h3>
                <p>{c.hours}</p>
                <div className="vdays">
                  {DAYS.map((d) => <span key={d} className={`${d === 'Sun' ? 'off' : ''}${d === day ? ' today' : ''}`}>{d}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
          <p className="vdetails__note"><BadgeCheck size={15} />We reply within one business day</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Office map with directions ---------- */
export function OfficeMap({ c }) {
  return (
    <section className="section section--tint">
      <div className="container">
        <Reveal className="vmap">
          <div className="vmap__info">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            {c.description && <p>{c.description}</p>}
            <ul className="vmap__facts">
              {c.address && <li><MapPin size={18} /><span>{c.address}</span></li>}
              {c.hours && <li><Clock size={18} /><span>{c.hours}</span></li>}
              {c.phone && <li><Phone size={18} /><a href={`tel:+91${c.phone}`}>{c.phone}</a></li>}
            </ul>
            {c.button?.text && (
              <SmartLink to={c.button.link} className="btn btn--primary btn--lg"><Navigation size={17} />{c.button.text}<ArrowUpRight size={17} /></SmartLink>
            )}
          </div>
          <div className="vmap__frame">
            {c.map_embed && <iframe src={c.map_embed} title={c.map_title || 'Office location map'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
            <span className="vmap__badge"><span className="vmap__pin"><MapPin size={18} /><i /><i /></span>We’re here</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
