/**
 * FYNP Auth Service
 * Authentication API calls
 */

import axiosInstance from './api/axiosInstance';
import API_ENDPOINTS from './api/apiEndpoints';

/**
 * Login user
 */
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Login failed',
      error,
    };
  }
};

/**
 * Signup user
 */
export const signup = async userData => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.SIGNUP,
      userData,
    );

    return {
      success: true,
      data: response.data,
      message: 'Signup successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Signup failed',
      error,
    };
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);

    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Logout failed',
      error,
    };
  }
};

/**
 * Forgot password
 */
export const forgotPassword = async email => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      {email},
    );

    return {
      success: true,
      data: response.data,
      message: 'Password reset email sent',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to send reset email',
      error,
    };
  }
};

/**
 * Reset password
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      {
        token,
        password: newPassword,
      },
    );

    return {
      success: true,
      data: response.data,
      message: 'Password reset successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Password reset failed',
      error,
    };
  }
};

/**
 * Change password
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      {
        currentPassword,
        newPassword,
      },
    );

    return {
      success: true,
      data: response.data,
      message: 'Password changed successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Password change failed',
      error,
    };
  }
};

/**
 * Refresh auth token
 */
export const refreshToken = async refreshTokenValue => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken: refreshTokenValue,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Token refresh failed',
      error,
    };
  }
};

export const authService = {
  login,
  signup,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken,
};

export default authService;
