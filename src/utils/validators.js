/**
 * FYNP Validation Utilities
 * Input validation functions
 */

import {VALIDATION_RULES} from '../config/constants';

/**
 * Validate email format
 */
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = password => {
  if (!password || password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
    };
  }

  if (password.length > VALIDATION_RULES.MAX_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be less than ${VALIDATION_RULES.MAX_PASSWORD_LENGTH} characters`,
    };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one letter',
    };
  }

  return {
    isValid: true,
    message: 'Password is valid',
  };
};

/**
 * Validate username
 */
export const validateUsername = username => {
  if (
    !username ||
    username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH ||
    username.length > VALIDATION_RULES.MAX_USERNAME_LENGTH
  ) {
    return false;
  }

  // Only alphanumeric and underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
};

/**
 * Validate phone number (basic validation)
 */
export const validatePhone = phone => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate amount (must be positive number)
 */
export const validateAmount = amount => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Validate required field
 */
export const validateRequired = value => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

/**
 * Validate form fields
 */
export const validateForm = (fields, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = fields[field];
    const fieldRules = rules[field];

    // Required validation
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${fieldRules.label || field} is required`;
      return;
    }

    // Skip other validations if field is empty and not required
    if (!validateRequired(value)) {
      return;
    }

    // Email validation
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    }

    // Password validation
    if (fieldRules.password) {
      const result = validatePassword(value);
      if (!result.isValid) {
        errors[field] = result.message;
      }
    }

    // Username validation
    if (fieldRules.username && !validateUsername(value)) {
      errors[field] = `Username must be ${VALIDATION_RULES.MIN_USERNAME_LENGTH}-${VALIDATION_RULES.MAX_USERNAME_LENGTH} characters and contain only letters, numbers, and underscores`;
    }

    // Phone validation
    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = 'Please enter a valid phone number';
    }

    // Amount validation
    if (fieldRules.amount && !validateAmount(value)) {
      errors[field] = 'Please enter a valid amount';
    }

    // Custom validation
    if (fieldRules.custom && !fieldRules.custom(value)) {
      errors[field] = fieldRules.customMessage || 'Invalid value';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePhone,
  validateAmount,
  validateRequired,
  validateForm,
};
