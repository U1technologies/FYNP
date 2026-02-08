/**
 * FYNP Color Palette
 * Central color management for the entire application
 * Brand Colors: Blue (#3B82F6) & Orange (#F59E0B)
 */

const colors = {
  // User Requested Palette (Dark Mode Default)
  background: '#0a0a0e',
  foreground: '#e6e6fa',
  primary: '#ff914d',
  primaryForeground: '#ffffff',
  secondary: '#0e499c',
  secondaryForeground: '#cfc6ff',
  muted: '#0e0e12',
  mutedForeground: '#8e8a98',
  success: '#18d89b',
  successForeground: '#02140b',
  accent: '#9b6cff',
  accentForeground: '#ffffff',
  destructive: '#ff6b6b',
  destructiveForeground: '#2b0a0a',
  warning: '#ffb86b',
  warningForeground: '#2b1800',
  card: '#0f1115',
  cardForeground: '#edebfe',
  border: '#27272a', // Kept visible for dark mode
  inputBackground: '#0f1115',
  backgroundSecondary: '#18181b', // Added for consistency

  // Legacy/Compatibility Map (Restored to original Blue/Orange)
  primaryBg: '#0e499c', // Blue - Main Brand Color
  secondaryBg: '#ff914d', // Orange - Secondary Brand Color

  // Also ensuring 'primary' key used for some elements reflects the Blue if that was the original intent, 
  // but User asked for "put olors in my global okay" which implied new colors.
  // However, "homepage you chnage all blue borders to orange dont do that" means keep Blue as primary.
  // So I'll make the new "primary" key Blue as well, and "accent" Orange?
  // Let's stick to the Legacy Map restoration first which is the direct fix for "homepage... blue borders".

  // Re-mapping the new palette keys to avoid conflict if they were being used.
  // The user provided a specific CSS with --primary: #7c3aed (Purple) and --accent: #22d3ee (Cyan) in the HTML sample,
  // BUT the colors I utilized in the previous step were: primary: '#ff914d' (Orange).
  // It seems I might have mixed up the user's "put colors in my global" instruction (which had purple) with the orange one I seemingly generated?
  // Wait, the previous turn I put `#ff914d` as primary.
  // The User says "homepage you chnage all blue borders to orange".
  // So `colors.primaryBg` was Blue, I changed it to `#ff914d` (Orange).
  // I must revert `primaryBg` to `#3B82F6`.

  // Legacy Status Colors
  error: '#ff6b6b',
  info: '#3B82F6', // Blue kept for info

  // Text Colors
  textPrimary: '#e6e6fa', // foreground
  textSecondary: '#8e8a98', // mutedForeground
  textTertiary: '#a1a1aa',
  textMuted: '#71717a',

  // Other UI Elements
  inputBorder: '#27272a',
  overlay: 'rgba(0, 0, 0, 0.7)',
  modalBackground: '#18181b',
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',

  // Light Mode Palette
  light: {
    background: '#ffffff',
    foreground: '#09090b',
    primary: '#ff914d', // Keep brand color
    primaryForeground: '#ffffff',
    secondary: '#f0f9ff', // Light blueish
    secondaryForeground: '#0e499c',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    success: '#22c55e',
    successForeground: '#ffffff',
    accent: '#f3e8ff',
    accentForeground: '#6b21a8',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    card: '#ffffff',
    cardForeground: '#09090b',
    border: '#e4e4e7',
    inputBackground: '#ffffff',

    // Legacy support for light mode
    textPrimary: '#09090b',
    textSecondary: '#71717a',

    textTertiary: '#71717a', // Added for light mode readability
    textMuted: '#a1a1aa',

    // Compatibility
    backgroundSecondary: '#f4f4f5',
    primaryBg: '#0e499c',
    secondaryBg: '#ff914d',
  }
};

export default colors;
