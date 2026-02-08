import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Svg, { Circle, G } from 'react-native-svg';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

const { width } = Dimensions.get('window');

const EMICalculatorScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeStore();

  // Theme Variables following Dashboard patterns
  const theme = isDarkMode ? colors : colors.light;
  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentMuted = theme.textMuted || '#8e8a98';
  const currentBorder = isDarkMode ? theme.border : '#93c5fd'; // Blue outline for light mode
  const primaryColor = colors.primary; // Orange
  const accentColor = isDarkMode ? '#22d3ee' : '#0e499c'; // Cyan/Blue for accent

  // State
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(3);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Calculation Logic
  useEffect(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenure * 12;

    if (P === 0 || R === 0 || N === 0) {
      setEmi(0);
      return;
    }

    const calculatedEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPay = calculatedEmi * N;
    const totalInt = totalPay - P;

    setEmi(Math.round(calculatedEmi));
    setTotalPayment(Math.round(totalPay));
    setTotalInterest(Math.round(totalInt));
  }, [amount, rate, tenure]);

  // Donut Chart Logic
  const radius = 90;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const principalPercentage = totalPayment > 0 ? (amount / totalPayment) : 0;
  const interestPercentage = totalPayment > 0 ? (totalInterest / totalPayment) : 0;

  const principalStrokeDashoffset = circumference * (1 - principalPercentage);
  const interestStrokeDashoffset = circumference * (1 - interestPercentage); // Not used directly, usually we stack them

  // Format Currency
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>

      {/* Header - Matching LoanMarketplace Standard */}
      <View style={[styles.header, { backgroundColor: currentBackground, borderBottomColor: currentBorder }]}>
        <TouchableOpacity
          style={[styles.backBtn, {
            backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5',
            borderColor: currentBorder
          }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentText }]}>EMI Calculator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Input Card */}
        <View style={[styles.card, { backgroundColor: currentCard, borderColor: currentBorder }]}>

          {/* Amount Slider */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={[styles.label, { color: currentMuted }]}>Loan Amount</Text>
              <Text style={[styles.valueTag, { color: accentColor, backgroundColor: isDarkMode ? 'rgba(34, 211, 238, 0.1)' : 'rgba(14, 73, 156, 0.1)' }]}>
                {formatCurrency(amount)}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={50000}
              maximumValue={5000000}
              step={10000}
              value={amount}
              onValueChange={setAmount}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
              thumbTintColor={primaryColor}
            />
            <View style={styles.rangeLabels}>
              <Text style={[styles.rangeText, { color: currentMuted }]}>₹50K</Text>
              <Text style={[styles.rangeText, { color: currentMuted }]}>₹50L</Text>
            </View>
          </View>

          {/* Rate Slider */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={[styles.label, { color: currentMuted }]}>Interest Rate (p.a)</Text>
              <Text style={[styles.valueTag, { color: accentColor, backgroundColor: isDarkMode ? 'rgba(34, 211, 238, 0.1)' : 'rgba(14, 73, 156, 0.1)' }]}>
                {rate.toFixed(1)}%
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={8}
              maximumValue={24}
              step={0.1}
              value={rate}
              onValueChange={setRate}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
              thumbTintColor={primaryColor}
            />
            <View style={styles.rangeLabels}>
              <Text style={[styles.rangeText, { color: currentMuted }]}>8%</Text>
              <Text style={[styles.rangeText, { color: currentMuted }]}>24%</Text>
            </View>
          </View>

          {/* Tenure Slider */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={[styles.label, { color: currentMuted }]}>Loan Tenure</Text>
              <Text style={[styles.valueTag, { color: accentColor, backgroundColor: isDarkMode ? 'rgba(34, 211, 238, 0.1)' : 'rgba(14, 73, 156, 0.1)' }]}>
                {tenure} Years
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={tenure}
              onValueChange={setTenure}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
              thumbTintColor={primaryColor}
            />
            <View style={styles.rangeLabels}>
              <Text style={[styles.rangeText, { color: currentMuted }]}>1 Yr</Text>
              <Text style={[styles.rangeText, { color: currentMuted }]}>10 Yrs</Text>
            </View>
          </View>

        </View>

        {/* Results Section */}
        <View style={styles.resultSection}>
          <View style={styles.emiDisplay}>
            <Text style={[styles.emiLabel, { color: currentMuted }]}>Monthly EMI</Text>
            <Text style={[styles.emiAmount, { color: currentText }]}>{formatCurrency(emi)}</Text>
          </View>

          {/* Donut Chart */}
          <View style={styles.chartContainer}>
            <Svg height={center * 2} width={center * 2}>
              {/* Total Track (Interest Color Background) */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={isDarkMode ? '#1f1f1f' : '#eff6ff'}
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Interest Segment (Secondary Color) */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={isDarkMode ? '#3f3f46' : '#bfdbfe'} // Grey/LightBlue
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                rotation="-90"
                origin={`${center}, ${center}`}
              />
              {/* Principal Segment (Primary Color) - Layered on top */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={primaryColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={principalStrokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${center}, ${center}`}
              />
            </Svg>

            <View style={[styles.donutHole, { backgroundColor: currentBackground }]}>
              <Text style={{ fontSize: 14, color: currentMuted }}>Total Payable</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: currentText }}>{formatCurrency(totalPayment)}</Text>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: primaryColor }]} />
              <Text style={[styles.legendText, { color: currentMuted }]}>Principal</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: isDarkMode ? '#3f3f46' : '#bfdbfe' }]} />
              <Text style={[styles.legendText, { color: currentMuted }]}>Interest</Text>
            </View>
          </View>

          {/* Breakdown Grid */}
          <View style={styles.breakdownGrid}>
            <View style={[styles.breakdownCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.breakdownLabel, { color: currentMuted }]}>Principal Amount</Text>
              <Text style={[styles.breakdownValue, { color: currentText }]}>{formatCurrency(amount)}</Text>
            </View>
            <View style={[styles.breakdownCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.breakdownLabel, { color: currentMuted }]}>Total Interest</Text>
              <Text style={[styles.breakdownValue, { color: accentColor }]}>{formatCurrency(totalInterest)}</Text>
            </View>
          </View>

        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { backgroundColor: currentBackground, borderTopColor: currentBorder }]}>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: primaryColor }]}>
          <Text style={styles.ctaText}>Check Loan Eligibility</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Adjusted for bottom bar
    gap: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  valueTag: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  rangeText: {
    fontSize: 12,
  },
  resultSection: {
    alignItems: 'center',
    gap: 24,
  },
  emiDisplay: {
    alignItems: 'center',
  },
  emiLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  emiAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  donutHole: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140, // Roughly inner size
    height: 140,
    borderRadius: 50,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  breakdownCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  breakdownLabel: {
    fontSize: 12,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  ctaButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EMICalculatorScreen;
