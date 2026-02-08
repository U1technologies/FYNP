/**
 * FYNP Mobile Number Entry Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';
import { authService } from '../../services/authService';

const MobileNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetOTP = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      setLoading(true);

      // Call backend API to send OTP
      const response = await authService.sendOtp(phoneNumber);

      if (response.success) {
        // Navigate to OTP screen with phone number
        navigation.navigate('OTPVerification', { phoneNumber: `+91 ${phoneNumber}`, mobile: phoneNumber });
        Alert.alert('Success', 'OTP sent successfully to your mobile number');
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = text => {
    // Only allow numbers
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    setPhoneNumber(limited);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Content with Keyboard Handling */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Enter your mobile number</Text>
              <Text style={styles.subtitle}>We'll send an OTP to verify your number</Text>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <View style={styles.phoneInputWrapper}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>

                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={formatPhoneNumber}
                  placeholder="98765 43210"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoFocus
                />
              </View>

              {/* Security Message */}
              <View style={styles.securityMessage}>
                <Text style={styles.securityIcon}>🔒</Text>
                <Text style={styles.securityText}>
                  Your number is safe. No spam. Ever.
                </Text>
              </View>
            </View>

            {/* Get OTP Button */}
            <TouchableOpacity
              style={[
                styles.otpButton,
                (phoneNumber.length !== 10 || loading) && styles.otpButtonDisabled,
              ]}
              onPress={handleGetOTP}
              disabled={phoneNumber.length !== 10 || loading}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.otpButtonText}>Get OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },

  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 24,
    color: colors.white,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },

  titleSection: {
    marginBottom: spacing['4xl'],
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    opacity: 0.7,
  },

  inputContainer: {
    marginBottom: spacing['5xl'],
  },

  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    paddingBottom: spacing.md,
  },

  countryCode: {
    paddingRight: spacing.md,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: spacing.md,
  },

  countryCodeText: {
    fontSize: typography.fontSize.lg,
    color: colors.white,
    fontWeight: '500',
  },

  phoneInput: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    color: colors.white,
    fontWeight: '500',
    padding: 0,
  },

  securityMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },

  securityIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },

  securityText: {
    fontSize: typography.fontSize.sm,
    color: '#10B981',
    fontWeight: '500',
  },

  otpButton: {
    backgroundColor: '#FF8C42',
    paddingVertical: spacing.base,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
  },

  otpButtonDisabled: {
    opacity: 0.5,
  },

  otpButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.white,
  },
});

export default MobileNumberScreen;
