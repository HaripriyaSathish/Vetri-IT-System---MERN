import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../../lib/api';
import { MANAGED_PAGES } from '../schemas/pages';

// Shared admin data the sidebar needs: page sections + new-enquiry count
const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [sections, setSections] = useState({ home: [] });
  const [newEnquiries, setNewEnquiries] = useState(0);

  const reloadSections = useCallback(async (page = 'home') => {
    const { data } = await api.get('/admin/sections', { params: { page } });
    setSections((s) => ({ ...s, [page]: data }));
    return data;
  }, []);

  const reloadCounts = useCallback(async () => {
    const { data } = await api.get('/admin/dashboard');
    setNewEnquiries(data.counts.newEnquiries);
    return data;
  }, []);

  useEffect(() => {
    MANAGED_PAGES.forEach((p) => reloadSections(p.slug).catch(() => {}));
    reloadCounts().catch(() => {});
  }, [reloadSections, reloadCounts]);

  return (
    <AdminDataContext.Provider value={{ sections, reloadSections, newEnquiries, reloadCounts }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export const useAdminData = () => useContext(AdminDataContext);
