import apiClient from './apiClient.js';

export const getAiInsight = async (): Promise<string> => {
  const res = await apiClient.get('/ai/insight');
  // Support response either { insight: string } or a plain string
  const data = res.data;
  if (typeof data === 'string') return data;
  return data?.insight ?? '';
};

export const getSubscriptionInsight = async (id: number): Promise<string> => {
  const res = await apiClient.get(`/ai/subscription/${id}`);
  return res.data?.insight ?? '';
};

export const getAiPrediction = async (): Promise<string> => {
  const res = await apiClient.get('/ai/prediction');
  return res.data?.prediction ?? '';
};

export const getMonthlyStats = async (): Promise<number[]> => {
  const res = await apiClient.get('/subscriptions/stats/monthly');
  return res.data ?? [];
};

export const askAi = async (prompt: string): Promise<string> => {
  const res = await apiClient.post('/ai/chat', { prompt });
  // Support both { reply } and plain text
  const data = res.data;
  if (!data) return '';
  if (typeof data === 'string') return data;
  return data?.reply ?? data?.answer ?? '';
};
