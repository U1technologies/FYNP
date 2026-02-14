/**
 * FYNP Home Stack Navigator
 * Stack navigation for Home tab screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CreditCardsScreen from '../screens/CreditCards/CreditCardsScreen';
import CreditCardPreferencesScreen from '../screens/CreditCards/CreditCardPreferencesScreen';
import CreditCardLifestyleScreen from '../screens/CreditCards/CreditCardLifestyleScreen';
import CreditCardIncomeScreen from '../screens/CreditCards/CreditCardIncomeScreen';
import CreditCardSpendsScreen from '../screens/CreditCards/CreditCardSpendsScreen';
import CreditScoreScreen from '../screens/CreditScore/CreditScoreScreen';
import SelectLenderScreen from '../screens/PersonalLoans/SelectLenderScreen';
import KYCVerificationScreen from '../screens/PersonalLoans/KYCVerificationScreen';
import PersonalLoansScreen from '../screens/Loans/PersonalLoansScreen';
import LoanMarketplaceScreen from '../screens/Loans/LoanMarketplaceScreen';
import LoanConfigurationScreen from '../screens/Loans/LoanConfigurationScreen';
import LoanBasicDetailsScreen from '../screens/Loans/LoanBasicDetailsScreen';
import BusinessLoansScreen from '../screens/Loans/BusinessLoansScreen';
import BusinessLoanApplicationScreen from '../screens/Loans/BusinessLoanApplicationScreen';
import BusinessLoanApplicationSuccessScreen from '../screens/Loans/BusinessLoanApplicationSuccessScreen';
import LoanApplicationStatusScreen from '../screens/Loans/LoanApplicationStatusScreen';
import LoanComparisonScreen from '../screens/Loans/LoanComparisonScreen';
import HomeLoansScreen from '../screens/Loans/HomeLoansScreen';
import HomeLoanDetailsScreen from '../screens/Loans/HomeLoanDetailsScreen';
import HomeLoanApplicationScreen from '../screens/Loans/HomeLoanApplicationScreen';
import HomeLoanApplicationSuccessScreen from '../screens/Loans/HomeLoanApplicationSuccessScreen';
import EducationLoansScreen from '../screens/Loans/EducationLoansScreen';
import EducationLoanDetailsScreen from '../screens/Loans/EducationLoanDetailsScreen';
import EducationLoanApplicationScreen from '../screens/Loans/EducationLoanApplicationScreen';
import EducationLoanApplicationSuccessScreen from '../screens/Loans/EducationLoanApplicationSuccessScreen';
import LoanDetailsScreen from '../screens/Loans/LoanDetailsScreen';
import EMICalculatorScreen from '../screens/Tools/EMICalculatorScreen';
import LoanEligibilityScreen from '../screens/Tools/LoanEligibilityScreen';
import TaxSaverScreen from '../screens/Tools/TaxSaverScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="PersonalLoans" component={PersonalLoansScreen} />
      <Stack.Screen name="LoanMarketplace" component={LoanMarketplaceScreen} />
      <Stack.Screen name="LoanConfiguration" component={LoanConfigurationScreen} />
      <Stack.Screen name="LoanBasicDetails" component={LoanBasicDetailsScreen} />
      <Stack.Screen name="BusinessLoans" component={BusinessLoansScreen} />
      <Stack.Screen name="BusinessLoanApplication" component={BusinessLoanApplicationScreen} />
      <Stack.Screen name="BusinessLoanApplicationSuccess" component={BusinessLoanApplicationSuccessScreen} />
      <Stack.Screen name="LoanApplicationStatus" component={LoanApplicationStatusScreen} />
      <Stack.Screen name="LoanComparison" component={LoanComparisonScreen} />
      <Stack.Screen name="HomeLoans" component={HomeLoansScreen} />
      <Stack.Screen name="HomeLoanDetails" component={HomeLoanDetailsScreen} />
      <Stack.Screen name="HomeLoanApplication" component={HomeLoanApplicationScreen} />
      <Stack.Screen name="HomeLoanApplicationSuccess" component={HomeLoanApplicationSuccessScreen} />
      <Stack.Screen name="EducationLoans" component={EducationLoansScreen} />
      <Stack.Screen name="EducationLoanDetails" component={EducationLoanDetailsScreen} />
      <Stack.Screen name="EducationLoanApplication" component={EducationLoanApplicationScreen} />
      <Stack.Screen name="EducationLoanApplicationSuccess" component={EducationLoanApplicationSuccessScreen} />
      <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
      <Stack.Screen name="CreditCardPreferences" component={CreditCardPreferencesScreen} />
      <Stack.Screen name="CreditCardLifestyle" component={CreditCardLifestyleScreen} />
      <Stack.Screen name="CreditCardIncome" component={CreditCardIncomeScreen} />
      <Stack.Screen name="CreditCardSpends" component={CreditCardSpendsScreen} />
      <Stack.Screen name="CreditCards" component={CreditCardsScreen} />
      <Stack.Screen name="CreditScore" component={CreditScoreScreen} />
      <Stack.Screen name="SelectLender" component={SelectLenderScreen} />
      <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
      <Stack.Screen name="EMICalculator" component={EMICalculatorScreen} />
      <Stack.Screen name="LoanEligibility" component={LoanEligibilityScreen} />
      <Stack.Screen name="TaxSaver" component={TaxSaverScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
