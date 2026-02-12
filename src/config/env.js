/**
 * FYNP Environment Configuration
 * Centralized access to environment variables
 */

import { API_URL, API_TIMEOUT, ENV, OTP_BYPASS } from '@env';

const config = {
  // API Configuration
  apiUrl: API_URL || 'http://localhost:5000/api/v1',
  apiTimeout: API_TIMEOUT || 30000,

  // Environment
  env: ENV || 'development',
  isDevelopment: ENV === 'development',
  isProduction: ENV === 'production',

  // OTP Bypass for Development (saves SMS costs)
  otpBypass: OTP_BYPASS === 'true',

  // App Configuration
  appName: 'FYNP',
  appVersion: '1.0.0',

  // Feature Flags (can be controlled via .env)
  features: {
    biometricAuth: true,
    darkMode: false,
    analytics: false,
  },
};

export default config;
