export default function Ticker({ c }) {
  const items = c.items || [];
  if (!items.length) return null;
  // Repeat so the strip is always wider than the viewport, then duplicate for a seamless loop
  const row = Array.from({ length: Math.max(2, Math.ceil(8 / items.length)) }, () => items).flat();
  return (
    <section className="ticker" aria-label="Our services">
      <div className="ticker__track" style={{ animationDuration: `${c.speed || 40}s` }}>
        {[0, 1].map((k) => (
          <div className="ticker__group" key={k} aria-hidden={k === 1}>
            {row.map((t, i) => <span key={i}>{t}<i className="ticker__dot">{c.separator || '🔶'}</i></span>)}
          </div>
        ))}
      </div>
    </section>
  );
}
