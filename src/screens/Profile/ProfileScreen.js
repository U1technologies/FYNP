import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Bell,
  ChevronRight,
  Moon,
  BellRing,
  User,
  Landmark,
  FileText,
  HelpCircle,
  Shield,
  LogOut,
  ArrowLeft,
} from 'lucide-react-native';
import colors from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore'; // Global Theme Store

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore(); // Use global state

  // Dynamic Theme Colors
  const theme = isDarkMode ? colors : colors.light;
  const currentBackground = theme.background;
  const currentText = theme.foreground;
  const currentMuted = theme.muted;
  const currentMutedText = theme.mutedForeground;
  const currentCard = theme.card;
  const currentBorder = theme.border;

  const toggleSwitch = () => toggleTheme(); // Updates global store

  const SectionTitle = ({ title }) => (
    <Text style={[styles.sectionTitle, { color: currentMutedText }]}>
      {title}
    </Text>
  );

  const MenuItem = ({ icon: Icon, label, showToggle = false, isToggled, onToggle, showArrow = true, onPress, iconColor }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: currentCard, borderBottomColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={showToggle}
    >
      <View style={styles.menuLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.background === '#0a0a0e' ? theme.muted : theme.secondary }]}>
          <Icon size={18} color={iconColor || theme.foreground} />
        </View>
        <Text style={[styles.menuLabel, { color: theme.foreground }]}>{label}</Text>
      </View>

      {showToggle ? (
        <Switch
          trackColor={{ false: theme.muted, true: colors.primary }}
          thumbColor={isToggled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggle}
          value={isToggled}
        />
      ) : showArrow ? (
        <ChevronRight size={20} color={currentMutedText} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={currentBackground}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentBackground }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* Back Button for Home Navigation */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <ArrowLeft size={20} color={currentText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentText }]}>Account</Text>
        </View>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
          <Bell size={20} color={currentText} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
          <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
            {/* Fallback avatar if no image */}
            <Text style={{ color: colors.primary, fontSize: 24, fontWeight: 'bold' }}>
              {user?.name?.charAt(0) || 'R'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: currentText }]}>{user?.name || 'Rahul Verma'}</Text>
            <Text style={[styles.profilePhone, { color: currentMutedText }]}>{user?.phone || '+91 98765 43210'}</Text>
            <View style={[styles.kycBadge, { backgroundColor: 'rgba(124, 58, 237, 0.15)' }]}>
              <Text style={[styles.kycText, { color: colors.accent }]}>KYC VERIFIED</Text>
            </View>
          </View>
          <ChevronRight size={20} color={currentMutedText} />
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <SectionTitle title="App Settings" />
          <View style={[styles.menuGroup, { borderColor: currentBorder, backgroundColor: currentCard }]}>
            <MenuItem
              icon={Moon}
              label="Dark Mode"
              showToggle
              isToggled={isDarkMode}
              onToggle={toggleSwitch}
              showArrow={false}
            />
            <View style={[styles.separator, { backgroundColor: currentBorder }]} />
            <MenuItem icon={BellRing} label="Notifications" />
          </View>
        </View>

        {/* Financial Details */}
        <View style={styles.section}>
          <SectionTitle title="Financial Details" />
          <View style={[styles.menuGroup, { borderColor: currentBorder, backgroundColor: currentCard }]}>
            <MenuItem icon={User} label="Personal Information" />
            <View style={[styles.separator, { backgroundColor: currentBorder }]} />
            <MenuItem icon={Landmark} label="Bank Accounts" />
            <View style={[styles.separator, { backgroundColor: currentBorder }]} />
            <MenuItem icon={FileText} label="My Documents" />
          </View>
        </View>

        {/* Support & Legal */}
        <View style={styles.section}>
          <SectionTitle title="Support & Legal" />
          <View style={[styles.menuGroup, { borderColor: currentBorder, backgroundColor: currentCard }]}>
            <MenuItem icon={HelpCircle} label="Help & Support" />
            <View style={[styles.separator, { backgroundColor: currentBorder }]} />
            <MenuItem icon={Shield} label="Privacy Policy" />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }]}
          onPress={logout}
        >
          <LogOut size={18} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: currentMutedText }]}>App Version 2.4.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Increased padding to avoid bottom tab bar overlap
    gap: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profilePhone: {
    fontSize: 14,
    marginTop: 2,
  },
  kycBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  kycText: {
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  menuGroup: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  separator: {
    height: 1,
    width: '100%',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 16,
  },
});

export default ProfileScreen;
