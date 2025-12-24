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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

