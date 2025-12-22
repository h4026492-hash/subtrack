import apiClient from "./apiClient";

export async function login(email: string, password: string) {
  const res = await apiClient.post("/auth/login", { email, password });

  // normalize response: always return { token: string }
  if (typeof res.data === "string") {
    return { token: res.data };
  }

  return res.data;
}