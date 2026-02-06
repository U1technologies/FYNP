/**
 * FYNP useBiometric Hook
 * Biometric authentication (fingerprint, face ID)
 */

import {useState, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import {AUTH_STORAGE_KEYS} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBiometric = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState(null);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
    checkBiometricEnabled();
  }, []);

  /**
   * Check if device supports biometric authentication
   */
  const checkBiometricSupport = async () => {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();

      if (biometryType) {
        setIsBiometricSupported(true);
        setBiometricType(biometryType);
      } else {
        setIsBiometricSupported(false);
        setBiometricType(null);
      }
    } catch (error) {
      console.error('Biometric support check error:', error);
      setIsBiometricSupported(false);
    }
  };

  /**
   * Check if biometric is enabled for this app
   */
  const checkBiometricEnabled = async () => {
    try {
      const enabled = await AsyncStorage.getItem(
        AUTH_STORAGE_KEYS.BIOMETRIC_ENABLED,
      );
      setIsBiometricEnabled(enabled === 'true');
    } catch (error) {
      console.error('Check biometric enabled error:', error);
    }
  };

  /**
   * Enable biometric authentication
   */
  const enableBiometric = async (username, password) => {
    try {
      setLoading(true);

      // Store credentials in Keychain with biometric protection
      await Keychain.setGenericPassword(username, password, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });

      // Mark biometric as enabled
      await AsyncStorage.setItem(AUTH_STORAGE_KEYS.BIOMETRIC_ENABLED, 'true');
      setIsBiometricEnabled(true);

      return {success: true};
    } catch (error) {
      console.error('Enable biometric error:', error);
      return {success: false, message: error.message};
    } finally {
      setLoading(false);
    }
  };

  /**
   * Disable biometric authentication
   */
  const disableBiometric = async () => {
    try {
      setLoading(true);

      // Remove credentials from Keychain
      await Keychain.resetGenericPassword();

      // Mark biometric as disabled
      await AsyncStorage.setItem(AUTH_STORAGE_KEYS.BIOMETRIC_ENABLED, 'false');
      setIsBiometricEnabled(false);

      return {success: true};
    } catch (error) {
      console.error('Disable biometric error:', error);
      return {success: false, message: error.message};
    } finally {
      setLoading(false);
    }
  };

  /**
   * Authenticate with biometric
   */
  const authenticateWithBiometric = async () => {
    try {
      setLoading(true);

      if (!isBiometricSupported) {
        return {
          success: false,
          message: 'Biometric authentication is not supported',
        };
      }

      if (!isBiometricEnabled) {
        return {success: false, message: 'Biometric authentication is not enabled'};
      }

      // Get credentials from Keychain
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Authenticate',
          subtitle: 'Please authenticate to continue',
        },
      });

      if (credentials) {
        return {
          success: true,
          username: credentials.username,
          password: credentials.password,
        };
      }

      return {success: false, message: 'Authentication cancelled'};
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return {success: false, message: error.message};
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get biometric type name
   */
  const getBiometricTypeName = () => {
    if (!biometricType) {
      return 'Biometric';
    }

    switch (biometricType) {
      case Keychain.BIOMETRY_TYPE.TOUCH_ID:
        return 'Touch ID';
      case Keychain.BIOMETRY_TYPE.FACE_ID:
        return 'Face ID';
      case Keychain.BIOMETRY_TYPE.FINGERPRINT:
        return 'Fingerprint';
      case Keychain.BIOMETRY_TYPE.FACE:
        return 'Face Recognition';
      case Keychain.BIOMETRY_TYPE.IRIS:
        return 'Iris';
      default:
        return 'Biometric';
    }
  };

  return {
    isBiometricSupported,
    biometricType,
    isBiometricEnabled,
    loading,
    enableBiometric,
    disableBiometric,
    authenticateWithBiometric,
    getBiometricTypeName,
  };
};

export default useBiometric;
