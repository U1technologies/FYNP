/**
 * FYNP Offers Screen
 * Placeholder for Offers section
 */

import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing, typography} from '../../theme';

const OffersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />
      <View style={styles.content}>
        <Text style={styles.title}>Offers</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },

  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
});

export default OffersScreen;
