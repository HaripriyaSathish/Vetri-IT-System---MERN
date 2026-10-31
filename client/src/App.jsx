import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import ServicePage from './pages/ServicePage';
import { EXPERTISE_PAGES, PRODUCTS_PAGE, PROJECTS_PAGE, ABOUT_PAGE, CONTACT_PAGE } from './lib/sectionTypes';

// Admin is code-split so visitors never download it
const AdminApp = lazy(() => import('./admin/AdminApp'));

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
      <Route element={<SiteProvider><SiteLayout /></SiteProvider>}>
        <Route index element={<Home />} />
        {[ABOUT_PAGE, CONTACT_PAGE, PRODUCTS_PAGE, PROJECTS_PAGE, ...EXPERTISE_PAGES].map(({ slug, name, path }) => <Route key={slug} path={path || slug} element={<ServicePage slug={slug} title={name} />} />)}
        {EXPERTISE_PAGES.filter((p) => p.oldPath).map((p) => <Route key={p.oldPath} path={p.oldPath} element={<Navigate to={`/${p.path}`} replace />} />)}
        <Route path="*" element={<ComingSoon notFound />} />
      </Route>
    </Routes>
  );
}
