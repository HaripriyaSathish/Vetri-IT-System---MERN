import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, X, Save, Loader2, ImageOff, Inbox } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { mediaUrl } from '../../lib/media';
import { collections } from '../schemas/collections';
import { usePopup } from '../context/PopupContext';
import { FieldGrid, Tabs, Toggle } from './Fields';

// List + side drawer editor for a collection table (services, solutions)
export default function CollectionManager({ resource, hint }) {
  const cfg = collections[resource];
  const { notify, confirm } = usePopup();
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = useCallback(() => api.get(`/admin/c/${resource}`).then((r) => setItems(r.data)), [resource]);
  useEffect(() => { load(); }, [load]);

  const toggle = async (item, on) => {
    try {
      await api.put(`/admin/c/${resource}/${item.id}`, { is_active: on });
      setItems(items.map((x) => (x.id === item.id ? { ...x, is_active: on ? 1 : 0 } : x)));
      notify.success(on ? `${cfg.singular} is visible` : `${cfg.singular} hidden`, on ? 'It now shows on the website.' : 'It no longer shows on the website.');
    } catch (err) { notify.error(errMsg(err)); }
  };

  const move = async (i, d) => {
    const arr = [...items];
    [arr[i], arr[i + d]] = [arr[i + d], arr[i]];
    setItems(arr);
    try {
      await api.put(`/admin/c/${resource}/reorder`, { ids: arr.map((x) => x.id) });
      notify.success('Order updated');
    } catch (err) { notify.error(errMsg(err)); load(); }
  };

  const remove = async (item) => {
    const ok = await confirm({ title: `Delete this ${cfg.singular.toLowerCase()}?`, message: `“${item[cfg.titleKey]}” will be removed permanently.` });
    if (!ok) return;
    try {
      await api.delete(`/admin/c/${resource}/${item.id}`);
      setItems(items.filter((x) => x.id !== item.id));
      notify.success('Deleted', `${cfg.singular} removed successfully.`);
    } catch (err) { notify.error(errMsg(err)); }
  };

  return (
    <div className="adm-coll">
      <div className="adm-coll__bar">
        <div>
          <strong>{items?.length ?? '–'} {cfg.plural}</strong>
          {hint && <small className="adm-hint">{hint}</small>}
        </div>
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing({ ...cfg.defaults })}><Plus size={17} />Add {cfg.singular}</button>
      </div>

      {!items ? <div className="adm-center"><span className="adm-spinner" /></div>
        : !items.length ? (
          <div className="adm-empty"><Inbox size={34} /><p>No {cfg.plural.toLowerCase()} yet.</p></div>
        ) : (
          <div className="adm-rows">
            {items.map((it, i) => (
              <div key={it.id} className={`adm-row${it.is_active ? '' : ' adm-row--off'}`}>
                {cfg.imageKey && (
                  <div className="adm-row__thumb">
                    {it[cfg.imageKey]?.url ? <img src={mediaUrl(it[cfg.imageKey].url)} alt="" /> : <ImageOff size={18} />}
                  </div>
                )}
                <div className="adm-row__text">
                  <strong>{it[cfg.titleKey]}</strong>
                  {cfg.subtitleKey && <span>{it[cfg.subtitleKey]}</span>}
                </div>
                <Toggle checked={it.is_active} onChange={(v) => toggle(it, v)} />
                <div className="adm-row__actions">
                  <button className="adm-icon-btn" disabled={i === 0} onClick={() => move(i, -1)} title="Move up"><ChevronUp size={17} /></button>
                  <button className="adm-icon-btn" disabled={i === items.length - 1} onClick={() => move(i, 1)} title="Move down"><ChevronDown size={17} /></button>
                  <button className="adm-icon-btn adm-icon-btn--primary" onClick={() => setEditing(it)} title="Edit"><Pencil size={16} /></button>
                  <button className="adm-icon-btn adm-icon-btn--danger" onClick={() => remove(it)} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

      {editing && (
        <ItemDrawer cfg={cfg} resource={resource} item={editing} onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }} />
      )}
    </div>
  );
}

function ItemDrawer({ cfg, resource, item, onClose, onSaved }) {
  const { notify } = usePopup();
  const [values, setValues] = useState(item);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const isNew = !item.id;

  const save = async (e) => {
    e.preventDefault();
    const missing = cfg.tabs.flatMap((t, ti) => t.fields.filter((f) => f.required && !String(values[f.name] ?? '').trim()).map((f) => ({ f, ti })));
    if (missing.length) { setTab(missing[0].ti); return notify.error(`Please fill in “${missing[0].f.label}”.`, 'Required field'); }
    setSaving(true);
    try {
      if (isNew) await api.post(`/admin/c/${resource}`, values);
      else await api.put(`/admin/c/${resource}/${item.id}`, values);
      notify.success(isNew ? `${cfg.singular} added` : 'Changes saved', 'Your updates are now live on the website.');
      onSaved();
    } catch (err) {
      notify.error(errMsg(err));
    } finally { setSaving(false); }
  };

  return (
    <div className="adm-drawer-layer" onClick={onClose}>
      <form className="adm-drawer" onClick={(e) => e.stopPropagation()} onSubmit={save}>
        <div className="adm-drawer__head">
          <div>
            <small>{isNew ? 'New' : 'Edit'} {cfg.singular}</small>
            <h3>{values[cfg.titleKey] || `Untitled ${cfg.singular.toLowerCase()}`}</h3>
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {cfg.tabs.length > 1 && <Tabs tabs={cfg.tabs.map((t) => t.tab)} active={tab} onChange={setTab} />}
        <div className="adm-drawer__body">
          <FieldGrid fields={cfg.tabs[tab].fields} values={values} onChange={setValues} />
        </div>
        <div className="adm-drawer__foot">
          <Toggle checked={values.is_active} onChange={(v) => setValues({ ...values, is_active: v ? 1 : 0 })} label="Visible on website" />
          <div className="adm-drawer__btns">
            <button type="button" className="adm-btn adm-btn--ghost" onClick={onClose}>Cancel</button>
            <button className="adm-btn adm-btn--primary" disabled={saving}>{saving ? <Loader2 className="adm-spin" size={17} /> : <Save size={17} />}Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
