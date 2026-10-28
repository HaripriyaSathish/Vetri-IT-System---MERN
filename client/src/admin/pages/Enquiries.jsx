import { useEffect, useState } from 'react';
import { Inbox, Trash2, Phone, Mail, X, Eye, Search } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { usePopup } from '../context/PopupContext';
import { useAdminData } from '../context/AdminDataContext';
import PageHeader from '../components/PageHeader';

const STATUSES = ['new', 'contacted', 'closed'];

export default function Enquiries() {
  const { notify, confirm } = usePopup();
  const { reloadCounts } = useAdminData();
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [view, setView] = useState(null);

  useEffect(() => { api.get('/admin/c/enquiries').then((r) => setItems(r.data)); }, []);

  const setStatus = async (e, status) => {
    try {
      await api.put(`/admin/c/enquiries/${e.id}`, { status });
      setItems(items.map((x) => (x.id === e.id ? { ...x, status } : x)));
      if (view?.id === e.id) setView({ ...view, status });
      reloadCounts();
      notify.success('Status updated', `${e.name} marked as ${status}.`);
    } catch (err) { notify.error(errMsg(err)); }
  };

  const remove = async (e) => {
    if (!(await confirm({ title: 'Delete this enquiry?', message: `The enquiry from ${e.name} will be removed permanently.` }))) return;
    try {
      await api.delete(`/admin/c/enquiries/${e.id}`);
      setItems(items.filter((x) => x.id !== e.id));
      setView(null);
      reloadCounts();
      notify.success('Enquiry deleted');
    } catch (err) { notify.error(errMsg(err)); }
  };

  const shown = (items || [])
    .filter((e) => filter === 'all' || e.status === filter)
    .filter((e) => !q || [e.name, e.email, e.phone, e.service].join(' ').toLowerCase().includes(q.toLowerCase()));
  const count = (s) => (items || []).filter((e) => s === 'all' || e.status === s).length;

  return (
    <div className="adm-page">
      <PageHeader icon={Inbox} title="Enquiries" subtitle="Project enquiries submitted from the website." />

      <div className="adm-card">
        <div className="adm-toolbar">
          <div className="adm-pills">
            {['all', ...STATUSES].map((s) => (
              <button key={s} className={`adm-pill${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>
                {s}<b>{count(s)}</b>
              </button>
            ))}
          </div>
          <div className="adm-search"><Search size={16} /><input placeholder="Search name, phone, service" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        </div>

        {!items ? <div className="adm-center"><span className="adm-spinner" /></div>
          : !shown.length ? <div className="adm-empty"><Inbox size={34} /><p>No enquiries here yet.</p></div>
          : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>Name</th><th>Contact</th><th>Service</th><th>Date</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {shown.map((e) => (
                    <tr key={e.id} className={e.status === 'new' ? 'is-new' : ''}>
                      <td><strong>{e.name}</strong></td>
                      <td><div className="adm-contact"><a href={`tel:${e.phone}`}>{e.phone}</a>{e.email && <small>{e.email}</small>}</div></td>
                      <td>{e.service || '—'}</td>
                      <td>{new Date(e.created_at).toLocaleString()}</td>
                      <td>
                        <select className={`adm-status-select adm-status--${e.status}`} value={e.status} onChange={(ev) => setStatus(e, ev.target.value)}>
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="adm-row__actions">
                          <button className="adm-icon-btn adm-icon-btn--primary" onClick={() => setView(e)} title="View"><Eye size={16} /></button>
                          <button className="adm-icon-btn adm-icon-btn--danger" onClick={() => remove(e)} title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {view && (
        <div className="adm-drawer-layer" onClick={() => setView(null)}>
          <div className="adm-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="adm-drawer__head">
              <div><small>Enquiry #{view.id}</small><h3>{view.name}</h3></div>
              <button className="adm-icon-btn" onClick={() => setView(null)}><X size={18} /></button>
            </div>
            <div className="adm-drawer__body adm-detail">
              <a href={`tel:${view.phone}`} className="adm-detail__row"><Phone size={17} />{view.phone}</a>
              {view.email && <a href={`mailto:${view.email}`} className="adm-detail__row"><Mail size={17} />{view.email}</a>}
              <dl>
                <dt>Service</dt><dd>{view.service || '—'}</dd>
                <dt>Source</dt><dd>{view.source || '—'}</dd>
                <dt>Received</dt><dd>{new Date(view.created_at).toLocaleString()}</dd>
                <dt>Message</dt><dd className="adm-detail__msg">{view.message || '—'}</dd>
              </dl>
            </div>
            <div className="adm-drawer__foot">
              <select className={`adm-status-select adm-status--${view.status}`} value={view.status} onChange={(ev) => setStatus(view, ev.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="adm-btn adm-btn--danger" onClick={() => remove(view)}><Trash2 size={16} />Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
