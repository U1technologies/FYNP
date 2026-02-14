/**
 * FYNP Credit Card Income Screen (Step 3/4)
 * Enter income details for personalized recommendations
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
  Wallet,
  Briefcase,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';

const CreditCardIncomeScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;

  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const descTextColor = theme.textSecondary;

  const [incomeType, setIncomeType] = useState('salaried'); // 'salaried' or 'business'
  const [annualIncome, setAnnualIncome] = useState(2320000); // ₹23,20,000

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleContinue = () => {
    // Navigate to next step (4/4)
    navigation.navigate('CreditCardSpends');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentBorder }]}>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: currentText }]}>Enter Details</Text>
          <Text style={[styles.headerSubtitle, { color: descTextColor }]}>3/4</Text>
        </View>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
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
        {/* Title Section */}
        <View style={styles.textSection}>
          <Text style={[styles.mainTitle, { color: currentText }]}>
            Enter Your Income Details
          </Text>
          <Text style={[styles.subText, { color: descTextColor }]}>
            Used only to personalize your card and benefit recommendations.
          </Text>
        </View>

        {/* Selection Grid */}
        <View style={styles.selectionGrid}>
          {/* Salaried Card */}
          <TouchableOpacity
            style={[
              styles.selectionCard,
              {
                backgroundColor: currentCard,
                borderColor: incomeType === 'salaried' ? colors.primary : currentBorder,
              },
              incomeType === 'salaried' && styles.selectionCardActive,
            ]}
            onPress={() => setIncomeType('salaried')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: incomeType === 'salaried'
                    ? colors.primary
                    : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                },
              ]}
            >
              <Wallet
                size={20}
                color={incomeType === 'salaried' ? '#ffffff' : descTextColor}
              />
            </View>
            <Text
              style={[
                styles.cardLabel,
                {
                  color: incomeType === 'salaried'
                    ? colors.primary
                    : currentText
                },
              ]}
            >
              Salaried
            </Text>
          </TouchableOpacity>

          {/* Business Card */}
          <TouchableOpacity
            style={[
              styles.selectionCard,
              {
                backgroundColor: currentCard,
                borderColor: incomeType === 'business' ? colors.primary : currentBorder,
              },
              incomeType === 'business' && styles.selectionCardActive,
            ]}
            onPress={() => setIncomeType('business')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: incomeType === 'business'
                    ? colors.primary
                    : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                },
              ]}
            >
              <Briefcase
                size={20}
                color={incomeType === 'business' ? '#ffffff' : descTextColor}
              />
            </View>
            <Text
              style={[
                styles.cardLabel,
                {
                  color: incomeType === 'business'
                    ? colors.primary
                    : currentText
                },
              ]}
            >
              Business
            </Text>
          </TouchableOpacity>
        </View>

        {/* Income Slider Section */}
        <View style={styles.sliderSection}>
          <View style={styles.sliderHeader}>
            <Text style={[styles.sliderLabel, { color: currentText }]}>
              Annual Income (In-hand)
            </Text>
            <Text style={[styles.sliderValue, { color: currentText }]}>
              {formatCurrency(annualIncome)}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <View style={[styles.sliderTrack, { backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.15)' : 'rgba(255, 145, 77, 0.1)' }]}>
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${(annualIncome / 5000000) * 100}%`,
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={100000}
              maximumValue={5000000}
              step={10000}
              value={annualIncome}
              onValueChange={setAnnualIncome}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={colors.primary}
            />
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
  navBtn: {
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

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
    gap: 32,
  },

  // Text Section
  textSection: {
    gap: 8,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Selection Grid
  selectionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  selectionCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  selectionCardActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Slider Section
  sliderSection: {
    gap: 20,
    marginTop: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: 24,
    justifyContent: 'center',
  },
  sliderTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    position: 'absolute',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 3,
  },
  slider: {
    width: '100%',
    height: 24,
  },

  // Footer
  footer: {
    padding: 16,
    paddingHorizontal: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
  },
  btnPrimary: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreditCardIncomeScreen;
