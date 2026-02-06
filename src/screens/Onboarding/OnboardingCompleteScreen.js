/**
 * FYNP Onboarding Complete Screen (Dummy)
 * Placeholder for next screen - will be replaced with actual design
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing, typography} from '../../theme';
import {useAuthStore} from '../../store/authStore';

const OnboardingCompleteScreen = ({navigation}) => {
  const {login} = useAuthStore();

  const handleContinue = async () => {
    // Simulate login (mark user as authenticated)
    await login('dummy_token', {
      name: 'Test User',
      email: 'user@fynp.com',
      phone: '+91 98765 43210',
    });
    // Navigation will automatically switch to Main app flow
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✅</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verification Successful!</Text>
        <Text style={styles.subtitle}>
          Your mobile number has been verified successfully
        </Text>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🎉 Welcome to FYNP!{'\n\n'}
            This is a placeholder screen.{'\n'}
            Your next screen design will be added here.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          (This will take you to the main app)
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    marginBottom: spacing['3xl'],
  },

  icon: {
    fontSize: 80,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing['4xl'],
  },

  infoBox: {
    backgroundColor: 'rgba(255, 140, 66, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 66, 0.3)',
    borderRadius: spacing.borderRadius.base,
    padding: spacing.xl,
    marginBottom: spacing['4xl'],
    width: '100%',
  },

  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 24,
  },

  continueButton: {
    backgroundColor: '#FF8C42',
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['3xl'],
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

  note: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    opacity: 0.5,
  },
});

export default OnboardingCompleteScreen;
