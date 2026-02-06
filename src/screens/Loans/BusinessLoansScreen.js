/**
 * FYNP Business Loans Screen
 * Displays business and MSME loan offers from multiple lenders
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
import {ArrowLeft, ArrowRight, ShieldCheck} from 'lucide-react-native';

const BusinessLoansScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = React.useState('Business Loan');

  const loanTabs = [
    {id: 1, name: 'Personal'},
    {id: 2, name: 'Education'},
    {id: 3, name: 'Home Loan'},
    {id: 4, name: 'Business Loan'},
  ];

  const lenders = [
    {
      id: 1,
      name: 'HDFC Business Loan',
      description: 'Unsecured working capital for SMEs',
      rate: '12.5',
      maxAmount: 'Up to ₹50 Lakhs',
      badge: 'High approval rate',
      badgeColor: '#22c55e',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      logo: 'HDFC',
      logoBg: '#ffffff',
    },
    {
      id: 2,
      name: 'Avanse MSME Loan',
      description: 'For GST-registered small businesses',
      rate: '13.0',
      maxAmount: 'Up to ₹35 Lakhs',
      badge: 'Fast disbursal',
      badgeColor: '#8b5cf6',
      badgeBg: 'rgba(139, 92, 246, 0.15)',
      logo: 'AVS',
      logoBg: '#ffffff',
    },
    {
      id: 3,
      name: 'IDFC FIRST Business Loan',
      description: 'Digital process, low paperwork',
      rate: '11.9',
      maxAmount: 'Up to ₹30 Lakhs',
      badge: 'Digital',
      badgeColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      logo: 'IDFC',
      logoBg: '#ffffff',
    },
    {
      id: 4,
      name: 'SBI SME Loan',
      description: 'For small & medium enterprises',
      rate: '11.0',
      maxAmount: 'Up to ₹2 Cr',
      badge: 'Government Backed',
      badgeColor: '#06b6d4',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      logo: 'SBI',
      logoBg: '#ffffff',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Loans</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Loan Type Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {loanTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.name && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab.name)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.name && styles.tabTextActive,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Business Loan Lenders</Text>
          <Text style={styles.sectionDesc}>
            Compare business & MSME loan offers from India's best banks &
            NBFCs.
          </Text>
        </View>

        {/* Lenders List */}
        <View style={styles.lendersList}>
          {lenders.map((lender) => (
            <TouchableOpacity key={lender.id} style={styles.lenderCard}>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.lenderInfo}>
                  <View style={[styles.logo, {backgroundColor: lender.logoBg}]}>
                    <Text style={styles.logoText}>{lender.logo}</Text>
                  </View>
                  <View style={styles.lenderDetails}>
                    <Text style={styles.lenderName}>{lender.name}</Text>
                    <Text style={styles.lenderDesc}>{lender.description}</Text>
                  </View>
                </View>
                <View style={[styles.badge, {backgroundColor: lender.badgeBg}]}>
                  <Text style={[styles.badgeText, {color: lender.badgeColor}]}>
                    {lender.badge}
                  </Text>
                </View>
              </View>

              {/* Card Details */}
              <View style={styles.cardDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Interest Rate</Text>
                  <View style={styles.detailValue}>
                    <Text style={styles.detailValueText}>{lender.rate}%</Text>
                    <Text style={styles.detailValueSmall}>onwards</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Max Amount</Text>
                  <Text style={styles.detailValueText}>{lender.maxAmount}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.viewDetailsBtn}
                  onPress={() =>
                    navigation.navigate('LoanDetails', {
                      lenderData: lender,
                    })
                  }
                >
                  <Text style={styles.viewDetailsBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyNowBtn}
                  onPress={() =>
                    navigation.navigate('BusinessLoanApplication', {
                      lenderData: lender,
                    })
                  }
                >
                  <Text style={styles.applyNowBtnText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trust Footer */}
        <View style={styles.trustFooter}>
          <View style={styles.trustBadge}>
            <ShieldCheck size={14} color="#8b5cf6" />
            <Text style={styles.trustText}>
              100% security | FYNP works only with RBI-registered partners
            </Text>
          </View>
          <Text style={styles.trustSubtext}>
            Offers from leading Indian banks & NBFCs for business & MSME loans
          </Text>
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Scroll Content
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 20,
    paddingBottom: 40,
  },

  // Tabs
  tabsContent: {
    gap: 8,
    paddingRight: 20,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  tabActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71717a',
    whiteSpace: 'nowrap',
  },

  tabTextActive: {
    color: '#ffffff',
  },

  // Section Header
  sectionHeader: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },

  sectionDesc: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },

  // Lenders List
  lendersList: {
    gap: 16,
  },

  lenderCard: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 16,
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },

  lenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },

  lenderDetails: {
    flex: 1,
    gap: 4,
  },

  lenderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderDesc: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 16,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  // Card Details
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    gap: 20,
  },

  detailItem: {
    flex: 1,
    gap: 4,
  },

  detailLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  detailValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },

  detailValueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  detailValueSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: '#a1a1aa',
  },

  // Action Buttons
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },

  viewDetailsBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewDetailsBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
  },

  applyNowBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  applyNowBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Trust Footer
  trustFooter: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#141417',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 8,
    alignItems: 'center',
  },

  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  trustText: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
    textAlign: 'center',
  },

  trustSubtext: {
    fontSize: 12,
    color: '#71717a',
    textAlign: 'center',
  },
});

export default BusinessLoansScreen;
