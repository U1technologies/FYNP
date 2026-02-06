/**
 * FYNP Signup Screen
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
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../../utils/validators';
import {spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const SignupScreen = ({navigation}) => {
  const {login: storeLogin} = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        await storeLogin(response.data.token, response.data.user);
        // Navigation will be handled automatically
      } else {
        Alert.alert('Signup Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Creating your account..." />;
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
            <Text style={globalStyles.heading1}>Create Account</Text>
            <Text style={[globalStyles.bodySmall, styles.subtitle]}>
              Sign up to get started with FYNP
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              value={formData.name}
              onChangeText={text => updateField('name', text)}
              placeholder="Enter your full name"
              error={errors.name}
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={text => updateField('email', text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={text => updateField('password', text)}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={text => updateField('confirmPassword', text)}
              placeholder="Confirm your password"
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
            />

            <Button
              title="Sign Up"
              onPress={handleSignup}
              fullWidth
              style={styles.signupButton}
            />

            <View style={styles.loginContainer}>
              <Text style={globalStyles.body}>Already have an account? </Text>
              <Button
                title="Login"
                variant="outline"
                size="small"
                onPress={() => navigation.navigate('Login')}
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
    marginTop: spacing['3xl'],
    marginBottom: spacing['2xl'],
  },

  subtitle: {
    marginTop: spacing.sm,
  },

  form: {
    flex: 1,
  },

  signupButton: {
    marginTop: spacing.xl,
  },

  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});

export default SignupScreen;
