/**
 * FYNP Button Component
 * Reusable button with various styles
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {colors, spacing} from '../theme';
import commonStyles from '../styles/commonStyles';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    const styles = [commonStyles.button];

    // Variant styles
    if (variant === 'secondary') {
      styles.push(commonStyles.buttonSecondary);
    } else if (variant === 'outline') {
      styles.push(commonStyles.buttonOutline);
    }

    // Size styles
    if (size === 'small') {
      styles.push(localStyles.buttonSmall);
    } else if (size === 'large') {
      styles.push(localStyles.buttonLarge);
    }

    // Disabled style
    if (disabled || loading) {
      styles.push(commonStyles.buttonDisabled);
    }

    // Full width
    if (fullWidth) {
      styles.push(localStyles.fullWidth);
    }

    // Custom style
    if (style) {
      styles.push(style);
    }

    return styles;
  };

  const getTextStyle = () => {
    const styles = [commonStyles.buttonText];

    // Variant text styles
    if (variant === 'outline') {
      styles.push(commonStyles.buttonTextOutline);
    }

    // Disabled text style
    if (disabled || loading) {
      styles.push(commonStyles.buttonTextDisabled);
    }

    // Size text styles
    if (size === 'small') {
      styles.push(localStyles.textSmall);
    } else if (size === 'large') {
      styles.push(localStyles.textLarge);
    }

    // Custom text style
    if (textStyle) {
      styles.push(textStyle);
    }

    return styles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  buttonSmall: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
  },

  buttonLarge: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['2xl'],
  },

  textSmall: {
    fontSize: 14,
  },

  textLarge: {
    fontSize: 18,
  },

  fullWidth: {
    width: '100%',
  },
});

export default Button;
