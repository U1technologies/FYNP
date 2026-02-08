import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck } from 'lucide-react-native';
import { colors } from '../../../theme';


const EducationLoanContent = () => {
    const navigation = useNavigation();

    const lenders = [
        {
            id: 1,
            name: 'HDFC Credila',
            description: 'Specialized Ed Loan',
            rate: '9.5',
            maxAmount: 'Up to ₹1.5 Cr',
            badge: 'Pre-visa disbursal',
            badgeColor: '#22c55e',
            badgeBg: 'rgba(34, 197, 94, 0.15)',
            logo: 'HDFC',
            logoBg: '#ffffff',
        },
        {
            id: 2,
            name: 'Avanse',
            description: '100% Finance',
            rate: '10.25',
            maxAmount: 'No Limit',
            badge: 'Fast Approval',
            badgeColor: '#3b82f6',
            badgeBg: 'rgba(59, 130, 246, 0.15)',
            logo: 'AVS',
            logoBg: '#ffffff',
        },
        {
            id: 3,
            name: 'IDFC First Bank',
            description: 'Digital Process',
            rate: '9.00',
            maxAmount: 'Up to ₹75 Lakh',
            badge: null,
            badgeColor: '#8b5cf6',
            badgeBg: 'rgba(139, 92, 246, 0.15)',
            logo: 'IDFC',
            logoBg: '#ffffff',
        },
        {
            id: 4,
            name: 'SBI Scholar',
            description: 'Lowest Rates',
            rate: '8.55',
            maxAmount: 'Up to ₹1.5 Cr',
            badge: null,
            badgeColor: '#06b6d4',
            badgeBg: 'rgba(6, 182, 212, 0.15)',
            logo: 'SBI',
            logoBg: '#ffffff',
        },
    ];

    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Education Lenders</Text>
                <Text style={styles.sectionDesc}>
                    Compare offers from India's best banks & NBFCs.
                </Text>
            </View>

            {/* Lenders List */}
            <View style={styles.lendersList}>
                {lenders.map((lender) => (
                    <TouchableOpacity key={lender.id} style={styles.lenderCard}>
                        {/* Card Header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.lenderInfo}>
                                <View style={[styles.logo, { backgroundColor: lender.logoBg }]}>
                                    <Text style={styles.logoText}>{lender.logo}</Text>
                                </View>
                                <View style={styles.lenderDetails}>
                                    <Text style={styles.lenderName}>{lender.name}</Text>
                                    <Text style={styles.lenderDesc}>{lender.description}</Text>
                                </View>
                            </View>
                            {lender.badge && (
                                <View style={[styles.badge, { backgroundColor: lender.badgeBg }]}>
                                    <Text style={[styles.badgeText, { color: lender.badgeColor }]}>
                                        {lender.badge}
                                    </Text>
                                </View>
                            )}
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
                                    navigation.navigate('EducationLoanDetails', {
                                        lenderData: lender,
                                    })
                                }
                            >
                                <Text style={styles.viewDetailsBtnText}>View Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyNowBtn}
                                onPress={() =>
                                    navigation.navigate('EducationLoanApplication', {
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
                  
                    <Text style={styles.trustText}>
                        100% security | FYNP works only with RBI-registered partners
                    </Text>
                </View>
                <Text style={styles.trustSubtext}>
                    Partners are RBI-registered Banks & NBFCs
                </Text>
            </View>

            <View style={{ height: 20 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 20,
        paddingBottom: 40,
    },

    // Section Header
    sectionHeader: {
        gap: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
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
        fontWeight: '600',
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
        fontSize: 10,
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
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewDetailsBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },

    applyNowBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.primaryBg,
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

export default EducationLoanContent;
