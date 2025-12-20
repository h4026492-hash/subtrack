import apiClient from "./apiClient";
import type { Subscription } from "./types";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const res = await apiClient.get<Subscription[]>('/subscriptions');
  return res.data;
};

