import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Agregar token al header de cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Autenticación
export const authService = {
  register: (email, password, name, country, genre) =>
    api.post('/auth/register', { email, password, name, country, genre }),
  login: (email, password) =>
    api.post('/auth/login', { email, password })
};

// Perfiles de DJ
export const profileService = {
  getAllProfiles: () => api.get('/profiles'),
  getProfileById: (id) => api.get(`/profiles/${id}`),
  getMyProfile: () => api.get('/profiles/me'),
  createProfile: (formData) =>
    api.post('/profiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  updateProfile: (id, formData) =>
    api.put(`/profiles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteProfile: (id) =>
    api.delete(`/profiles/${id}`)
};

export default api;
