import apiClient from './apiClient';

export const getTotalSpend = async (): Promise<number> => {
  const res = await apiClient.get('/subscriptions/total');
  return res.data?.total ?? 0;
};

export const getDashboard = async () => {
  const [subsRes, totalRes] = await Promise.all([
    apiClient.get('/subscriptions'),
    apiClient.get('/subscriptions/total'),
  ]);

  return {
    subscriptions: subsRes.data ?? [],
    totalMonthly: totalRes.data?.total ?? 0,
  };
};
