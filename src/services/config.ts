
import axios from 'axios';

// This should be updated to your actual backend URL when deployed
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.tssk-manager.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Add interceptor to add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Add response interceptor for errors
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // You could redirect to login here
    }
    
    return Promise.reject(error);
  }
);

export default api;
