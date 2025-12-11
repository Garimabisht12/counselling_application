import axios from 'axios';
import { useStudentAuth } from '@/context/StudentAuth';

const base_url = import.meta.env.VITE_SOME_KEY ||'http://localhost:5000';
/* --------------------------------------------------
   One shared Axios instance for all student calls
   -------------------------------------------------- */
const stuApi = axios.create({
  baseURL:  `${base_url}/api/v1`,   // adjust if backend URL differs
});

/* --------------------------------------------------
   React hook that injects the JWT on every request
   -------------------------------------------------- */
export const useStuApi = () => {
  const { token, logout } = useStudentAuth();

  
  // remove old interceptors to avoid duplicates
stuApi.interceptors.request.handlers = [];
  stuApi.interceptors.response.handlers = [];


  /* attach token before each request */
  stuApi.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  /* auto‑logout on 401 (token expired / removed) */
  stuApi.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) logout();
      return Promise.reject(err);
    }
  );

  return stuApi;
};
