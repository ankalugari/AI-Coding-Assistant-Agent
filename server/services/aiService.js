import api from './api';

export async function sendMessage(data) {
  const response = await api.post('/ai/chat', {
    message: data.message,
    intent:data.intent,
    problemId: data.problemId,
    code: data.code || '',
    language: data.language || 'Java',
  });

  return response.data;
}

export async function getChatHistory(problemId) {
  const response = await api.get(
    `/ai/history/${problemId}`
  );

  return response.data;
}

export async function deleteChatHistory(problemId) {
  const response = await api.delete(
    `/ai/history/${problemId}`
  );

  return response.data;
}
