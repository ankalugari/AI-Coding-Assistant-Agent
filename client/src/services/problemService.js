import api from './api';

export async function getProblems() {
  const response = await api.get('/problems');

  return response.data;
}

export async function getProblem(id) {
  const response = await api.get(`/problems/${id}`);

  return response.data;
}
