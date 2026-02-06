/**
 * FYNP User Store
 * User profile and preferences state management
 */

import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'en',
    notifications: true,
    darkMode: false,
  });
  const [loading, setLoading] = useState(false);

  const updateProfile = data => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...data,
    }));
  };

  const updatePreferences = updates => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      ...updates,
    }));
  };

  const clearUserData = () => {
    setProfile(null);
    setPreferences({
      currency: 'USD',
      language: 'en',
      notifications: true,
      darkMode: false,
    });
  };

  const value = {
    profile,
    preferences,
    loading,
    setLoading,
    updateProfile,
    updatePreferences,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserStore = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserStore must be used within UserProvider');
  }

  return context;
};

export default {UserProvider, useUserStore};
