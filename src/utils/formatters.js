/**
 * FYNP Formatting Utilities
 * Data formatting functions
 */

import {CURRENCY} from '../config/constants';

/**
 * Format currency amount
 */
export const formatCurrency = (amount, symbol = CURRENCY.SYMBOL) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${symbol}0.00`;
  }

  const numAmount = parseFloat(amount);
  const formatted = Math.abs(numAmount)
    .toFixed(CURRENCY.DECIMAL_PLACES)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const sign = numAmount < 0 ? '-' : '';
  return `${sign}${symbol}${formatted}`;
};

/**
 * Format large numbers (e.g., 1000 -> 1K)
 */
export const formatLargeNumber = num => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }

  const absNum = Math.abs(num);

  if (absNum >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  if (absNum >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }

  return num.toString();
};

/**
 * Format date to readable string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) {
    return '';
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const options = {
    short: {month: 'short', day: 'numeric', year: 'numeric'},
    long: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    time: {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  return dateObj.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = date => {
  if (!date) {
    return '';
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'Just now';
  }

  if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  }

  if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  }

  if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  }

  return formatDate(dateObj, 'short');
};

/**
 * Format phone number
 */
export const formatPhone = phone => {
  if (!phone) {
    return '';
  }

  const cleaned = phone.replace(/\D/g, '');

  // Format US phone numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${parseFloat(value).toFixed(decimals)}%`;
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = text => {
  if (!text) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format transaction type display
 */
export const formatTransactionType = type => {
  if (!type) {
    return '';
  }

  return type
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};

export default {
  formatCurrency,
  formatLargeNumber,
  formatDate,
  formatRelativeTime,
  formatPhone,
  formatPercentage,
  truncateText,
  capitalize,
  formatTransactionType,
};
