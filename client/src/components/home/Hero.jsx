import { useState } from 'react';
import { PlayCircle, X, ArrowUpRight } from 'lucide-react';
import { Highlight, Eyebrow, Media, CountUp } from '../common/Common';
import SmartLink from '../common/SmartLink';
import { mediaUrl } from '../../lib/media';

export default function Hero({ c }) {
  const [video, setVideo] = useState(false);
  return (
    <section className="hero">
      {/* Original banner at its own aspect ratio (no zoom/crop on desktop) */}
      <div className="hero__bg"><Media m={c.background} width={2000} loading="eager" /></div>
      <div className="hero__overlay" />
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__in" style={{ '--d': 0 }}><Eyebrow light>{c.eyebrow}</Eyebrow></div>
          <h1 className="hero__in" style={{ '--d': 1 }}><Highlight text={c.title} highlight={c.highlight} /></h1>
          {c.description && <p className="hero__desc hero__in" style={{ '--d': 2 }}>{c.description}</p>}
          {c.tags?.length > 0 && (
            <ul className="hero__tags hero__in" style={{ '--d': 3 }}>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          )}
          <div className="hero__actions hero__in" style={{ '--d': 4 }}>
            {c.primary_button?.text && (
              <SmartLink to={c.primary_button.link} className="btn btn--primary btn--lg">
                {c.primary_button.text}<ArrowUpRight size={18} />
              </SmartLink>
            )}
            {c.demo_video?.url && c.secondary_button?.text && (
              <button type="button" className="btn btn--glass btn--lg" onClick={() => setVideo(true)}>
                <span className="play-pulse"><PlayCircle size={20} /></span>{c.secondary_button.text}
              </button>
            )}
          </div>
        </div>
        {c.stats?.length > 0 && (
          <div className="hero__stats">
            {c.stats.map((s, i) => (
              <div key={s.label} className="hero__stat hero__in" style={{ '--d': 5 + i }}>
                <strong><CountUp value={s.value} /></strong><span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {video && (
        <div className="modal" onClick={() => setVideo(false)}>
          <div className="modal__video" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setVideo(false)} aria-label="Close video"><X /></button>
            <video src={mediaUrl(c.demo_video.url)} controls autoPlay playsInline />
          </div>
        </div>
      )}
    </section>
  );
}
