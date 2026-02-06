/**
 * FYNP Welcome Screen
 * Onboarding welcome with shield logo
 */

import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing, typography} from '../../theme';

const WelcomeScreen = ({navigation}) => {
  const handleContinue = () => {
    navigation.navigate('MobileNumber');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />

      <View style={styles.content}>
        {/* Logo/Shield Area */}
        <View style={styles.logoContainer}>
          <View style={styles.shieldBackground}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.fintech}>FINTECH</Text>
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to FYNP</Text>
          <Text style={styles.subtitle}>
            Track, understand, and grow your{'\n'}wealth — effortlessly
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue with Mobile Number</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> &{'\n'}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    justifyContent: 'space-between',
    paddingVertical: spacing['4xl'],
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shieldBackground: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },

  shieldIcon: {
    fontSize: 80,
  },

  fintech: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 2,
    marginTop: spacing.md,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.md,
  },

  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },

  buttonContainer: {
    alignItems: 'center',
  },

  continueButton: {
    backgroundColor: '#FF8C42',
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['2xl'],
    borderRadius: spacing.borderRadius.base,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  continueButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.white,
  },

  termsText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    opacity: 0.6,
  },

  termsLink: {
    color: colors.white,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
