import axios from "axios";
import { getToken } from "../auth/token";

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - axios config headers typing can be loose in RN
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

