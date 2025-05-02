
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
  delete: (id: string) => api.delete(`/projects/${id}`),
  getMembers: (id: string) => api.get(`/projects/${id}/members`),
  addMember: (id: string, email: string, role: string) => api.post(`/projects/${id}/members`, { email, role }),
  removeMember: (id: string, userId: string) => api.delete(`/projects/${id}/members/${userId}`)
};

export const trackerAPI = {
  getEntries: (params?: any) => api.get('/tracker', { params }),
  addEntry: (entryData: TrackerEntry) => api.post('/tracker', entryData),
  getStats: () => api.get('/tracker/stats'),
  getStreak: () => api.get('/tracker/streak')
};

export const taskAPI = {
  getAll: (filters?: TaskFilters) => api.get('/tasks', { params: filters }),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (taskData: TaskCreate) => api.post('/tasks', taskData),
  update: (id: string, taskData: Partial<TaskCreate>) => api.put(`/tasks/${id}`, taskData),
  delete: (id: string) => api.delete(`/tasks/${id}`),
  assignTask: (id: string, userId: string) => api.post(`/tasks/${id}/assign`, { userId }),
  trackIssue: (taskId: string, issueData: IssueCreate) => api.post(`/tasks/${taskId}/issues`, issueData),
  getIssues: (taskId: string) => api.get(`/tasks/${taskId}/issues`)
};

export const teamAPI = {
  getMembers: () => api.get('/team/members'),
  invite: (email: string, role: string) => api.post('/team/invite', { email, role }),
  removeMember: (id: string) => api.delete(`/team/members/${id}`)
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getSettings: () => api.get('/notifications/settings'),
  updateSettings: (settings: NotificationSettings) => api.put('/notifications/settings', settings)
};

export const scheduleAPI = {
  getUserSchedule: (userId?: string) => api.get('/schedules', { params: { userId } }),
  updateSchedule: (scheduleData: ScheduleUpdate) => api.put('/schedules', scheduleData),
  getAvailability: (teamIds: string[]) => api.get('/schedules/availability', { params: { teamIds } })
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

export interface TaskCreate {
  title: string;
  description?: string;
  project?: string;
  dueDate?: string | Date;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  tags?: string[];
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

export interface IssueCreate {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  taskAssigned: boolean;
  taskUpdated: boolean;
  projectUpdated: boolean;
  issueReported: boolean;
  deadlineApproaching: boolean;
}

export interface ScheduleUpdate {
  userId?: string;
  workHours: {
    monday: { start: string; end: string; isOff: boolean };
    tuesday: { start: string; end: string; isOff: boolean };
    wednesday: { start: string; end: string; isOff: boolean };
    thursday: { start: string; end: string; isOff: boolean };
    friday: { start: string; end: string; isOff: boolean };
    saturday: { start: string; end: string; isOff: boolean };
    sunday: { start: string; end: string; isOff: boolean };
  };
  unavailableDates?: { start: Date; end: Date; reason: string }[];
}

export default api;
