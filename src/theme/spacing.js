/**
 * FYNP Spacing System
 * Consistent spacing scale for margins, paddings, and gaps
 */

const spacing = {
  // Base spacing unit: 4px
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
  '7xl': 96,

  // Common use cases
  screenPadding: 16,
  cardPadding: 16,
  sectionMargin: 24,
  elementGap: 12,
  smallGap: 8,
  largeGap: 20,

  // Button spacing
  buttonPaddingHorizontal: 24,
  buttonPaddingVertical: 12,

  // Input spacing
  inputPaddingHorizontal: 16,
  inputPaddingVertical: 12,

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
};

export default spacing;
