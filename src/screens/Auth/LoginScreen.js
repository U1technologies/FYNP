/**
 * FYNP Login Screen
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
import {useAuthStore} from '../../store/authStore';
import {authService} from '../../services/authService';
import {validateEmail, validateRequired} from '../../utils/validators';
import {colors, spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const LoginScreen = ({navigation}) => {
  const {login: storeLogin} = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validateRequired(password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(email, password);

      if (response.success) {
        await storeLogin(response.data.token, response.data.user);
        // Navigation will be handled automatically by navigation state
      } else {
        Alert.alert('Login Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Logging in..." />;
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
            <Text style={globalStyles.heading1}>Welcome Back</Text>
            <Text style={[globalStyles.bodySmall, styles.subtitle]}>
              Sign in to continue to FYNP
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) {
                  setErrors({...errors, email: null});
                }
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) {
                  setErrors({...errors, password: null});
                }
              }}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              error={errors.password}
            />

            <Button
              title="Forgot Password?"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotButton}
            />

            <Button
              title="Login"
              onPress={handleLogin}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.signupContainer}>
              <Text style={globalStyles.body}>Don't have an account? </Text>
              <Button
                title="Sign Up"
                variant="outline"
                size="small"
                onPress={() => navigation.navigate('Signup')}
              />
            </View>
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
    marginTop: spacing.sm,
  },

  form: {
    flex: 1,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },

  loginButton: {
    marginTop: spacing.md,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});

export default LoginScreen;
