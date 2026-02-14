/**
 * FYNP Credit Card Spends Screen (Step 4/4)
 * Distribute monthly spends across categories
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
  Lightbulb,
  ShoppingCart,
  Utensils,
  Laptop,
  ShoppingBag,
  Fuel,
  Stethoscope,
  GraduationCap,
  Gem,
  Plane,
  Globe,
  Smartphone,
  Home,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';

const CreditCardSpendsScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;

  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const descTextColor = theme.textSecondary;

  // Category spends state
  const [spends, setSpends] = useState({
    bills: 18000,
    groceries: 39000,
    dining: 36500,
    onlineShopping: 49000,
    inStoreShopping: 57000,
    fuel: 1000,
    insurance: 81000,
    education: 0,
    jewellery: 0,
    flightsHotels: 116000,
    forex: 14500,
    upi: 20500,
    rent: 24000,
  });

  const categories = [
    {
      id: 'bills',
      label: 'Bills & Utilities',
      icon: Lightbulb,
      iconColor: '#fbbf24',
      max: 100000,
    },
    {
      id: 'groceries',
      label: 'Groceries & Quick Commerce',
      icon: ShoppingCart,
      iconColor: '#94a3b8',
      max: 100000,
    },
    {
      id: 'dining',
      label: 'Dining & Food Delivery',
      icon: Utensils,
      iconColor: '#f97316',
      max: 100000,
    },
    {
      id: 'onlineShopping',
      label: 'Online Shopping',
      icon: Laptop,
      iconColor: '#a8a29e',
      max: 150000,
    },
    {
      id: 'inStoreShopping',
      label: 'In-Store Shopping',
      icon: ShoppingBag,
      iconColor: '#f472b6',
      max: 150000,
    },
    {
      id: 'fuel',
      label: 'Fuel',
      icon: Fuel,
      iconColor: '#ef4444',
      max: 50000,
    },
    {
      id: 'insurance',
      label: 'Insurance',
      icon: Stethoscope,
      iconColor: '#3b82f6',
      max: 200000,
    },
    {
      id: 'education',
      label: 'Education',
      icon: GraduationCap,
      iconColor: '#eab308',
      max: 150000,
    },
    {
      id: 'jewellery',
      label: 'Jewellery & Gold',
      icon: Gem,
      iconColor: '#a855f7',
      max: 200000,
    },
    {
      id: 'flightsHotels',
      label: 'Flights & Hotels',
      icon: Plane,
      iconColor: '#06b6d4',
      max: 200000,
    },
    {
      id: 'forex',
      label: 'Forex Spends',
      icon: Globe,
      iconColor: '#10b981',
      max: 100000,
    },
    {
      id: 'upi',
      label: 'UPI Payments (Merchants)',
      icon: Smartphone,
      iconColor: '#64748b',
      max: 100000,
    },
    {
      id: 'rent',
      label: 'Rent Payments',
      icon: Home,
      iconColor: '#f43f5e',
      max: 150000,
    },
  ];

  const totalSpends = Object.values(spends).reduce((sum, val) => sum + val, 0);

  const updateSpend = (categoryId, value) => {
    setSpends((prev) => ({
      ...prev,
      [categoryId]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleContinue = () => {
    // Navigate to credit cards listing
    navigation.navigate('CreditCards');
  };

  const renderCategorySlider = (category) => {
    const IconComponent = category.icon;
    const value = spends[category.id];
    const percentage = (value / category.max) * 100;

    return (
      <View key={category.id} style={styles.categoryItem}>
        <View style={styles.catHeader}>
          <View style={styles.catName}>
            <Text style={[styles.catNameText, { color: currentText }]}>
              {category.label}
            </Text>
            <IconComponent size={16} color={category.iconColor} />
          </View>
          <Text style={[styles.catAmount, { color: descTextColor }]}>
            {formatCurrency(value)}
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <View style={[styles.sliderTrack, { backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.15)' : 'rgba(255, 145, 77, 0.1)' }]}>
            <View
              style={[
                styles.sliderFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={category.max}
            step={500}
            value={value}
            onValueChange={(val) => updateSpend(category.id, val)}
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
          style={[styles.navBtn, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: currentText }]}>Enter Details</Text>
          <Text style={[styles.headerSubtitle, { color: descTextColor }]}>4/4</Text>
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
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Monthly Spends</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(totalSpends)}</Text>
          <Text style={styles.summaryDesc}>
            Distribute your monthly spends across categories
          </Text>
        </View>

        {/* Categories List */}
        <View style={styles.categoryList}>
          {categories.map((category) => renderCategorySlider(category))}
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
    padding: 16,
    paddingBottom: 40,
    gap: 24,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  summaryDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },

  // Category List
  categoryList: {
    gap: 28,
  },
  categoryItem: {
    gap: 12,
  },
  catHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  catNameText: {
    fontSize: 15,
    fontWeight: '500',
  },
  catAmount: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Slider
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

export default CreditCardSpendsScreen;
