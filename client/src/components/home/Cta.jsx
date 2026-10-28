import { ArrowUpRight, Phone } from 'lucide-react';
import { Eyebrow, Highlight, Media, Reveal } from '../common/Common';
import SmartLink from '../common/SmartLink';

export default function Cta({ c }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta">
          <div className="cta__bg"><Media m={c.image} width={1600} /></div>
          <div className="cta__content">
            <Eyebrow light>{c.eyebrow}</Eyebrow>
            <h2><Highlight text={c.title} /></h2>
            {c.subtitle && <p className="cta__subtitle"><Highlight text={c.subtitle} /></p>}
            {c.description && <p>{c.description}</p>}
            <div className="cta__actions">
              {c.primary_button?.text && (
                <SmartLink to={c.primary_button.link} className="btn btn--primary btn--lg">{c.primary_button.text}<ArrowUpRight size={18} /></SmartLink>
              )}
              {c.secondary_button?.text && (
                <SmartLink to={c.secondary_button.link} className="btn btn--white btn--lg"><Phone size={17} />{c.secondary_button.text}</SmartLink>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
