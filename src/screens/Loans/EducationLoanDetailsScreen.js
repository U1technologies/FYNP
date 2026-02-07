/**
 * FYNP Education Loan Details Screen
 * Displays detailed information about education loan products
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
import {
  ArrowLeft,
  Check,
  ArrowRight,
  Sparkles,
  FileText,
  GraduationCap,
  Banknote,
} from 'lucide-react-native';

const EducationLoanDetailsScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  // Default education loan data if not passed
  const lender = lenderData || {
    name: 'HDFC Credila',
    description: 'Specialized Education Loan',
    rate: '9.5',
    maxAmount: '₹1.5 Cr',
    tenure: 'Up to 15 Years',
    processingFee: '1% - 1.5%',
    badge1: 'Pre-visa Disbursal',
    badge2: '100% Finance',
    logo: 'HDFC',
  };

  const benefits = [
    {
      title: 'Tax Benefits under 80E',
      description: 'Save significantly on taxes for interest paid.',
    },
    {
      title: 'Cover Living Expenses',
      description: 'Loan amount covers tuition plus living costs.',
    },
    {
      title: 'Pre-admission Sanction',
      description: 'Get loan approval before your admission is confirmed.',
    },
  ];

  const eligibilityCriteria = [
    {label: 'Min. Academic Score', value: '60% in Graduation'},
    {label: 'Co-borrower', value: 'Mandatory (Parent)'},
    {label: 'Collateral', value: 'Not required < ₹40L'},
  ];

  const documents = [
    {icon: 'FileText', label: 'KYC Documents'},
    {icon: 'GraduationCap', label: 'Admission Proof'},
    {icon: 'Banknote', label: 'Income Proof'},
  ];

  const getDocumentIcon = (iconType) => {
    switch (iconType) {
      case 'FileText':
        return <FileText size={20} color="#7c3aed" />;
      case 'GraduationCap':
        return <GraduationCap size={20} color="#7c3aed" />;
      case 'Banknote':
        return <Banknote size={20} color="#7c3aed" />;
      default:
        return <FileText size={20} color="#7c3aed" />;
    }
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
        <Text style={styles.headerTitle}>Loan Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>{lender.logo}</Text>
            </View>
            <View style={styles.lenderInfo}>
              <Text style={styles.lenderName}>{lender.name}</Text>
              <Text style={styles.lenderDesc}>{lender.description}</Text>
            </View>
          </View>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {lender.badge1 && (
              <View style={[styles.badge, {backgroundColor: 'rgba(16, 185, 129, 0.15)'}]}>
                <Text style={[styles.badgeText, {color: '#34d399'}]}>
                  {lender.badge1}
                </Text>
              </View>
            )}
            {lender.badge2 && (
              <View style={[styles.badge, {backgroundColor: 'rgba(59, 130, 246, 0.15)'}]}>
                <Text style={[styles.badgeText, {color: '#60a5fa'}]}>
                  {lender.badge2}
                </Text>
              </View>
            )}
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Interest Rate</Text>
              <Text style={styles.infoValue}>{lender.rate}%</Text>
              <Text style={styles.infoSubtext}>p.a.</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Max Amount</Text>
              <Text style={styles.infoValue}>{lender.maxAmount}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tenure</Text>
              <Text style={styles.infoValue}>{lender.tenure}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Processing Fee</Text>
              <Text style={styles.infoValue}>{lender.processingFee}</Text>
            </View>
          </View>
        </View>

        {/* Key Benefits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={18} color="#7c3aed" />
            <Text style={styles.sectionTitle}>Key Benefits</Text>
          </View>
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.checkIcon}>
                  <Check size={16} color="#7c3aed" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDesc}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Eligibility Criteria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
          <View style={styles.eligibilityList}>
            {eligibilityCriteria.map((item, index) => (
              <View key={index}>
                <View style={styles.criteriaItem}>
                  <Text style={styles.criteriaLabel}>{item.label}</Text>
                  <Text style={styles.criteriaValue}>{item.value}</Text>
                </View>
                {index < eligibilityCriteria.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Documents Required */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents Required</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.documentsScroll}
          >
            {documents.map((doc, index) => (
              <View key={index} style={styles.documentCard}>
                {getDocumentIcon(doc.icon)}
                <Text style={styles.documentLabel}>{doc.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.brochureBtn}>
          <Text style={styles.brochureBtnText}>Brochure</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() =>
            navigation.navigate('EducationLoanApplication', {
              lenderData,
            })
          }
        >
          <Text style={styles.applyBtnText}>Apply Now</Text>
          <ArrowRight size={18} color="#ffffff" />
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
    paddingBottom: 180,
    gap: 24,
  },

  // Hero Card
  heroCard: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 16,
  },

  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  logoText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
  },

  lenderInfo: {
    flex: 1,
    gap: 4,
  },

  lenderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderDesc: {
    fontSize: 13,
    color: '#71717a',
  },

  // Badges
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Info Grid
  infoGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  infoItem: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#09090b',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },

  infoLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  infoSubtext: {
    fontSize: 12,
    color: '#a1a1aa',
  },

  // Section
  section: {
    gap: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Benefits List
  benefitsList: {
    gap: 16,
  },

  benefitItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  benefitContent: {
    flex: 1,
    gap: 2,
  },

  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  benefitDesc: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
  },

  // Eligibility
  eligibilityList: {
    backgroundColor: '#141417',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  criteriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  criteriaLabel: {
    fontSize: 14,
    color: '#71717a',
    fontWeight: '500',
  },

  criteriaValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
  },

  // Documents
  documentsScroll: {
    gap: 12,
    paddingRight: 20,
  },

  documentCard: {
    minWidth: 140,
    backgroundColor: '#18181b',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  documentLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
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
    flexDirection: 'row',
    gap: 12,
  },

  brochureBtn: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  brochureBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },

  applyBtn: {
    flex: 2,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#7c3aed',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  applyBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default EducationLoanDetailsScreen;
