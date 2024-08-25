import axios from 'axios';

// Base URL for API requests
const API_URL = 'https://sandra-portfolio.onrender.com/';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and attempt token renewal
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Flag to prevent infinite loop

      try {
        // Attempt to refresh the token
        const response = await api.post('/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        // Store the new token and update the Authorization header
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (err) {
        console.error('Token renewal failed:', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
