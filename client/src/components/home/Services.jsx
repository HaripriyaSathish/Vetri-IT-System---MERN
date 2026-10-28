import { ArrowUpRight } from 'lucide-react';
import { SectionHead, Media, Reveal } from '../common/Common';
import SmartLink from '../common/SmartLink';

export default function Services({ c, data }) {
  const services = data.services || [];
  return (
    <section className="section section--tint" id="services">
      <div className="container">
        <SectionHead c={c} />
        <div className="services stagger">
          {services.map((s) => (
            <Reveal key={s.id} className="service-card tilt">
              <SmartLink to={s.link} title={s.link_title} className="service-card__media">
                <Media m={s.image} width={800} />
                {s.badge && <span className="service-card__badge"><i />{s.badge}</span>}
                {s.flow && (
                  <div className="service-card__flow">
                    <small>{c.flow_label || 'ENGINEERED FLOW'}</small>
                    <span>{s.flow}</span>
                  </div>
                )}
              </SmartLink>
              <div className="service-card__body">
                <div className="service-card__title">
                  <h3><SmartLink to={s.link} title={s.link_title}>{s.title}</SmartLink></h3>
                  <SmartLink to={s.link} title={s.link_title} className="round-btn" aria-label={s.link_title}>
                    <ArrowUpRight size={18} />
                  </SmartLink>
                </div>
                <p>{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
