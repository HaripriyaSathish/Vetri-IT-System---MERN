import axios from 'axios';

export const TOKEN_KEY = 'vis_admin_token';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && location.pathname.startsWith('/admin') && !location.pathname.endsWith('/login')) {
      localStorage.removeItem(TOKEN_KEY);
      location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export const errMsg = (err) => err?.response?.data?.message || err?.message || 'Something went wrong';

export default api;
