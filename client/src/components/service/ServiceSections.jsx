import { useState } from 'react';
import { ArrowUpRight, Check, X, Download, Plus, Send, Loader2, CheckCircle2, ChevronRight, ChevronDown, ExternalLink, CircleAlert, Lightbulb } from 'lucide-react';
import { Highlight, Media, Icon, Reveal, CountUp, SectionHead } from '../common/Common';
import SmartLink from '../common/SmartLink';
import { useSite } from '../../context/SiteContext';
import api, { errMsg } from '../../lib/api';
import { rules, validate, digitsOnly } from '../../lib/validate';
import { AppMockup, SoftwareMockup } from './Mockups';
import { mediaUrl } from '../../lib/media';

/* ---------- Page hero (image background, centered or left text) ---------- */
export function PageHero({ c }) {
  return (
    <section className={`phero phero--${c.align === 'left' ? 'left' : 'center'}`}>
      <div className="phero__bg"><Media m={c.image} width={1920} loading="eager" /></div>
      <div className="phero__overlay" />
      <span className="phero__orb phero__orb--1" /><span className="phero__orb phero__orb--2" />
      <Reveal className="container phero__inner">
        {c.eyebrow && <span className="eyebrow eyebrow--light phero__eyebrow"><i />{c.eyebrow}</span>}
        <h1><Highlight text={c.title} highlight={c.highlight} /></h1>
        {c.description && <p>{c.description}</p>}
        {c.button?.text && (
          <SmartLink to={c.button.link} className="btn btn--primary btn--lg phero__btn">{c.button.text}<ArrowUpRight size={18} /></SmartLink>
        )}
      </Reveal>
    </section>
  );
}

