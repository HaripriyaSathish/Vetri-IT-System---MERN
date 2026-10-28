import { createContext, useContext, useEffect, useState } from 'react';
import api, { TOKEN_KEY } from '../../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(!token);

  useEffect(() => {
    if (!token) return;
    api.get('/auth/me')
      .then((r) => setAdmin(r.data))
      .catch(() => { localStorage.removeItem(TOKEN_KEY); setToken(null); })
      .finally(() => setReady(true));
  }, [token]);

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setAdmin(data.admin);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ token, admin, ready, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
