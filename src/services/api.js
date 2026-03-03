import axios from 'axios';

// Base URL for backend API
const rawBaseUrl = import.meta.env.VITE_API_URL;
const apiBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : rawBaseUrl;

// Warn loudly in the browser console if the env var is missing or looks wrong
if (!apiBaseUrl) {
  console.error(
    '[API] VITE_API_URL is not set. All API calls will fail. ' +
    'Set VITE_API_URL to your backend origin, e.g. https://int-b.vercel.app'
  );
} else if (apiBaseUrl.endsWith('/api')) {
  console.warn(
    '[API] VITE_API_URL should be the backend ORIGIN only (e.g. https://int-b.vercel.app), ' +
    'not include the /api suffix. The code already appends /api.'
  );
}

// Create axios instance
const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling & logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config || {};

    // Helpful debug info in the browser console
    console.error('[API ERROR]', {
      method: config.method,
      url: config.baseURL ? `${config.baseURL}${config.url}` : config.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('admin_token');
      localStorage.removeItem('user');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
  setupAdmin: (adminData) => api.post('/auth/setup-admin', adminData),
};

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
  getStats: () => api.get('/contact/stats/overview'),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getFeatured: (limit) => api.get('/projects/featured', { params: { limit } }),
  getByCategory: (category, limit) => api.get(`/projects/category/${category}`, { params: { limit } }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
  like: (id) => api.post(`/projects/${id}/like`),
  getStats: () => api.get('/projects/stats/overview'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getContacts: (params) => api.get('/admin/contacts', { params }),
  updateContact: (id, contactData) => api.put(`/admin/contacts/${id}`, contactData),
  getProjects: (params) => api.get('/admin/projects', { params }),
  getStats: () => api.get('/admin/stats'),
  getActivity: (limit) => api.get('/admin/activity', { params: { limit } }),
};

// Portfolio API
export const portfolioAPI = {
  getAll: () => api.get('/portfolio'),
  create: (portfolioData) => api.post('/admin/portfolio', portfolioData),
  update: (id, portfolioData) => api.put(`/admin/portfolio/${id}`, portfolioData),
  delete: (id) => api.delete(`/admin/portfolio/${id}`),
  getSequence: () => api.get('/projects/sequence'),
  updateSequence: (sequences) => {
    console.log('portfolioAPI.updateSequence called with:', sequences);
    // Ensure sequences is properly formatted
    const payload = { sequences };
    console.log('Sending payload:', payload);
    return api.put('/projects/sequence', payload);
  },
  reorder: (projectIds) => api.post('/projects/reorder', { projectIds }),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  create: (serviceData) => api.post('/admin/services', serviceData),
  update: (id, serviceData) => api.put(`/admin/services/${id}`, serviceData),
  delete: (id) => api.delete(`/admin/services/${id}`),
};

// Slideshow API
export const slideshowAPI = {
  getAll: () => api.get('/slideshow', { 
    params: { 
      _t: Date.now() // Cache busting
    } 
  }),
  add: (imageData) => api.post('/admin/slideshow', imageData),
  delete: (index) => api.delete(`/admin/slideshow/${index}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api; 
export const BACKEND_URL = apiBaseUrl;
