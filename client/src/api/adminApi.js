import axios from 'axios';
import { useAdminAuth } from '@/context/AdminAuth';
const base_url = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const adminApi = axios.create({
  baseURL: `${base_url}/api/v1/admin`,
});

export const useAdminApi = () => {
  const { token, logout } = useAdminAuth();

  // attach token on every request
  adminApi.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // optional: auto‑logout on 401
  adminApi.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) logout();
      return Promise.reject(err);
    }
  );

  return adminApi;
};
