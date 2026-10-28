import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

const SiteContext = createContext({ settings: {}, services: [], solutions: [] });

export function SiteProvider({ children }) {
  const [site, setSite] = useState({ settings: {}, services: [], solutions: [] });
  useEffect(() => {
    api.get('/site').then((r) => setSite(r.data)).catch(() => {});
  }, []);
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
