/**
 * FYNP Loan Details Screen
 * Displays detailed information about a specific loan product
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeft, Check, ArrowRight} from 'lucide-react-native';

const LoanDetailsScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};
  const [activeTab, setActiveTab] = React.useState('Overview');

  // Default lender data if not passed
  const lender = lenderData || {
    name: 'HDFC Business Loan',
    description: 'Unsecured working capital for SMEs',
    rate: '12.5',
    maxAmount: '₹50 Lakhs',
    tenure: '12 - 48 Months',
    processingFee: 'Up to 2%',
    logo: 'HDFC',
  };

  const tabs = ['Overview', 'Eligibility', 'Fees & Charges'];

  const features = [
    {
      title: 'Collateral-free Funding',
      description: 'No security or guarantor required to avail this loan.',
    },
    {
      title: 'Quick Disbursal',
      description: 'Loan amount disbursed within 48 hours of approval.',
    },
    {
      title: 'Balance Transfer Facility',
      description: 'Transfer existing high-interest loans for lower rates.',
    },
  ];

  const eligibilityCriteria = [
    {label: 'Business Vintage', value: 'Min 3 Years'},
    {label: 'Annual Turnover', value: 'Min ₹40 Lakhs'},
    {label: 'Age Limit', value: '21 - 65 Years'},
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
        <Text style={styles.headerTitle}>Loan Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>{lender.logo}</Text>
            </View>
            <View style={styles.lenderInfo}>
              <Text style={styles.lenderName}>{lender.name}</Text>
              <Text style={styles.lenderDesc}>{lender.description}</Text>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Interest Rate</Text>
              <Text style={styles.infoValue}>{lender.rate}%</Text>
              <Text style={styles.infoSubtext}>onwards</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Max Amount</Text>
              <Text style={styles.infoValue}>{lender.maxAmount}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tenure</Text>
              <Text style={styles.infoValue}>{lender.tenure}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Processing Fee</Text>
              <Text style={styles.infoValue}>{lender.processingFee}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content based on active tab */}
        {activeTab === 'Overview' && (
          <>
            {/* Key Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              <View style={styles.featuresList}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureCheckBox}>
                      <Check size={14} color="#22c55e" />
                    </View>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDesc}>
                        {feature.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Eligibility Snapshot */}
            <View style={[styles.section, styles.eligibilitySection]}>
              <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
              <View style={styles.criteriaList}>
                {eligibilityCriteria.map((item, index) => (
                  <View key={index}>
                    <View style={styles.criteriaItem}>
                      <Text style={styles.criteriaLabel}>{item.label}</Text>
                      <Text style={styles.criteriaValue}>{item.value}</Text>
                    </View>
                    {index < eligibilityCriteria.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === 'Eligibility' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eligibility Requirements</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.featureCheckBox}>
                  <Check size={14} color="#22c55e" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Business Registration</Text>
                  <Text style={styles.featureDesc}>
                    Business should be registered and operating for minimum 3 years
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureCheckBox}>
                  <Check size={14} color="#22c55e" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>GST Registration</Text>
                  <Text style={styles.featureDesc}>
                    GST registration is mandatory with clean compliance record
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureCheckBox}>
                  <Check size={14} color="#22c55e" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Bank Statements</Text>
                  <Text style={styles.featureDesc}>
                    Last 12 months of bank statements required
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureCheckBox}>
                  <Check size={14} color="#22c55e" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>ITR & Financial Statements</Text>
                  <Text style={styles.featureDesc}>
                    Last 2 years ITR and audited financial statements
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Fees & Charges' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fees & Charges</Text>
            <View style={styles.feesTable}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Processing Fee</Text>
                <Text style={styles.feeValue}>1.5% - 2%</Text>
              </View>
              <View style={styles.feeDivider} />

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Prepayment Charges</Text>
                <Text style={styles.feeValue}>Nil</Text>
              </View>
              <View style={styles.feeDivider} />

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Late Payment Charges</Text>
                <Text style={styles.feeValue}>2% per month</Text>
              </View>
              <View style={styles.feeDivider} />

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Part Payment Charges</Text>
                <Text style={styles.feeValue}>Nil</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{height: 20}} />
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.actionArea}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Apply Now</Text>
          <ArrowRight size={18} color="#ffffff" />
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
    paddingVertical: 24,
    paddingBottom: 180,
    gap: 24,
  },

  // Hero Card
  heroCard: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 24,
  },

  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  logoText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
  },

  lenderInfo: {
    flex: 1,
    gap: 4,
  },

  lenderName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderDesc: {
    fontSize: 13,
    color: '#71717a',
  },

  // Info Grid
  infoGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  infoItem: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#09090b',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },

  infoLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  infoSubtext: {
    fontSize: 12,
    color: '#a1a1aa',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  tab: {
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  tabActive: {
    borderBottomColor: '#8b5cf6',
  },

  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#71717a',
  },

  tabTextActive: {
    color: '#8b5cf6',
    fontWeight: '600',
  },

  // Sections
  section: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Features List
  featuresList: {
    gap: 16,
  },

  featureItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  featureCheckBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  featureContent: {
    flex: 1,
    gap: 2,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  featureDesc: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
  },

  // Eligibility Section
  eligibilitySection: {
    backgroundColor: '#18181b',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 16,
  },

  criteriaList: {
    gap: 0,
  },

  criteriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  criteriaLabel: {
    fontSize: 14,
    color: '#71717a',
    fontWeight: '500',
  },

  criteriaValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
    opacity: 0.5,
  },

  // Fees Table
  feesTable: {
    backgroundColor: '#141417',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  feeLabel: {
    fontSize: 14,
    color: '#71717a',
    fontWeight: '500',
  },

  feeValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },

  feeDivider: {
    height: 1,
    backgroundColor: '#27272a',
  },

  // Action Area
  actionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  applyBtn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#8b5cf6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  applyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default LoanDetailsScreen;
