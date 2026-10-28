import { Highlight, Eyebrow, Media, Icon, Reveal } from '../common/Common';

export default function About({ c }) {
  return (
    <section className="section">
      <div className="container about">
        <Reveal className="about__media img-wipe">
          <Media m={c.image} width={900} className="about__img" />
          {c.image_secondary?.url && <Media m={c.image_secondary} width={360} className="about__img2" />}
          {c.badge_value && (
            <div className="about__badge"><strong>{c.badge_value}</strong><span>{c.badge_label}</span></div>
          )}
        </Reveal>
        <Reveal className="about__content">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
          {(c.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
          <div className="about__cards stagger">
            {(c.cards || []).map((card) => (
              <Reveal className="mini-card" key={card.title}>
                <span className="icon-box"><Icon name={card.icon} size={20} /></span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
