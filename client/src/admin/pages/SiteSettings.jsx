import { useEffect, useState } from 'react';
import { Settings, Save, Loader2 } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { usePopup } from '../context/PopupContext';
import { FieldGrid, Tabs } from '../components/Fields';
import PageHeader from '../components/PageHeader';

const tabs = [
  {
    tab: 'Brand & Header', fields: [
      { name: 'logo', label: 'Logo', type: 'media' },
      { name: 'company_name', label: 'Company name', type: 'text', half: true },
      { name: 'short_name', label: 'Short name', type: 'text', half: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'header_button_text', label: 'Header button text', type: 'text', half: true },
      { name: 'header_button_link', label: 'Header button link', type: 'text', half: true },
    ],
  },
  {
    tab: 'Contact', fields: [
      { name: 'phone', label: 'Phone', type: 'text', half: true },
      { name: 'whatsapp', label: 'WhatsApp number', type: 'text', half: true, hint: 'With country code, digits only e.g. 918438781327' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea', rows: 3, hint: 'Keep it exactly as in the Google Business Profile' },
      { name: 'map_link', label: 'Google Maps link', type: 'text' },
    ],
  },
  {
    tab: 'Social Links', fields: [
      { name: 'instagram', label: 'Instagram URL', type: 'text' },
      { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
      { name: 'facebook', label: 'Facebook URL', type: 'text' },
      { name: 'youtube', label: 'YouTube URL', type: 'text' },
    ],
  },
  {
    tab: 'Footer & Buttons', fields: [
      { name: 'footer_about', label: 'Footer about text', type: 'textarea' },
      { name: 'social_heading', label: 'Social heading', type: 'text' },
      { name: 'copyright', label: 'Copyright line', type: 'text' },
      { name: 'call_button_title', label: 'Floating call button title', type: 'text', half: true },
      { name: 'whatsapp_button_title', label: 'Floating WhatsApp button title', type: 'text', half: true },
    ],
  },
];

export default function SiteSettings() {
  const { notify } = usePopup();
  const [values, setValues] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api.get('/admin/settings/site').then((r) => setValues(r.data)); }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/admin/settings/site', values);
      notify.success('Settings saved', 'Header, footer and contact details are updated.');
    } catch (err) { notify.error(errMsg(err)); } finally { setSaving(false); }
  };

  return (
    <div className="adm-page">
      <PageHeader icon={Settings} title="Site Settings" subtitle="Logo, contact details, social links and footer — shared by every page.">
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={!values || saving}>
          {saving ? <Loader2 className="adm-spin" size={17} /> : <Save size={17} />}Save settings
        </button>
      </PageHeader>
      {!values ? <div className="adm-center"><span className="adm-spinner" /></div> : (
        <div className="adm-card adm-editor">
          <div className="adm-editor__tabs"><Tabs tabs={tabs.map((t) => t.tab)} active={tab} onChange={setTab} /></div>
          <div className="adm-editor__body" key={tab}>
            <FieldGrid fields={tabs[tab].fields} values={values} onChange={setValues} />
          </div>
        </div>
      )}
    </div>
  );
}
