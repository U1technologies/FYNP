/**
 * FYNP Color Palette
 * Central color management for the entire application
 * Brand Colors: Blue (#3B82F6) & Orange (#F59E0B)
 */

const colors = {
  // Brand Colors
  primaryBg: '#3B82F6', // Brand Blue - For gradients, primary elements
  secondaryBg: '#F59E0B', // Brand Orange - For CTAs and action buttons

  // Primary Colors (Blue)
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#60A5FA',

  // Secondary Colors (Orange)
  secondary: '#F59E0B',
  secondaryDark: '#D97706',
  secondaryLight: '#FBBF24',

  // Status Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Dark Theme Background Colors
  background: '#09090b', // Main background
  backgroundSecondary: '#18181b', // Secondary background
  backgroundTertiary: '#27272a', // Tertiary background
  backgroundCard: '#141417', // Card background

  // Light Theme Background Colors (if needed)
  backgroundLight: '#FFFFFF',
  backgroundLightSecondary: '#F9FAFB',

  // Dark Theme Text Colors
  textPrimary: '#ffffff', // White text
  textSecondary: '#d4d4d8', // Light gray
  textTertiary: '#a1a1aa', // Medium gray
  textMuted: '#71717a', // Muted gray
  textDisabled: '#52525b', // Disabled gray

  // Border Colors (Dark Theme)
  border: '#27272a',
  borderLight: '#3f3f46',
  borderDark: '#18181b',

  // Card Colors
  card: '#141417',
  cardShadow: 'rgba(0, 0, 0, 0.3)',

  // Input Colors (Dark Theme)
  inputBackground: '#18181b',
  inputBorder: '#27272a',
  inputFocusBorder: '#3B82F6',
  inputPlaceholder: '#71717a',

  // Button Colors
  buttonPrimary: '#F59E0B', // Orange CTA
  buttonSecondary: '#3B82F6', // Blue
  buttonDisabled: '#27272a',
  buttonText: '#ffffff',

  // Finance Specific Colors
  income: '#22C55E',
  expense: '#EF4444',
  balance: '#3B82F6',
  investment: '#8B5CF6',

  // Overlay & Modal
  overlay: 'rgba(0, 0, 0, 0.7)',
  modalBackground: '#18181b',

  // Gradient Colors
  gradientPrimary: ['#1e1b4b', '#312e81'], // Blue gradient
  gradientSecondary: ['#7c2d12', '#9a3412'], // Orange gradient
  gradientAccent: ['#4c1d95', '#09090b'], // Purple to dark

  // Transparent
  transparent: 'transparent',

  // White & Black
  white: '#ffffff',
  black: '#000000',
};

export default colors;
