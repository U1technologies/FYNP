/**
 * FYNP Credit Card Lifestyle Screen (Step 2/4)
 * Choose lifestyle perks and card setup preferences
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
import Slider from '@react-native-community/slider';
import { colors } from '../../theme';
import {
  ArrowLeft,
  X,
  Plane,
  PlaneTakeoff,
  Flag,
  Ticket,
  CreditCard,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';

const CreditCardLifestyleScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;

  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const descTextColor = theme.textSecondary;

  // Slider states
  const [domesticLounges, setDomesticLounges] = useState(3);
  const [internationalLounges, setInternationalLounges] = useState(0);
  const [golfSessions, setGolfSessions] = useState(0);
  const [moviesEvents, setMoviesEvents] = useState(1);
  const [numberOfCards, setNumberOfCards] = useState(1);

  const lifestylePerks = [
    {
      id: 'domestic',
      label: 'Domestic Lounges',
      icon: Plane,
      iconColor: '#60a5fa',
      value: domesticLounges,
      setValue: setDomesticLounges,
      unit: 'time(s)/year',
      min: 0,
      max: 12,
      step: 1,
    },
    {
      id: 'international',
      label: 'International Lounges',
      icon: PlaneTakeoff,
      iconColor: '#94a3b8',
      value: internationalLounges,
      setValue: setInternationalLounges,
      unit: 'time(s)/year',
      min: 0,
      max: 12,
      step: 1,
    },
    {
      id: 'golf',
      label: 'Golf Sessions',
      icon: Flag,
      iconColor: '#ef4444',
      value: golfSessions,
      setValue: setGolfSessions,
      unit: 'time(s)/year',
      min: 0,
      max: 12,
      step: 1,
    },
    {
      id: 'movies',
      label: 'Movies & Events',
      icon: Ticket,
      iconColor: '#f472b6',
      value: moviesEvents,
      setValue: setMoviesEvents,
      unit: 'time(s)/month',
      min: 0,
      max: 12,
      step: 1,
    },
  ];

  const handleContinue = () => {
    // Navigate to next step (3/4)
    navigation.navigate('CreditCardIncome');
  };

  const renderSlider = (item) => {
    const IconComponent = item.icon;
    const percentage = (item.value / item.max) * 100;

    return (
      <View key={item.id} style={styles.sliderItem}>
        <View style={styles.labelRow}>
          <View style={styles.labelText}>
            <Text style={[styles.labelTextContent, { color: currentText }]}>
              {item.label}
            </Text>
            <IconComponent size={16} color={item.iconColor} />
          </View>
          <Text style={[styles.valueText, { color: descTextColor }]}>
            {item.value} {item.unit}
          </Text>
        </View>

        <View style={styles.rangeContainer}>
          <View style={[styles.rangeTrack, { backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.15)' : 'rgba(255, 145, 77, 0.1)' }]}>
            <View
              style={[
                styles.rangeFill,
                { width: `${percentage}%`, backgroundColor: colors.primary },
              ]}
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={item.min}
            maximumValue={item.max}
            step={item.step}
            value={item.value}
            onValueChange={item.setValue}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor={colors.primary}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentBorder }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: currentText }]}>Enter Details</Text>
          <Text style={[styles.headerSubtitle, { color: descTextColor }]}>2/4</Text>
        </View>
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <X size={20} color={currentText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Lifestyle Perks Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>
            Choose Your Lifestyle Perks
          </Text>

          <View style={styles.sliderGroup}>
            {lifestylePerks.map((item) => renderSlider(item))}
          </View>
        </View>

        {/* Card Setup Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>
            Your Ideal Card Setup
          </Text>

          <View style={styles.sliderItem}>
            <View style={styles.labelRow}>
              <View style={styles.labelText}>
                <Text style={[styles.labelTextContent, { color: currentText }]}>
                  Set Your Ideal Number of Cards
                </Text>
                <CreditCard size={16} color="#fbbf24" />
              </View>
              <Text style={[styles.valueText, { color: descTextColor }]}>
                {numberOfCards}
              </Text>
            </View>

            <View style={styles.rangeContainer}>
              <View style={[styles.rangeTrack, { backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.15)' : 'rgba(255, 145, 77, 0.1)' }]}>
                <View
                  style={[
                    styles.rangeFill,
                    { width: `${(numberOfCards / 5) * 100}%`, backgroundColor: colors.primary },
                  ]}
                />
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={numberOfCards}
                onValueChange={setNumberOfCards}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor={colors.primary}
              />
            </View>
          </View>
        </View>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
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
    padding: 20,
    paddingBottom: 40,
    gap: 32,
  },

  // Section
  section: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Slider Group
  sliderGroup: {
    gap: 24,
  },
  sliderItem: {
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelTextContent: {
    fontSize: 15,
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
  },

  // Range Slider
  rangeContainer: {
    position: 'relative',
    width: '100%',
    height: 24,
    justifyContent: 'center',
  },
  rangeTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  rangeFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 2,
  },
  slider: {
    width: '100%',
    height: 24,
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

export default CreditCardLifestyleScreen;
