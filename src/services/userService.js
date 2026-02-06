/**
 * FYNP User Service
 * User profile and preferences API calls
 */

import axiosInstance from './api/axiosInstance';
import API_ENDPOINTS from './api/apiEndpoints';

/**
 * Get user profile
 */
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch profile',
      error,
    };
  }
};

/**
 * Update user profile
 */
export const updateProfile = async updates => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      updates,
    );

    return {
      success: true,
      data: response.data,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update profile',
      error,
    };
  }
};

/**
 * Delete user account
 */
export const deleteAccount = async () => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT);

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete account',
      error,
    };
  }
};

/**
 * Get user preferences
 */
export const getPreferences = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.PREFERENCES);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch preferences',
      error,
    };
  }
};

/**
 * Update user preferences
 */
export const updatePreferences = async preferences => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USER.PREFERENCES,
      preferences,
    );

    return {
      success: true,
      data: response.data,
      message: 'Preferences updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update preferences',
      error,
    };
  }
};

/**
 * Get dashboard summary
 */
export const getDashboardSummary = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.SUMMARY);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch dashboard summary',
      error,
    };
  }
};

/**
 * Get recent transactions for dashboard
 */
export const getRecentTransactions = async (limit = 10) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD.RECENT_TRANSACTIONS,
      {
        params: {limit},
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch recent transactions',
      error,
    };
  }
};

/**
 * Get analytics data
 */
export const getAnalytics = async (params = {}) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.ANALYTICS, {
      params,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch analytics',
      error,
    };
  }
};

export const userService = {
  getProfile,
  updateProfile,
  deleteAccount,
  getPreferences,
  updatePreferences,
  getDashboardSummary,
  getRecentTransactions,
  getAnalytics,
};

export default userService;
