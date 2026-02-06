/**
 * FYNP App Navigator
 * Main navigation controller
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '../store/authStore';
import OnboardingNavigator from './OnboardingNavigator';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import Loader from '../components/Loader';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated, loading} = useAuthStore();

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: true,
                headerTitle: 'Settings',
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
