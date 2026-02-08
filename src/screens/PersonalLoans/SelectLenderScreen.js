/**
 * FYNP Select Lender Screen
 * Displays pre-approved personal loan offers from various lenders
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
import {colors} from '../../theme';

const SelectLenderScreen = ({navigation}) => {
  const lenderOffers = [
    {
      id: 1,
      name: 'Axis Bank',
      logo: 'A',
      logoColor: '#991f41',
      maxAmount: '₹5,00,000',
      interestRate: '10.49% p.a.',
      interestRateValue: 10.49,
      isHighlighted: true,
      tenure: 'Up to 60m',
      emi: '₹10,746',
      tag: 'Best Rate',
      tagColor: 'colors.secondaryBg',
      feature: {
        icon: '⚡',
        text: 'Instant Disbursal',
      },
    },
    {
      id: 2,
      name: 'Tata Capital',
      logo: 'T',
      logoColor: '#004a8f',
      maxAmount: '₹3,00,000',
      interestRate: '11.99% p.a.',
      interestRateValue: 11.99,
      isHighlighted: false,
      tenure: 'Up to 48m',
      feature: {
        icon: '📄',
        text: 'Min Documentation',
      },
    },
    {
      id: 3,
      name: 'KreditBee',
      logo: 'K',
      logoColor: '#ff6b00',
      maxAmount: '₹2,00,000',
      interestRate: '1.02% / mo',
      interestRateValue: 12.24,
      isHighlighted: false,
      tenure: 'Up to 24m',
      tag: 'High Approval Chance',
      tagColor: '#3b82f6',
      feature: {
        icon: '⏱',
        text: '10 min process',
      },
    },
    {
      id: 4,
      name: 'IDFC First Bank',
      logo: 'I',
      logoColor: '#9d2449',
      maxAmount: '₹4,50,000',
      interestRate: '10.99% p.a.',
      interestRateValue: 10.99,
      isHighlighted: false,
      tenure: 'Up to 60m',
      feature: {
        icon: '🛡',
        text: 'Paperless',
      },
    },
  ];

  const renderOfferCard = (offer) => (
    <TouchableOpacity
      key={offer.id}
      style={[
        styles.offerCard,
        offer.isHighlighted && styles.offerCardRecommended,
      ]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('LoanDetails', {lender: offer})}>
      {offer.tag && (
        <View style={[styles.tagRibbon, {backgroundColor: offer.tagColor}]}>
          <Text style={styles.tagText}>{offer.tag}</Text>
        </View>
      )}

      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.lenderInfo}>
          <View style={[styles.lenderLogo, {backgroundColor: offer.logoColor}]}>
            <Text style={styles.lenderLogoText}>{offer.logo}</Text>
          </View>
          <Text style={styles.lenderName}>{offer.name}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>

      {/* Main Stats */}
      <View style={styles.loanMainStats}>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Max Amount</Text>
          <Text style={styles.statValue}>{offer.maxAmount}</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Interest Rate</Text>
          <Text
            style={[
              styles.statValue,
              offer.isHighlighted && styles.statValueHighlight,
            ]}>
            {offer.interestRate}
          </Text>
        </View>
      </View>

      {/* Secondary Stats */}
      <View style={styles.loanSecondaryStats}>
        <View style={styles.secStat}>
          <Text style={styles.secStatIcon}>📅</Text>
          <Text style={styles.secStatText}>Tenure: {offer.tenure}</Text>
        </View>
        <View style={styles.secStat}>
          <Text style={styles.secStatIcon}>{offer.feature.icon}</Text>
          <Text style={styles.secStatText}>{offer.feature.text}</Text>
        </View>
      </View>

      {/* Card Footer */}
      {offer.isHighlighted && (
        <View style={styles.cardFooter}>
          <View style={styles.processTag}>
            <Text style={styles.processTagIcon}>⚡</Text>
            <Text style={styles.processTagText}>Instant Disbursal</Text>
          </View>
          <Text style={styles.ctaText}>Get this Loan</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Select Lender</Text>
        <TouchableOpacity style={styles.headerActions}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}>
        {/* Success Banner */}
        <View style={styles.successBanner}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>🎉</Text>
          </View>
          <View style={styles.successText}>
            <Text style={styles.successTitle}>Great news!</Text>
            <Text style={styles.successDesc}>
              We found {lenderOffers.length} pre-approved offers for you based
              on your profile.
            </Text>
          </View>
        </View>

        {/* Offer List */}
        <View style={styles.offersList}>
          {lenderOffers.map((offer) => renderOfferCard(offer))}
        </View>

        {/* Support Link */}
        <View style={styles.supportLink}>
          <Text style={styles.supportText}>Need help choosing?</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Chat with an expert</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerSticky}>
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteIcon}>ℹ</Text>
            <Text style={styles.footerNoteText}>
              Interest rates are subject to credit verification
            </Text>
          </View>
          <View style={styles.securityBrand}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>Secured by FYNP Financials Private Limited</Text>
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>
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
  },

  filterIcon: {
    fontSize: 24,
    color: '#e6e6fa',
  },

  // Content Scroll
  contentScroll: {
    padding: 20,
    gap: 20,
  },

  // Success Banner
  successBanner: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },

  successIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'colors.secondaryBg',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successIconText: {
    fontSize: 24,
  },

  successText: {
    flex: 1,
    gap: 4,
  },

  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6e6fa',
  },

  successDesc: {
    fontSize: 13,
    color: '#8e8a98',
    lineHeight: 18,
  },

  // Offers List
  offersList: {
    gap: 16,
  },

  offerCard: {
    backgroundColor: '#0f1115',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },

  offerCardRecommended: {
    borderColor: 'rgba(139, 92, 246, 0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  tagRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },

  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  lenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  lenderLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  lenderLogoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6e6fa',
  },

  chevron: {
    fontSize: 20,
    color: '#8e8a98',
  },

  // Loan Main Stats
  loanMainStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  statBlock: {
    flex: 1,
    gap: 4,
  },

  verticalDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 16,
  },

  statLabel: {
    fontSize: 12,
    color: '#8e8a98',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e6e6fa',
  },

  statValueHighlight: {
    color: '#18d89b',
  },

  // Loan Secondary Stats
  loanSecondaryStats: {
    backgroundColor: '#0e0e12',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  secStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  secStatIcon: {
    fontSize: 14,
  },

  secStatText: {
    fontSize: 13,
    color: '#8e8a98',
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },

  processTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  processTagIcon: {
    fontSize: 12,
  },

  processTagText: {
    fontSize: 12,
    color: 'colors.secondaryBg',
    fontWeight: '500',
  },

  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'colors.secondaryBg',
  },

  // Support Link
  supportLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },

  supportText: {
    fontSize: 13,
    color: '#8e8a98',
  },

  linkText: {
    fontSize: 13,
    color: 'colors.secondaryBg',
    fontWeight: '600',
  },

  // Footer
  footerSticky: {
    backgroundColor: 'rgba(14, 14, 18, 0.5)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  footerNoteIcon: {
    fontSize: 14,
    color: '#8e8a98',
  },

  footerNoteText: {
    fontSize: 12,
    color: '#8e8a98',
  },

  securityBrand: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default SelectLenderScreen;
