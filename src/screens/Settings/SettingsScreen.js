/**
 * FYNP Settings Screen
 */

import React, {useState} from 'react';
import {View, Text, ScrollView, Switch, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserStore} from '../../store/userStore';
import {colors, spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Card from '../../components/Card';

const SettingsScreen = () => {
  const {preferences, updatePreferences} = useUserStore();

  const [settings, setSettings] = useState({
    notifications: preferences?.notifications ?? true,
    biometric: false,
    darkMode: preferences?.darkMode ?? false,
  });

  const toggleSetting = key => {
    const newValue = !settings[key];
    setSettings(prev => ({...prev, [key]: newValue}));
    updatePreferences({[key]: newValue});
  };

  const SettingItem = ({label, value, onToggle, description}) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={globalStyles.body}>{label}</Text>
        {description && (
          <Text style={globalStyles.bodySmall}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{false: colors.border, true: colors.primary}}
        thumbColor={value ? colors.white : colors.backgroundTertiary}
      />
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={globalStyles.heading2}>Settings</Text>

        <Card style={styles.section}>
          <Text style={globalStyles.heading4}>General</Text>

          <SettingItem
            label="Push Notifications"
            description="Receive notifications for transactions"
            value={settings.notifications}
            onToggle={() => toggleSetting('notifications')}
          />

          <SettingItem
            label="Biometric Authentication"
            description="Use fingerprint or face ID to login"
            value={settings.biometric}
            onToggle={() => toggleSetting('biometric')}
          />

          <SettingItem
            label="Dark Mode"
            description="Enable dark theme"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={globalStyles.heading4}>Currency</Text>
          <View style={styles.settingItem}>
            <Text style={globalStyles.body}>Default Currency</Text>
            <Text style={globalStyles.bodySmall}>
              {preferences?.currency || 'USD'}
            </Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={globalStyles.heading4}>About</Text>
          <View style={styles.settingItem}>
            <Text style={globalStyles.bodySmall}>Version</Text>
            <Text style={globalStyles.body}>1.0.0</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={globalStyles.bodySmall}>App Name</Text>
            <Text style={globalStyles.body}>FYNP</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.screenPadding,
  },

  section: {
    marginTop: spacing.xl,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
});

export default SettingsScreen;
