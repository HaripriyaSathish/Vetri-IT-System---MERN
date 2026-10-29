import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import { ScrollProgress, useTilt } from '../common/Motion';
import '../../styles/site.css';
import '../../styles/footer.css';
import '../../styles/motion.css';
import '../../styles/cards-motion.css';

export default function SiteLayout() {
  const { pathname } = useLocation();
  // instant, so the smooth-scroll setting doesn't glide past (and reveal) every section of the new page
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  useTilt();
  return (
    <>
      <ScrollProgress />
      <Header />
      {/* keyed by path so each page mounts fresh and its reveal animations replay on navigation */}
      <main className="site-main" key={pathname}><Outlet /></main>
      <Footer />
      <FloatingActions />
    </>
  );
}
