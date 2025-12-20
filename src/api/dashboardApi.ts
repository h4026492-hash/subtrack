import apiClient from './apiClient';

export const getTotalSpend = async (): Promise<number> => {
  const res = await apiClient.get('/subscriptions/total');
  return res.data?.total ?? 0;
};
