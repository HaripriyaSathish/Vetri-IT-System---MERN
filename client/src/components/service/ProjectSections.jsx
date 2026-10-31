// "Our Projects" page: screenshot showcase for the hero, filterable project grid,
// case-study carousel with a popup, and the contact CTA band (styles/projects.css).
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, MapPin, Search, X, Target, Lightbulb, Rocket, BarChart3, CheckCircle2, Phone, Mail,
} from 'lucide-react';
import { Highlight, Media, Icon, Reveal, SectionHead } from '../common/Common';
import SmartLink from '../common/SmartLink';
import { useSite } from '../../context/SiteContext';
import { SERVICE_SECTION_TYPES } from '../../lib/sectionTypes';

// client sites open in a new tab and pass no ranking signal (as the SEO document asks)
const LIVE = { target: '_blank', rel: 'nofollow noopener' };
const siteUrl = (link = '') => {
  const v = String(link).trim();
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v.replace(/^\/+/, '')}`;
};
const initials = (name = '') => name.replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const OPEN_CASE = 'vis:open-case-study';

// Browser-window placeholder shown until a project screenshot is uploaded in the admin
function ShotPlaceholder({ name }) {
  return (
    <div className="proj-ph" aria-hidden="true">
      <span className="proj-ph__bar"><i /><i /><i /></span>
      <span className="proj-ph__mark">{initials(name)}</span>
      <span className="proj-ph__name">{name}</span>
    </div>
  );
}

/* ---------- Hero: laptop + phone frames cycling through project screenshots ---------- */
export function ScreenShowcase({ screens = [] }) {
  const list = screens.filter((s) => s.image?.url);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (list.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), 3800);
    return () => clearInterval(t);
  }, [list.length]);
  if (!list.length) return null;
  const phone = list[(i + 1) % list.length];
  return (
    <div className="pshow" aria-hidden="true">
      <span className="pshow__orb" /><span className="pshow__ring" />
      <div className="pshow__laptop">
        <div className="pshow__screen">
          {list.map((s, n) => <Media key={s.image.url} m={s.image} width={900} loading="eager" className={n === i ? 'on' : ''} />)}
        </div>
        <span className="pshow__base" />
      </div>
      <div className="pshow__phone"><div className="pshow__phone-screen"><Media key={phone.image.url} m={phone.image} width={360} loading="eager" /></div></div>
      <span className="pshow__badge" key={list[i].name}><i />{list[i].name}</span>
      <span className="pshow__dots">{list.map((s, n) => <i key={s.image.url} className={n === i ? 'on' : ''} />)}</span>
    </div>
  );
}

/* ---------- Project grid with search and industry filter tabs ---------- */
export function Portfolio({ c, data }) {
  const items = c.items || [];
  const filters = c.filters || [];
  const [active, setActive] = useState('');
  const [q, setQ] = useState('');
  // project cards whose case study is on this page open it; otherwise the arrow opens the live site
  const caseNames = useMemo(() => new Set((data?.sections || [])
    .filter((s) => SERVICE_SECTION_TYPES[s.section_key] === 'casestudies')
    .flatMap((s) => (s.content?.items || []).map((it) => it.name))), [data]);

  const term = q.trim().toLowerCase();
  const shown = items.filter((it) => (!active || it.industry === active)
    && (!term || [it.name, it.location, it.description, it.industry, ...(it.tags || [])].join(' ').toLowerCase().includes(term)));
  const count = (label) => items.filter((it) => it.industry === label).length;

  return (
    <section className="section proj-section" id="projects">
      <div className="container">
        <SectionHead c={c} center={false} />
        <Reveal className="proj__tools">
          <label className="proj__search">
            <Search size={18} />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={c.search_placeholder || 'Search client projects...'} aria-label="Search projects" />
            <span className="proj__count">{shown.length} / {items.length}</span>
          </label>
          <div className="proj__tabs" role="group" aria-label="Filter projects by industry">
            <button type="button" className={`proj__tab${!active ? ' on' : ''}`} aria-pressed={!active} onClick={() => setActive('')}>
              <Icon name={c.all_icon || 'LayoutGrid'} size={17} />{c.all_label || 'All Projects'}<em>{items.length}</em>
            </button>
            {filters.map((f) => (
              <button key={f.label} type="button" className={`proj__tab${active === f.label ? ' on' : ''}`} aria-pressed={active === f.label} onClick={() => setActive(active === f.label ? '' : f.label)}>
                <Icon name={f.icon} size={17} />{f.label}<em>{count(f.label)}</em>
              </button>
            ))}
          </div>
        </Reveal>

        {shown.length ? (
          <div className="proj__grid" key={`${active}|${term}`}>
            {shown.map((it, n) => {
              const href = siteUrl(it.link);
              const hasCase = it.case_study && caseNames.has(it.case_study);
              return (
                <article key={`${it.name}-${n}`} className="proj__card" style={{ '--i': Math.min(n, 12) }}>
                  <div className="proj__shot">
                    {it.image?.url ? <Media m={it.image} width={640} /> : <ShotPlaceholder name={it.name} />}
                    {it.industry && <span className="proj__industry">{it.industry}</span>}
                  </div>
                  <div className="proj__body">
                    {it.tags?.length > 0 && <div className="proj__tags">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                    <h3>{it.name}</h3>
                    {it.location && <span className="proj__loc"><MapPin size={14} />{it.location}</span>}
                    {it.description && <p>{it.description}</p>}
                    <div className="proj__foot">
                      {href ? <a className="proj__live" href={href} {...LIVE} aria-label={`View ${it.name} website (opens in a new tab)`}>View Website<ExternalLink size={15} /></a> : <span />}
                      {hasCase ? (
                        <button type="button" className="proj__go" aria-label={`View ${it.name} case study`} title="View case study"
                          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CASE, { detail: it.case_study }))}><ArrowRight size={18} /></button>
                      ) : href && (
                        <a className="proj__go" href={href} {...LIVE} aria-label={`Visit ${it.name} website`}><ArrowUpRight size={18} /></a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="proj__empty">No projects match “{q}”. <button type="button" onClick={() => { setQ(''); setActive(''); }}>Show all projects</button></p>
        )}
      </div>
    </section>
  );
}

/* ---------- Case study popup ---------- */
const HIGHLIGHT_ICONS = ['Monitor', 'LayoutGrid', 'Settings2', 'Mail'];

function CaseModal({ item, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [onClose]);
  const href = siteUrl(item.link);
  return createPortal(
    <div className="pmodal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pmodal__box" role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
        <button ref={closeRef} type="button" className="pmodal__x" onClick={onClose} aria-label="Close case study"><X size={20} /></button>
        <div className="pmodal__head">
          <div>
            <h2 className="pmodal__label">Case Study{item.industry ? <span> · {item.industry}</span> : null}</h2>
            <h3 id="pmodal-title" className="pmodal__name">{item.name}</h3>
            {item.popup_description && <p className="pmodal__desc">{item.popup_description}</p>}
          </div>
          {item.industry && <span className="pmodal__chip"><Icon name={item.industry_icon || 'Briefcase'} size={16} />{item.industry}</span>}
        </div>
        <div className="pmodal__device">
          <div className="pmodal__screen">{item.image?.url ? <Media m={item.image} width={1100} /> : <ShotPlaceholder name={item.name} />}</div>
          <span className="pmodal__base" />
        </div>
        <div className="pmodal__cols">
          {item.challenge && <div><h4><Target size={20} />The Challenge</h4><p>{item.challenge}</p></div>}
          {item.solution && <div><h4><Lightbulb size={20} />Our Solution</h4><p>{item.solution}</p></div>}
          {item.key_features?.length > 0 && (
            <div><h4><Rocket size={20} />Key Features</h4>
              <ul>{item.key_features.map((f) => <li key={f}><CheckCircle2 size={16} />{f}</li>)}</ul>
            </div>
          )}
        </div>
        {item.highlights?.length > 0 && (
          <div className="pmodal__hl">
            <h4><BarChart3 size={20} />Project Highlights</h4>
            <div className="pmodal__hl-grid">
              {item.highlights.map((h, n) => <span key={h}><Icon name={HIGHLIGHT_ICONS[n % HIGHLIGHT_ICONS.length]} size={20} />{h}</span>)}
            </div>
          </div>
        )}
        <div className="pmodal__actions">
          {href && <a className="btn btn--navy btn--lg" href={href} {...LIVE}>Visit Live Website<ArrowUpRight size={18} /></a>}
          <button type="button" className="btn btn--outline btn--lg" onClick={onClose}>Close Case Study</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ---------- Case study carousel: centred active slide, peeking neighbours, autoplay ---------- */
const AUTOPLAY_MS = 5500;

export function CaseStudies({ c }) {
  const items = c.items || [];
  const track = useRef(null);
  const [open, setOpen] = useState(-1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const onOpen = (e) => {
      const n = items.findIndex((it) => it.name === e.detail);
      if (n >= 0) setOpen(n);
    };
    window.addEventListener(OPEN_CASE, onOpen);
    return () => window.removeEventListener(OPEN_CASE, onOpen);
  }, [items]);

  // centre a slide in the track (without moving the page)
  const goTo = (n) => {
    const el = track.current;
    const card = el?.children[(n + items.length) % items.length];
    if (el && card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
  };

  // the slide nearest the centre is the active one
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    [...el.children].forEach((card, n) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
      if (d < dist) { dist = d; best = n; }
    });
    setActive(best);
  };

  useEffect(() => {
    if (paused || open >= 0 || reduced || items.length < 2) return undefined;
    const t = setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, open, items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!items.length) return null;
  return (
    <section className="section pcase-section" id="case-studies">
      <span className="pcase__glow pcase__glow--1" aria-hidden="true" /><span className="pcase__glow pcase__glow--2" aria-hidden="true" />
      <span className="pcase__grid-bg" aria-hidden="true" />
      <div className="container"><SectionHead c={c} /></div>
      <Reveal
        className={`pcase__stage${paused ? ' is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
        aria-roledescription="carousel" aria-label={c.title}
      >
        <div className="pcase__track" ref={track} onScroll={onScroll}>
          {items.map((it, n) => (
            <article
              key={it.name} className={`pcase__card${n === active ? ' is-active' : ''}`}
              aria-roledescription="slide" aria-label={`${n + 1} of ${items.length}: ${it.name}`}
              onClick={() => { if (n !== active) goTo(n); }}
            >
              <span className="pcase__no" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
              <div className="pcase__copy">
                <h3><Icon name={it.industry_icon || 'Briefcase'} size={15} />{it.name}</h3>
                {it.heading && <p className="pcase__headline">{it.heading}</p>}
                {it.description && <p className="pcase__desc">{it.description}</p>}
                <button type="button" className="btn btn--navy pcase__btn" tabIndex={n === active ? 0 : -1}
                  onClick={(e) => { e.stopPropagation(); setOpen(n); }}>View Case Study<ArrowRight size={16} /></button>
              </div>
              <div className="pcase__visual">
                <div className="pcase__frame">
                  <span className="pcase__bar"><i /><i /><i /></span>
                  <div className="pcase__screen">{it.image?.url ? <Media m={it.image} width={760} /> : <ShotPlaceholder name={it.name} />}</div>
                </div>
                {it.industry && <span className="pcase__chip"><Icon name={it.industry_icon || 'Briefcase'} size={14} />{it.industry}</span>}
              </div>
              {it.features?.length > 0 && (
                <ul className="pcase__features">
                  {it.features.map((f) => <li key={f.label}><span><Icon name={f.icon} size={20} /></span>{f.label}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
        <div className="pcase__controls">
          <button type="button" className="pcase__nav" onClick={() => goTo(active - 1)} aria-label="Previous case study"><ArrowLeft size={20} /></button>
          <div className="pcase__dots">
            {items.map((it, n) => (
              <button key={it.name} type="button" className={n === active ? 'on' : ''} onClick={() => goTo(n)} aria-label={`Show ${it.name}`} aria-current={n === active}>
                {n === active && <i key={active} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </button>
            ))}
          </div>
          <span className="pcase__count" aria-live="polite"><b>{String(active + 1).padStart(2, '0')}</b> / {String(items.length).padStart(2, '0')}</span>
          <button type="button" className="pcase__nav" onClick={() => goTo(active + 1)} aria-label="Next case study"><ArrowRight size={20} /></button>
        </div>
      </Reveal>
      {open >= 0 && items[open] && <CaseModal item={items[open]} onClose={() => setOpen(-1)} />}
    </section>
  );
}

/* ---------- Final CTA band with the official contact details ---------- */
export function CtaBand({ c }) {
  const { settings: s } = useSite();
  const wa = s.whatsapp && `https://wa.me/${s.whatsapp}`;
  return (
    <section className="section pband-section">
      <div className="container">
        <Reveal className="pband">
          <span className="pband__rays" aria-hidden="true" />
          <div className="pband__copy">
            {c.eyebrow && <span className="pband__eyebrow">{c.eyebrow}</span>}
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            {c.description && <p>{c.description}</p>}
            {c.show_contact !== false && (s.phone || s.email || s.address) && (
              <ul className="pband__contact">
                {s.phone && <li><a href={`tel:${s.phone}`}><Phone size={16} />{s.phone}</a></li>}
                {s.email && <li><a href={`mailto:${s.email}`}><Mail size={16} />{s.email}</a></li>}
                {s.address && <li><MapPin size={16} /><span>{s.address}</span></li>}
              </ul>
            )}
          </div>
          <div className="pband__btns">
            {c.button?.text && <SmartLink to={c.button.link} className="btn btn--primary btn--lg">{c.button.text}<ArrowUpRight size={18} /></SmartLink>}
            {wa && c.whatsapp_text !== '' && <a href={wa} target="_blank" rel="noreferrer" className="btn btn--white btn--lg">{c.whatsapp_text || 'WhatsApp Us'}</a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
