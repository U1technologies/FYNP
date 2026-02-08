/**
 * FYNP Tab Navigator
 * Bottom tab navigation for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PieChart, Tag, User } from 'lucide-react-native';
import HomeStackNavigator from './HomeStackNavigator';
import LoanApplicationStatusScreen from '../screens/Loans/LoanApplicationStatusScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import OffersScreen from '../screens/Offers/OffersScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={LoanApplicationStatusScreen}
        options={{
          tabBarLabel: 'Status',
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarLabel: 'Offers',
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
