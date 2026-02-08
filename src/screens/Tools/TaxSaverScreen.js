import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { ArrowLeft, Home, PiggyBank } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

const { width } = Dimensions.get('window');

const TaxSaverScreen = () => {
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
    const accentColor = isDarkMode ? '#22d3ee' : '#9b6cff';
    const successColor = '#18d89b';

    // State
    const [annualIncome, setAnnualIncome] = useState(1200000);
    const [loanAmount, setLoanAmount] = useState(3500000);
    const [interestRate, setInterestRate] = useState(8.5);

    const [totalSavings, setTotalSavings] = useState(0);
    const [interestDeduction, setInterestDeduction] = useState(0);
    const [principalDeduction, setPrincipalDeduction] = useState(0);

    // Tax Calculation Logic
    useEffect(() => {
        // Assuming 30% tax bracket for simplification
        const taxRate = 0.30;

        // Annual Interest (approximate first year)
        const annualInterest = (loanAmount * interestRate) / 100;

        // Section 24(b): Interest deduction up to ₹2,00,000
        const maxInterestDeduction = 200000;
        const eligibleInterest = Math.min(annualInterest, maxInterestDeduction);
        const interestTaxSaving = eligibleInterest * taxRate;

        // Section 80C: Principal repayment up to ₹1,50,000
        const maxPrincipalDeduction = 150000;
        // Approximate annual principal (simplified)
        const tenure = 20; // Assume 20 years
        const annualPrincipal = loanAmount / tenure;
        const eligiblePrincipal = Math.min(annualPrincipal, maxPrincipalDeduction);
        const principalTaxSaving = eligiblePrincipal * taxRate;

        setInterestDeduction(Math.round(interestTaxSaving));
        setPrincipalDeduction(Math.round(principalTaxSaving));
        setTotalSavings(Math.round(interestTaxSaving + principalTaxSaving));
    }, [annualIncome, loanAmount, interestRate]);

    // Format Currency
    const formatCurrency = (value) => {
        return '₹' + value.toLocaleString('en-IN');
    };

    const formatCompact = (value) => {
        if (value >= 10000000) return '₹' + (value / 10000000).toFixed(2) + 'Cr';
        if (value >= 100000) return '₹' + (value / 100000).toFixed(2) + 'L';
        if (value >= 1000) return '₹' + (value / 1000).toFixed(0) + 'K';
        return '₹' + value;
    };

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
                <Text style={[styles.headerTitle, { color: currentText }]}>Tax Saver</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Result Card */}
                <View style={[styles.resultCard, {
                    backgroundColor: isDarkMode ? 'rgba(34, 211, 238, 0.1)' : 'rgba(155, 108, 255, 0.1)',
                    borderColor: isDarkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(155, 108, 255, 0.3)'
                }]}>
                    <Text style={[styles.resultTitle, { color: accentColor }]}>You could save up to</Text>
                    <Text style={[styles.resultAmount, { color: currentText }]}>{formatCurrency(totalSavings)}</Text>
                    <Text style={[styles.resultSubtitle, { color: currentMuted }]}>annually with a Home Loan</Text>
                </View>

                {/* Input Card */}
                <View style={[styles.card, { backgroundColor: currentCard, borderColor: currentBorder }]}>

                    {/* Annual Income */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Annual Income</Text>
                            <Text style={[styles.valueTag, {
                                color: primaryColor,
                                backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.1)' : 'rgba(255, 145, 77, 0.15)'
                            }]}>
                                {formatCompact(annualIncome)}
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={500000}
                            maximumValue={5000000}
                            step={100000}
                            value={annualIncome}
                            onValueChange={setAnnualIncome}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹5L</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹50L</Text>
                        </View>
                    </View>

                    {/* Loan Amount */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Home Loan Amount</Text>
                            <Text style={[styles.valueTag, {
                                color: primaryColor,
                                backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.1)' : 'rgba(255, 145, 77, 0.15)'
                            }]}>
                                {formatCompact(loanAmount)}
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={1000000}
                            maximumValue={10000000}
                            step={100000}
                            value={loanAmount}
                            onValueChange={setLoanAmount}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹10L</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹1Cr</Text>
                        </View>
                    </View>

                    {/* Interest Rate */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Interest Rate</Text>
                            <Text style={[styles.valueTag, {
                                color: primaryColor,
                                backgroundColor: isDarkMode ? 'rgba(255, 145, 77, 0.1)' : 'rgba(255, 145, 77, 0.15)'
                            }]}>
                                {interestRate.toFixed(1)}%
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={6}
                            maximumValue={12}
                            step={0.1}
                            value={interestRate}
                            onValueChange={setInterestRate}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>6%</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>12%</Text>
                        </View>
                    </View>

                </View>

                {/* Section Title */}
                <Text style={[styles.sectionTitle, { color: currentText }]}>Savings Breakdown</Text>

                {/* Breakdown List */}
                <View style={styles.breakdownList}>

                    {/* Section 24(b) */}
                    <View style={[styles.breakdownItem, { backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5', borderColor: currentBorder }]}>
                        <View style={styles.breakdownLeft}>
                            <View style={[styles.iconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
                                <Home size={18} color={currentText} />
                            </View>
                            <View style={styles.breakdownText}>
                                <Text style={[styles.breakdownLabel, { color: currentText }]}>Interest Deduction</Text>
                                <Text style={[styles.breakdownSub, { color: currentMuted }]}>Section 24(b)</Text>
                            </View>
                        </View>
                        <Text style={[styles.breakdownValue, { color: successColor }]}>+ {formatCurrency(interestDeduction)}</Text>
                    </View>

                    {/* Section 80C */}
                    <View style={[styles.breakdownItem, { backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5', borderColor: currentBorder }]}>
                        <View style={styles.breakdownLeft}>
                            <View style={[styles.iconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
                                <PiggyBank size={18} color={currentText} />
                            </View>
                            <View style={styles.breakdownText}>
                                <Text style={[styles.breakdownLabel, { color: currentText }]}>Principal Repayment</Text>
                                <Text style={[styles.breakdownSub, { color: currentMuted }]}>Section 80C</Text>
                            </View>
                        </View>
                        <Text style={[styles.breakdownValue, { color: successColor }]}>+ {formatCurrency(principalDeduction)}</Text>
                    </View>

                </View>

                {/* Info Box */}
                <View style={[styles.infoBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)' }]}>
                    <Text style={{ color: accentColor, fontWeight: '600', fontSize: 12 }}>Did you know?</Text>
                    <Text style={{ fontSize: 12, color: currentMuted, lineHeight: 18, marginTop: 4 }}>
                        Home loans offer one of the highest tax benefits under the Old Tax Regime. Maximizing Section 24(b) can significantly reduce your taxable income.
                    </Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Bar */}
            <View style={[styles.bottomBar, { backgroundColor: currentBackground, borderTopColor: currentBorder }]}>
                <TouchableOpacity
                    style={[styles.ctaButton, { backgroundColor: primaryColor }]}
                    onPress={() => navigation.navigate('HomeLoans')}
                >
                    <Text style={styles.ctaText}>Check Home Loan Offers</Text>
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
    resultCard: {
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    resultAmount: {
        fontSize: 36,
        fontWeight: '800',
        marginBottom: 4,
    },
    resultSubtitle: {
        fontSize: 13,
    },
    card: {
        borderRadius: 16,
        padding: 20,
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
    },
    valueTag: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeText: {
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: -12,
    },
    breakdownList: {
        gap: 12,
    },
    breakdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    breakdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    breakdownText: {
        gap: 2,
    },
    breakdownLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    breakdownSub: {
        fontSize: 11,
    },
    breakdownValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    infoBox: {
        padding: 16,
        borderRadius: 12,
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

export default TaxSaverScreen;
