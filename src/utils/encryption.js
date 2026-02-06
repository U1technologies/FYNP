/**
 * FYNP Encryption Utilities
 * Security and encryption helper functions
 * Note: These are placeholder implementations. Use proper encryption libraries in production.
 */

/**
 * Simple Base64 encoding (NOT secure encryption, just for demo)
 * In production, use react-native-crypto or similar libraries
 */
export const encodeBase64 = text => {
  try {
    return Buffer.from(text).toString('base64');
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return text;
  }
};

/**
 * Simple Base64 decoding
 */
export const decodeBase64 = encodedText => {
  try {
    return Buffer.from(encodedText, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return encodedText;
  }
};

/**
 * Generate a random string (for tokens, IDs, etc.)
 */
export const generateRandomString = (length = 32) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Hash a string (simple implementation for demo)
 * In production, use proper hashing libraries like crypto-js
 */
export const hashString = text => {
  let hash = 0;

  if (!text || text.length === 0) {
    return hash.toString();
  }

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
};

/**
 * Mask sensitive data (e.g., credit card numbers)
 */
export const maskSensitiveData = (data, visibleChars = 4) => {
  if (!data || data.length <= visibleChars) {
    return data;
  }

  const masked = '*'.repeat(data.length - visibleChars);
  return masked + data.slice(-visibleChars);
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = input => {
  if (typeof input !== 'string') {
    return input;
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * IMPORTANT: For production apps, implement these:
 *
 * 1. AES Encryption/Decryption using crypto-js or react-native-crypto
 * 2. Secure key storage using react-native-keychain
 * 3. Certificate pinning for API calls
 * 4. Jailbreak/Root detection
 * 5. Proper token management with refresh logic
 * 6. Secure storage for sensitive data
 * 7. Biometric authentication
 *
 * Example with crypto-js:
 *
 * import CryptoJS from 'crypto-js';
 *
 * export const encrypt = (data, secretKey) => {
 *   return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
 * };
 *
 * export const decrypt = (ciphertext, secretKey) => {
 *   const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
 *   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 * };
 */

export default {
  encodeBase64,
  decodeBase64,
  generateRandomString,
  hashString,
  maskSensitiveData,
  sanitizeInput,
};
