/**
 * FYNP Global Styles
 * App-wide reusable styles - the React Native equivalent of global CSS
 */

import {StyleSheet, Platform} from 'react-native';
import {colors, typography, spacing} from '../theme';

const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerPadded: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.screenPadding,
  },

  contentContainer: {
    padding: spacing.screenPadding,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  // Text Styles
  heading1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },

  heading2: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },

  heading3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },

  heading4: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },

  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },

  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },

  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.textTertiary,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  textBold: {
    fontWeight: typography.fontWeight.bold,
  },

  textSemibold: {
    fontWeight: typography.fontWeight.semibold,
  },

  textCenter: {
    textAlign: 'center',
  },

  textPrimary: {
    color: colors.textPrimary,
  },

  textSecondary: {
    color: colors.textSecondary,
  },

  textLight: {
    color: colors.textLight,
  },

  textError: {
    color: colors.error,
  },

  textSuccess: {
    color: colors.success,
  },

  // Layout Helpers
  row: {
    flexDirection: 'row',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Spacing Helpers
  mt1: {marginTop: spacing.xs},
  mt2: {marginTop: spacing.sm},
  mt3: {marginTop: spacing.md},
  mt4: {marginTop: spacing.base},
  mt5: {marginTop: spacing.lg},
  mt6: {marginTop: spacing.xl},

  mb1: {marginBottom: spacing.xs},
  mb2: {marginBottom: spacing.sm},
  mb3: {marginBottom: spacing.md},
  mb4: {marginBottom: spacing.base},
  mb5: {marginBottom: spacing.lg},
  mb6: {marginBottom: spacing.xl},

  ml1: {marginLeft: spacing.xs},
  ml2: {marginLeft: spacing.sm},
  ml3: {marginLeft: spacing.md},
  ml4: {marginLeft: spacing.base},

  mr1: {marginRight: spacing.xs},
  mr2: {marginRight: spacing.sm},
  mr3: {marginRight: spacing.md},
  mr4: {marginRight: spacing.base},

  pt1: {paddingTop: spacing.xs},
  pt2: {paddingTop: spacing.sm},
  pt3: {paddingTop: spacing.md},
  pt4: {paddingTop: spacing.base},

  pb1: {paddingBottom: spacing.xs},
  pb2: {paddingBottom: spacing.sm},
  pb3: {paddingBottom: spacing.md},
  pb4: {paddingBottom: spacing.base},

  px1: {paddingHorizontal: spacing.xs},
  px2: {paddingHorizontal: spacing.sm},
  px3: {paddingHorizontal: spacing.md},
  px4: {paddingHorizontal: spacing.base},

  py1: {paddingVertical: spacing.xs},
  py2: {paddingVertical: spacing.sm},
  py3: {paddingVertical: spacing.md},
  py4: {paddingVertical: spacing.base},

  // Flex
  flex1: {flex: 1},
  flex2: {flex: 2},
  flex3: {flex: 3},

  // Border
  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  // Border Radius
  rounded: {
    borderRadius: spacing.borderRadius.base,
  },

  roundedLg: {
    borderRadius: spacing.borderRadius.lg,
  },

  roundedFull: {
    borderRadius: spacing.borderRadius.full,
  },

  // Background Colors
  bgPrimary: {
    backgroundColor: colors.primary,
  },

  bgSecondary: {
    backgroundColor: colors.backgroundSecondary,
  },

  bgWhite: {
    backgroundColor: colors.white,
  },

  bgTransparent: {
    backgroundColor: colors.transparent,
  },
});

export default globalStyles;
