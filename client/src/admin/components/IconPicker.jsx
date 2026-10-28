import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { ICONS, ICON_NAMES } from '../../lib/icons';

// Symbols used as icons on the live site
const SYMBOLS = ['♧', '↗', '♙', '♡', '◷', '⚒', '☼', '◇', '⌘', '▤', '▣', '◆', '★', '✦', '⚙', '✉'];

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef();
  const Current = ICONS[value];

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const list = ICON_NAMES.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  const pick = (n) => { onChange(n); setOpen(false); };

  return (
    <div className="adm-iconpick" ref={ref}>
      <button type="button" className="adm-iconpick__btn" onClick={() => setOpen(!open)}>
        <span className="adm-iconpick__preview">{Current ? <Current size={18} /> : value || '?'}</span>
        {Current ? value : value ? 'Symbol' : 'Choose icon'}<ChevronDown size={16} />
      </button>
      {open && (
        <div className="adm-iconpick__pop">
          <small className="adm-iconpick__title">Website symbols</small>
          <div className="adm-iconpick__grid adm-iconpick__grid--symbols">
            {SYMBOLS.map((g) => (
              <button type="button" key={g} title={g} className={g === value ? 'active' : ''} onClick={() => pick(g)}>{g}</button>
            ))}
          </div>
          <small className="adm-iconpick__title">Line icons</small>
          <div className="adm-search"><Search size={15} /><input placeholder="Search icons" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="adm-iconpick__grid">
            {list.map((n) => {
              const I = ICONS[n];
              return (
                <button type="button" key={n} title={n} className={n === value ? 'active' : ''} onClick={() => pick(n)}>
                  <I size={20} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
