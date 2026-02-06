/**
 * FYNP Common Styles
 * Reusable component-level styles
 */

import {StyleSheet} from 'react-native';
import {colors, typography, spacing, shadows} from '../theme';

const commonStyles = StyleSheet.create({
  // Card Styles
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.borderRadius.base,
    padding: spacing.cardPadding,
    ...shadows.base,
  },

  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: spacing.borderRadius.base,
    padding: spacing.cardPadding,
    ...shadows.md,
  },

  cardFlat: {
    backgroundColor: colors.card,
    borderRadius: spacing.borderRadius.base,
    padding: spacing.cardPadding,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Input Styles
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: spacing.borderRadius.base,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    paddingVertical: spacing.inputPaddingVertical,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },

  inputFocused: {
    borderColor: colors.inputFocusBorder,
    borderWidth: 2,
  },

  inputError: {
    borderColor: colors.error,
  },

  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  inputErrorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // Button Styles
  button: {
    backgroundColor: colors.buttonPrimary,
    paddingHorizontal: spacing.buttonPaddingHorizontal,
    paddingVertical: spacing.buttonPaddingVertical,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  buttonSecondary: {
    backgroundColor: colors.buttonSecondary,
  },

  buttonOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },

  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
  },

  buttonTextOutline: {
    color: colors.primary,
  },

  buttonTextDisabled: {
    color: colors.textDisabled,
  },

  // List Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  listItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },

  listItemSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.modalBackground,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.xl,
    width: '90%',
    maxWidth: 400,
    ...shadows.lg,
  },

  modalTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },

  dividerThick: {
    height: 2,
    backgroundColor: colors.borderDark,
    marginVertical: spacing.md,
  },

  // Avatar
  avatar: {
    width: 48,
    height: 48,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarLarge: {
    width: 80,
    height: 80,
  },

  avatarSmall: {
    width: 32,
    height: 32,
  },

  // Badge
  badge: {
    backgroundColor: colors.primary,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.sm,
    ...shadows.lg,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },

  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
});

export default commonStyles;
