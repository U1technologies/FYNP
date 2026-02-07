/**
 * FYNP Loan Comparison Screen
 * Allows users to compare up to 3 lenders side-by-side
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
import {ArrowLeft, Info, ShieldCheck} from 'lucide-react-native';

const LoanComparisonScreen = ({navigation, route}) => {
  const {loanAmount = 500000} = route.params || {};

  // Sample comparison data for 3 lenders
  const comparisonData = [
    {
      id: 1,
      name: 'HDFC Bank',
      logo: 'HDFC',
      badge: 'Best Rate',
      interest: '10.75%',
      emi: '₹23,248',
      processingFee: '₹1,499',
      tenure: '24 Mo',
      approval: 'Instant',
    },
    {
      id: 2,
      name: 'ICICI Bank',
      logo: 'ICICI',
      badge: null,
      interest: '10.99%',
      emi: '₹23,310',
      processingFee: '₹999',
      tenure: '24 Mo',
      approval: '4 hrs',
    },
    {
      id: 3,
      name: 'IDFC FIRST',
      logo: 'IDFC',
      badge: null,
      interest: '11.00%',
      emi: '₹23,380',
      processingFee: '₹1,200',
      tenure: '24 Mo',
      approval: '6 hrs',
    },
  ];

  const features = [
    {label: 'Interest', key: 'interest'},
    {label: 'Monthly EMI', key: 'emi'},
    {label: 'Proc. Fee', key: 'processingFee'},
    {label: 'Tenure', key: 'tenure'},
    {label: 'Approval', key: 'approval'},
  ];

  const formatLoanAmount = () => {
    return '₹' + (loanAmount / 100000).toFixed(2) + 'L';
  };

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
        <Text style={styles.headerTitle}>Compare Lenders</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Header */}
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>
            Best offers for {formatLoanAmount()}
          </Text>
          <Text style={styles.summaryDesc}>
            Comparing top 3 approved limits for you
          </Text>
        </View>

        {/* Comparison Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnLabel}>Features</Text>
            </View>
            {comparisonData.map((lender) => (
              <View key={lender.id} style={styles.lenderColumn}>
                {lender.badge && (
                  <View style={styles.topBorder} />
                )}
                <View style={styles.logoBox}>
                  <Text style={styles.logoText}>{lender.logo}</Text>
                </View>
                <Text style={styles.lenderName}>{lender.logo}</Text>
                {lender.badge && (
                  <View style={styles.badgeBox}>
                    <Text style={styles.badgeText}>{lender.badge}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Comparison Rows */}
          {features.map((feature, index) => (
            <View key={feature.key}>
              <View style={styles.comparisonRow}>
                <View style={styles.featureColumn}>
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                </View>
                {comparisonData.map((lender) => (
                  <View key={lender.id} style={styles.lenderColumn}>
                    <Text
                      style={[
                        styles.lenderValue,
                        feature.key === 'interest' && {color: '#9b6cff'},
                      ]}
                    >
                      {lender[feature.key]}
                    </Text>
                  </View>
                ))}
              </View>
              {index < features.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}

          {/* Selection Buttons Row */}
          <View style={styles.selectButtonsRow}>
            <View style={styles.featureColumn} />
            {comparisonData.map((lender) => (
              <View key={lender.id} style={styles.lenderColumn}>
                <TouchableOpacity style={styles.selectBtn}>
                  <Text style={styles.selectBtnText}>Select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Info size={20} color="#71717a" />
          <Text style={styles.infoText}>
            Interest rates shown are indicative based on your credit score.
            Final rate may vary slightly after full KYC verification.
          </Text>
        </View>

        {/* Trust Footer */}
        <View style={styles.trustFooter}>
          <ShieldCheck size={14} color="#7c3aed" />
          <Text style={styles.trustText}>
            100% security • FYNP verified fintech platform
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
    paddingVertical: 24,
    paddingBottom: 40,
  },

  // Summary Header
  summaryHeader: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },

  summaryDesc: {
    fontSize: 14,
    color: '#71717a',
  },

  // Table Container
  tableContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    padding: 12,
    marginBottom: 24,
  },

  // Table Header
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },

  featureColumn: {
    flex: 0.8,
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },

  featureColumnLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  lenderColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },

  topBorder: {
    width: '100%',
    height: 4,
    backgroundColor: '#7c3aed',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000000',
  },

  lenderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },

  badgeBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  badgeText: {
    fontSize: 10,
    color: '#22c55e',
    fontWeight: '600',
  },

  // Comparison Row
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  featureLabel: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '500',
  },

  lenderValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 4,
  },

  // Select Buttons Row
  selectButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },

  selectBtn: {
    flex: 1,
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  selectBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Info Box
  infoBox: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(39, 39, 42, 0.4)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
  },

  // Trust Footer
  trustFooter: {
    marginHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  trustText: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '500',
  },
});

export default LoanComparisonScreen;
