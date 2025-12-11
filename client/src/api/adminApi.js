import axios from "axios";
import { useAdminAuth } from "@/context/AdminAuth";
const dotenv = require('dotenv');
const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";
dotenv.config();
const adminApi = axios.create({
  baseURL: `${base_url}/api/v1/admin`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors should be added only once
let isInterceptorAdded = false;

export const useAdminApi = () => {
  const { token, logout } = useAdminAuth();

  if (!isInterceptorAdded) {
    // Attach token on every request
    adminApi.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Optional: auto-logout on 401
    adminApi.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) logout();
        return Promise.reject(err);
      }
    );

    isInterceptorAdded = true;
  }

  return adminApi;
};
