import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.31.158:9876', // Replace with your API base URL
  // timeout: 10000, // Optional timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!['/login', '/signup'].includes(config.url)) {
      try {
        const token = await EncryptedStorage.getItem('token');
        console.log('Token retrieved:', token);
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log('No token found. User might need to log in.');
          // Optionally redirect to login or handle unauthenticated state here
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
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
    // console.log('Response received:', response.data);
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid request');
          break;
        case 401:
          console.error('Unauthorized:', data.message || 'Authentication failed');
          try {
            await EncryptedStorage.removeItem('token'); // Clear token
            console.log('Token cleared. Redirecting to login...');
            // Add your navigation logic to redirect to the login screen
          } catch (storageError) {
            console.error('Error clearing token:', storageError);
          }
          break;
        case 403:
          console.error('Forbidden:', data.message || 'You do not have access');
          break;
        case 404:
          console.error('Not Found:', data.message || 'Resource not found');
          break;
        case 500:
          console.error('Internal Server Error:', data.message || 'Server error');
          break;
        case 503:
          console.error('Service Unavailable:', data.message || 'Try again later');
          break;
        default:
          console.error(`Error ${status}:`, data.message || 'An unknown error occurred');
          break;
      }
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject({
      status: error.response?.status || 'Network/Request Error',
      message: error.response?.data?.message || error.message || 'An unknown error occurred',
    });
  }
);


export default axiosInstance;
