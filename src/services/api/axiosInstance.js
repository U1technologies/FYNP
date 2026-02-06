/**
 * FYNP Axios Instance
 * Configured HTTP client with interceptors
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/env';
import {AUTH_STORAGE_KEYS, ERROR_MESSAGES} from '../../config/constants';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * Attach auth token to all requests
 */
axiosInstance.interceptors.request.use(
  async requestConfig => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (config.isDevelopment) {
        console.log('API Request:', {
          method: requestConfig.method,
          url: requestConfig.url,
          data: requestConfig.data,
        });
      }

      return requestConfig;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return requestConfig;
    }
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
axiosInstance.interceptors.response.use(
  response => {
    // Log response in development
    if (config.isDevelopment) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Log error in development
    if (config.isDevelopment) {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    // Handle specific error codes
    if (error.response) {
      const {status} = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
          await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.USER);

          // You can emit an event here to redirect to login screen
          // For now, we'll just reject with a custom error
          return Promise.reject({
            message: ERROR_MESSAGES.UNAUTHORIZED,
            status: 401,
          });

        case 403:
          // Forbidden
          return Promise.reject({
            message: 'You do not have permission to perform this action',
            status: 403,
          });

        case 404:
          // Not found
          return Promise.reject({
            message: 'The requested resource was not found',
            status: 404,
          });

        case 422:
          // Validation error
          return Promise.reject({
            message: ERROR_MESSAGES.VALIDATION_ERROR,
            status: 422,
            errors: error.response.data.errors || {},
          });

        case 500:
        case 502:
        case 503:
          // Server errors
          return Promise.reject({
            message: ERROR_MESSAGES.SERVER_ERROR,
            status,
          });

        default:
          return Promise.reject({
            message: error.response.data.message || ERROR_MESSAGES.UNKNOWN_ERROR,
            status,
          });
      }
    }

    // Network error
    if (!error.response && error.message === 'Network Error') {
      return Promise.reject({
        message: ERROR_MESSAGES.NETWORK_ERROR,
        isNetworkError: true,
      });
    }

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timeout. Please try again.',
        isTimeout: true,
      });
    }

    // Unknown error
    return Promise.reject({
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      originalError: error,
    });
  },
);

export default axiosInstance;
