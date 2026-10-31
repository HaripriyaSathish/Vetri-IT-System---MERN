import { ArrowUpRight } from 'lucide-react';
import { Highlight, Eyebrow, Media, Icon, Reveal, SectionHead } from '../common/Common';
import SmartLink from '../common/SmartLink';
import DesignArt from './DesignArt';
import { ScreenShowcase } from './ProjectSections';

const DEFAULT_BADGES = [
  { icon: 'Code2', text: 'Clean code' }, { icon: 'Rocket', text: 'Fast launch' },
  { icon: 'ShieldCheck', text: 'Reliable' }, { icon: 'LineChart', text: 'Growth' },
];

/* ---------- Light split hero: copy left, illustration right (live About layout) ---------- */
export function SplitHero({ c }) {
  return (
    <section className="shero">
      <span className="shero__blob shero__blob--1" /><span className="shero__blob shero__blob--2" />
      <div className="container shero__inner">
        <Reveal className="shero__copy">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1><Highlight text={c.title} highlight={c.highlight} /></h1>
          {c.description && <p>{c.description}</p>}
          {c.description_2 && <p>{c.description_2}</p>}
          {c.tags?.length > 0 && <ul className="shero__tags">{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
          {(c.button?.text || c.secondary_button?.text) && (
            <div className="shero__btns">
              {c.button?.text && <SmartLink to={c.button.link} className="btn btn--primary btn--lg">{c.button.text}<ArrowUpRight size={18} /></SmartLink>}
              {c.secondary_button?.text && <SmartLink to={c.secondary_button.link} className="btn btn--outline btn--lg">{c.secondary_button.text}<ArrowUpRight size={18} /></SmartLink>}
            </div>
          )}
        </Reveal>
        {c.screens?.some((s) => s.image?.url) ? (
          // project screenshots cycling in a laptop + phone (Our Projects)
          <Reveal className="shero__art shero__art--screens"><ScreenShowcase screens={c.screens} /></Reveal>
        ) : c.art ? (
          // animated cartoon scene instead of an image (Graphic Designing)
          <Reveal className="shero__art shero__art--cartoon"><DesignArt name={c.art} label={c.art_alt} /></Reveal>
        ) : (
          <Reveal className="shero__art">
            <span className="shero__ring" />
            <Media m={c.image} width={900} loading="eager" />
            {(c.badges?.length ? c.badges : DEFAULT_BADGES).slice(0, 4).map(({ icon, text }, i) => (
              <span key={icon} className={`shero__badge shero__badge--${i + 1}`} aria-hidden="true"><Icon name={icon} size={16} />{text}</span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}

const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

/* ---------- Leadership cards ---------- */
export function Leaders({ c }) {
  const items = c.items || [];
  return (
    <section className="section">
      <div className="container">
        <SectionHead c={c} />
        <div className={`vlead vlead--${items.length} stagger`}>
          {items.map((p) => (
            <Reveal key={p.name} as="article" className="vlead__card tilt">
              <div className="vlead__avatar">
                <span className="vlead__ring" />
                {p.photo?.url ? <Media m={p.photo} width={300} /> : <span className="vlead__initials">{initials(p.name)}</span>}
              </div>
              <h3>{p.name}</h3>
              <span className="vlead__role">{p.role}</span>
              <p>{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mission & vision: image + numbered cards ---------- */
export function MissionVision({ c }) {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead c={c} center={false} />
        <div className="vmv">
          {c.image?.url && <Reveal className="vmv__img img-wipe"><Media m={c.image} width={900} /></Reveal>}
          <div className="vmv__cards stagger">
            {(c.items || []).map((it, i) => (
              <Reveal key={it.title} className={`vmv__card tilt${i % 2 ? ' vmv__card--orange' : ''}`}>
                <div className="vmv__top">
                  <span className="vmv__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vmv__icon"><Icon name={it.icon} size={22} /></span>
                </div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
