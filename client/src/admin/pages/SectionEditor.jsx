import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { usePopup } from '../context/PopupContext';
import { useAdminData } from '../context/AdminDataContext';
import { pageInfo, getSectionSchema, getSectionIcon } from '../schemas/pages';
import { FieldGrid, Tabs, Toggle } from '../components/Fields';
import CollectionManager from '../components/CollectionManager';
import PageHeader from '../components/PageHeader';

export default function SectionEditor() {
  const { page, key } = useParams();
  const { notify } = usePopup();
  const { sections, reloadSections } = useAdminData();
  const [section, setSection] = useState(null);
  const [content, setContent] = useState({});
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const info = pageInfo(page);
  const tabs = getSectionSchema(page, key) || [{ tab: 'Content', fields: [] }];
  const list = sections[page] || [];
  const idx = list.findIndex((s) => s.section_key === key);
  const prev = list[idx - 1];
  const next = list[idx + 1];
  const dirty = section && JSON.stringify(section.content) !== JSON.stringify(content);

  useEffect(() => {
    setSection(null); setTab(0); setError('');
    api.get(`/admin/sections/${page}/${key}`)
      .then((r) => { setSection(r.data); setContent(r.data.content || {}); })
      .catch((err) => setError(errMsg(err)));
  }, [page, key]);

  const save = async () => {
    const missing = tabs.flatMap((t, ti) => (t.fields || []).filter((f) => f.required && !String(content[f.name] ?? '').trim()).map((f) => ({ f, ti })));
    if (missing.length) { setTab(missing[0].ti); return notify.error(`Please fill in “${missing[0].f.label}”.`, 'Required field'); }
    setSaving(true);
    try {
      await api.put(`/admin/sections/${section.id}`, { content });
      setSection({ ...section, content });
      reloadSections(page);
      notify.success('Changes saved', `${section.label} is updated on the website.`);
    } catch (err) { notify.error(errMsg(err)); } finally { setSaving(false); }
  };

  const toggle = async (on) => {
    try {
      await api.put(`/admin/sections/${section.id}`, { is_active: on });
      setSection({ ...section, is_active: on ? 1 : 0 });
      reloadSections(page);
      notify.success(on ? 'Section is visible' : 'Section hidden', on ? `${section.label} now shows on the website.` : `${section.label} is hidden from the website.`);
    } catch (err) { notify.error(errMsg(err)); }
  };

  if (error) return <div className="adm-page"><div className="adm-alert adm-alert--error">{error}</div></div>;
  if (!section) return <div className="adm-center adm-center--tall"><span className="adm-spinner" /></div>;

  const Icon = getSectionIcon(page, key);
  const current = tabs[tab];

  return (
    <div className="adm-page">
      <PageHeader icon={Icon} title={section.label} subtitle={`${info.name} · Section ${idx + 1} of ${list.length}`}>
        <Toggle checked={section.is_active} onChange={toggle} label={section.is_active ? 'Visible' : 'Hidden'} />
        <a href={info.path} target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost"><ExternalLink size={16} />Preview</a>
        {!current.collection && (
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving || !dirty}>
            {saving ? <Loader2 className="adm-spin" size={17} /> : <Save size={17} />}Save changes
          </button>
        )}
      </PageHeader>

      <div className="adm-card adm-editor">
        <div className="adm-editor__tabs">
          <Tabs tabs={tabs.map((t) => t.tab)} active={tab} onChange={setTab} />
          {dirty && (
            <div className="adm-dirty">
              <span className="adm-dirty__dot" />Unsaved changes
              <button className="adm-link" onClick={() => setContent(section.content || {})}><RotateCcw size={14} />Undo</button>
            </div>
          )}
        </div>
        <div className="adm-editor__body" key={tab}>
          {current.collection
            ? <CollectionManager resource={current.collection} hint={current.hint} />
            : <FieldGrid fields={current.fields} values={content} onChange={setContent} />}
        </div>
        {!current.collection && tabs.length > 1 && (
          <div className="adm-editor__foot">
            <button className="adm-btn adm-btn--ghost adm-btn--sm" disabled={tab === 0} onClick={() => setTab(tab - 1)}><ArrowLeft size={15} />Previous tab</button>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" disabled={tab === tabs.length - 1} onClick={() => setTab(tab + 1)}>Next tab<ArrowRight size={15} /></button>
          </div>
        )}
      </div>

      <div className="adm-pager">
        {prev ? <Link to={`/admin/pages/${page}/${prev.section_key}`} className="adm-pager__link"><ArrowLeft size={17} /><span><small>Previous section</small>{prev.label}</span></Link> : <span />}
        {next && <Link to={`/admin/pages/${page}/${next.section_key}`} className="adm-pager__link adm-pager__link--next"><span><small>Next section</small>{next.label}</span><ArrowRight size={17} /></Link>}
      </div>
    </div>
  );
}
