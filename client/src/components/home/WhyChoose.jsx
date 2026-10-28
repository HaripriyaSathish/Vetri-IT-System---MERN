import { SectionHead, Media, Icon, Reveal } from '../common/Common';

export default function WhyChoose({ c }) {
  return (
    <section className="section">
      <div className="container why">
        <div>
          <SectionHead c={c} center={false} />
          <div className="why__grid stagger">
            {(c.items || []).map((it) => (
              <Reveal key={it.title} className="why-card tilt">
                <span className="icon-box"><Icon name={it.icon} size={20} /></span>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
        {c.image?.url && <Reveal className="why__media img-wipe"><Media m={c.image} width={800} /></Reveal>}
      </div>
    </section>
  );
}
