/**
 * FYNP Loan Details Screen
 * Allows users to customize loan amount and tenure for a selected lender
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoanDetailsScreen = ({navigation, route}) => {
  const {lender} = route.params;

  const [loanAmount, setLoanAmount] = useState(500000);
  const [selectedTenure, setSelectedTenure] = useState(60);
  const sliderWidth = useRef(0);

  const tenureOptions = [12, 24, 36, 48, 60];

  const minAmount = 50000;
  const maxAmount = 500000;

  // Create PanResponder for slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateSliderValue(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateSliderValue(evt.nativeEvent.locationX);
      },
    })
  ).current;

  const updateSliderValue = (x) => {
    if (sliderWidth.current > 0) {
      const percentage = Math.max(0, Math.min(1, x / sliderWidth.current));
      const newAmount = minAmount + percentage * (maxAmount - minAmount);
      const roundedAmount = Math.round(newAmount / 10000) * 10000;
      setLoanAmount(Math.max(minAmount, Math.min(maxAmount, roundedAmount)));
    }
  };

  // Calculate EMI (simplified formula)
  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = lender.interestRateValue / 12 / 100;
    const months = selectedTenure;

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
      (Math.pow(1 + ratePerMonth, months) - 1);

    return Math.round(emi);
  };

  const processingFee = Math.round(loanAmount * 0.005);
  const insurance = 999;
  const netDisbursal = loanAmount - processingFee - insurance;
  const emi = calculateEMI();

  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(0) + 'L';
    }
    return '₹' + (amount / 1000).toFixed(0) + 'k';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize Loan</Text>
        <TouchableOpacity style={styles.headerActions}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}>
        {/* Lender Profile */}
        <View style={styles.lenderProfile}>
          <View style={[styles.lenderLogo, {backgroundColor: lender.logoColor}]}>
            <Text style={styles.lenderLogoText}>{lender.logo}</Text>
          </View>
          <View style={styles.lenderDetails}>
            <Text style={styles.lenderName}>{lender.name}</Text>
            <View style={styles.approvalBadge}>
              <Text style={styles.approvalIcon}>✓</Text>
              <Text style={styles.approvalText}>Pre-approved Offer</Text>
            </View>
          </View>
        </View>

        {/* Amount Selection */}
        <View style={styles.configCard}>
          <View style={styles.configHeader}>
            <Text style={styles.label}>Loan Amount</Text>
            <Text style={styles.valueDisplay}>{formatCurrency(loanAmount)}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <View
              style={styles.sliderTrack}
              onLayout={(e) => {
                sliderWidth.current = e.nativeEvent.layout.width;
              }}
              {...panResponder.panHandlers}>
              <View
                style={[
                  styles.sliderFill,
                  {width: `${((loanAmount - minAmount) / (maxAmount - minAmount)) * 100}%`},
                ]}
              />
              <View
                style={[
                  styles.sliderThumb,
                  {left: `${((loanAmount - minAmount) / (maxAmount - minAmount)) * 100}%`},
                ]}
              />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>₹50k</Text>
              <Text style={styles.sliderLabel}>₹5L</Text>
            </View>
          </View>
          <View style={styles.amountButtons}>
            <TouchableOpacity
              style={styles.amountBtn}
              onPress={() => setLoanAmount(Math.max(minAmount, loanAmount - 50000))}>
              <Text style={styles.amountBtnText}>- ₹50k</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.amountBtn}
              onPress={() => setLoanAmount(Math.min(maxAmount, loanAmount + 50000))}>
              <Text style={styles.amountBtnText}>+ ₹50k</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tenure Selection */}
        <View style={styles.configCard}>
          <View style={styles.configHeader}>
            <Text style={styles.label}>Repayment Tenure</Text>
            <Text style={styles.valueDisplay}>{selectedTenure} Months</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tenureOptions}>
            {tenureOptions.map((tenure) => (
              <TouchableOpacity
                key={tenure}
                style={[
                  styles.tenureChip,
                  selectedTenure === tenure && styles.tenureChipActive,
                ]}
                onPress={() => setSelectedTenure(tenure)}>
                <Text
                  style={[
                    styles.tenureChipText,
                    selectedTenure === tenure && styles.tenureChipTextActive,
                  ]}>
                  {tenure}m
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Financial Breakdown */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownRowMain}>
            <View style={styles.rowLabel}>
              <Text style={styles.rowLabelIcon}>💵</Text>
              <Text style={styles.rowLabelText}>Monthly EMI</Text>
            </View>
            <Text style={styles.rowValueBig}>{formatCurrency(emi)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Interest Rate</Text>
            <Text style={styles.rowValue}>{lender.interestRate}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Processing Fee (0.5%)</Text>
            <Text style={styles.rowValue}>{formatCurrency(processingFee)}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.rowLabel}>Insurance Premium</Text>
            <Text style={styles.rowValue}>₹{insurance}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRowHighlight}>
            <Text style={styles.rowLabelHighlight}>Net Disbursal Amount</Text>
            <Text style={styles.rowValueHighlight}>
              {formatCurrency(netDisbursal)}
            </Text>
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>🛡</Text>
          <Text style={styles.infoText}>
            Your data is shared securely with {lender.name} for KYC
            verification.
          </Text>
        </View>

        <View style={{height: 120}} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerSticky}>
        <Text style={styles.termsText}>
          By proceeding, you agree to the{' '}
          <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('KYCVerification', {lender: lender})
          }>
          <Text style={styles.primaryBtnText}>Proceed to KYC</Text>
          <Text style={styles.primaryBtnIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.securityBrand}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>Secured by FYNP Financials Private Limited</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0e',
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a0a0e',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },

  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 24,
    color: '#e6e6fa',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e6e6fa',
  },

  headerActions: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },

  helpIcon: {
    fontSize: 20,
    color: '#e6e6fa',
    fontWeight: '600',
  },

  // Content Scroll
  contentScroll: {
    padding: 20,
    gap: 24,
  },

  // Lender Profile
  lenderProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },

  lenderLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  lenderLogoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderDetails: {
    gap: 4,
  },

  lenderName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6e6fa',
  },

  approvalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  approvalIcon: {
    fontSize: 14,
    color: '#4ade80',
  },

  approvalText: {
    fontSize: 13,
    color: '#4ade80',
    fontWeight: '500',
  },

  // Config Cards
  configCard: {
    backgroundColor: '#0f1115',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },

  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  label: {
    fontSize: 14,
    color: '#8e8a98',
    fontWeight: '500',
  },

  valueDisplay: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e6e6fa',
    letterSpacing: -0.5,
  },

  // Slider
  sliderContainer: {
    gap: 12,
    paddingHorizontal: 4,
  },

  sliderTrack: {
    height: 6,
    backgroundColor: '#27272a',
    borderRadius: 3,
    position: 'relative',
  },

  sliderFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },

  sliderThumb: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    borderRadius: 12,
    position: 'absolute',
    top: -9,
    marginLeft: -12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sliderLabel: {
    fontSize: 12,
    color: '#8e8a98',
  },

  amountButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  amountBtn: {
    flex: 1,
    backgroundColor: '#27272a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  amountBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e6e6fa',
  },

  // Tenure Options
  tenureOptions: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 20,
  },

  tenureChip: {
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    minWidth: 60,
    alignItems: 'center',
  },

  tenureChipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: '#8b5cf6',
  },

  tenureChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8a98',
  },

  tenureChipTextActive: {
    color: '#8b5cf6',
  },

  // Breakdown Card
  breakdownCard: {
    backgroundColor: '#0f1115',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    paddingHorizontal: 20,
    gap: 16,
  },

  breakdownRowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
     color: '#8E8A98',
  },

  rowLabelIcon: {
    fontSize: 18,
  },

  rowLabelText: {
    fontSize: 14,
    color: '#8E8A98',
  },

  rowValueBig: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6e6fa',
  },

  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e6e6fa',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  breakdownRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowLabelHighlight: {
    fontSize: 14,
    color: '#e6e6fa',
    fontWeight: '600',
  },

  rowValueHighlight: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4ade80',
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(39, 39, 42, 0.5)',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },

  infoIcon: {
    fontSize: 16,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#8e8a98',
    lineHeight: 18,
  },

  // Sticky Footer
  footerSticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34,
    gap: 16,
  },

  termsText: {
    fontSize: 12,
    color: '#8e8a98',
    textAlign: 'center',
  },

  termsLink: {
    color: '#8b5cf6',
    textDecorationLine: 'underline',
  },

  primaryBtn: {
    backgroundColor: '#FF914D',
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FF914D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  primaryBtnIcon: {
    fontSize: 18,
    color: '#ffffff',
  },

  securityBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  securityIcon: {
    fontSize: 12,
  },

  securityText: {
    fontSize: 11,
    color: '#8e8a98',
    opacity: 0.7,
  },
});

export default LoanDetailsScreen;
