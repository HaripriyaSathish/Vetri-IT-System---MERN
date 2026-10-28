import { ArrowUpRight, Check, PlayCircle } from 'lucide-react';
import { Highlight, Eyebrow, Media, Icon, Reveal, SectionHead } from '../common/Common';
import SmartLink from '../common/SmartLink';
import { mediaUrl } from '../../lib/media';

/* ---------- Product cards: header + screenshot + intro video (live Vetri Products layout) ---------- */
export function ProductShowcase({ c }) {
  return (
    <section className="section" id="products">
      <div className="container">
        <SectionHead c={c} />
        <div className="vprod">
          {(c.items || []).map((p, i) => (
            <Reveal key={p.name} as="article" className={`vprod__card${i % 2 ? ' vprod__card--flip' : ''}`}>
              <header className="vprod__head">
                <span className="vprod__icon"><Icon name={p.icon} size={26} /></span>
                <div className="vprod__id">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  {p.chips?.length > 0 && <div className="vprod__chips">{p.chips.map((t) => <span key={t}>{t}</span>)}</div>}
                </div>
                <div className="vprod__actions">
                  {p.primary_text && <SmartLink to={p.primary_link} className="btn btn--primary">{p.primary_text}<ArrowUpRight size={16} /></SmartLink>}
                  {p.secondary_text && <SmartLink to={p.secondary_link} className="btn btn--outline">{p.secondary_text}</SmartLink>}
                </div>
              </header>
              <div className="vprod__media">
                {p.image?.url && (
                  <figure className="vprod__screen tilt">
                    <div className="vprod__bar"><i /><i /><i /><span>{p.name}</span></div>
                    <Media m={p.image} width={1000} />
                  </figure>
                )}
                {p.video?.url && (
                  <figure className="vprod__video">
                    <span className="vprod__video-tag"><PlayCircle size={15} />Watch intro</span>
                    <video src={mediaUrl(p.video.url)} controls playsInline preload="metadata" aria-label={p.video.alt || p.name} />
                  </figure>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Ecosystem hub: products orbit around the company ---------- */
export function Ecosystem({ c }) {
  const items = c.items || [];
  return (
    <section className="section section--tint">
      <div className="container veco">
        <div className="veco__copy">
          <SectionHead c={c} center={false} />
          <ul className="veco__list stagger">
            {items.map((it) => (
              <Reveal as="li" key={it.title}>
                <span className="icon-box"><Icon name={it.icon} size={20} /></span>
                <div><strong>{it.title}</strong><p>{it.description}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="veco__hub" aria-hidden="true" style={{ '--n': items.length }}>
          <span className="veco__ring veco__ring--1" />
          <span className="veco__ring veco__ring--2" />
          <div className="veco__center"><span>VIS</span><small>{c.center}</small></div>
          <div className="veco__orbit">
            {items.map((it, i) => (
              <div key={it.title} className="veco__node" style={{ '--i': i }}>
                <div className="veco__node-inner"><Icon name={it.icon} size={22} /><b>{it.title}</b></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Split feature: copy + checklist + button, image or animated code window ---------- */
export function SplitFeature({ c }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="vsplit">
          <div className="vsplit__copy">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            {c.description && <p>{c.description}</p>}
            {c.points?.length > 0 && (
              <ul className="vsplit__points">{c.points.map((pt) => <li key={pt}><span><Check size={14} /></span>{pt}</li>)}</ul>
            )}
            {c.button?.text && <SmartLink to={c.button.link} className="btn btn--primary btn--lg">{c.button.text}<ArrowUpRight size={18} /></SmartLink>}
          </div>
          <div className="vsplit__visual">
            {c.image?.url ? <Media m={c.image} width={900} className="vsplit__img" /> : (
              <div className="vcode" aria-hidden="true">
                <div className="vcode__bar"><i /><i /><i /><span>your-workflow.app</span></div>
                <div className="vcode__body">
                  {['const product = build({', '  workflow: yourBusiness,', '  modules: [billing, reports],', '  users: yourTeam,', '});', 'product.launch(); // 🚀'].map((l, i) => (
                    <code key={i} style={{ '--i': i }}>{l}</code>
                  ))}
                </div>
                <div className="vcode__chip vcode__chip--1"><Icon name="Workflow" size={18} />Your workflow</div>
                <div className="vcode__chip vcode__chip--2"><Icon name="Rocket" size={18} />Launch ready</div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
