import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, LayoutTemplate, Briefcase, Package, Images, ArrowRight, HardDrive, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { sectionIcons, SectionFallbackIcon } from '../schemas/sections';

export default function Dashboard() {
  const { admin } = useAuth();
  const { reloadCounts, sections } = useAdminData();
  const [data, setData] = useState(null);
  useEffect(() => { reloadCounts().then(setData).catch(() => {}); }, [reloadCounts]);

  const c = data?.counts || {};
  const cards = [
    { label: 'New enquiries', value: c.newEnquiries, sub: `${c.enquiries ?? 0} total`, icon: Inbox, to: '/admin/enquiries', tone: 'orange' },
    { label: 'Live home sections', value: c.sections, sub: 'Explore VIS', icon: LayoutTemplate, to: '/admin/pages/home', tone: 'navy' },
    { label: 'Services', value: c.services, sub: 'Service cards', icon: Briefcase, to: '/admin/pages/home/services', tone: 'blue' },
    { label: 'Products', value: c.solutions, sub: 'Smart solutions', icon: Package, to: '/admin/pages/home/solutions', tone: 'green' },
    { label: 'Media files', value: c.media, sub: 'In media folder', icon: Images, to: '/admin/media', tone: 'navy' },
  ];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="adm-page">
      <div className="adm-hero">
        <div>
          <span className="adm-hero__chip"><Sparkles size={14} />Vetri IT Systems CMS</span>
          <h1>{greet}, {admin?.display_name || admin?.username} 👋</h1>
          <p>Edit any section of the Explore VIS page — changes go live instantly.</p>
        </div>
        <Link to="/admin/pages/home" className="adm-btn adm-btn--white">Manage Explore VIS<ArrowRight size={17} /></Link>
      </div>

      <div className="adm-stats">
        {cards.map((s) => (
          <Link to={s.to} key={s.label} className={`adm-stat adm-stat--${s.tone}`}>
            <span className="adm-stat__icon"><s.icon size={22} /></span>
            <div><strong>{s.value ?? '–'}</strong><span>{s.label}</span><small>{s.sub}</small></div>
          </Link>
        ))}
      </div>

      <div className="adm-two">
        <section className="adm-card">
          <div className="adm-card__head"><h3>Explore VIS sections</h3><Link to="/admin/pages/home" className="adm-link">Reorder<ArrowRight size={15} /></Link></div>
          <div className="adm-quick">
            {sections.home.map((s) => {
              const I = sectionIcons[s.section_key] || SectionFallbackIcon;
              return (
                <Link key={s.id} to={`/admin/pages/home/${s.section_key}`} className={`adm-quick__item${s.is_active ? '' : ' off'}`}>
                  <span><I size={18} /></span>{s.label}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="adm-card">
          <div className="adm-card__head"><h3>Recent enquiries</h3><Link to="/admin/enquiries" className="adm-link">View all<ArrowRight size={15} /></Link></div>
          {!data ? <div className="adm-center"><span className="adm-spinner" /></div>
            : !data.recentEnquiries.length ? <div className="adm-empty"><Inbox size={30} /><p>No enquiries yet.</p></div>
            : (
              <ul className="adm-recent">
                {data.recentEnquiries.map((e) => (
                  <li key={e.id}>
                    <span className="adm-avatar adm-avatar--sm">{e.name[0]?.toUpperCase()}</span>
                    <div><strong>{e.name}</strong><small>{e.service || 'General'} · {new Date(e.created_at).toLocaleDateString()}</small></div>
                    <span className={`adm-status adm-status--${e.status}`}>{e.status}</span>
                  </li>
                ))}
              </ul>
            )}
          {data?.storage && (
            <div className="adm-cloud ok">
              <HardDrive size={18} />
              Media stored in {data.storage.folder} · uploads backed up in {data.storage.database}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
