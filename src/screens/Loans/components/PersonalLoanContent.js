import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    ListFilter,
    Zap,
    FileCheck,
    Clock,
    CheckCircle,
    Smartphone,
    Sparkles,
    ArrowRight,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme';

const PersonalLoanContent = () => {
    const navigation = useNavigation();

    const offers = [
        {
            id: 1,
            bank: 'HDFC Bank',
            type: 'Personal Loan',
            rate: '10.75',
            maxAmount: '₹40 Lakhs',
            badge: 'Best Rate',
            features: ['Instant', 'Paperless'],
            logo: 'HDFC',
        },
        {
            id: 2,
            bank: 'ICICI Bank',
            type: 'Personal Loan',
            rate: '10.99',
            maxAmount: '₹50 Lakhs',
            badge: 'Pre-Approved',
            features: ['Disbursal in 2 hrs'],
            logo: 'ICICI',
        },
        {
            id: 3,
            bank: 'IDFC FIRST',
            type: 'Personal Loan',
            rate: '11.00',
            maxAmount: '₹25 Lakhs',
            badge: null,
            features: ['Zero Foreclosure'],
            logo: 'IDFC',
        },
        {
            id: 4,
            bank: 'Kotak Mahindra',
            type: 'Personal Loan',
            rate: '11.25',
            maxAmount: '₹35 Lakhs',
            badge: null,
            features: ['100% Digital'],
            logo: 'KOTAK',
        },
    ];

    const getFeatureIcon = (feature, index) => {
        if (feature.includes('Instant') || feature.includes('Fast')) return <Zap size={12} color="#fbbf24" />;
        if (feature.includes('Paperless') || feature.includes('Doc') || feature.includes('No Collateral')) return <FileCheck size={12} color={colors.primaryBg} />;
        if (feature.includes('Disbursal') || feature.includes('Quick') || feature.includes('Process')) return <Clock size={12} color={colors.textMuted} />;
        if (feature.includes('Zero') || feature.includes('No')) return <CheckCircle size={12} color={colors.textMuted} />;
        if (feature.includes('Digital') || feature.includes('App')) return <Smartphone size={12} color={colors.textMuted} />;
        return <Sparkles size={12} color={colors.textMuted} />;
    };

    return (
        <View style={styles.container}>
            {/* Comparison Banner */}
            <TouchableOpacity
                style={styles.compareBanner}
                onPress={() =>
                    navigation.navigate('LoanComparison', {
                        loanAmount: 500000,
                    })
                }
            >
                <View>
                    <Text style={styles.bannerTitle}>Not sure which to pick?</Text>
                    <Text style={styles.bannerDesc}>Compare up to 3 lenders side-by-side</Text>
                </View>
                <View style={styles.bannerIconBox}>
                    <ArrowRight size={16} color="#ffffff" />
                </View>
            </TouchableOpacity>

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <Text style={styles.resultCount}>
                    {offers.length} Offers found
                </Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <ListFilter size={14} color="#ffffff" />
                    <Text style={styles.filterBtnText}>Sort & Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Offer Cards */}
            {offers.length > 0 ? (
                offers.map((offer) => (
                    <TouchableOpacity key={offer.id} style={styles.offerCard}>
                        {/* Header */}
                        <View style={styles.offerHeader}>
                            <View style={styles.bankInfo}>
                                <View style={styles.bankLogo}>
                                    <Text style={styles.bankLogoText}>{offer.logo}</Text>
                                </View>
                                <View>
                                    <Text style={styles.bankName}>{offer.bank}</Text>
                                    <Text style={styles.bankTag}>{offer.type}</Text>
                                </View>
                            </View>
                            {offer.badge && (
                                <View style={styles.offerBadge}>
                                    <Text style={styles.badgeText}>{offer.badge}</Text>
                                </View>
                            )}
                        </View>

                        {/* Stats */}
                        <View style={styles.offerStats}>
                            <View>
                                <Text style={styles.statLabel}>Interest Rate</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={[styles.statValue, { color: '#4ade80' }]}>
                                        {offer.rate}%
                                    </Text>
                                    <Text style={styles.statUnit}>p.a.</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.statLabel}>Max Amount</Text>
                                <Text style={styles.statValue}>{offer.maxAmount}</Text>
                            </View>
                        </View>

                        {/* Footer */}
                        <View style={styles.offerFooter}>
                            <View style={styles.featureList}>
                                {offer.features.map((feature, index) => (
                                    <View key={index} style={styles.featureItem}>
                                        {getFeatureIcon(feature, index)}
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity
                                style={styles.applyBtn}
                                onPress={() =>
                                    navigation.navigate('LoanConfiguration', {
                                        bankName: offer.bank,
                                        bankLogo: offer.logo,
                                        interestRate: parseFloat(offer.rate),
                                    })
                                }
                            >
                                <Text style={styles.applyBtnText}>Check Eligibility</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                    <Text style={{ color: colors.textMuted }}>No offers found.</Text>
                </View>
            )}

            {/* Trust Footer */}
            <View style={styles.trustFooter}>
                <Text style={styles.trustText}>
                    100% security • iOS 2007 verified ad fintech
                </Text>
            </View>

            <View style={{ height: 20 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20,
        paddingBottom: 100,
        backgroundColor: colors.background,
    },

    // Comparison Banner
    compareBanner: {
        backgroundColor: '#1e1b4b',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: `${colors.primaryBg}66`,
    },

    bannerTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 4,
        letterSpacing: 0.2,
    },

    bannerDesc: {
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 16,
    },

    bannerIconBox: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Filter Bar
    filterBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    resultCount: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.textTertiary,
    },

    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.border,
    },

    filterBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textPrimary,
    },

    // Offer Card
    offerCard: {
        backgroundColor: colors.backgroundCard,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
        gap: 16,
    },

    offerHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    bankInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },

    bankLogo: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },

    bankLogoText: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.black,
    },

    bankName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 2,
    },

    bankTag: {
        fontSize: 12,
        color: colors.textTertiary,
        fontWeight: '500',
    },

    offerBadge: {
        backgroundColor: 'rgba(74, 222, 128, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4ade80',
    },

    // Stats
    offerStats: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
        gap: 16,
    },

    statLabel: {
        fontSize: 11,
        color: colors.textMuted,
        marginBottom: 4,
    },

    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },

    statUnit: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.textMuted,
        marginLeft: 4,
    },

    // Footer
    offerFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    featureList: {
        flexDirection: 'row',
        gap: 12,
        flex: 1,
    },

    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    featureText: {
        fontSize: 11,
        color: colors.textMuted,
    },

    applyBtn: {
        backgroundColor: colors.secondaryBg,
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 999,
        shadowColor: colors.secondaryBg,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },

    applyBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textPrimary,
        letterSpacing: 0.3,
    },

    // Trust Footer
    trustFooter: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    trustText: {
        fontSize: 11,
        color: colors.textMuted,
    },
});

export default PersonalLoanContent;
