/**
 * FYNP Smart EMI Calculator
 * Calculate EMI, interest, and total payable for loans
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeft} from 'lucide-react-native';

// Custom Slider Component
const CustomSlider = ({
  minimumValue,
  maximumValue,
  step,
  value,
  onValueChange,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  style,
}) => {
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const pan = React.useRef(new Animated.ValueXY()).current;

  const calculateValue = (gestureX) => {
    const ratio = Math.max(0, Math.min(gestureX / sliderWidth, 1));
    const newValue = minimumValue + ratio * (maximumValue - minimumValue);
    const steppedValue =
      Math.round(newValue / step) * step;
    return Math.max(
      minimumValue,
      Math.min(steppedValue, maximumValue)
    );
  };

  const thumbPosition = React.useMemo(() => {
    const ratio =
      (value - minimumValue) / (maximumValue - minimumValue);
    return ratio * sliderWidth;
  }, [value, sliderWidth, minimumValue, maximumValue]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const newValue = calculateValue(evt.nativeEvent.locationX);
        onValueChange(newValue);
      },
      onPanResponderMove: (evt) => {
        const newValue = calculateValue(evt.nativeEvent.locationX);
        onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View
      style={[styles.sliderContainer, style]}
      onLayout={(evt) => setSliderWidth(evt.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      {/* Track Background */}
      <View
        style={[
          styles.sliderTrack,
          {backgroundColor: maximumTrackTintColor},
        ]}
      />

      {/* Filled Track */}
      <View
        style={[
          styles.sliderFilledTrack,
          {
            backgroundColor: minimumTrackTintColor,
            width: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%`,
          },
        ]}
      />

      {/* Thumb */}
      <View
        style={[
          styles.sliderThumb,
          {
            backgroundColor: thumbTintColor,
            left: thumbPosition - 8,
          },
        ]}
      />
    </View>
  );
};

const EMICalculatorScreen = ({navigation}) => {
  const [loanAmount, setLoanAmount] = React.useState(500000);
  const [interestRate, setInterestRate] = React.useState(12.5);
  const [tenure, setTenure] = React.useState(36); // in months

  // Calculate EMI using formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfMonths = tenure;

    if (monthlyRate === 0) {
      return loanAmount / numberOfMonths;
    }

    const emi =
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    return emi;
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const formatCurrency = (amount) => {
    return '₹ ' + Math.round(amount).toLocaleString('en-IN');
  };

  const formatLoanAmount = (amount) => {
    if (amount >= 10000000) {
      return '₹ ' + (amount / 10000000).toFixed(2) + ' Cr';
    }
    return '₹ ' + (amount / 100000).toFixed(2) + ' L';
  };

  const tenureInYears = Math.round(tenure / 12 * 10) / 10;

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
        <Text style={styles.headerTitle}>Smart EMI Calculator</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Loan Amount Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Loan Amount</Text>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{formatLoanAmount(loanAmount)}</Text>
            </View>
          </View>
          <CustomSlider
            style={styles.slider}
            minimumValue={100000}
            maximumValue={5000000}
            step={100000}
            value={loanAmount}
            onValueChange={setLoanAmount}
            minimumTrackTintColor="#7c3aed"
            maximumTrackTintColor="#27272a"
            thumbTintColor="#ffffff"
          />
          <View style={styles.rangeLabel}>
            <Text style={styles.rangeText}>₹1L</Text>
            <Text style={styles.rangeText}>₹50L</Text>
          </View>
        </View>

        {/* Interest Rate Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Interest Rate (% p.a)</Text>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{interestRate.toFixed(2)} %</Text>
            </View>
          </View>
          <CustomSlider
            style={styles.slider}
            minimumValue={8}
            maximumValue={24}
            step={0.25}
            value={interestRate}
            onValueChange={setInterestRate}
            minimumTrackTintColor="#8b5cf6"
            maximumTrackTintColor="#27272a"
            thumbTintColor="#ffffff"
          />
          <View style={styles.rangeLabel}>
            <Text style={styles.rangeText}>8%</Text>
            <Text style={styles.rangeText}>24%</Text>
          </View>
        </View>

        {/* Tenure Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Tenure</Text>
            <View style={styles.tenureToggle}>
              <View style={styles.tenureOption}>
                <Text style={styles.tenureOptionText}>Years</Text>
              </View>
              <View style={styles.tenureOptionInactive}>
                <Text style={styles.tenureOptionInactiveText}>Months</Text>
              </View>
            </View>
          </View>
          <Text style={styles.tenureValue}>{tenureInYears.toFixed(1)} Years</Text>
          <CustomSlider
            style={styles.slider}
            minimumValue={12}
            maximumValue={84}
            step={1}
            value={tenure}
            onValueChange={setTenure}
            minimumTrackTintColor="#22c55e"
            maximumTrackTintColor="#27272a"
            thumbTintColor="#ffffff"
          />
          <View style={styles.rangeLabel}>
            <Text style={styles.rangeText}>1Y</Text>
            <Text style={styles.rangeText}>7Y</Text>
          </View>
        </View>

        {/* Results Card */}
        <View style={styles.resultsCard}>
          {/* Donut Chart Visualization */}
          <View style={styles.chartContainer}>
            <View style={[styles.donutChart, {backgroundColor: '#7c3aed'}]}>
              <View style={styles.donutCenter}>
                <Text style={styles.emiLabel}>Monthly EMI</Text>
                <Text style={styles.emiValue}>{formatCurrency(emi)}</Text>
              </View>
            </View>
          </View>

          {/* Results Details */}
          <View style={styles.resultDetails}>
            <View style={styles.resultItem}>
              <View style={[styles.resultDot, {backgroundColor: '#7c3aed'}]} />
              <View style={styles.resultContent}>
                <Text style={styles.resultLabel}>Principal Amount</Text>
                <Text style={styles.resultValue}>{formatCurrency(loanAmount)}</Text>
              </View>
            </View>

            <View style={styles.resultItem}>
              <View style={[styles.resultDot, {backgroundColor: '#8b5cf6'}]} />
              <View style={styles.resultContent}>
                <Text style={styles.resultLabel}>Total Interest</Text>
                <Text style={[styles.resultValue, {color: '#8b5cf6'}]}>
                  {formatCurrency(totalInterest)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.resultItem}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
            </View>
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('LoanMarketplace')}
        >
          <Text style={styles.actionBtnText}>Check Loan Offers</Text>
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
    paddingBottom: 140,
    gap: 24,
  },

  // Section
  section: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a1a1aa',
  },

  valueBox: {
    backgroundColor: '#141417',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  valueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  sliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },

  sliderTrack: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },

  sliderFilledTrack: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },

  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  rangeLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rangeText: {
    fontSize: 12,
    color: '#71717a',
  },

  // Tenure Toggle
  tenureToggle: {
    flexDirection: 'row',
    backgroundColor: '#27272a',
    borderRadius: 8,
    padding: 2,
  },

  tenureOption: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#141417',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  tenureOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  tenureOptionInactive: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  tenureOptionInactiveText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#71717a',
  },

  tenureValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },

  // Results Card
  resultsCard: {
    backgroundColor: '#141417',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 24,
  },

  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  donutChart: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  donutCenter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#141417',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  emiLabel: {
    fontSize: 12,
    color: '#71717a',
  },

  emiValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  // Result Details
  resultDetails: {
    gap: 12,
  },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  resultDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  resultContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 14,
    color: '#a1a1aa',
  },

  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  actionBtn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default EMICalculatorScreen;
