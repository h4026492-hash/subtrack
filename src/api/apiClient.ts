import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "../auth/token";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Attach authorization header if token exists
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // ignore
  }
  return config;
});

export default apiClient;

