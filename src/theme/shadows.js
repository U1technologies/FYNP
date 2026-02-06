/**
 * FYNP Shadow System
 * Platform-specific shadows for cards and elevated elements
 */

import {Platform} from 'react-native';

const shadows = {
  // Small shadow
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),

  // Base shadow
  base: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
  }),

  // Medium shadow
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),

  // Large shadow
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }),

  // Extra large shadow
  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    android: {
      elevation: 12,
    },
  }),

  // No shadow
  none: Platform.select({
    ios: {
      shadowColor: 'transparent',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  }),
};

export default shadows;
