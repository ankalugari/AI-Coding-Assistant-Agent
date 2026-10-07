import api from './api';

export async function getProgress() {
  const response = await api.get(
    '/progress'
  );

  return response.data;
}

export async function getLearningStats() {
  const response = await api.get(
    '/progress/stats'
  );

  return response.data;
}

export async function getTopicProgress() {
  const response = await api.get(
    '/progress/topics'
  );

  return response.data;
}