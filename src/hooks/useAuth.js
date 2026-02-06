/**
 * FYNP useAuth Hook
 * Authentication state and operations
 */

import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_STORAGE_KEYS} from '../config/constants';
import {authService} from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Check if user is already logged in on mount
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check authentication status from storage
   */
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
      const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error checking auth status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(email, password);

      if (response.success) {
        const {token: authToken, user: userData} = response.data;

        // Store in AsyncStorage
        await AsyncStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, authToken);
        await AsyncStorage.setItem(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(userData),
        );

        // Update state
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);

        return {success: true};
      }

      return {success: false, message: response.message};
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return {success: false, message: err.message};
    } finally {
      setLoading(false);
    }
  };

  /**
   * Signup user
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.signup(userData);

      if (response.success) {
        const {token: authToken, user: newUser} = response.data;

        // Store in AsyncStorage
        await AsyncStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, authToken);
        await AsyncStorage.setItem(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(newUser),
        );

        // Update state
        setToken(authToken);
        setUser(newUser);
        setIsAuthenticated(true);

        return {success: true};
      }

      return {success: false, message: response.message};
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      return {success: false, message: err.message};
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);

      // Clear AsyncStorage
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

      // Clear state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);

      const updatedUser = {...user, ...updates};

      await AsyncStorage.setItem(
        AUTH_STORAGE_KEYS.USER,
        JSON.stringify(updatedUser),
      );

      setUser(updatedUser);

      return {success: true};
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.message);
      return {success: false, message: err.message};
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    checkAuthStatus,
  };
};

export default useAuth;
