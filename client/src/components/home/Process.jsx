import { SectionHead, Icon, Reveal } from '../common/Common';

export default function Process({ c }) {
  const steps = c.steps || [];
  return (
    <section className="section section--tint process-section">
      <div className="container">
        <SectionHead c={c} />
        <div className="process stagger">
          {steps.map((st, i) => (
            <Reveal key={st.title} className={`process__step tilt${i % 2 ? ' process__step--orange' : ''}`}>
              <div className="process__top">
                <span className="icon-box"><Icon name={st.icon} size={22} /></span>
                <span className="process__no">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{st.title}</h3>
              {st.description && <p>{st.description}</p>}
              <i className="process__corner" />
              {i < steps.length - 1 && <span className="process__arrow">→</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
