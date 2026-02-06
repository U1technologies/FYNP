/**
 * FYNP API Endpoints
 * Centralized API endpoint definitions
 */

const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // User Endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    DELETE_ACCOUNT: '/user/account',
    PREFERENCES: '/user/preferences',
  },

  // Transaction Endpoints
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    GET: id => `/transactions/${id}`,
    UPDATE: id => `/transactions/${id}`,
    DELETE: id => `/transactions/${id}`,
    STATS: '/transactions/stats',
    EXPORT: '/transactions/export',
  },

  // Wallet Endpoints
  WALLETS: {
    LIST: '/wallets',
    CREATE: '/wallets',
    GET: id => `/wallets/${id}`,
    UPDATE: id => `/wallets/${id}`,
    DELETE: id => `/wallets/${id}`,
    BALANCE: id => `/wallets/${id}/balance`,
  },

  // Category Endpoints
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    UPDATE: id => `/categories/${id}`,
    DELETE: id => `/categories/${id}`,
  },

  // Dashboard Endpoints
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    RECENT_TRANSACTIONS: '/dashboard/recent-transactions',
    ANALYTICS: '/dashboard/analytics',
  },
};

export default API_ENDPOINTS;
