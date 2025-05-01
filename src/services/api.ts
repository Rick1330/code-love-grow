
import axios from 'axios';

// This would be your backend URL when deployed
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-url.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

export const projectAPI = {
  getAll: () => api.get('/projects'),
  create: (projectData: any) => api.post('/projects', projectData),
  update: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),
  delete: (id: string) => api.delete(`/projects/${id}`)
};

export const trackerAPI = {
  getEntries: (params?: any) => api.get('/tracker', { params }),
  addEntry: (entryData: TrackerEntry) => api.post('/tracker', entryData),
  getStats: () => api.get('/tracker/stats'),
  getStreak: () => api.get('/tracker/streak')
};

export const achievementAPI = {
  getAll: () => api.get('/achievements'),
  checkAchievements: () => api.post('/achievements/check')
};

// Types
export interface TrackerEntry {
  date: Date | string;
  hours: number;
  mood: number;
  languages?: { name: string; hours: number }[];
  project?: string;
  notes?: string;
}

export interface TrackerStats {
  totalHours: number;
  languageStats: { _id: string; hours: number }[];
  dailyAverage: { _id: string; hours: number; mood: number }[];
}

export interface StreakData {
  currentStreak: number;
  maxStreak: number;
}

export default api;
