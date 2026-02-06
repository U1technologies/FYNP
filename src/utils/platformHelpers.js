/**
 * FYNP Platform Helpers
 * Platform-specific utility functions
 */

import {Platform, Dimensions, StatusBar} from 'react-native';

/**
 * Check if platform is iOS
 */
export const isIOS = () => {
  return Platform.OS === 'ios';
};

/**
 * Check if platform is Android
 */
export const isAndroid = () => {
  return Platform.OS === 'android';
};

/**
 * Get platform name
 */
export const getPlatform = () => {
  return Platform.OS;
};

/**
 * Get platform version
 */
export const getPlatformVersion = () => {
  return Platform.Version;
};

/**
 * Get screen dimensions
 */
export const getScreenDimensions = () => {
  return Dimensions.get('window');
};

/**
 * Get screen width
 */
export const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

/**
 * Get screen height
 */
export const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

/**
 * Check if device is tablet
 */
export const isTablet = () => {
  const {width, height} = Dimensions.get('window');
  const aspectRatio = width / height;
  return Math.min(width, height) >= 600 && aspectRatio > 1.2;
};

/**
 * Get status bar height
 */
export const getStatusBarHeight = () => {
  if (isIOS()) {
    return 20; // Default iOS status bar height
  }

  return StatusBar.currentHeight || 0;
};

/**
 * Platform-specific value selector
 * Usage: platformValue({ ios: 10, android: 20 })
 */
export const platformValue = values => {
  return Platform.select(values);
};

/**
 * Platform-specific style selector
 * Usage: platformStyle({ ios: { paddingTop: 20 }, android: { paddingTop: 10 } })
 */
export const platformStyle = styles => {
  return Platform.select(styles);
};

/**
 * Check if device has notch (simplified check)
 */
export const hasNotch = () => {
  if (!isIOS()) {
    return false;
  }

  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;

  // iPhone X and above have aspect ratio > 2
  return aspectRatio > 2;
};

/**
 * Get safe area insets (basic implementation)
 * Note: Use react-native-safe-area-context for accurate values
 */
export const getSafeAreaInsets = () => {
  const top = hasNotch() ? 44 : getStatusBarHeight();
  const bottom = hasNotch() ? 34 : 0;

  return {
    top,
    bottom,
    left: 0,
    right: 0,
  };
};

/**
 * Check if app is running on simulator/emulator
 */
export const isSimulator = () => {
  if (isIOS()) {
    return Platform.isPad || Platform.isTVOS;
  }

  // For Android, this is harder to detect programmatically
  // You might need to check specific device characteristics
  return false;
};

/**
 * Get device info string
 */
export const getDeviceInfo = () => {
  return `${Platform.OS} ${Platform.Version}`;
};

/**
 * Scale size based on screen width (for responsive design)
 */
export const scaleSize = size => {
  const baseWidth = 375; // iPhone X width as base
  const screenWidth = getScreenWidth();
  return (size * screenWidth) / baseWidth;
};

/**
 * Get responsive font size
 */
export const responsiveFontSize = size => {
  const scale = getScreenWidth() / 375;
  const newSize = size * scale;
  return Math.round(newSize);
};

export default {
  isIOS,
  isAndroid,
  getPlatform,
  getPlatformVersion,
  getScreenDimensions,
  getScreenWidth,
  getScreenHeight,
  isTablet,
  getStatusBarHeight,
  platformValue,
  platformStyle,
  hasNotch,
  getSafeAreaInsets,
  isSimulator,
  getDeviceInfo,
  scaleSize,
  responsiveFontSize,
};
