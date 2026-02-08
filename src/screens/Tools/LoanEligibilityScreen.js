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
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

const { width } = Dimensions.get('window');

const LoanEligibilityScreen = () => {
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
    const [monthlyIncome, setMonthlyIncome] = useState(65000);
    const [existingEMI, setExistingEMI] = useState(12000);
    const [interestRate, setInterestRate] = useState(10.5);
    const [tenure, setTenure] = useState(5);

    const [maxLoan, setMaxLoan] = useState(0);
    const [affordableEMI, setAffordableEMI] = useState(0);

    // Calculation Logic
    useEffect(() => {
        // FOIR (Fixed Obligation to Income Ratio) - typically 50-60%
        const foir = 0.55;
        const availableIncome = monthlyIncome - existingEMI;
        const maxEMI = availableIncome * foir;

        // Calculate max loan based on EMI capacity
        const R = interestRate / 12 / 100;
        const N = tenure * 12;

        if (R === 0 || N === 0) {
            setMaxLoan(0);
            setAffordableEMI(0);
            return;
        }

        // EMI = P * R * (1+R)^N / ((1+R)^N - 1)
        // Reverse: P = EMI * ((1+R)^N - 1) / (R * (1+R)^N)
        const calculatedLoan = maxEMI * (Math.pow(1 + R, N) - 1) / (R * Math.pow(1 + R, N));

        setMaxLoan(Math.round(calculatedLoan));
        setAffordableEMI(Math.round(maxEMI));
    }, [monthlyIncome, existingEMI, interestRate, tenure]);

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
                <Text style={[styles.headerTitle, { color: currentText }]}>Check Eligibility</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Result Card */}
                <View style={[styles.resultCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
                    <Text style={[styles.resultLabel, { color: currentMuted }]}>Max Loan Eligibility</Text>
                    <Text style={[styles.resultAmount, { color: accentColor }]}>{formatCompact(maxLoan)}</Text>
                    <View style={styles.resultSubtext}>
                        <CheckCircle2 size={14} color={successColor} />
                        <Text style={{ fontSize: 13, color: successColor }}>High Approval Chance</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, { backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                        <Text style={[styles.statLabel, { color: currentMuted }]}>Affordable EMI</Text>
                        <Text style={[styles.statValue, { color: currentText }]}>{formatCompact(affordableEMI)}/mo</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                        <Text style={[styles.statLabel, { color: currentMuted }]}>Max Tenure</Text>
                        <Text style={[styles.statValue, { color: currentText }]}>{tenure} Years</Text>
                    </View>
                </View>

                {/* Input Card */}
                <View style={[styles.card, { backgroundColor: currentCard, borderColor: currentBorder }]}>

                    {/* Monthly Income */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Net Monthly Income</Text>
                            <Text style={[styles.valueTag, { color: currentText, backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                                {formatCurrency(monthlyIncome)}
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={15000}
                            maximumValue={500000}
                            step={1000}
                            value={monthlyIncome}
                            onValueChange={setMonthlyIncome}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹15K</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹5L</Text>
                        </View>
                    </View>

                    {/* Existing EMIs */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Current Monthly EMIs</Text>
                            <Text style={[styles.valueTag, { color: currentText, backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                                {formatCurrency(existingEMI)}
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100000}
                            step={500}
                            value={existingEMI}
                            onValueChange={setExistingEMI}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹0</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>₹1L</Text>
                        </View>
                    </View>

                    {/* Interest Rate */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Interest Rate (p.a)</Text>
                            <Text style={[styles.valueTag, { color: currentText, backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                                {interestRate.toFixed(1)}%
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={8}
                            maximumValue={24}
                            step={0.1}
                            value={interestRate}
                            onValueChange={setInterestRate}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>8%</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>24%</Text>
                        </View>
                    </View>

                    {/* Tenure */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputHeader}>
                            <Text style={[styles.label, { color: currentMuted }]}>Desired Tenure</Text>
                            <Text style={[styles.valueTag, { color: currentText, backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5' }]}>
                                {tenure} Years
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={7}
                            step={1}
                            value={tenure}
                            onValueChange={setTenure}
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={isDarkMode ? '#27272a' : '#e4e4e7'}
                            thumbTintColor={primaryColor}
                        />
                        <View style={styles.rangeLabels}>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>1 Yr</Text>
                            <Text style={[styles.rangeText, { color: currentMuted }]}>7 Yrs</Text>
                        </View>
                    </View>

                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Bar */}
            <View style={[styles.bottomBar, { backgroundColor: currentBackground, borderTopColor: currentBorder }]}>
                <TouchableOpacity style={[styles.ctaButton, { backgroundColor: primaryColor }]}>
                    <Text style={styles.ctaText}>Apply for {formatCompact(maxLoan)} Now</Text>
                    <ArrowRight size={18} color="#ffffff" />
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
        position: 'relative',
        overflow: 'hidden',
    },
    resultLabel: {
        fontSize: 14,
        marginBottom: 8,
    },
    resultAmount: {
        fontSize: 36,
        fontWeight: '700',
        marginBottom: 4,
    },
    resultSubtext: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        gap: 6,
    },
    statLabel: {
        fontSize: 12,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
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
        fontSize: 15,
        fontWeight: '600',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        minWidth: 80,
        textAlign: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    ctaText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LoanEligibilityScreen;
