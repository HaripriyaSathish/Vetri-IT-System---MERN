import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Pencil, Save, Loader2, ExternalLink } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { useAdminData } from '../context/AdminDataContext';
import { usePopup } from '../context/PopupContext';
import { pageInfo, getSectionIcon } from '../schemas/pages';
import { Toggle } from '../components/Fields';
import PageHeader from '../components/PageHeader';

// Section order & visibility for one page (Explore VIS or an Our Expertise page)
export default function PageLayout() {
  const { page } = useParams();
  const info = pageInfo(page);
  const { sections, reloadSections } = useAdminData();
  const { notify } = usePopup();
  const current = sections[page] || [];
  const [list, setList] = useState(current);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setDirty(false); }, [page]);
  useEffect(() => { if (!dirty) setList(current); }, [current, dirty]);

  const move = (i, d) => {
    const arr = [...list];
    [arr[i], arr[i + d]] = [arr[i + d], arr[i]];
    setList(arr);
    setDirty(true);
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      await api.put('/admin/sections/reorder', { ids: list.map((s) => s.id) });
      setDirty(false);
      await reloadSections(page);
      notify.success('Section order saved', `The ${info.name} page now shows sections in this order.`);
    } catch (err) { notify.error(errMsg(err)); } finally { setSaving(false); }
  };

  const toggle = async (s, on) => {
    try {
      await api.put(`/admin/sections/${s.id}`, { is_active: on });
      setList(list.map((x) => (x.id === s.id ? { ...x, is_active: on ? 1 : 0 } : x)));
      await reloadSections(page);
      notify.success(on ? `${s.label} is visible` : `${s.label} hidden`, on ? 'The section now shows on the website.' : 'The section is hidden from the website.');
    } catch (err) { notify.error(errMsg(err)); }
  };

  return (
    <div className="adm-page">
      <PageHeader icon={info.icon} title={info.name} subtitle="Reorder sections, show or hide them, and open any section to edit its content.">
        <a href={info.path} target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost"><ExternalLink size={16} />Preview</a>
        <button className="adm-btn adm-btn--primary" disabled={!dirty || saving} onClick={saveOrder}>
          {saving ? <Loader2 className="adm-spin" size={17} /> : <Save size={17} />}Save order
        </button>
      </PageHeader>

      {dirty && <div className="adm-alert adm-alert--warn">You changed the order. Click <b>Save order</b> to publish it.</div>}

      <div className="adm-sections">
        {list.map((s, i) => {
          const I = getSectionIcon(page, s.section_key);
          return (
            <div key={s.id} className={`adm-section-row${s.is_active ? '' : ' off'}`}>
              <span className="adm-section-row__no">{String(i + 1).padStart(2, '0')}</span>
              <span className="adm-section-row__icon"><I size={20} /></span>
              <div className="adm-section-row__text">
                <strong>{s.label}</strong>
                <small>{s.content?.title || (Array.isArray(s.content?.items) && typeof s.content.items[0] === 'string' ? s.content.items.join(' · ') : s.section_key)}</small>
              </div>
              <Toggle checked={s.is_active} onChange={(v) => toggle(s, v)} label={s.is_active ? 'Visible' : 'Hidden'} />
              <div className="adm-row__actions">
                <button className="adm-icon-btn" disabled={i === 0} onClick={() => move(i, -1)} title="Move up"><ChevronUp size={17} /></button>
                <button className="adm-icon-btn" disabled={i === list.length - 1} onClick={() => move(i, 1)} title="Move down"><ChevronDown size={17} /></button>
                <Link to={`/admin/pages/${page}/${s.section_key}`} className="adm-btn adm-btn--soft adm-btn--sm"><Pencil size={15} />Edit</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
