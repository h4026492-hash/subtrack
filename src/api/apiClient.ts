import axios from "axios";
import { getSessionToken } from "../auth/session";
import { clearToken } from "../auth/token";
import { router } from "expo-router";

export const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) {
    // attach token synchronously from in-memory session
    // @ts-ignore - augmenting headers
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Automatic logout on 401 to avoid stuck states
    if (err?.response?.status === 401) {
      try {
        await clearToken();
      } catch (e) {
        // ignore
      }
      try {
        router.replace('/login');
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(err);
  }
);

export default api;

