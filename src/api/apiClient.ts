import axios from "axios";
import { getToken } from "../auth/token";

// For iOS simulator during development use localhost:8081 explicitly
export const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});


// Attach authorization header if token exists
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

export default apiClient;

