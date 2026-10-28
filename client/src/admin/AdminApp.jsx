import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PopupProvider } from './context/PopupContext';
import { AdminDataProvider } from './context/AdminDataContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageLayout from './pages/PageLayout';
import SectionEditor from './pages/SectionEditor';
import Enquiries from './pages/Enquiries';
import MediaLibrary from './pages/MediaLibrary';
import Seo from './pages/Seo';
import SiteSettings from './pages/SiteSettings';
import Account from './pages/Account';
import './admin.css';
import './login.css';

function Protected({ children }) {
  const { token, ready } = useAuth();
  if (!ready) return <div className="adm-boot"><span className="adm-spinner" /></div>;
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<Protected><AdminDataProvider><AdminLayout /></AdminDataProvider></Protected>}>
            <Route index element={<Dashboard />} />
            <Route path="pages/:page" element={<PageLayout />} />
            <Route path="pages/:page/:key" element={<SectionEditor />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="seo" element={<Seo />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </PopupProvider>
    </AuthProvider>
  );
}
