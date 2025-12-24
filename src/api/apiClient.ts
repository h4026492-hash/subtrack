import axios from "axios";
import { getToken } from "../auth/token";

const api = axios.create({
  baseURL: "http://192.168.1.54:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  // Do not attach token for auth endpoints (login/register)
  if (token && !config.url?.startsWith("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

