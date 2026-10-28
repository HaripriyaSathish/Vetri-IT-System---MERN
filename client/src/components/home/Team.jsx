import { Highlight, Media, Reveal } from '../common/Common';

export default function Team({ c }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="team">
          <div className="team__content">
            {c.eyebrow && <span className="pill">{c.eyebrow}</span>}
            <h2><Highlight text={c.title} highlight={c.highlight} /></h2>
            <p>{c.description}</p>
            {c.tags?.length > 0 && <ul className="team__tags">{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
          </div>
          {c.image?.url && <div className="team__media img-wipe"><Media m={c.image} width={800} /></div>}
        </Reveal>
      </div>
    </section>
  );
}
