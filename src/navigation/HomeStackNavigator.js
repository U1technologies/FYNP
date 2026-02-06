/**
 * FYNP Home Stack Navigator
 * Stack navigation for Home tab screens
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CreditCardsScreen from '../screens/CreditCards/CreditCardsScreen';
import SelectLenderScreen from '../screens/PersonalLoans/SelectLenderScreen';
import LoanDetailsScreen from '../screens/PersonalLoans/LoanDetailsScreen';
import KYCVerificationScreen from '../screens/PersonalLoans/KYCVerificationScreen';
import LoanMarketplaceScreen from '../screens/Loans/LoanMarketplaceScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="LoanMarketplace" component={LoanMarketplaceScreen} />
      <Stack.Screen name="CreditCards" component={CreditCardsScreen} />
      <Stack.Screen name="SelectLender" component={SelectLenderScreen} />
      <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
      <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
