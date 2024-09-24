import axios from 'axios';

// Create an Axios instance
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Store token in localStorage after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Availability APIs
export const getAvailability = () => api.get('/availability');
export const setAvailability = (data) => api.post('/availability', data);
export const deleteAvailabilitySlot = (id) => api.delete(`/availability/${id}`);

// Session APIs
export const createSession = (data) => api.post('/sessions', data);
export const getSessions = () => api.get('/sessions');
export const updateSession = (id, data) => api.put(`/sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);

// User APIs
export const getUsers = () => api.get('/users'); // Ensure you have this route in backend
