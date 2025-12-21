import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
  // Backend may return either a raw token string or an object like { token: string }
  const data = response.data;
  if (typeof data === "string") return data;
  if (data && typeof data.token === "string") return data.token;
  // Fallback to returning the full payload (caller should validate)
  return data;
};