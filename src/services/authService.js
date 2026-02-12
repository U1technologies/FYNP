/**
 * FYNP Auth Service
 * Authentication API calls
 */

import axiosInstance from './api/axiosInstance';
import API_ENDPOINTS from './api/apiEndpoints';
import config from '../config/env';

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
      { email },
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

/**
 * Send OTP to mobile number
 */
export const sendOtp = async (mobile, loanType = null) => {
  try {
    // 🔥 DEV MODE: OTP BYPASS - Skip sending real SMS
    if (config.otpBypass) {
      console.log('🔥 DEV MODE: OTP Bypass Active - Skipping SMS send');
      console.log('💡 You can enter ANY 6-digit OTP to login');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      return {
        success: true,
        data: {
          message: 'OTP bypassed (DEV MODE)',
          mobile: mobile,
        },
        message: 'OTP sent successfully (DEV MODE - Enter any 6-digit code)',
      };
    }

    // 🔒 PRODUCTION MODE: Real OTP send
    const payload = { mobile };
    if (loanType) {
      payload.loanType = loanType;
    }

    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SEND_OTP, payload);

    return {
      success: true,
      data: response.data.data,
      message: 'OTP sent successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to send OTP',
      error,
    };
  }
};

/**
 * Verify OTP and login
 */
export const verifyOtp = async (mobile, otp, loanType = null) => {
  try {
    // 🔥 DEV MODE: OTP BYPASS - Any OTP works!
    if (config.otpBypass) {
      console.log('🔥 DEV MODE: OTP Bypass Active - Skipping real OTP verification');

      // Simulate API delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock success response
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            _id: 'mock-user-id',
            mobile: mobile,
            personal: {
              mobile: mobile,
            },
          },
        },
        message: 'OTP verified successfully (DEV MODE)',
      };
    }

    // 🔒 PRODUCTION MODE: Real OTP verification
    const payload = { mobile, otp };
    if (loanType) {
      payload.loanType = loanType;
    }

    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_OTP, payload);

    // Extract data from response
    const { token, refreshToken: refresh, data } = response.data;

    return {
      success: true,
      data: {
        token,
        refreshToken: refresh,
        user: data,
      },
      message: 'OTP verified successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'OTP verification failed',
      error,
    };
  }
};

/**
 * Get user profile
 */
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile');
    return {
      success: true,
      data: response.data.data,
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
 * Update personal profile
 * @param {Object} data - Personal details { firstName, lastName, email, dob, pan, address }
 */
export const updatePersonalProfile = async (data) => {
  try {
    const response = await axiosInstance.put('/user/profile/personal', data);
    return {
      success: true,
      data: response.data,
      message: 'Personal details updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update personal details',
      error,
    };
  }
};

/**
 * Update employment profile
 * @param {Object} data - Employment details
 */
export const updateEmploymentProfile = async (data) => {
  try {
    const response = await axiosInstance.put('/user/profile/employment', data);
    return {
      success: true,
      data: response.data,
      message: 'Employment details updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update employment details',
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
  sendOtp,
  verifyOtp,
  getProfile,
  updatePersonalProfile,
  updateEmploymentProfile,
};

export default authService;

