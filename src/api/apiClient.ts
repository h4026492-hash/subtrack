import axios from "axios";
import { getSessionToken } from "../auth/session";

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

export default api;

