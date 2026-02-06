/**
 * FYNP Forgot Password Screen
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authService} from '../../services/authService';
import {validateEmail, validateRequired} from '../../utils/validators';
import {spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validate = () => {
    if (!validateRequired(email)) {
      setError('Email is required');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await authService.forgotPassword(email);

      if (response.success) {
        setEmailSent(true);
        Alert.alert(
          'Success',
          'Password reset instructions have been sent to your email.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        );
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Sending reset instructions..." />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.flex1}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={globalStyles.heading1}>Forgot Password?</Text>
            <Text style={[globalStyles.body, styles.subtitle]}>
              Enter your email address and we'll send you instructions to reset
              your password.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (error) {
                  setError('');
                }
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={error}
            />

            <Button
              title="Send Reset Instructions"
              onPress={handleResetPassword}
              fullWidth
              style={styles.resetButton}
            />

            <Button
              title="Back to Login"
              variant="outline"
              onPress={() => navigation.navigate('Login')}
              fullWidth
              style={styles.backButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: spacing.screenPadding,
  },

  header: {
    marginTop: spacing['4xl'],
    marginBottom: spacing['3xl'],
  },

  subtitle: {
    marginTop: spacing.md,
    lineHeight: 24,
  },

  form: {
    flex: 1,
  },

  resetButton: {
    marginTop: spacing.md,
  },

  backButton: {
    marginTop: spacing.md,
  },
});

export default ForgotPasswordScreen;
