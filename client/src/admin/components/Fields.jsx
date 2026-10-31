import { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, X, GripVertical } from 'lucide-react';
import MediaField from './MediaField';
import IconPicker from './IconPicker';

/* ---------- Single field ---------- */
export function Field({ field: f, value, onChange }) {
  const label = (
    <span className="adm-label">
      {f.label}{f.required && <em>*</em>}
    </span>
  );
  const hint = f.hint && <small className="adm-hint">{f.hint}</small>;
  const cls = `adm-field${f.half ? ' adm-field--half' : ''}`;

  switch (f.type) {
    case 'textarea':
      return <label className={cls}>{label}<textarea rows={f.rows || 4} value={value ?? ''} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />{hint}</label>;
    case 'number':
      return <label className={cls}>{label}<input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />{hint}</label>;
    case 'tags':
      return <div className={cls}>{label}<TagsInput value={value || []} onChange={onChange} />{hint}</div>;
    case 'paragraphs':
      return <div className={cls}>{label}<Paragraphs value={value || []} onChange={onChange} />{hint}</div>;
    case 'button':
      return (
        <div className={cls}>{label}
          <div className="adm-inline">
            <input placeholder="Button text" value={value?.text ?? ''} onChange={(e) => onChange({ ...value, text: e.target.value })} />
            {!f.noLink && <input placeholder="Link e.g. /contact or #enquiry" value={value?.link ?? ''} onChange={(e) => onChange({ ...value, link: e.target.value })} />}
          </div>{hint}
        </div>
      );
    case 'media':
      return <div className={cls}>{label}<MediaField value={value} onChange={onChange} accept={f.accept} />{hint}</div>;
    case 'icon':
      return <div className={cls}>{label}<IconPicker value={value} onChange={onChange} /></div>;
    case 'list':
      return <div className={cls}>{label}{hint}<ListField field={f} value={value || []} onChange={onChange} /></div>;
    case 'select':
      return (
        <label className={cls}>{label}
          <select value={value ?? f.options[0][0]} onChange={(e) => onChange(e.target.value)}>
            {f.options.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
          </select>{hint}
        </label>
      );
    case 'switch':
      return <div className={cls}><Toggle checked={!!value} onChange={onChange} label={f.label} /></div>;
    default:
      return <label className={cls}>{label}<input value={value ?? ''} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />{hint}</label>;
  }
}

export function FieldGrid({ fields, values, onChange }) {
  return (
    <div className="adm-grid">
      {fields.map((f) => (
        <Field key={f.name} field={f} value={values?.[f.name]} onChange={(v) => onChange({ ...values, [f.name]: v })} />
      ))}
    </div>
  );
}

/* ---------- Tabs ---------- */
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="adm-tabs" role="tablist">
      {tabs.map((t, i) => (
        <button type="button" key={t} role="tab" aria-selected={active === i}
          className={`adm-tabs__btn${active === i ? ' active' : ''}`} onClick={() => onChange(i)}>
          <span className="adm-tabs__no">{i + 1}</span>{t}
        </button>
      ))}
    </div>
  );
}

/* ---------- Tags (string list) ---------- */
function TagsInput({ value, onChange }) {
  const [text, setText] = useState('');
  const add = () => {
    const t = text.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setText('');
  };
  return (
    <div className="adm-tags">
      {value.map((t, i) => (
        <span key={t} className="adm-tag">
          {t}
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Remove ${t}`}><X size={13} /></button>
        </span>
      ))}
      <input value={text} placeholder="Type and press Enter" onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} onBlur={add} />
    </div>
  );
}

/* ---------- Paragraph list ---------- */
function Paragraphs({ value, onChange }) {
  const set = (i, v) => onChange(value.map((p, j) => (j === i ? v : p)));
  return (
    <div className="adm-paras">
      {value.map((p, i) => (
        <div key={i} className="adm-paras__row">
          <textarea rows={4} value={p} onChange={(e) => set(i, e.target.value)} />
          <button type="button" className="adm-icon-btn adm-icon-btn--danger" onClick={() => onChange(value.filter((_, j) => j !== i))} title="Remove paragraph"><Trash2 size={16} /></button>
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--soft adm-btn--sm" onClick={() => onChange([...value, ''])}><Plus size={15} />Add paragraph</button>
    </div>
  );
}

/* ---------- Repeater (collapsible cards) ---------- */
function ListField({ field: f, value, onChange }) {
  const [open, setOpen] = useState(null);
  const update = (i, v) => onChange(value.map((it, j) => (j === i ? v : it)));
  const move = (i, d) => {
    const arr = [...value];
    [arr[i], arr[i + d]] = [arr[i + d], arr[i]];
    onChange(arr);
    setOpen(open === i ? i + d : open);
  };
  const add = () => { onChange([...value, {}]); setOpen(value.length); };

  return (
    <div className="adm-list">
      {value.map((item, i) => (
        <div key={i} className={`adm-list__item${open === i ? ' open' : ''}${f.hideable && item.hidden ? ' adm-list__item--hidden' : ''}`}>
          <div className="adm-list__head" onClick={() => setOpen(open === i ? null : i)}>
            <GripVertical size={16} className="adm-muted" />
            <span className="adm-list__no">{String(i + 1).padStart(2, '0')}</span>
            <strong>{item[f.titleKey] || `New ${f.itemLabel || 'item'}`}</strong>
            <div className="adm-list__actions" onClick={(e) => e.stopPropagation()}>
              {/* hideable lists: "hidden: true" keeps the item saved but off the website */}
              {f.hideable && (
                <Toggle checked={!item.hidden} label={item.hidden ? 'Hidden' : 'Visible'}
                  onChange={(on) => { const { hidden, ...rest } = item; update(i, on ? rest : { ...rest, hidden: true }); }} />
              )}
              <button type="button" className="adm-icon-btn" disabled={i === 0} onClick={() => move(i, -1)} title="Move up"><ChevronUp size={16} /></button>
              <button type="button" className="adm-icon-btn" disabled={i === value.length - 1} onClick={() => move(i, 1)} title="Move down"><ChevronDown size={16} /></button>
              <button type="button" className="adm-icon-btn adm-icon-btn--danger" onClick={() => { onChange(value.filter((_, j) => j !== i)); setOpen(null); }} title="Remove"><Trash2 size={16} /></button>
            </div>
            <ChevronDown size={18} className="adm-list__chev" />
          </div>
          {open === i && (
            <div className="adm-list__body">
              <FieldGrid fields={f.fields} values={item} onChange={(v) => update(i, v)} />
            </div>
          )}
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--soft adm-btn--sm" onClick={add}><Plus size={15} />Add {f.itemLabel || 'item'}</button>
    </div>
  );
}

/* ---------- Toggle switch ---------- */
export function Toggle({ checked, onChange, label }) {
  return (
    <label className="adm-toggle" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="adm-toggle__track"><span /></span>
      {label && <span className="adm-toggle__label">{label}</span>}
    </label>
  );
}
