/**
 * FYNP Auth Store
 * Global authentication state management using React Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEYS } from '../config/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
      const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEYS.USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (authToken, userData, refreshTokenValue = null) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, authToken);
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEYS.USER,
        JSON.stringify(userData),
      );

      if (refreshTokenValue) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshTokenValue);
      }

      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const updateUser = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEYS.USER,
        JSON.stringify(updatedUser),
      );
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthStore = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthStore must be used within AuthProvider');
  }

  return context;
};

export default { AuthProvider, useAuthStore };
