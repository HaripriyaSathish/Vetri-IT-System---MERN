import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import { ScrollProgress, useTilt } from '../common/Motion';
import '../../styles/site.css';
import '../../styles/footer.css';
import '../../styles/motion.css';

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useTilt();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="site-main"><Outlet /></main>
      <Footer />
      <FloatingActions />
    </>
  );
}
