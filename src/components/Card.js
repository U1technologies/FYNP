/**
 * FYNP Card Component
 * Reusable card container
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {spacing} from '../theme';
import commonStyles from '../styles/commonStyles';

const Card = ({
  children,
  variant = 'default',
  onPress,
  style,
  padding = true,
}) => {
  const getCardStyle = () => {
    const styles = [];

    // Variant styles
    if (variant === 'elevated') {
      styles.push(commonStyles.cardElevated);
    } else if (variant === 'flat') {
      styles.push(commonStyles.cardFlat);
    } else {
      styles.push(commonStyles.card);
    }

    // Remove padding if requested
    if (!padding) {
      styles.push(localStyles.noPadding);
    }

    // Custom style
    if (style) {
      styles.push(style);
    }

    return styles;
  };

  // If onPress is provided, make it touchable
  if (onPress) {
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  // Otherwise, just a view
  return <View style={getCardStyle()}>{children}</View>;
};

const localStyles = StyleSheet.create({
  noPadding: {
    padding: 0,
  },
});

export default Card;
