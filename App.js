/**
 * FYNP - AI-Powered Finance App
 * Main App Entry Point
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/store/authStore';
import { UserProvider } from './src/store/userStore';
import { TransactionProvider } from './src/store/transactionStore';
import { ThemeProvider } from './src/store/themeStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <UserProvider>
            <TransactionProvider>
              <ThemeProvider>
                <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />
                <AppNavigator />
              </ThemeProvider>
            </TransactionProvider>
          </UserProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
