/**
 * FYNP Credit Card Preferences Screen (Step 1/4)
 * Set redemption preferences for personalized card recommendations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import {
  X,
  Plane,
  Hotel,
  Banknote,
  Gift,
  Check,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';

const CreditCardPreferencesScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;

  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const descTextColor = theme.textSecondary;

  const [selectedPreferences, setSelectedPreferences] = useState([
    'flights',
    'hotels',
    'cashback',
    'vouchers',
  ]);

  const preferences = [
    {
      id: 'flights',
      title: 'Free Flights',
      subtitle: 'up to 15%',
      icon: Plane,
      iconColor: '#60a5fa',
      badge: 'High Reward',
      badgeType: 'high',
    },
    {
      id: 'hotels',
      title: 'Free Hotel Stays',
      subtitle: 'up to 25%',
      icon: Hotel,
      iconColor: '#f472b6',
      badge: 'High Reward',
      badgeType: 'high',
    },
    {
      id: 'cashback',
      title: 'Direct Cashback',
      subtitle: 'up to 10%',
      icon: Banknote,
      iconColor: '#fbbf24',
      badge: 'Medium Reward',
      badgeType: 'medium',
    },
    {
      id: 'vouchers',
      title: 'Product & Vouchers',
      subtitle: 'up to 2%',
      icon: Gift,
      iconColor: '#f87171',
      badge: 'Low Reward',
      badgeType: 'low',
    },
  ];

  const togglePreference = (id) => {
    setSelectedPreferences((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getBadgeColors = (type) => {
    switch (type) {
      case 'high':
        return {
          bg: isDarkMode ? 'rgba(24, 216, 155, 0.15)' : 'rgba(34, 197, 94, 0.15)',
          text: colors.success,
        };
      case 'medium':
        return {
          bg: isDarkMode ? 'rgba(255, 182, 107, 0.15)' : 'rgba(251, 191, 36, 0.15)',
          text: colors.warning,
        };
      case 'low':
        return {
          bg: isDarkMode ? 'rgba(255, 107, 107, 0.15)' : 'rgba(248, 113, 113, 0.15)',
          text: colors.destructive,
        };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', text: currentText };
    }
  };

  const handleContinue = () => {
    // Navigate to next step (2/4)
    navigation.navigate('CreditCardLifestyle');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentBorder }]}>
        <View style={{ width: 36 }} />
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: currentText }]}>Enter Details</Text>
          <Text style={[styles.headerSubtitle, { color: descTextColor }]}>1/4</Text>
        </View>
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <X size={20} color={currentText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={[styles.pageTitle, { color: currentText }]}>
            Set Your Redemption Preferences
          </Text>
          <Text style={[styles.pageDescription, { color: descTextColor }]}>
            We'll personalise your card portfolio around how you prefer to earn and redeem rewards.
          </Text>
        </View>

        {/* Preference Cards */}
        {preferences.map((pref) => {
          const isSelected = selectedPreferences.includes(pref.id);
          const badgeColors = getBadgeColors(pref.badgeType);
          const IconComponent = pref.icon;

          return (
            <TouchableOpacity
              key={pref.id}
              style={[
                styles.preferenceCard,
                { backgroundColor: currentCard, borderColor: currentBorder },
              ]}
              onPress={() => togglePreference(pref.id)}
              activeOpacity={0.7}
            >
              {/* Checkbox */}
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: isSelected ? currentText : 'transparent',
                      borderColor: isSelected ? currentText : descTextColor,
                    },
                  ]}
                >
                  {isSelected && <Check size={16} color={currentBackground} />}
                </View>
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={[styles.cardTitle, { color: currentText }]}>
                    {pref.title}
                  </Text>
                  <IconComponent size={16} color={pref.iconColor} />
                </View>
                <Text style={[styles.cardSubtitle, { color: descTextColor }]}>
                  {pref.subtitle}
                </Text>
              </View>

              {/* Badge */}
              <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
                <Text style={[styles.badgeText, { color: badgeColors.text }]}>
                  {pref.badge}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: currentBackground, borderTopColor: currentBorder }]}>
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: colors.primary }]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnPrimaryText, { color: '#ffffff' }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 24,
    paddingBottom: 40,
  },

  // Title Section
  titleSection: {
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Preference Card
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 12,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Footer
  footer: {
    padding: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  btnPrimary: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreditCardPreferencesScreen;
