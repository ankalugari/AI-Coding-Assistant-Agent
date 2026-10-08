import api from './api';

export async function runCode(data) {
  const response = await api.post('/code/run', data);

  return response.data;
}