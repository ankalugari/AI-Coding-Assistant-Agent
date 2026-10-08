import api from './api';

export async function sendMessage(data) {
  const response = await api.post('/ai/chat', data);

  return response.data;
}

export async function getChatHistory(problemId) {
  const response = await api.get(`/ai/history/${problemId}`);

  return response.data;
}