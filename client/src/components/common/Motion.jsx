import { useEffect, useRef } from 'react';

// Thin brand-gradient bar at the top showing scroll progress
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty('--p', max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

// 3D tilt + cursor spotlight for any element with the `tilt` class (one delegated listener)
export function useTilt() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current = null;
    const reset = (el) => { el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); };
    const onMove = (e) => {
      const el = e.target.closest?.('.tilt');
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    };
    const onLeave = () => { if (current) reset(current); current = null; };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); };
  }, []);
}
