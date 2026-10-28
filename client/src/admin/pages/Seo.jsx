import { useEffect, useState } from 'react';
import { Search, Save, Loader2, Globe } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { usePopup } from '../context/PopupContext';
import { FieldGrid } from '../components/Fields';
import PageHeader from '../components/PageHeader';

const fields = [
  { name: 'meta_title', label: 'Meta title', type: 'text', hint: 'Recommended 50–60 characters' },
  { name: 'meta_description', label: 'Meta description', type: 'textarea', rows: 3, hint: 'Recommended 140–160 characters' },
  { name: 'meta_keywords', label: 'Keywords', type: 'textarea', rows: 2, hint: 'Comma separated' },
  { name: 'og_image', label: 'Social share image (Open Graph)', type: 'media' },
];

export default function Seo() {
  const { notify } = usePopup();
  const [pages, setPages] = useState(null);
  const [active, setActive] = useState(null);
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/admin/c/pages').then((r) => { setPages(r.data); pick(r.data[0]); });
  }, []);

  const pick = (p) => { setActive(p); setValues(p || {}); };

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/c/pages/${active.id}`, values);
      setPages(pages.map((p) => (p.id === active.id ? { ...p, ...values } : p)));
      setActive({ ...active, ...values });
      notify.success('SEO saved', `Meta tags for ${active.name} are updated.`);
    } catch (err) { notify.error(errMsg(err)); } finally { setSaving(false); }
  };

  const len = (s, min, max) => {
    const n = (s || '').length;
    return <span className={`adm-count${n && (n < min || n > max) ? ' warn' : n ? ' ok' : ''}`}>{n} chars</span>;
  };

  return (
    <div className="adm-page">
      <PageHeader icon={Search} title="SEO Meta Tags" subtitle="Title, description and share image for each page.">
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={!active || saving}>
          {saving ? <Loader2 className="adm-spin" size={17} /> : <Save size={17} />}Save SEO
        </button>
      </PageHeader>
      {!pages ? <div className="adm-center"><span className="adm-spinner" /></div> : (
        <div className="adm-split">
          <div className="adm-card adm-split__nav">
            {pages.map((p) => (
              <button key={p.id} className={`adm-split__item${active?.id === p.id ? ' active' : ''}`} onClick={() => pick(p)}>
                <Globe size={17} /><span>{p.name}<small>/{p.slug === 'home' ? '' : p.slug}</small></span>
              </button>
            ))}
          </div>
          <div className="adm-card">
            <div className="adm-serp">
              <small>vetriitsystems.com/{active.slug === 'home' ? '' : active.slug}</small>
              <strong>{values.meta_title || 'Meta title'}</strong>
              <p>{values.meta_description || 'Meta description will appear here in Google results.'}</p>
            </div>
            <div className="adm-counts">{len(values.meta_title, 30, 60)} title · {len(values.meta_description, 120, 160)} description</div>
            <FieldGrid fields={fields} values={values} onChange={setValues} />
          </div>
        </div>
      )}
    </div>
  );
}
