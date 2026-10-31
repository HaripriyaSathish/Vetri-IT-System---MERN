import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ICONS } from '../../lib/icons';
import { mediaUrl, isVideo } from '../../lib/media';

// Splits a heading into words (for the word-by-word scroll reveal) and colours
// the `highlight` part in brand orange
export function Highlight({ text = '', highlight = '' }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  const parts = i < 0
    ? [[text, false]]
    : [[text.slice(0, i), false], [highlight, true], [text.slice(i + highlight.length), false]];
  let n = 0;
  return parts.flatMap(([chunk, hl], pi) =>
    chunk.split(/(\s+)/).filter(Boolean).map((w, wi) =>
      /^\s+$/.test(w) ? ' ' : (
        <span className="w" key={`${pi}-${wi}`}>
          <span className={hl ? 'hl' : undefined} style={{ '--i': n++ }}>{w}</span>
        </span>
      )
    )
  );
}

// Accepts a lucide icon name or a symbol glyph (♧ ↗ ⌘ …) exactly like the live site uses
export function Icon({ name, size = 22, ...rest }) {
  const C = ICONS[name];
  if (C) return <C size={size} strokeWidth={1.8} {...rest} />;
  return <span className="glyph" style={{ fontSize: size * 0.8 }} aria-hidden="true">{name || '◆'}</span>;
}

export function Eyebrow({ children, light }) {
  if (!children) return null;
  return <span className={`eyebrow${light ? ' eyebrow--light' : ''}`}><i />{children}</span>;
}

export function SectionHead({ c, center = true, as: H = 'h2' }) {
  return (
    <Reveal className={`section-head${center ? ' section-head--center' : ''}`}>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <H><Highlight text={c.title} highlight={c.highlight} /></H>
      {c.description && <p>{c.description}</p>}
    </Reveal>
  );
}

// Animates the numeric part of values like "50+", "99.4%", "< 2.5s" when scrolled into view
export function CountUp({ value = '', duration = 1600 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const m = String(value).match(/^(\D*)([\d.]+)(.*)$/);
    if (!el || !m) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num);
    const decimals = (num.split('.')[1] || '').length;
    let raf;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${pre}${(target * eased).toFixed(decimals)}${post}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);
  return <span ref={ref}>{value}</span>;
}


// Our own images (/media/...png|jpg|webp) are requested at `width` px as WebP; the server resizes and caches them
const sizable = (url, width) => width && /^\/media\/[^?]+\.(png|jpe?g|webp)$/i.test(url);

export function Media({ m, width, className, ...rest }) {
  if (!m?.url) return null;
  if (isVideo(m))
    return <video className={className} src={mediaUrl(m.url)} autoPlay muted loop playsInline {...rest} />;
  const sized = sizable(m.url, width)
    ? { src: mediaUrl(`${m.url}?w=${width}`), srcSet: `${mediaUrl(`${m.url}?w=${width}`)} 1x, ${mediaUrl(`${m.url}?w=${width * 2}`)} 2x` }
    : { src: mediaUrl(m.url) };
  return <img className={className} {...sized} alt={m.alt || ''} loading="lazy" decoding="async" {...rest} />;
}

// Fades children in when they scroll into view
// The in/done state lives in React (not classList) so a re-render with a new className
// (e.g. an FAQ item toggling "open") doesn't wipe it and hide the element again.
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState('');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setPhase('in'); return; }
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPhase('in');
        io.disconnect();
        timer = setTimeout(() => setPhase('in done'), 2600); // drop stagger delay so hover stays snappy
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return <Tag ref={ref} className={`reveal ${className}${phase ? ` ${phase}` : ''}`} {...rest}>{children}</Tag>;
}

export function Seo({ page }) {
  if (!page) return null;
  return (
    <Helmet>
      {page.meta_title && <title>{page.meta_title}</title>}
      {page.meta_description && <meta name="description" content={page.meta_description} />}
      {page.meta_keywords && <meta name="keywords" content={page.meta_keywords} />}
      {page.meta_title && <meta property="og:title" content={page.meta_title} />}
      {page.meta_description && <meta property="og:description" content={page.meta_description} />}
      {page.og_image?.url && <meta property="og:image" content={page.og_image.url} />}
    </Helmet>
  );
}

// Internal links use the router; hashes scroll; everything else is a plain anchor
export const isExternal = (href = '') => /^(https?:|tel:|mailto:)/.test(href);
