/**
 * FYNP Splash Screen
 * Shows app logo and brand message
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {colors, spacing, typography} from '../../theme';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Navigate to Welcome screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.logo}>FYNP</Text>
        <Text style={styles.tagline}>Your AI-powered wealth companion</Text>
      </View>

      {/* Bottom Security Labels */}
      <View style={styles.footer}>
        <View style={styles.securityBadges}>
          <View style={styles.badge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>100% SECURE</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>256-BIT ENCRYPTED</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>REGULATED</Text>
          </View>
        </View>
        <Text style={styles.fintechLabel}>FINTECH</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27', // Dark navy blue
    justifyContent: 'space-between',
    paddingVertical: spacing['5xl'],
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 4,
    marginBottom: spacing.md,
  },

  tagline: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
  },

  footer: {
    paddingHorizontal: spacing.screenPadding,
    alignItems: 'center',
  },

  securityBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginRight: spacing.xs,
    opacity: 0.5,
  },

  badgeText: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.5,
    fontWeight: '600',
  },

  fintechLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.3,
    fontWeight: '600',
    letterSpacing: 2,
  },
});

export default SplashScreen;
