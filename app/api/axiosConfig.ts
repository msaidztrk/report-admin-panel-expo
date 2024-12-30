import axios from 'axios';
import useAuthStore from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: 'http://bcrain.site/api/mobile', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or use your state management
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    
    return config;
  },
  (error) => { 

    if (error.response?.status === 401) {
        // Token expired, clear authentication
        const { clearAuth } = useAuthStore.getState();
        clearAuth();
      } 
      
    return Promise.reject(error);
  }
);

export default axiosInstance;