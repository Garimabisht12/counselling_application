import axios from 'axios';
import { useAdminAuth } from '@/context/AdminAuth';
const base_url = process.env.app_server_url || 'http://localhost:5000/api/v1';
const adminApi = axios.create({
  baseURL: `${base_url}/admin`,
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
