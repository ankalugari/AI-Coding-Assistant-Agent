import api from './api';

export async function registerUser(data) {
  const response = await api.post('/auth/register', data);

  return response.data;
}

export async function loginUser(data) {
  const response = await api.post('/auth/login', data);

  if (response.data.token) {
    localStorage.setItem(
      'token',
      response.data.token
    );
  }

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me');

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem('token');
}