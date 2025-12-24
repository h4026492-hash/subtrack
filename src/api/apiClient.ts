import axios from "axios";
import { getToken } from "../auth/token";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
export default api;

