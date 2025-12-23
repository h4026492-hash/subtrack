import apiClient from "./apiClient";
import { getToken } from "../auth/token";

export async function fetchSubscriptions() {
  const token = await getToken();

  const res = await apiClient.get("/subscriptions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
import type { Subscription } from "./types";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const res = await apiClient.get<Subscription[]>('/subscriptions');
  return res.data;
};

export const addSubscription = async (subscription: { name: string; amount: number; category?: string }) => {
  const res = await apiClient.post<Subscription>('/subscriptions', subscription);
  return res.data;
};

// Backwards-compatible alias: older UI expects createSubscription
export const createSubscription = addSubscription;

export const getSubscriptionInsight = async (id: number) => {
  const res = await apiClient.get(`/ai/subscription/${id}`);
  // API returns { insight }
  return res.data?.insight;
};

export async function getSubscriptionById(id: string) {
  const res = await apiClient.get(`/subscriptions/${id}`);
  return res.data;
}

