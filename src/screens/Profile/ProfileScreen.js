/**
 * FYNP Profile Screen
 */

import React from 'react';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../../store/authStore';
import {spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Card from '../../components/Card';
import Button from '../../components/Button';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={globalStyles.heading2}>{user?.name || 'User'}</Text>
          <Text style={globalStyles.bodySmall}>{user?.email || ''}</Text>
        </View>

        <Card style={styles.section}>
          <Text style={globalStyles.heading4}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={globalStyles.bodySmall}>Full Name</Text>
            <Text style={globalStyles.body}>{user?.name || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={globalStyles.bodySmall}>Email</Text>
            <Text style={globalStyles.body}>{user?.email || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={globalStyles.bodySmall}>Phone</Text>
            <Text style={globalStyles.body}>{user?.phone || 'N/A'}</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Button
            title="Edit Profile"
            variant="outline"
            fullWidth
            style={styles.button}
          />
          <Button
            title="Change Password"
            variant="outline"
            fullWidth
            style={styles.button}
          />
          <Button
            title="Settings"
            variant="outline"
            fullWidth
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          />
        </Card>

        <Button
          title="Logout"
          variant="secondary"
          fullWidth
          style={styles.logoutButton}
          onPress={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.screenPadding,
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  section: {
    marginBottom: spacing.md,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  button: {
    marginBottom: spacing.sm,
  },

  logoutButton: {
    marginTop: spacing.xl,
  },
});

export default ProfileScreen;
