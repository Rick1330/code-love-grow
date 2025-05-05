import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login page or clear local storage
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export interface Project {
  _id?: string;
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'completed' | 'on hold' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'completed' | 'on hold' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  projectId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TrackerEntry {
  date: Date;
  hours: number;
  mood: number;
  languages: { name: string; hours: number }[];
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

// Projects API
export const projectsAPI = {
  getAll: () => axiosInstance.get<Project[]>('/api/projects'),
  get: (id: string) => axiosInstance.get<Project>(`/api/projects/${id}`),
  create: (data: Project) => axiosInstance.post<Project>('/api/projects', data),
  update: (id: string, data: Project) => axiosInstance.put<Project>(`/api/projects/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/api/projects/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: () => axiosInstance.get<Task[]>('/api/tasks'),
  get: (id: string) => axiosInstance.get<Task>(`/api/tasks/${id}`),
  create: (data: Task) => axiosInstance.post<Task>('/api/tasks', data),
  update: (id: string, data: Task) => axiosInstance.put<Task>(`/api/tasks/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/api/tasks/${id}`),
};

// Tracker API
export const trackerAPI = {
  getAll: () => axiosInstance.get<TrackerEntry[]>('/api/tracker'),
  create: (data: TrackerEntry) => axiosInstance.post<TrackerEntry>('/api/tracker', data),
  getStats: () => axiosInstance.get<TrackerStats>('/api/tracker/stats'),
  getStreak: () => axiosInstance.get<StreakData>('/api/tracker/streak'),
};

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    axiosInstance.post('/api/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    axiosInstance.post('/api/auth/login', data),
  
  logout: () => 
    axiosInstance.post('/api/auth/logout'),
  
  getMe: () => 
    axiosInstance.get('/api/auth/me'),
  
  googleLogin: (data: { token: string }) => 
    axiosInstance.post('/api/auth/google', data),
  
  forgotPassword: (data: { email: string }) =>
    axiosInstance.post('/api/auth/forgot-password', data),
};
