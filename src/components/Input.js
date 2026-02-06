/**
 * FYNP Input Component
 * Reusable text input with validation
 */

import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacing, typography} from '../theme';
import commonStyles from '../styles/commonStyles';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  autoCapitalize = 'none',
  autoCorrect = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = () => {
    const styles = [commonStyles.input];

    if (isFocused) {
      styles.push(commonStyles.inputFocused);
    }

    if (error) {
      styles.push(commonStyles.inputError);
    }

    if (disabled) {
      styles.push(localStyles.inputDisabled);
    }

    if (leftIcon || rightIcon) {
      styles.push(localStyles.inputWithIcon);
    }

    if (inputStyle) {
      styles.push(inputStyle);
    }

    return styles;
  };

  return (
    <View style={[localStyles.container, style]}>
      {label && <Text style={commonStyles.inputLabel}>{label}</Text>}

      <View style={localStyles.inputWrapper}>
        {leftIcon && <View style={localStyles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={getInputContainerStyle()}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />

        {rightIcon && (
          <TouchableOpacity
            style={localStyles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={commonStyles.inputErrorText}>{error}</Text>}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },

  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputWithIcon: {
    paddingLeft: spacing['3xl'],
  },

  leftIcon: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },

  rightIcon: {
    position: 'absolute',
    right: spacing.md,
    zIndex: 1,
  },

  inputDisabled: {
    backgroundColor: colors.backgroundTertiary,
    color: colors.textDisabled,
  },
});

export default Input;
