import axios from './axios';
import { useAdminAuth } from '@/context/AdminAuth';



export const useAdminApi = () => {
  const { token, logout } = useAdminAuth();

  // attach token on every request
  adminApi.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(base_url)
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
