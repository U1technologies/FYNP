/**
 * FYNP Dashboard Screen - Loan Home Reorganized
 * Redesigned loan marketplace with featured products
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bell,
  Settings2,
  Sparkles,
  Wallet,
  GraduationCap,
  Briefcase,
  Clock3,
  ShoppingBag,
  House,
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

const DashboardScreen = ({navigation}) => {
  const userName = 'Arjun';
  const [activeTab, setActiveTab] = React.useState('Home');

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
      navigation.navigate('Portfolio');
    } else if (screenName === 'Account') {
      navigation.navigate('Account');
    } else if (screenName === 'Offers') {
      navigation.navigate('Offers');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.homeHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Image
              source={{uri: 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FSouth%20Asian%2F3'}}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerGreeting}>{getGreeting()},</Text>
            <Text style={styles.headerUsername}>{userName}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Bell size={18} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Settings2 size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}>

        {/* Smart Loan Picks Banner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart loan picks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            scrollEventThrottle={16}
          >
            {/* Featured Card */}
            <TouchableOpacity
              style={[styles.smartCard, styles.featuredCard]}
              onPress={() => navigation.navigate('LoanMarketplace')}
            >
              <Text style={styles.cardLabel}>Featured</Text>
              <Text style={styles.cardTitle}>Compare loans. Choose smarter.</Text>
              <Text style={styles.cardDesc}>See offers from top banks & NBFCs in one view.</Text>
              <View style={styles.cardAction}>
                <Text style={styles.cardActionText}>View loan marketplace</Text>
                <ArrowRight size={14} color="#ffffff" />
              </View>
            </TouchableOpacity>

            {/* Track Goals Card */}
            <TouchableOpacity style={[styles.smartCard, styles.trackGoalsCard]}>
              <Text style={[styles.cardLabel, {color: '#a1a1aa'}]}>Track goals</Text>
              <Text style={[styles.cardTitle, {color: '#ffffff'}]}>Plan your EMIs before you apply</Text>
              <Text style={[styles.cardDesc, {color: '#a1a1aa'}]}>Use EMI & interest tools to stay in control.</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Trusted Partners */}
        <View style={styles.section}>
          <Text style={styles.partnerLabel}>Rates from 10.99% RBI Registered Partners</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lendersScrollContent}
          >
            <View style={styles.lendersTrack}>
              <Text style={styles.lenderLogo}>HDFC Bank</Text>
              <Text style={styles.lenderLogo}>ICICI Bank</Text>
              <Text style={styles.lenderLogo}>Bajaj Finserv</Text>
              <Text style={styles.lenderLogo}>IDFC FIRST</Text>
              <Text style={styles.lenderLogo}>Kotak</Text>
              <Text style={styles.lenderLogo}>Axis Bank</Text>
            </View>
          </ScrollView>
        </View>

        {/* Featured For You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured for you</Text>

          {/* Hero Card */}
          <TouchableOpacity
            style={styles.heroCard}
            onPress={() => navigation.navigate('LoanMarketplace')}
          >
            <View style={styles.recommendedTag}>
              <Text style={styles.recommendedTagText}>Recommended</Text>
            </View>
            <View style={styles.bentoIconBox}>
              <Sparkles size={20} color="#ffffff" />
            </View>
            <Text style={styles.bentoTitle}>Check your max loan limit</Text>
            <Text style={styles.bentoText}>Get instant approval up to 25 Lakhs without affecting credit score.</Text>
            <View style={styles.bentoAction}>
              <Text style={styles.bentoActionText}>Check Eligibility</Text>
              <ArrowRight size={14} color="#ffffff" />
            </View>
          </TouchableOpacity>

          {/* Product Grid */}
          <View style={styles.grid2Col}>
            {/* Personal Loan */}
            <TouchableOpacity
              style={styles.bentoCard}
              onPress={() => navigation.navigate('LoanMarketplace')}
            >
              <View style={styles.bentoTag}>
                <Text style={styles.bentoTagText}>Fast</Text>
              </View>
              <View style={styles.bentoIconBox}>
                <Wallet size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>Personal Loan</Text>
              <Text style={styles.bentoText}>From 10.99%</Text>
            </TouchableOpacity>

            {/* Education Loan */}
            <TouchableOpacity style={styles.bentoCard}>
              <View style={[styles.bentoTag, {backgroundColor: 'rgba(34, 197, 94, 0.1)'}]}>
                <Text style={[styles.bentoTagText, {color: '#4ade80'}]}>Students</Text>
              </View>
              <View style={styles.bentoIconBox}>
                <GraduationCap size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>Education Loan</Text>
              <Text style={styles.bentoText}>Flexible moratorium</Text>
            </TouchableOpacity>
          </View>

          {/* Business Loan - Full Width */}
          <TouchableOpacity style={styles.bentoCardWide}>
            <View style={styles.bentoIconBox}>
              <Briefcase size={20} color="#a1a1aa" />
            </View>
            <View style={styles.bentoWideContent}>
              <Text style={styles.bentoTitle}>Business & MSME Loans</Text>
              <Text style={styles.bentoText}>GST-based offers Low documentation</Text>
            </View>
            <ChevronRight size={20} color="#71717a" />
          </TouchableOpacity>
        </View>

        {/* Short Term Loans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Short term loans</Text>
          <View style={styles.grid2Col}>
            <TouchableOpacity style={styles.bentoCard}>
              <View style={styles.bentoIconBox}>
                <Clock3 size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>Payday Loan</Text>
              <Text style={styles.bentoText}>Up to 3 months</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bentoCard}>
              <View style={styles.bentoIconBox}>
                <ShoppingBag size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>BNPL</Text>
              <Text style={styles.bentoText}>Buy now, pay later</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secured Loans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Secured loans</Text>
          <View style={styles.grid2Col}>
            <TouchableOpacity style={styles.bentoCard}>
              <View style={styles.bentoIconBox}>
                <House size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>Home Loan</Text>
              <Text style={styles.bentoText}>From 8.5% p.a.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bentoCard}>
              <View style={styles.bentoIconBox}>
                <FileBadge size={20} color="#a1a1aa" />
              </View>
              <Text style={styles.bentoTitle}>LAP</Text>
              <Text style={styles.bentoText}>Loan against property</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tools */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tools</Text>
            <Text style={styles.sectionLink}>View all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toolsScrollContent}
          >
            <View style={styles.toolChip}>
              <View style={styles.toolIcon}>
                <Calculator size={16} color="#ffffff" />
              </View>
              <Text style={styles.toolName}>EMI Calc</Text>
            </View>

            <View style={styles.toolChip}>
              <View style={styles.toolIcon}>
                <BarChart3 size={16} color="#ffffff" />
              </View>
              <Text style={styles.toolName}>Compare</Text>
            </View>

            <View style={styles.toolChip}>
              <View style={styles.toolIcon}>
                <BadgeIndianRupee size={16} color="#ffffff" />
              </View>
              <Text style={styles.toolName}>Eligibility</Text>
            </View>

            <View style={styles.toolChip}>
              <View style={styles.toolIcon}>
                <FileText size={16} color="#ffffff" />
              </View>
              <Text style={styles.toolName}>Tax Saver</Text>
            </View>
          </ScrollView>
        </View>

        {/* Guidance Banner */}
        <TouchableOpacity style={styles.guidanceBanner}>
          <View style={styles.guidanceInfo}>
            <Text style={styles.guidanceTitle}>Not sure which loan fits?</Text>
            <Text style={styles.guidanceDesc}>Let FYNP AI match you with the right product.</Text>
          </View>
          <View style={styles.guidanceBtn}>
            <Wand2 size={14} color="#ffffff" />
            <Text style={styles.guidanceBtnText}>Get recommendation</Text>
          </View>
        </TouchableOpacity>

        {/* Why FYNP */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why FYNP?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.whyScrollContent}
          >
            <View style={styles.whyCard}>
              <Zap size={18} color="#fbbf24" />
              <Text style={styles.whyText}>Instant Approval</Text>
            </View>

            <View style={styles.whyCard}>
              <ShieldCheck size={18} color="#22c55e" />
              <Text style={styles.whyText}>100% Secure</Text>
            </View>

            <View style={styles.whyCard}>
              <Search size={18} color="#60a5fa" />
              <Text style={styles.whyText}>No Hidden Fees</Text>
            </View>

            <View style={styles.whyCard}>
              <Users size={18} color="#f472b6" />
              <Text style={styles.whyText}>Expert Support</Text>
            </View>
          </ScrollView>
        </View>

        {/* Footer Trust */}
        <Text style={styles.trustText}>100% security iOS 2007 verified ad fintech</Text>

        <View style={{height: 80}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Home')}>
          <Home size={24} color={activeTab === 'Home' ? '#8b5cf6' : '#71717a'} />
          <Text style={[styles.navLabel, {color: activeTab === 'Home' ? '#8b5cf6' : '#71717a'}]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Status')}>
          <PieChart size={24} color={activeTab === 'Status' ? '#8b5cf6' : '#71717a'} />
          <Text style={[styles.navLabel, {color: activeTab === 'Status' ? '#8b5cf6' : '#71717a'}]}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Account')}>
          <UserRound size={24} color={activeTab === 'Account' ? '#8b5cf6' : '#71717a'} />
          <Text style={[styles.navLabel, {color: activeTab === 'Account' ? '#8b5cf6' : '#71717a'}]}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Offers')}>
          <Sparkles size={24} color={activeTab === 'Offers' ? '#8b5cf6' : '#71717a'} />
          <Text style={[styles.navLabel, {color: activeTab === 'Offers' ? '#8b5cf6' : '#71717a'}]}>Offers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
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
    borderColor: '#27272a',
    backgroundColor: '#27272a',
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
    color: '#a1a1aa',
  },

  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  // Content Scroll
  contentScroll: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 24,
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionLink: {
    fontSize: 13,
    color: '#8b5cf6',
    fontWeight: '500',
  },

  // Smart Loan Picks Carousel
  carouselContent: {
    gap: 12,
    paddingRight: 12,
  },

  smartCard: {
    minWidth: 260,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },

  featuredCard: {
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },

  trackGoalsCard: {
    backgroundColor: '#141417',
    borderColor: '#27272a',
  },

  cardLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
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
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Trusted Partners
  partnerLabel: {
    fontSize: 11,
    color: '#71717a',
    textAlign: 'center',
    marginBottom: 8,
  },

  lendersScrollContent: {
    gap: 12,
    paddingRight: 20,
  },

  lendersTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 20,
  },

  lenderLogo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717a',
    opacity: 0.7,
  },

  // Featured Grid
  heroCard: {
    backgroundColor: 'linear-gradient(135deg, #4c1d95 0%, #09090b 100%)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    justifyContent: 'space-between',
  },

  recommendedTag: {
    backgroundColor: '#8b5cf6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 10,
  },

  recommendedTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },

  bentoText: {
    fontSize: 12,
    color: '#a1a1aa',
    lineHeight: 18,
  },

  bentoAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },

  bentoActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  grid2Col: {
    flexDirection: 'row',
    gap: 12,
  },

  bentoCard: {
    flex: 1,
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
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
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  bentoCardWide: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
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
    minWidth: 100,
    backgroundColor: '#18181b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },

  toolIcon: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Guidance Banner
  guidanceBanner: {
    backgroundColor: 'linear-gradient(to right, #1e1b4b, #312e81)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },

  guidanceInfo: {
    flex: 1,
  },

  guidanceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },

  guidanceDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  guidanceBtn: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  guidanceBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Why FYNP
  whyScrollContent: {
    gap: 12,
    paddingRight: 20,
  },

  whyCard: {
    minWidth: 160,
    backgroundColor: '#141417',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  whyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Trust Text
  trustText: {
    fontSize: 11,
    color: '#71717a',
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
    backgroundColor: 'rgba(9, 9, 11, 0.96)',
    borderTopWidth: 1,
    borderTopColor: '#27272a',
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
    color: '#71717a',
    fontWeight: '500',
  },
});

export default DashboardScreen;
