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
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
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

  // Loan Endpoints
  LOANS: {
    CREATE: '/loans/applications',
    LIST: '/loans/applications',
    GET: id => `/loans/applications/${id}`,
    STATUS: id => `/loans/applications/${id}/status`,
    DELETE: id => `/loans/applications/${id}`,
    SAVE_DETAILS: id => `/loans/applications/${id}/details`,
    UPLOAD_DOCUMENTS: id => `/loans/applications/${id}/documents`,
    SUBMIT: id => `/loans/applications/${id}/submit`,
  },
};

export default API_ENDPOINTS;
