
import axios from 'axios';
import api from './config';

// Auth API
export const authAPI = {
  register: (userData: RegisterData) => api.post('/auth/register', userData),
  login: (credentials: LoginData) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  googleLogin: (tokenData: SocialLoginData) => api.post('/auth/google', tokenData),
  appleLogin: (tokenData: SocialLoginData) => api.post('/auth/apple', tokenData),
  microsoftLogin: (tokenData: SocialLoginData) => api.post('/auth/microsoft', tokenData)
};

// Projects API
export const projectAPI = {
  getAll: () => api.get('/projects'),
  create: (projectData: ProjectCreate) => api.post('/projects', projectData),
  update: (id: string, projectData: Partial<ProjectCreate>) => api.put(`/projects/${id}`, projectData),
  delete: (id: string) => api.delete(`/projects/${id}`)
};

// Tracker API
export const trackerAPI = {
  getEntries: (params?: TrackerFilters) => api.get('/tracker', { params }),
  addEntry: (entryData: TrackerEntry) => api.post('/tracker', entryData),
  getStats: () => api.get('/tracker/stats'),
  getStreak: () => api.get('/tracker/streak')
};

// Task API
export const taskAPI = {
  getAll: (filters?: TaskFilters) => api.get('/tasks', { params: filters }),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (taskData: TaskCreate) => api.post('/tasks', taskData),
  update: (id: string, taskData: Partial<TaskCreate>) => api.put(`/tasks/${id}`, taskData),
  delete: (id: string) => api.delete(`/tasks/${id}`)
};

// Achievement API
export const achievementAPI = {
  getAll: () => api.get('/achievements'),
  checkNew: () => api.post('/achievements/check')
};

// User API
export const userAPI = {
  updateProfile: (profileData: ProfileUpdate) => api.put('/users/profile', profileData),
  updateSettings: (settingsData: SettingsUpdate) => api.put('/users/settings', settingsData)
};

// Types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SocialLoginData {
  token: string;
}

export interface ProfileUpdate {
  name?: string;
  avatar?: string;
}

export interface SettingsUpdate {
  theme?: 'light' | 'dark';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export interface ProjectCreate {
  title: string;
  description: string;
  deadline?: string | Date;
  tags?: string[];
}

export interface TrackerEntry {
  date: Date | string;
  hours: number;
  mood: number;
  languages?: { name: string; hours: number }[];
  project?: string;
  notes?: string;
}

export interface TrackerFilters {
  startDate?: string;
  endDate?: string;
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

export interface TaskCreate {
  title: string;
  description?: string;
  project?: string;
  dueDate?: string | Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  project?: string;
  assignedTo?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export default api;
