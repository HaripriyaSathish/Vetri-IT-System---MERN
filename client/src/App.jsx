import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import ServicePage from './pages/ServicePage';
import { EXPERTISE_PAGES, PRODUCTS_PAGE, ABOUT_PAGE, CONTACT_PAGE } from './lib/sectionTypes';

// Admin is code-split so visitors never download it
const AdminApp = lazy(() => import('./admin/AdminApp'));

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
      <Route element={<SiteProvider><SiteLayout /></SiteProvider>}>
        <Route index element={<Home />} />
        {[ABOUT_PAGE, CONTACT_PAGE, PRODUCTS_PAGE, ...EXPERTISE_PAGES].map(({ slug, name }) => <Route key={slug} path={slug} element={<ServicePage slug={slug} title={name} />} />)}
        <Route path="*" element={<ComingSoon notFound />} />
      </Route>
    </Routes>
  );
}
