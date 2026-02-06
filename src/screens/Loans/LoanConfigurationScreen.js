/**
 * FYNP Loan Configuration Screen
 * Allows users to configure loan amount, tenure, and view EMI details
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
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

const LoanConfigurationScreen = ({navigation, route}) => {
  const {bankName, bankLogo, interestRate} = route.params || {
    bankName: 'HDFC Bank',
    bankLogo: 'HDFC',
    interestRate: 10.75,
  };

  const [loanAmount, setLoanAmount] = React.useState(500000);
  const [tenure, setTenure] = React.useState(24);

  const MIN_LOAN = 50000;
  const MAX_LOAN = 1000000;
  const MIN_TENURE = 6;
  const MAX_TENURE = 60;

  const processingFee = 1499;

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = tenure;

    if (monthlyRate === 0) {
      return Math.round(principal / numberOfPayments);
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return Math.round(emi);
  };

  const emi = calculateEMI();

  const handleLoanAmountChange = (offsetX) => {
    const sliderWidth = 280;
    const percentage = Math.max(0, Math.min(1, offsetX / sliderWidth));
    const amount = MIN_LOAN + percentage * (MAX_LOAN - MIN_LOAN);
    setLoanAmount(Math.round(amount / 1000) * 1000);
  };

  const handleTenureChange = (offsetX) => {
    const sliderWidth = 280;
    const percentage = Math.max(0, Math.min(1, offsetX / sliderWidth));
    const months = MIN_TENURE + percentage * (MAX_TENURE - MIN_TENURE);
    setTenure(Math.round(months));
  };

  const loanAmountPercentage =
    ((loanAmount - MIN_LOAN) / (MAX_LOAN - MIN_LOAN)) * 100;
  const tenurePercentage = ((tenure - MIN_TENURE) / (MAX_TENURE - MIN_TENURE)) * 100;

  const formatCurrency = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2).replace(/\.?0+$/, '')}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const handleProceed = () => {
    // Navigate to Basic Details screen
    navigation.navigate('LoanBasicDetails', {
      bankName,
      loanAmount,
      tenure,
      emi,
      interestRate,
    });
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
        <Text style={styles.headerTitle}>Configure Loan</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lender Card */}
        <View style={styles.lenderCard}>
          <View style={styles.lenderLogo}>
            <Text style={styles.logoText}>{bankLogo}</Text>
          </View>
          <View style={styles.lenderInfo}>
            <Text style={styles.lenderName}>{bankName}</Text>
            <Text style={styles.lenderType}>Pre-approved Personal Loan</Text>
          </View>
        </View>

        {/* Loan Amount Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.labelTitle}>Loan Amount</Text>
            <View style={styles.inputDisplay}>
              <Text style={styles.displayValue}>{formatCurrency(loanAmount)}</Text>
            </View>
          </View>
          <View
            style={styles.rangeTrack}
            onStartShouldSetResponder={() => true}
            onResponderMove={(e) => {
              handleLoanAmountChange(e.nativeEvent.locationX);
            }}
          >
            <View
              style={[
                styles.rangeFill,
                {width: `${loanAmountPercentage}%`},
              ]}
            />
            <View
              style={[
                styles.rangeThumb,
                {left: `${loanAmountPercentage}%`},
              ]}
            />
          </View>
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>₹50K</Text>
            <Text style={styles.rangeLabel}>₹10L</Text>
          </View>
        </View>

        {/* Tenure Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.labelTitle}>Tenure</Text>
            <View style={styles.inputDisplay}>
              <Text style={styles.displayValue}>{tenure} Months</Text>
            </View>
          </View>
          <View
            style={styles.rangeTrack}
            onStartShouldSetResponder={() => true}
            onResponderMove={(e) => {
              handleTenureChange(e.nativeEvent.locationX);
            }}
          >
            <View
              style={[
                styles.rangeFill,
                {width: `${tenurePercentage}%`},
              ]}
            />
            <View
              style={[
                styles.rangeThumb,
                {left: `${tenurePercentage}%`},
              ]}
            />
          </View>
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>6M</Text>
            <Text style={styles.rangeLabel}>60M</Text>
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Interest Rate</Text>
            <Text style={[styles.detailValue, {color: '#4ade80'}]}>
              {interestRate}% p.a.
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Processing Fee</Text>
            <Text style={styles.detailValue}>₹{processingFee}</Text>
          </View>
        </View>

        {/* EMI Card */}
        <View style={styles.emiCard}>
          <Text style={styles.emiLabel}>Your Monthly EMI</Text>
          <Text style={styles.emiAmount}>₹{emi.toLocaleString('en-IN')}</Text>
          <Text style={styles.emiSubtext}>
            Standard EMI • No hidden charges
          </Text>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Action Area */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleProceed}
        >
          <Text style={styles.primaryBtnText}>Proceed</Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.trustBadge}>
          <ShieldCheck size={12} color="#71717a" />
          <Text style={styles.trustText}>
            100% security • iOS 2007 verified ad fintech
          </Text>
        </View>
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
    gap: 24,
    paddingBottom: 200,
  },

  // Lender Card
  lenderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  lenderLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },

  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },

  lenderInfo: {
    gap: 4,
  },

  lenderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  lenderType: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '500',
  },

  // Input Groups
  inputGroup: {
    display: 'flex',
    gap: 12,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  labelTitle: {
    fontSize: 14,
    color: '#71717a',
    fontWeight: '500',
  },

  inputDisplay: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  displayValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8b5cf6',
  },

  // Range Slider
  rangeTrack: {
    height: 6,
    backgroundColor: '#18181b',
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },

  rangeFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },

  rangeThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: -7,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  rangeLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  // Details Grid
  detailsGrid: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#141417',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  detailItem: {
    flex: 1,
    gap: 6,
  },

  detailLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },

  // EMI Card
  emiCard: {
    backgroundColor: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },

  emiLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },

  emiAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },

  emiSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },

  // Action Area
  actionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  primaryBtn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
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

  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  // Trust Badge
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
  },

  trustText: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '500',
  },
});

export default LoanConfigurationScreen;
