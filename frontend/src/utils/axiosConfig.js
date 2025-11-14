import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jobverse-backend-fm05.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials (cookies) with requests
  credentials: 'include' // This is important for CORS with credentials
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Axios Request Interceptor - Token:', token ? 'Token exists' : 'No token found');
    console.log('Request URL:', config.url);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set with token');
    } else {
      console.warn('No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized - Possible issues:', {
        hasToken: !!localStorage.getItem('token'),
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers
      });
      // Optionally redirect to login page or show a login modal
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
