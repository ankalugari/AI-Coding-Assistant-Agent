import api from './api';

export async function askAssistant(data) {
  const response = await api.post(
    '/ai/assistant',
    data
  );

  return response.data;
}

export async function analyzeProblem(data) {
  const response = await api.post(
    '/ai/analyze-problem',
    data
  );

  return response.data;
}

export async function generateHint(data) {
  const response = await api.post(
    '/ai/hint',
    data
  );

  return response.data;
}

export async function reviewCode(data) {
  const response = await api.post(
    '/ai/review',
    data
  );

  return response.data;
}

export async function debugCode(data) {
  const response = await api.post(
    '/ai/debug',
    data
  );

  return response.data;
}

export async function explainSolution(data) {
  const response = await api.post(
    '/ai/explain',
    data
  );

  return response.data;
}