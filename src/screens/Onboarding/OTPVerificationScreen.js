/**
 * FYNP OTP Verification Screen
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

const OTPVerificationScreen = ({ navigation, route }) => {
  const { phoneNumber, mobile } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Changed to 6 digits
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    // Check if value is a full OTP (pasted or auto-filled)
    if (value && value.length === 6 && /^\d+$/.test(value)) {
      const newOtp = value.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();

      // Optional: Auto-submit
      setTimeout(() => {
        handleVerify(newOtp.join(''));
      }, 100);
      return;
    }

    // Only allow numbers for single digit
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    // Handle single char input
    if (value.length > 1) {
      // If length > 1 but not 6, just take the last char (standard behavior)
      // or handle partial paste if needed. 
      // For simple typing, usually value is 1 char.
      // If pasting "123", we might want to handle it.
      const chars = value.split('');
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);

      // Focus local next
      const nextIndex = Math.min(index + chars.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpValue = null) => {
    const otpCode = typeof otpValue === 'string' ? otpValue : otp.join('');

    if (otpCode.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter the complete 6-digit OTP');
      return;
    }

    try {
      setLoading(true);

      // Call backend API to verify OTP
      const response = await authService.verifyOtp(mobile, otpCode);

      if (response.success) {
        // Extract data from response
        const { token, refreshToken, user } = response.data;

        // Login user with token and refresh token
        await login(token, user, refreshToken);

        // Show success message
        if (Platform.OS === 'android') {
          ToastAndroid.show('OTP Verified Successfully!', ToastAndroid.SHORT);
        } else {
          Alert.alert('Success', 'OTP Verified Successfully!');
        }

        // Navigation will happen automatically when isAuthenticated becomes true
      } else {
        Alert.alert('Error', response.message || 'Invalid OTP. Please try again.');
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (canResend) {
      try {
        setLoading(true);
        const response = await authService.sendOtp(mobile);

        if (response.success) {
          setTimer(120);
          setCanResend(false);
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');
        } else {
          Alert.alert('Error', response.message || 'Failed to resend OTP');
        }
      } catch (error) {
        console.error('Resend OTP error:', error);
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditNumber = () => {
    navigation.goBack();
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
              <Text style={styles.title}>Verify your number</Text>
              <View style={styles.phoneNumberContainer}>
                <Text style={styles.subtitle}>
                  Enter the 6-digit code sent to{'\n'}
                  <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                </Text>
                <TouchableOpacity onPress={handleEditNumber}>
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpBox,
                    digit && styles.otpBoxFilled,
                  ]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6} // Allow full paste
                  autoFocus={index === 0}
                  textContentType="oneTimeCode" // iOS Auto-fill
                  autoComplete="sms-otp" // Android Auto-fill
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              <View style={styles.timerWrapper}>
                <Text style={styles.timerIcon}>⏱️</Text>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>

              <TouchableOpacity
                onPress={handleResend}
                disabled={!canResend || loading}
                style={styles.resendButton}>
                <Text style={[styles.resendText, (!canResend || loading) && styles.resendTextDisabled]}>
                  Resend SMS
                </Text>
              </TouchableOpacity>
            </View>

            {/* Security Badge */}
            <View style={styles.securityBadge}>
              <Text style={styles.securityIcon}>🔒</Text>
              <Text style={styles.securityText}>
                Secure authentication • Encrypted
              </Text>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                (otp.join('').length !== 6 || loading) && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerify}
              disabled={otp.join('').length !== 6 || loading}>
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.verifyButtonText}>Verify & Proceed</Text>
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
    marginBottom: spacing.md,
  },

  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: 24,
  },

  phoneNumber: {
    color: colors.white,
    fontWeight: '600',
  },

  editIcon: {
    fontSize: 16,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing['3xl'],
  },

  otpBox: {
    width: 50,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: spacing.borderRadius.base,
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  otpBoxFilled: {
    borderColor: '#FF8C42',
    backgroundColor: 'rgba(255, 140, 66, 0.1)',
  },

  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['5xl'],
  },

  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timerIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },

  timerText: {
    fontSize: typography.fontSize.base,
    color: '#FF8C42',
    fontWeight: '600',
  },

  resendButton: {
    padding: spacing.sm,
  },

  resendText: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    fontWeight: '500',
  },

  resendTextDisabled: {
    opacity: 0.3,
  },

  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['3xl'],
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

  verifyButton: {
    backgroundColor: '#FF8C42',
    paddingVertical: spacing.base,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
  },

  verifyButtonDisabled: {
    opacity: 0.5,
  },

  verifyButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.white,
  },
});

export default OTPVerificationScreen;
