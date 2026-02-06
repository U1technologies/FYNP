/**
 * FYNP Application Constants
 * App-wide constant values
 */

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer',
};

export const TRANSACTION_CATEGORIES = {
  // Income Categories
  SALARY: 'salary',
  FREELANCE: 'freelance',
  INVESTMENT: 'investment',
  OTHER_INCOME: 'other_income',

  // Expense Categories
  FOOD: 'food',
  TRANSPORT: 'transport',
  SHOPPING: 'shopping',
  BILLS: 'bills',
  ENTERTAINMENT: 'entertainment',
  HEALTH: 'health',
  EDUCATION: 'education',
  OTHER_EXPENSE: 'other_expense',
};

export const WALLET_TYPES = {
  BANK: 'bank',
  CASH: 'cash',
  CREDIT_CARD: 'credit_card',
  DIGITAL: 'digital',
};

export const AUTH_STORAGE_KEYS = {
  TOKEN: '@fynp_auth_token',
  USER: '@fynp_user',
  REFRESH_TOKEN: '@fynp_refresh_token',
  BIOMETRIC_ENABLED: '@fynp_biometric_enabled',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
};

export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
  DECIMAL_PLACES: 2,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  TRANSACTION_ADDED: 'Transaction added successfully!',
};

export const ROUTES = {
  // Auth Routes
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',

  // App Routes
  DASHBOARD: 'Dashboard',
  TRANSACTIONS: 'Transactions',
  WALLET: 'Wallet',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',

  // Navigator Routes
  AUTH_NAVIGATOR: 'AuthNavigator',
  APP_NAVIGATOR: 'AppNavigator',
  TAB_NAVIGATOR: 'TabNavigator',
};

export default {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
  WALLET_TYPES,
  AUTH_STORAGE_KEYS,
  PAGINATION,
  VALIDATION_RULES,
  DATE_FORMATS,
  CURRENCY,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
};
