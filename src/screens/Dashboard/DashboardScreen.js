/**
 * FYNP Dashboard Screen - Loan Home Reorganized
 * Redesigned loan marketplace with featured products
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import {
  Bell,
  Settings2,
  Sparkles,
  Wallet,
  GraduationCap,
  Briefcase,
  House,
  CreditCard,
  Gauge,
  FileBadge,
  Calculator,
  BarChart3,
  BadgeIndianRupee,
  FileText,
  Wand2,
  Zap,
  ShieldCheck,
  Search,
  Users,
  Home,
  PieChart,
  UserRound,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';


import { useFocusEffect } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

const DashboardScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;



  // Enhanced Light Mode Colors
  // Enhanced Light Mode Colors
  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const primaryBlue = colors.primaryBg; // #0e499c
  const primaryOrange = colors.secondaryBg; // #ff914d

  // Card backgrounds with blue tint for light mode
  const cardBgPrimary = isDarkMode ? 'rgba(30, 27, 75, 0.8)' : theme.secondary; // Use theme.secondary for light tint
  const cardBgSecondary = theme.muted;

  // Icon colors - Orange accent
  const iconColor = isDarkMode ? currentText : primaryOrange;
  const iconBgColor = isDarkMode ? theme.muted : 'rgba(255, 145, 77, 0.1)';

  // Text Colors
  const sectionTitleColor = theme.textPrimary;
  const descTextColor = theme.textSecondary;

  const { user, updateUser } = useAuthStore();
  const userName = user?.personal?.firstName || 'Guest';

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await authService.getProfile();
      if (response.success && response.data?.user) {
        // Merge with existing user (to keep tokens if any) or replace?
        // Usually replace user data but keep tokens.
        // store's setUser replaces 'user' object.
        updateUser(response.data.user);
      }
    };
    fetchProfile();
  }, []);

  const [activeTab, setActiveTab] = React.useState('Home');
  const scrollX = useRef(new Animated.Value(0)).current;

  // Reset active tab to Home when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('Home');
    }, [])
  );

  // Lenders list - duplicated for seamless loop
  const lenders = ['HDFC Bank', 'ICICI Bank', 'Bajaj Finserv', 'IDFC FIRST', 'Kotak', 'Axis Bank'];
  const duplicatedLenders = [...lenders, ...lenders, ...lenders];

  useEffect(() => {
    const startAnimation = () => {
      scrollX.setValue(0);
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -1200,
          duration: 20000,
          useNativeDriver: true,
          isInteraction: false,
        })
      ).start();
    };

    startAnimation();
  }, [scrollX]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleNavigation = (screenName) => {
    setActiveTab(screenName);
    if (screenName === 'Home') {
      navigation.navigate('Home');
    } else if (screenName === 'Status') {
      navigation.navigate('LoanApplicationStatus');
    } else if (screenName === 'Account') {
      navigation.navigate('Account');
    } else if (screenName === 'Offers') {
      navigation.navigate('Offers');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={styles.homeHeader}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => handleNavigation('Account')}>
          <View style={[styles.headerAvatar, {
            borderColor: primaryOrange,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center'
          }]}>
            <Text style={{ color: primaryOrange, fontSize: 18, fontWeight: 'bold' }}>
              {(userName || 'G').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={[styles.headerGreeting, { color: descTextColor }]}>{getGreeting()},</Text>
            <Text style={[styles.headerUsername, { color: currentText }]}>{userName}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: iconBgColor, borderColor: isDarkMode ? currentBorder : primaryOrange }]}>
            <Bell size={18} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: iconBgColor, borderColor: isDarkMode ? currentBorder : primaryOrange }]}>
            <Settings2 size={18} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}
      >

        {/* Smart Loan Picks Banner */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Smart loan picks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            scrollEventThrottle={16}
          >
            {/* Featured Card */}
            <TouchableOpacity
              style={[styles.smartCard, styles.featuredCard, { backgroundColor: cardBgPrimary, borderColor: isDarkMode ? currentBorder : primaryBlue }]}
              onPress={() => navigation.navigate('LoanMarketplace')}
            >
              <Text style={[styles.cardLabel, { color: descTextColor }]}>Featured</Text>
              <Text style={[styles.cardTitle, { color: isDarkMode ? '#ffffff' : currentText }]}>Compare loans. Choose smarter.</Text>
              <Text style={[styles.cardDesc, { color: isDarkMode ? '#a1a1aa' : descTextColor }]}>See offers from top banks & NBFCs in one view.</Text>
              <View style={styles.cardAction}>
                <Text style={[styles.cardActionText, { color: isDarkMode ? '#ffffff' : primaryBlue }]}>View loan marketplace</Text>
                <ArrowRight size={14} color={isDarkMode ? '#ffffff' : primaryBlue} />
              </View>
            </TouchableOpacity>

            {/* Track Goals Card */}
            <TouchableOpacity
              style={[
                styles.smartCard,
                styles.trackGoalsCard,
                { backgroundColor: currentCard, borderColor: currentBorder }
              ]}
              onPress={() => navigation.navigate('EMICalculator')}
            >
              <Text style={[styles.cardLabel, { color: descTextColor }]}>Track goals</Text>
              <Text style={[styles.cardTitle, { color: currentText }]}>Plan your EMIs before you apply</Text>
              <Text style={[styles.cardDesc, { color: descTextColor }]}>Use EMI & interest tools to stay in control.</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Trusted Partners */}
        <View style={styles.sectionFullWidth}>
          <Text style={[styles.partnerLabel, { color: theme.textMuted }]}>Rates from 10.99% RBI Registered Partners</Text>
          <View style={styles.lendersContainer}>
            <View style={[styles.lendersGradient, { backgroundColor: theme.primaryBg }]}>
              <View style={styles.lendersScrollWrapper}>
                <Animated.View
                  style={[
                    styles.lendersTrack,
                    {
                      transform: [{ translateX: scrollX }],
                    },
                  ]}>
                  {duplicatedLenders.map((lender, index) => (
                    <Text key={`${lender}-${index}`} style={[styles.lenderLogo, { color: '#ffffff' }]}>
                      {lender}
                    </Text>
                  ))}
                </Animated.View>
              </View>
            </View>
          </View>
        </View>

        {/* Featured For You */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Featured for you</Text>

          {/* Hero Card */}
          <TouchableOpacity
            style={[styles.heroCard, { backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.8)' : currentCard, borderColor: currentBorder }]}
            onPress={() =>
              navigation.navigate('LoanConfiguration', {
                bankName: 'HDFC Bank',
                bankLogo: 'HDFC',
                interestRate: 10.75,
              })
            }
          >
            <View style={[styles.recommendedTag, { backgroundColor: theme.secondaryBg }]}>
              <Text style={[styles.recommendedTagText, { color: '#ffffff' }]}>Recommended</Text>
            </View>
            <View style={styles.bentoIconBox}>
              <Sparkles size={20} color="#ffffff" />
            </View>
            <Text style={[styles.bentoTitle, { color: currentText }]}>Check your max loan limit</Text>
            <Text style={[styles.bentoText, { color: descTextColor }]}>Get instant approval up to 25 Lakhs without affecting credit score.</Text>
            <View style={styles.bentoAction}>
              <Text style={[styles.bentoActionText, { color: isDarkMode ? '#ffffff' : primaryBlue }]}>Check Eligibility</Text>
              <ArrowRight size={14} color={isDarkMode ? '#ffffff' : primaryBlue} />
            </View>
          </TouchableOpacity>

          {/* Product Grid - 2x2 Layout */}
          <View style={styles.grid2Col}>
            {/* Personal Loan */}
            <TouchableOpacity
              style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}
              onPress={() => navigation.navigate('PersonalLoans')}
            >
              <View style={[styles.bentoTag, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 145, 77, 0.1)' }]}>
                <Text style={[styles.bentoTagText, { color: isDarkMode ? currentText : primaryOrange }]}>Fast</Text>
              </View>
              <View style={[styles.bentoIconBox, { backgroundColor: iconBgColor, borderWidth: 1, borderColor: isDarkMode ? 'transparent' : primaryOrange }]}>
                <Wallet size={20} color={iconColor} />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Personal Loan</Text>
              <Text style={[styles.bentoText, { color: descTextColor }]}>From 10.99%</Text>
            </TouchableOpacity>

            {/* Education Loan */}
            <TouchableOpacity
              style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}
              onPress={() =>
                navigation.navigate('EducationLoans')
              }
            >
              <View style={[styles.bentoTag, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
                <Text style={[styles.bentoTagText, { color: '#4ade80' }]}>Students</Text>
              </View>
              <View style={[styles.bentoIconBox, { backgroundColor: iconBgColor, borderWidth: 1, borderColor: isDarkMode ? 'transparent' : primaryOrange }]}>
                <GraduationCap size={20} color={iconColor} />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Education Loan</Text>
              <Text style={[styles.bentoText, { color: descTextColor }]}>Flexible moratorium</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row - Credit Score & Credit Cards */}
          <View style={styles.grid2Col}>
            {/* Credit Score Card */}
            <TouchableOpacity
              style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}
              onPress={() => navigation.navigate('CreditScore')}
            >
              <View style={[styles.bentoTag, { backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)' }]}>
                <Text style={[styles.bentoTagText, { color: '#3b82f6' }]}>FREE</Text>
              </View>
              <View style={[styles.bentoIconBox, { backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)' }]}>
                <Gauge size={20} color="#3b82f6" />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Credit score</Text>
              <Text style={[styles.bentoText, { color: descTextColor }]}>Check score & report in 2 taps.</Text>
            </TouchableOpacity>

            {/* Credit Cards Card */}
            <TouchableOpacity
              style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}
              onPress={() => navigation.navigate('CreditCardPreferences')}
            >
              <View style={[styles.bentoTag, { backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)' }]}>
                <Text style={[styles.bentoTagText, { color: '#22c55e' }]}>OFFERS</Text>
              </View>
              <View style={[styles.bentoIconBox, { backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)' }]}>
                <CreditCard size={20} color="#8b5cf6" />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Credit cards</Text>
              <Text style={[styles.bentoText, { color: descTextColor }]}>Best cards picked for you.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Business & MSME Loans */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>Business & MSME Loans</Text>
          <TouchableOpacity
            style={[styles.bentoCardWide, { backgroundColor: currentCard, borderColor: currentBorder }]}
            onPress={() => navigation.navigate('BusinessLoans')}
          >
            <View style={[styles.bentoIconBox, { backgroundColor: iconBgColor, borderWidth: 1, borderColor: isDarkMode ? 'transparent' : primaryOrange }]}>
              <Briefcase size={20} color={iconColor} />
            </View>
            <View style={styles.bentoWideContent}>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Business & MSME Loans</Text>
              <Text style={[styles.bentoText, { color: descTextColor }]}>GST-based offers • Low documentation</Text>
            </View>
            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* Secured Loans */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>Secured loans</Text>
          <View style={styles.grid2Col}>
            <TouchableOpacity
              style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}
              onPress={() => navigation.navigate('HomeLoans')}
            >
              <View style={[styles.bentoIconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <House size={20} color={theme.textTertiary} />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>Home Loan</Text>
              <Text style={[styles.bentoText, { color: theme.textTertiary }]}>From 8.5% p.a.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bentoCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <View style={[styles.bentoIconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <FileBadge size={20} color={theme.textTertiary} />
              </View>
              <Text style={[styles.bentoTitle, { color: currentText }]}>LAP</Text>
              <Text style={[styles.bentoText, { color: theme.textTertiary }]}>Loan against property</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tools */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: currentText }]}>Tools</Text>
            <Text style={styles.sectionLink}>View all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toolsScrollContent}
          >
            <TouchableOpacity
              style={[styles.toolChip, {
                backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.8)' : colors.white,
                borderColor: isDarkMode ? `${colors.primaryBg}66` : theme.border
              }]}
              onPress={() => navigation.navigate('EMICalculator')}
            >
              <View style={[styles.toolIcon, { backgroundColor: theme.backgroundSecondary }]}>
                <Calculator size={16} color={currentText} />
              </View>
              <Text style={[styles.toolName, { color: currentText }]}>EMI Calc</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toolChip, {
                backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.8)' : colors.white,
                borderColor: isDarkMode ? `${colors.primaryBg}66` : theme.border
              }]}
              onPress={() => navigation.navigate('LoanComparison')}
            >
              <View style={[styles.toolIcon, { backgroundColor: theme.backgroundSecondary }]}>
                <BarChart3 size={16} color={currentText} />
              </View>
              <Text style={[styles.toolName, { color: currentText }]}>Compare</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toolChip, {
                backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.8)' : colors.white,
                borderColor: isDarkMode ? `${colors.primaryBg}66` : theme.border
              }]}
              onPress={() => navigation.navigate('LoanEligibility')}
            >
              <View style={[styles.toolIcon, { backgroundColor: theme.backgroundSecondary }]}>
                <BadgeIndianRupee size={16} color={currentText} />
              </View>
              <Text style={[styles.toolName, { color: currentText }]}>Eligibility</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toolChip, {
                backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.8)' : colors.white,
                borderColor: isDarkMode ? `${colors.primaryBg}66` : theme.border
              }]}
              onPress={() => navigation.navigate('TaxSaver')}
            >
              <View style={[styles.toolIcon, { backgroundColor: theme.backgroundSecondary }]}>
                <FileText size={16} color={currentText} />
              </View>
              <Text style={[styles.toolName, { color: currentText }]}>Tax Saver</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Guidance Banner */}
        <TouchableOpacity style={[styles.guidanceBanner, { backgroundColor: currentCard, borderColor: currentBorder, borderWidth: 1, overflow: 'hidden' }]}>

          <View style={styles.guidanceInfo}>
            <Text style={[styles.cardTitle, { color: currentText }]}>Not sure which loan fits?</Text>

            <Text style={[styles.guidanceDesc, { color: theme.textSecondary }]}>
              Let FYNP AI match you with the right product.
            </Text>

            {/* BUTTON MOVED BELOW TEXT */}
            <View style={styles.guidanceBtnBottom}>
              <Wand2 size={14} color="#ffffff" />
              <Text style={styles.guidanceBtnText}>Get recommendation</Text>
            </View>
          </View>

        </TouchableOpacity>


        {/* Why FYNP */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>Why FYNP?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.whyScrollContent}
          >
            <View style={[styles.whyCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Zap size={18} color="#fbbf24" />
              <Text style={[styles.whyText, { color: currentText }]}>Instant Approval</Text>
            </View>

            <View style={[styles.whyCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <ShieldCheck size={18} color="#22c55e" />
              <Text style={[styles.whyText, { color: currentText }]}>100% Secure</Text>
            </View>

            <View style={[styles.whyCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Search size={18} color="#60a5fa" />
              <Text style={[styles.whyText, { color: currentText }]}>No Hidden Fees</Text>
            </View>

            <View style={[styles.whyCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Users size={18} color="#f472b6" />
              <Text style={[styles.whyText, { color: currentText }]}>Expert Support</Text>
            </View>
          </ScrollView>
        </View>

        {/* Footer Trust */}
        <Text style={[styles.trustText, { color: theme.textSecondary }]}>100% security iOS 2007 verified ad fintech</Text>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation using Custom Bar for Dashboard as before */}
      <View style={[styles.bottomNav, { backgroundColor: currentCard, borderTopColor: currentBorder }]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Home')}>
          <Home size={24} color={activeTab === 'Home' ? theme.secondaryBg : theme.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === 'Home' ? theme.secondaryBg : theme.textMuted }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Status')}>
          <PieChart size={24} color={activeTab === 'Status' ? theme.secondaryBg : theme.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === 'Status' ? theme.secondaryBg : theme.textMuted }]}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Account')}>
          <UserRound size={24} color={activeTab === 'Account' ? theme.secondaryBg : theme.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === 'Account' ? theme.secondaryBg : theme.textMuted }]}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Offers')}>
          <Sparkles size={24} color={activeTab === 'Offers' ? theme.secondaryBg : theme.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === 'Offers' ? theme.secondaryBg : theme.textMuted }]}>Offers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  homeHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.border,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  headerTextGroup: {
    gap: 2,
  },

  headerGreeting: {
    fontSize: 12,
    color: colors.textTertiary,
  },

  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Content Scroll
  contentScroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    gap: 24,
  },

  section: {
    gap: 12,
    marginTop: 16,
  },

  sectionFullWidth: {
    gap: 12,
    marginHorizontal: -20,
    paddingHorizontal: 0,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionLink: {
    fontSize: 13,
    color: colors.secondaryBg,
    fontWeight: '500',
  },

  // Smart Loan Picks Carousel
  carouselContent: {
    gap: 16,
    paddingRight: 10,
  },

  smartCard: {
    minWidth: 260,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },

  featuredCard: {
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    borderColor: `${colors.primaryBg}66`,
  },

  trackGoalsCard: {
    backgroundColor: colors.backgroundCard,
    borderColor: colors.border,
  },

  cardLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 18,
    width: '90%',
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 12,
    width: '85%',
    color: colors.textSecondary,
    marginBottom: 10,
  },

  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    width: 'auto',
    alignSelf: 'flex-start',
  },

  cardActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Trusted Partners
  partnerLabel: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  lendersContainer: {
    width: '100%',
    overflow: 'hidden',
  },

  lendersGradient: {
    backgroundColor: colors.primaryBg,
    paddingVertical: 12,
    overflow: 'hidden',
  },

  lendersScrollWrapper: {
    overflow: 'hidden',
  },

  lendersTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },

  lenderLogo: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.95,
    letterSpacing: 0.8,
    // minWidth: 100,
    textAlign: 'center',
  },

  // Featured Grid
  heroCard: {
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    borderColor: `${colors.primaryBg}66`,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },

  recommendedTag: {
    position: 'absolute',
    top: 8,
    right: 6,
    backgroundColor: colors.secondaryBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 5,
  },


  recommendedTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  bentoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  bentoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },

  bentoText: {
    fontSize: 12,
    color: colors.textTertiary,
    lineHeight: 18,
  },

  bentoAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },

  bentoActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  grid2Col: {
    flexDirection: 'row',
    gap: 12,
  },

  bentoCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  bentoTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },

  bentoTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  bentoCardWide: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  bentoWideContent: {
    flex: 1,
  },

  // Tools
  toolsScrollContent: {
    gap: 12,
    paddingRight: 20,
  },

  toolChip: {
    minWidth: 110,
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    borderColor: `${colors.primaryBg}66`,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
  },

  toolIcon: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Guidance Banner
  guidanceBanner: {
    backgroundColor: '#1e1b4b',   // base indigo
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',

    // subtle depth
    shadowColor: '#312e81',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',

  },


  guidanceInfo: {
    flex: 1,
  },

  guidanceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },

  guidanceDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  guidanceBtn: {
    backgroundColor: colors.secondaryBg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guidanceBtnBottom: {
    marginTop: 14,
    alignSelf: 'flex-start',

    backgroundColor: colors.secondaryBg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },


  guidanceBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Why FYNP
  whyScrollContent: {
    gap: 12,
    paddingRight: 20,
  },

  whyCard: {
    minWidth: 160,
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  whyText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Trust Text
  trustText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 16,
    zIndex: 10,
  },

  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: 60,
  },

  navLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '500',
  },
});

export default DashboardScreen;