/* ---------- Stats strip overlapping the hero ---------- */
export function StatsStrip({ c }) {
  if (!c.items?.length) return null;
  return (
    <section className="pstats">
      <div className="container">
        <div className="pstats__card stagger">
          {c.items.map((s) => (
            <Reveal key={s.label} className="pstats__item">
              <strong><CountUp value={s.value} /></strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


// Client website links from the admin: add https:// when someone types "www.example.com"
const siteUrl = (link = '') => {
  const v = String(link).trim();
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v.replace(/^\/+/, '')}`;
};
/* ---------- Client / project showcase ---------- */
export function ClientGrid({ c }) {
  const items = c.items || [];
  if (!items.length) return null;
  return (
    <section className="section" id="clients">
      <div className="container">
        <SectionHead c={c} center={false} />
        <div className="pclients stagger">
          {items.map((it, i) => {
            const href = siteUrl(it.link);
            const ext = href ? { href, target: '_blank', rel: 'noopener noreferrer', title: `Visit ${it.name} website` } : null;
            return (
              <Reveal key={i} as="article" className={`pclients__card tilt${href ? ' pclients__card--link' : ''}`}>
                {href ? (
                  <a className="pclients__media" {...ext} aria-label={`Visit ${it.name} website`}>
                    <Media m={it.image} width={900} />
                    <span className="pclients__shine" />
                    <span className="pclients__visit"><ExternalLink size={15} />Visit website</span>
                  </a>
                ) : (
                  <div className="pclients__media"><Media m={it.image} width={900} /><span className="pclients__shine" /></div>
                )}
                <div className="pclients__body">
                  {it.category && <span className="pill">{it.category}</span>}
                  <h3>{href ? <a className="pclients__name" {...ext}>{it.name}<ArrowUpRight size={18} /></a> : it.name}</h3>
                  {it.location && <h4>{it.location}</h4>}
                  {it.description && <p>{it.description}</p>}
                  {(it.problem || it.solution) && (
                    <div className="pclients__case">
                      {it.problem && (
                        <div className="pclients__case-row pclients__case-row--problem">
                          <span className="pclients__case-label"><CircleAlert size={15} />Client Problem</span>
                          <p>{it.problem}</p>
                        </div>
                      )}
                      {it.solution && (
                        <div className="pclients__case-row pclients__case-row--solution">
                          <span className="pclients__case-label"><Lightbulb size={15} />Our Solution</span>
                          <p>{it.solution}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- How we work: connected steps ---------- */
export function Journey({ c }) {
  const steps = c.steps || [];
  return (
    <section className="section section--tint pjourney-section">
      <div className="container">
        <SectionHead c={c} />
        <Reveal className="pjourney" style={{ '--n': steps.length }}>
          <span className="pjourney__line"><i /></span>
          {steps.map((st, i) => (
            <div key={st.title} className={`pjourney__step${i % 2 ? ' pjourney__step--orange' : ''}`} style={{ '--i': i }}>
              <span className="pjourney__no">{String(i + 1).padStart(2, '0')}</span>
              <span className="pjourney__icon"><Icon name={st.icon} size={26} /></span>
              <h3>{st.title}</h3>
              {st.description && <p>{st.description}</p>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Capabilities: chips, or list + device mockup ---------- */
export function Capabilities({ c }) {
  const items = c.items || [];
  const device = c.variant === 'app' || c.variant === 'software';
  return (
    <section className="section">
      <div className="container">
        <Reveal className={`pcaps pcaps--${device ? 'device' : 'chips'}`}>
          <span className="pcaps__glow" />
          <div className="pcaps__main">
            <SectionHead c={c} center={!device} />
            <div className={device ? 'pcaps__list stagger' : 'pcaps__chips stagger'}>
              {items.map((it) => (
                <Reveal key={it.label} className="pcaps__item tilt">
                  <span className="pcaps__icon"><Icon name={it.icon} size={18} /></span>
                  <span className="pcaps__label">{it.label}</span>
                  {device && <ChevronRight size={15} className="pcaps__chev" />}
                </Reveal>
              ))}
            </div>
            {c.cards?.length > 0 && (
              <div className="pcaps__cards stagger">
                {c.cards.map((card) => (
                  <Reveal key={card.title} className="svc-card tilt">
                    <span className="icon-box icon-box--lg"><Icon name={card.icon} size={24} /></span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
          {device && (
            <div className="pcaps__visual">
              {c.variant === 'app' ? <AppMockup /> : <SoftwareMockup />}
              {c.stats?.length > 0 && (
                <div className="pcaps__stats">
                  {c.stats.map((s) => <div key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></div>)}
                </div>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Pricing / packages ---------- */
const PlanFeatures = ({ features }) => (
  <ul className="pprice__features">
    {features.map((f) => {
      const no = /^no\s/i.test(f);
      return <li key={f} className={no ? 'no' : ''}><span>{no ? <X size={13} /> : <Check size={13} />}</span>{f}</li>;
    })}
  </ul>
);

const PlanActions = ({ p }) => (
  <div className="pprice__actions">
    {p.button_text && <SmartLink to={p.button_link} className="btn btn--primary">{p.button_text}</SmartLink>}
    {p.secondary_text && p.secondary_link && <SmartLink to={p.secondary_link} className="btn btn--outline"><Download size={16} />{p.secondary_text}</SmartLink>}
  </div>
);

// Right half of a wide card. On phones only the first 4 items show until expanded (see service.css).
function IncludedList({ p }) {
  const [open, setOpen] = useState(false);
  const count = p.features?.length || 0;
  return (
    <div className={`pprice__incl${open ? ' open' : ''}`}>
      {count > 0 && (
        <>
          <h4>What’s Included?</h4>
          <PlanFeatures features={p.features} />
          {count > 4 && (
            <button type="button" className="pprice__more" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? 'Show less' : `Show all ${count} included`}<ChevronDown size={16} />
            </button>
          )}
        </>
      )}
      {p.note && <p className="pprice__note">{p.note}</p>}
    </div>
  );
}

// "wide" = one horizontal card per row (details left, compact 2-column checklist right).
// Auto: wide for 1–2 detailed packages, regular cards for 3+ plans.
export function Pricing({ c }) {
  const plans = c.plans || [];
  const wide = c.layout && c.layout !== 'auto' ? c.layout === 'wide' : plans.length <= 2;

  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead c={c} />
        <div className={`pprice ${wide ? 'pprice--wide' : `pprice--${plans.length}`} stagger`}>
          {plans.map((p) => (wide ? (
            <Reveal key={p.name} className={`pprice__card pprice__card--wide${p.featured ? ' pprice__card--featured' : ''}`}>
              <div className="pprice__info">
                {p.tag && <span className="pprice__tag">{p.tag}</span>}
                <h3>{p.name}</h3>
                {p.subtitle && <span className="pprice__sub">{p.subtitle}</span>}
                <div className="pprice__price">{p.price}</div>
                {p.price_note && <small className="pprice__note-price">{p.price_note}</small>}
                {p.description && <p className="pprice__desc">{p.description}</p>}
                {p.benefits?.length > 0 && <div className="pprice__benefits">{p.benefits.map((b) => <span key={b}>{b}</span>)}</div>}
                <PlanActions p={p} />
              </div>
              <IncludedList p={p} />
            </Reveal>
          ) : (
            <Reveal key={p.name} className={`pprice__card tilt${p.featured ? ' pprice__card--featured' : ''}`}>
              {p.tag && <span className="pprice__tag">{p.tag}</span>}
              <h3>{p.name}</h3>
              {p.subtitle && <span className="pprice__sub">{p.subtitle}</span>}
              <div className="pprice__price">{p.price}</div>
              {p.price_note && <small className="pprice__note-price">{p.price_note}</small>}
              {p.description && <p className="pprice__desc">{p.description}</p>}
              {p.features?.length > 0 && <PlanFeatures features={p.features} />}
              {p.benefits?.length > 0 && <div className="pprice__benefits">{p.benefits.map((b) => <span key={b}>{b}</span>)}</div>}
              {p.note && <p className="pprice__note">{p.note}</p>}
              <PlanActions p={p} />
            </Reveal>
          )))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Brochure download ---------- */
const fileName = (url = '') => decodeURIComponent(url.split('/').pop()?.split('?')[0] || '');
// "Landing Page Brochure" + ".../landing-page-brochure.pdf" -> "Landing Page Brochure.pdf"
const downloadName = (title, url) => `${title.replace(/[\\/:*?"<>|]+/g, ' ').trim()}${fileName(url).match(/\.[a-z0-9]+$/i)?.[0] || ''}`;

const saveFile = (url, name) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export function Brochure({ c }) {
  // brochure files uploaded in the admin (older content had a single file / link)
  const files = (c.files || []).filter((f) => f.file?.url)
    .map((f) => ({ url: mediaUrl(f.file.url), name: downloadName(f.title || fileName(f.file.url), f.file.url) }));
  const single = !files.length && mediaUrl(c.file?.url || c.link);
  if (!files.length && !single) return null; // shown once a brochure file or link is added in the admin

  // one click downloads every brochure file, one after another
  const downloadAll = (e) => {
    if (files.length < 2) return; // a single file downloads through the link itself
    e.preventDefault();
    files.forEach((f, i) => setTimeout(() => saveFile(f.url, f.name), i * 600));
  };
  // own files download in place; an external link (old "Or download link") opens in a new tab
  const linkProps = single && !/^(\/|https?:\/\/[^/]*\/media\/)/.test(single)
    ? { target: '_blank', rel: 'noreferrer' }
    : { download: files[0]?.name || fileName(single) };
  return (
    <section className="section">
      <div className="container">
        <Reveal className="pbroch">
          <div className="pbroch__copy">
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            {c.description && <p>{c.description}</p>}
            <a href={files[0]?.url || single} {...linkProps} onClick={downloadAll} className="btn btn--primary btn--lg">
              <Download size={17} />{c.button_text || 'Download Brochure'}
            </a>
          </div>
          <div className="pbroch__art" aria-hidden="true">
            <span className="pbroch__circle" />
            <div className="pbroch__book">
              <span>{c.book_label}</span>
              <strong>{c.book_title}</strong>
              <small>{c.book_caption}</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Icon cards (services, why choose) ---------- */
export function IconCards({ c }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHead c={c} />
        <div className={`svc-cards svc-cards--${(c.items || []).length} stagger`}>
          {(c.items || []).map((it) => (
            <Reveal key={it.title} className="svc-card tilt">
              <span className="icon-box icon-box--lg"><Icon name={it.icon} size={24} /></span>
              <h3>{it.title}</h3>
              <p>{it.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Chip cloud (tools, industries) ---------- */
export function Chips({ c }) {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead c={c} />
        <div className="pchips stagger">
          {(c.items || []).map((t) => {
            const text = typeof t === 'string' ? t : t?.title || t?.label || '';
            return <Reveal key={text} className="pchips__chip"><i />{text}</Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ accordion (content stored in the section) ---------- */
export function FaqList({ c }) {
  const items = c.items || [];
  const [open, setOpen] = useState(0);
  if (!items.length) return null;
  return (
    <section className="section" id="faqs">
      <div className="container container--narrow">
        <SectionHead c={c} />
        <div className="pfaq stagger">
          {items.map((f, i) => (
            <Reveal key={f.question} className={`pfaq__item${open === i ? ' open' : ''}`}>
              <button className="pfaq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <h3>{f.question}</h3><span><Plus size={18} /></span>
              </button>
              <div className="pfaq__a"><p>{f.answer}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Enquiry form with CTA (Name, Phone, Requirement, Budget) ---------- */
const emptyForm = { name: '', phone: '', requirement: '', budget: '' };

export function EnquiryCta({ c, page }) {
  const { settings: s } = useSite();
  const [form, setForm] = useState(emptyForm);
  const [state, setState] = useState({ loading: false, done: false, error: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    const v = k === 'phone' ? digitsOnly(e.target.value) : e.target.value;
    setForm({ ...form, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: rules[k](v) });
  };
  const blur = (k) => () => setErrors({ ...errors, [k]: rules[k](form[k]) });

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form, ['name', 'phone']);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState({ loading: true, done: false, error: '' });
    try {
      await api.post('/enquiries', {
        name: form.name, phone: form.phone, service: form.requirement,
        message: form.budget ? `Budget: ${form.budget}` : '', source: `${page?.name || 'Service'} page`,
      });
      setForm(emptyForm);
      setState({ loading: false, done: true, error: '' });
    } catch (err) {
      setState({ loading: false, done: false, error: errMsg(err) });
    }
  };

  const wa = s.whatsapp && `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${page?.name || 'your services'}.`)}`;

  return (
    <section className="section" id="enquiry">
      <div className="container">
        <Reveal className="penq">
          <div className="penq__bg"><Media m={c.image} width={1400} /></div>
          <div className="penq__copy">
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            {c.description && <p>{c.description}</p>}
            {wa && <a href={wa} target="_blank" rel="noreferrer" className="btn btn--white">{c.whatsapp_text || 'WhatsApp Us'}</a>}
          </div>
          <form className="penq__form" onSubmit={submit} noValidate>
            {state.done ? (
              <div className="penq__done"><CheckCircle2 size={48} /><h3>Enquiry received</h3><p>{c.success_message}</p>
                <button type="button" className="btn btn--outline" onClick={() => setState({ ...state, done: false })}>Send another</button></div>
            ) : (
              <>
                <label className={`field${errors.name ? ' field--invalid' : ''}`}><span>Name *</span>
                  <input value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="Your name" maxLength={80} aria-invalid={!!errors.name} />
                  {errors.name && <small className="field__error" role="alert">{errors.name}</small>}
                </label>
                <label className={`field${errors.phone ? ' field--invalid' : ''}`}><span>Phone Number * (10-digit mobile)</span>
                  <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={10} value={form.phone} onChange={set('phone')} onBlur={blur('phone')}
                    onKeyDown={(e) => { if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                    placeholder="98765 43210" aria-invalid={!!errors.phone} />
                  {errors.phone && <small className="field__error" role="alert">{errors.phone}</small>}
                </label>
                <label className="field"><span>{c.requirement_label || 'Requirement'}</span>
                  <select value={form.requirement} onChange={set('requirement')}>
                    <option value="">Select your {(c.requirement_label || 'requirement').toLowerCase()}</option>
                    {(c.requirements || []).map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>
                {c.budgets?.length > 0 && <label className="field"><span>Budget</span>
                  <select value={form.budget} onChange={set('budget')}>
                    <option value="">Select your budget</option>
                    {c.budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>}
                {state.error && <p className="form-error">{state.error}</p>}
                <button className="btn btn--primary btn--lg btn--block" disabled={state.loading}>
                  {state.loading ? <Loader2 className="spin" size={18} /> : <Send size={17} />}{c.button_text || 'Get a Quote'}
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
