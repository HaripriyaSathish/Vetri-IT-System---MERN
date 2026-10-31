import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ChevronDown, ListOrdered, Inbox, Images, Search, Settings, KeyRound, LogOut,
  ExternalLink, PanelLeftClose, PanelLeftOpen, Menu, EyeOff,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { HOME_PAGE, ABOUT, PRODUCTS, PROJECTS, CONTACT, EXPERTISE, pageInfo, getSectionIcon } from '../schemas/pages';


// One page in the sidebar: expands to its numbered sections
function PageNav({ page, sections = [], open, onToggle, collapsed, pathname, navigate }) {
  const base = `/admin/pages/${page.slug}`;
  const active = pathname === base || pathname.startsWith(`${base}/`);
  return (
    <>
      <button type="button" className={`adm-nav adm-nav--parent${active ? ' active-parent' : ''}`}
        onClick={() => (collapsed ? navigate(base) : onToggle())} data-tip={page.name}>
        <page.icon size={19} /><span>{page.name}</span><ChevronDown size={16} className={`adm-nav__chev${open ? ' open' : ''}`} />
      </button>
      {open && !collapsed && (
        <div className="adm-subnav">
          <NavLink end to={base} className="adm-subnav__link adm-subnav__link--order"><ListOrdered size={16} /><span>Section order & visibility</span></NavLink>
          {sections.map((s, i) => {
            const I = getSectionIcon(page.slug, s.section_key);
            return (
              <NavLink key={s.id} to={`${base}/${s.section_key}`} className={`adm-subnav__link${s.is_active ? '' : ' off'}`} title={s.label}>
                <em className="adm-subnav__no">{String(i + 1).padStart(2, '0')}</em>
                <I size={16} /><span>{s.label}</span>{!s.is_active && <b className="adm-subnav__tag adm-subnav__tag--icon" title="Hidden on website"><EyeOff size={12} /></b>}
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
}

const LOGO = '/media/branding/SB_Interior_LLC_-_Login.png';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const { sections, newEnquiries } = useAdminData();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('vis_sidebar') === '1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage = pathname.match(/^\/admin\/pages\/([^/]+)/)?.[1];
  const [openPages, setOpenPages] = useState(() => ({ [currentPage || 'home']: true }));
  const togglePage = (slug) => setOpenPages((o) => ({ ...o, [slug]: !o[slug] }));
  useEffect(() => { if (currentPage) setOpenPages((o) => ({ ...o, [currentPage]: true })); }, [currentPage]);
  const [menu, setMenu] = useState(false);

  useEffect(() => { setMobileOpen(false); setMenu(false); }, [pathname]);
  useEffect(() => { localStorage.setItem('vis_sidebar', collapsed ? '1' : '0'); }, [collapsed]);

  const doLogout = () => { logout(); navigate('/admin/login'); };
  const crumbs = useCrumbs(pathname, sections);
  const navProps = { collapsed, pathname, navigate };

  return (
    <div className={`adm-shell${collapsed ? ' adm-shell--collapsed' : ''}${mobileOpen ? ' adm-shell--mobile' : ''}`}>
      <aside className="adm-side">
        <div className="adm-side__brand">
          <img src={LOGO} alt="Vetri IT Systems" />
          <div className="adm-side__brand-text"><strong>Vetri IT Systems</strong><span>Admin Console</span></div>
        </div>

        <nav className="adm-side__nav">
          <NavLink end to="/admin" className="adm-nav" data-tip="Dashboard"><LayoutDashboard size={19} /><span>Dashboard</span></NavLink>

          <p className="adm-side__group">Pages</p>
          <PageNav page={HOME_PAGE} sections={sections.home} open={!!openPages.home} onToggle={() => togglePage('home')} {...navProps} />
          <PageNav page={ABOUT} sections={sections[ABOUT.slug]} open={!!openPages[ABOUT.slug]} onToggle={() => togglePage(ABOUT.slug)} {...navProps} />
          <PageNav page={PRODUCTS} sections={sections[PRODUCTS.slug]} open={!!openPages[PRODUCTS.slug]} onToggle={() => togglePage(PRODUCTS.slug)} {...navProps} />
          <PageNav page={PROJECTS} sections={sections[PROJECTS.slug]} open={!!openPages[PROJECTS.slug]} onToggle={() => togglePage(PROJECTS.slug)} {...navProps} />
          <PageNav page={CONTACT} sections={sections[CONTACT.slug]} open={!!openPages[CONTACT.slug]} onToggle={() => togglePage(CONTACT.slug)} {...navProps} />

          <p className="adm-side__group">Our Expertise</p>
          {EXPERTISE.map((p) => (
            <PageNav key={p.slug} page={p} sections={sections[p.slug]} open={!!openPages[p.slug]} onToggle={() => togglePage(p.slug)} {...navProps} />
          ))}


          <p className="adm-side__group">Leads & Media</p>
          <NavLink to="/admin/enquiries" className="adm-nav" data-tip="Enquiries">
            <Inbox size={19} /><span>Enquiries</span>{newEnquiries > 0 && <b className="adm-badge">{newEnquiries}</b>}
          </NavLink>
          <NavLink to="/admin/media" className="adm-nav" data-tip="Media Library"><Images size={19} /><span>Media Library</span></NavLink>

          <p className="adm-side__group">Settings</p>
          <NavLink to="/admin/seo" className="adm-nav" data-tip="SEO Meta Tags"><Search size={19} /><span>SEO Meta Tags</span></NavLink>
          <NavLink to="/admin/settings" className="adm-nav" data-tip="Site Settings"><Settings size={19} /><span>Site Settings</span></NavLink>
          <NavLink to="/admin/account" className="adm-nav" data-tip="Account & Password"><KeyRound size={19} /><span>Account & Password</span></NavLink>
        </nav>

        <button className="adm-side__logout" onClick={doLogout} data-tip="Log out"><LogOut size={19} /><span>Log out</span></button>
      </aside>
      <div className="adm-side-backdrop" onClick={() => setMobileOpen(false)} />

      <div className="adm-main">
        <header className="adm-top">
          <button className="adm-icon-btn adm-top__toggle" onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
          <button className="adm-icon-btn adm-top__burger" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="adm-crumbs">
            {crumbs.map((c, i) => (
              <span key={i}>{c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</span>
            ))}
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn--soft adm-btn--sm adm-top__view"><ExternalLink size={15} />View website</a>
          <div className="adm-user">
            <button className="adm-user__btn" onClick={() => setMenu(!menu)}>
              <span className="adm-avatar">{admin?.username?.[0]?.toUpperCase() || 'A'}</span>
              <span className="adm-user__name"><strong>{admin?.display_name || 'Administrator'}</strong><small>@{admin?.username}</small></span>
              <ChevronDown size={16} />
            </button>
            {menu && (
              <div className="adm-user__menu">
                <Link to="/admin/account"><KeyRound size={16} />Change password</Link>
                <button onClick={doLogout}><LogOut size={16} />Log out</button>
              </div>
            )}
          </div>
        </header>
        <main className="adm-content"><Outlet /></main>
      </div>
    </div>
  );
}

function useCrumbs(pathname, sections = {}) {
  const parts = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean);
  const crumbs = [{ label: 'Dashboard', to: parts.length ? '/admin' : null }];
  const names = { enquiries: 'Enquiries', media: 'Media Library', seo: 'SEO Meta Tags', settings: 'Site Settings', account: 'Account & Password' };
  if (parts[0] === 'pages' && parts[1]) {
    crumbs.push({ label: pageInfo(parts[1]).name, to: parts[2] ? `/admin/pages/${parts[1]}` : null });
    if (parts[2]) crumbs.push({ label: (sections[parts[1]] || []).find((s) => s.section_key === parts[2])?.label || parts[2] });
  } else if (parts[0]) crumbs.push({ label: names[parts[0]] || parts[0] });
  return crumbs;
}
