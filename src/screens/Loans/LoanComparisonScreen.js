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
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

const { width } = Dimensions.get('window');

const LoanComparisonScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeStore();

  // Theme Variables
  const theme = isDarkMode ? colors : colors.light;
  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentMuted = theme.textMuted || '#8e8a98';
  const currentBorder = isDarkMode ? theme.border : '#93c5fd';
  const primaryColor = colors.primary; // Orange
  const accentColor = isDarkMode ? '#22d3ee' : '#0e499c';
  const successColor = '#10b981';
  const destructiveColor = '#ef4444';

  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(3);
  const [rateA, setRateA] = useState('10.5');
  const [rateB, setRateB] = useState('12.5');

  const [resultA, setResultA] = useState({ emi: 0, interest: 0 });
  const [resultB, setResultB] = useState({ emi: 0, interest: 0 });
  const [savings, setSavings] = useState(0);

  const calculate = (P, R_val, T) => {
    const R = parseFloat(R_val) / 12 / 100;
    const N = T * 12;
    if (!P || !R || !N) return { emi: 0, interest: 0, total: 0 };

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const total = emi * N;
    const interest = total - P;
    return { emi: Math.round(emi), interest: Math.round(interest), total: Math.round(total) };
  };

  useEffect(() => {
    const rA = calculate(amount, rateA, tenure);
    const rB = calculate(amount, rateB, tenure);
    setResultA(rA);
    setResultB(rB);
    setSavings(rB.total - rA.total);
  }, [amount, tenure, rateA, rateB]);

  const formatCurrency = (val) => '₹' + Math.abs(val).toLocaleString('en-IN');
  const formatCompact = (val) => {
    const absVal = Math.abs(val);
    if (absVal >= 100000) return '₹' + (absVal / 100000).toFixed(2) + 'L';
    if (absVal >= 1000) return '₹' + (absVal / 1000).toFixed(0) + 'K';
    return '₹' + absVal;
  };

  const maxInterest = Math.max(resultA.interest, resultB.interest) || 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>

      {/* Header */}
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
        <Text style={[styles.headerTitle, { color: currentText }]}>Interest Comparison</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Savings Card */}
        <View style={styles.savingsCard}>
          <Text style={styles.savingsTitle}>Potential Savings</Text>
          <Text style={styles.savingsAmount}>{formatCurrency(savings)}</Text>
          <Text style={styles.savingsSubtitle}>over the loan tenure with Option {savings >= 0 ? 'A' : 'B'}</Text>
        </View>

        {/* Input Card */}
        <View style={[styles.card, { backgroundColor: currentCard, borderColor: currentBorder }]}>

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
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={[styles.label, { color: currentMuted }]}>Tenure</Text>
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
          </View>
        </View>

        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: currentText }]}>Compare Rates</Text>
          <Text style={{ fontSize: 12, color: currentMuted }}>Edit rates below</Text>
        </View>

        {/* Comparison Grid */}
        <View style={styles.comparisonGrid}>
          {/* Option A */}
          <View style={[styles.lenderColumn, styles.winnerColumn, { borderColor: primaryColor, backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.05)' : '#fff7ed' }]}>
            <Text style={[styles.lenderHeader, { color: currentText }]}>Option A</Text>
            <View style={[styles.rateInputWrapper, { backgroundColor: currentBackground, borderColor: currentBorder }]}>
              <TextInput
                style={[styles.rateInput, { color: currentText }]}
                value={rateA}
                onChangeText={setRateA}
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            <View style={[styles.resultRow, { borderTopColor: currentBorder }]}>
              <Text style={styles.resultLabel}>Monthly EMI</Text>
              <Text style={[styles.resultValue, { color: primaryColor }]}>{formatCurrency(resultA.emi)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total Interest</Text>
              <Text style={[styles.resultValue, { color: currentText }]}>{formatCompact(resultA.interest)}</Text>
            </View>
          </View>

          {/* Option B */}
          <View style={[styles.lenderColumn, { backgroundColor: currentCard, borderColor: currentBorder, borderWidth: 1 }]}>
            <Text style={[styles.lenderHeader, { color: currentText }]}>Option B</Text>
            <View style={[styles.rateInputWrapper, { backgroundColor: currentBackground, borderColor: currentBorder }]}>
              <TextInput
                style={[styles.rateInput, { color: currentText }]}
                value={rateB}
                onChangeText={setRateB}
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            <View style={[styles.resultRow, { borderTopColor: currentBorder }]}>
              <Text style={styles.resultLabel}>Monthly EMI</Text>
              <Text style={[styles.resultValue, { color: currentText }]}>{formatCurrency(resultB.emi)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total Interest</Text>
              <Text style={[styles.resultValue, { color: destructiveColor }]}>{formatCompact(resultB.interest)}</Text>
            </View>
          </View>
        </View>

        {/* Visual Breakdown */}
        <View style={[styles.card, { backgroundColor: currentCard, borderColor: currentBorder, padding: 16, gap: 16 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 14, color: currentText, marginBottom: 0 }]}>Interest Breakdown</Text>

          {/* Bar A */}
          <View style={styles.barRow}>
            <Text style={[styles.barLabel, { color: currentMuted }]}>A</Text>
            <View style={[styles.barTrack, { backgroundColor: isDarkMode ? '#1f1f1f' : '#f4f4f5' }]}>
              <View style={{ width: `${(resultA.interest / maxInterest) * 80}%`, height: '100%', backgroundColor: primaryColor }} />
            </View>
            <Text style={[styles.barValue, { color: currentText }]}>{formatCompact(resultA.interest)}</Text>
          </View>

          {/* Bar B */}
          <View style={styles.barRow}>
            <Text style={[styles.barLabel, { color: currentMuted }]}>B</Text>
            <View style={[styles.barTrack, { backgroundColor: isDarkMode ? '#1f1f1f' : '#f4f4f5' }]}>
              <View style={{ width: `${(resultB.interest / maxInterest) * 80}%`, height: '100%', backgroundColor: destructiveColor }} />
            </View>
            <Text style={[styles.barValue, { color: currentText }]}>{formatCompact(resultB.interest)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { backgroundColor: currentBackground, borderTopColor: currentBorder }]}>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: primaryColor }]}>
          <Text style={styles.ctaText}>Find Lowest Rates</Text>
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
    paddingBottom: 100,
    gap: 24,
  },
  savingsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
  },
  savingsTitle: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10b981', // Using Green for success text explicitly or theme foreground? HTML has foreground. But green looks better.
    marginBottom: 4,
  },
  savingsSubtitle: {
    fontSize: 13,
    color: '#71717a',
  },
  card: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    gap: 20,
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
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  lenderColumn: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  winnerColumn: {
    borderWidth: 1,
  },
  lenderHeader: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  rateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  rateInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  percentSymbol: {
    fontSize: 14,
    color: '#71717a',
  },
  resultRow: {
    gap: 4,
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'transparent', // Overridden inline
  },
  resultLabel: {
    fontSize: 11,
    color: '#71717a',
    textTransform: 'uppercase',
  },
  resultValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barLabel: {
    width: 20,
    fontSize: 12,
    fontWeight: '600',
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barValue: {
    width: 50,
    fontSize: 12,
    textAlign: 'right',
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

export default LoanComparisonScreen;
