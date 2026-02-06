/**
 * FYNP Loader Component
 * Loading indicator
 */

import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {colors, spacing, typography} from '../theme';
import globalStyles from '../styles/globalStyles';

const Loader = ({
  size = 'large',
  color = colors.primary,
  text,
  fullScreen = false,
  overlay = false,
}) => {
  if (fullScreen) {
    return (
      <View
        style={[
          globalStyles.centerContainer,
          overlay && localStyles.overlay,
        ]}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={localStyles.text}>{text}</Text>}
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={localStyles.text}>{text}</Text>}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    backgroundColor: colors.overlay,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },

  text: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default Loader;
