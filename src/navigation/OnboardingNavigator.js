/**
 * FYNP Onboarding Navigator
 * Onboarding flow navigation
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import MobileNumberScreen from '../screens/Onboarding/MobileNumberScreen';
import OTPVerificationScreen from '../screens/Onboarding/OTPVerificationScreen';
import OnboardingCompleteScreen from '../screens/Onboarding/OnboardingCompleteScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
