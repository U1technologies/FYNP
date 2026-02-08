import React from 'react';
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
  ArrowLeft,
  Search,
} from 'lucide-react-native';

import PersonalLoanContent from './components/PersonalLoanContent';
import EducationLoanContent from './components/EducationLoanContent';
import HomeLoanContent from './components/HomeLoanContent';
import BusinessLoanContent from './components/BusinessLoanContent';

const LoanMarketplaceScreen = ({ navigation, route }) => {
  const { selectedLoanType } = route.params || {};
  const [activeTab, setActiveTab] = React.useState(selectedLoanType || 'Personal');

  React.useEffect(() => {
    if (selectedLoanType) {
      setActiveTab(selectedLoanType);
    }
  }, [selectedLoanType]);

  const tabs = ['Personal', 'Education', 'Home Loan', 'Business', 'LAP'];

  const getHeaderTitle = () => {
    if (!selectedLoanType) return 'Loan Marketplace';

    if (activeTab === 'Personal') return 'Personal Loans';
    if (activeTab === 'Education') return 'Education Loans';
    if (activeTab === 'Home Loan') return 'Home Loans';
    if (activeTab === 'Business') return 'Business Loans';
    if (activeTab === 'LAP') return 'Loan Against Property';
    return `${activeTab} Loans`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal':
        return <PersonalLoanContent />;
      case 'Education':
        return <EducationLoanContent />;
      case 'Home Loan':
        return <HomeLoanContent />;
      case 'Business':
        return <BusinessLoanContent />;
      case 'LAP':
        return (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ color: colors.textMuted }}>Loan Against Property coming soon</Text>
          </View>
        );
      default:
        return <PersonalLoanContent />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getHeaderTitle()}
        </Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Search size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        scrollEventThrottle={16}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabPill,
              activeTab === tab && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },

  backBtn: {
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    flexShrink: 0,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    letterSpacing: 0.3,
    marginHorizontal: 8,
  },

  searchBtn: {
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    flexShrink: 0,
  },

  // Tabs
  tabsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },

  tabPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 85,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabPillActive: {
    backgroundColor: colors.secondaryBg,
    borderColor: colors.secondaryBg,
    shadowColor: colors.secondaryBg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    includeFontPadding: false,
  },

  tabTextActive: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },

  // Scroll Content
  scrollContent: {
    paddingBottom: 30,
    backgroundColor: colors.background,
  },
});

export default LoanMarketplaceScreen;
