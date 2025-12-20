import apiClient from './apiClient';

export const getAiInsight = async (): Promise<string> => {
  const res = await apiClient.get('/ai/insight');
  // Support response either { insight: string } or a plain string
  const data = res.data;
  if (typeof data === 'string') return data;
  return data?.insight ?? '';
};
