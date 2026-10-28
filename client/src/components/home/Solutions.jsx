import { useState } from 'react';
import { SectionHead, Highlight, Media, Icon, Reveal } from '../common/Common';
import SmartLink from '../common/SmartLink';

// Same line icons as the live site
const TabIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="3" /><path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7l8-4Z" /><path d="m8 12 3 3 5-6" />
  </svg>
);

export default function Solutions({ c, data }) {
  const items = data.solutions || [];
  const [active, setActive] = useState(0);
  const s = items[active];
  if (!s) return null;

  return (
    <section className="section" id="solutions">
      <div className="container">
        <SectionHead c={c} />
        <div className="tabs" role="tablist">
          {items.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={i === active}
              className={`tabs__btn${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
              <TabIcon />{x.tab_label}
            </button>
          ))}
        </div>

        <Reveal className="solution" key={s.id}>
          <div className="solution__grid">
            <div className="solution__content">
              {s.badge && <span className="pill">{s.badge}</span>}
              <h3 className="solution__title"><Highlight text={s.title} /></h3>
              {s.subtitle && <p className="solution__subtitle">{s.subtitle}</p>}
              <p>{s.description}</p>
              {s.features?.length > 0 && (
                <ul className="solution__features">
                  {s.features.map((f) => (
                    <li key={f.title}>
                      <span className="icon-box icon-box--orange"><Icon name={f.icon} size={20} /></span>
                      <div><h4>{f.title}</h4><p>{f.description}</p></div>
                    </li>
                  ))}
                </ul>
              )}
              {s.button_text && (
                <SmartLink to={s.button_link} className="btn btn--primary">{s.button_text}<span className="btn__arrow">↗</span></SmartLink>
              )}
            </div>
            <div className="solution__visual">
              <div className="browser tilt">
                <div className="browser__bar"><i /><i /><i /></div>
                <Media m={s.image} width={1000} />
              </div>
              {s.live_label && <p className="solution__live"><span className="live-dot" />{s.live_label}</p>}
            </div>
          </div>
          {s.stats?.length > 0 && (
            <div className="solution__stats">
              {s.stats.map((st) => (
                <div key={st.label}>
                  <span className="icon-box icon-box--soft"><ShieldIcon /></span>
                  <div><strong>{st.value}</strong><span>{st.label}</span></div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
