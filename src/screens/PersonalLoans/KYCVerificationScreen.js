/**
 * FYNP KYC Verification Screen
 * Allows users to complete KYC verification for loan approval
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const KYCVerificationScreen = ({navigation, route}) => {
  const {lender} = route.params;

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isConsentChecked, setIsConsentChecked] = useState(true);

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
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <View style={styles.headerActions}>
          <Text style={styles.shieldIcon}>🛡</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: '66%'}]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabelCompleted}>Offer</Text>
          <Text style={styles.progressLabelActive}>KYC</Text>
          <Text style={styles.progressLabelPending}>Disbursal</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconCircleText}>📱</Text>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Verify Identity</Text>
            <Text style={styles.heroDesc}>
              Complete your KYC to activate your loan limit instantly.
            </Text>
          </View>
        </View>

        {/* Recommended Method */}
        <View style={styles.methodCardRecommended}>
          <View style={styles.methodHeader}>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Central KYC (CKYC)</Text>
              <Text style={styles.methodDesc}>
                Fastest approval • No upload needed
              </Text>
            </View>
            <Text style={styles.checkIcon}>✓</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PAN Number</Text>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                value="ABCDE1234F"
                editable={false}
                placeholderTextColor="#8e8a98"
              />
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>

          <View style={[styles.inputGroup, styles.inputGroupLast]}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#8e8a98"
              />
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
          </View>
        </View>

        {/* Alternative Methods */}
        <Text style={styles.sectionLabel}>Alternative Options</Text>

        <TouchableOpacity style={styles.methodCard} activeOpacity={0.9}>
          <View style={styles.methodIcon}>
            <Text style={styles.methodIconText}>📹</Text>
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>Video KYC</Text>
            <Text style={styles.methodSub}>
              Connect with an agent (Wait time: 2m)
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.methodCard} activeOpacity={0.9}>
          <View style={styles.methodIcon}>
            <Text style={styles.methodIconText}>☁️</Text>
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>Upload Documents</Text>
            <Text style={styles.methodSub}>Aadhaar, PAN, and Photo</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Consent Box */}
        <View style={styles.consentBox}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              isConsentChecked && styles.checkboxActive,
            ]}
            onPress={() => setIsConsentChecked(!isConsentChecked)}>
            {isConsentChecked && <Text style={styles.checkboxIcon}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.consentText}>
            I authorize {lender.name} to fetch my KYC details from the Central
            KYC Registry (CKYC) for the purpose of this loan application.
          </Text>
        </View>

        <View style={{height: 120}} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerSticky}>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            !isConsentChecked && styles.primaryBtnDisabled,
          ]}
          activeOpacity={0.9}
          disabled={!isConsentChecked}>
          <Text style={styles.primaryBtnText}>Verify & Proceed</Text>
          <Text style={styles.primaryBtnIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.securityBrand}>
          <Text style={styles.securityIcon}>✓</Text>
          <Text style={styles.securityText}>
            Your data is encrypted & secure
          </Text>
        </View>
      </View>
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

  shieldIcon: {
    fontSize: 24,
  },

  // Progress Section
  progressSection: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0a0a0e',
  },

  progressTrack: {
    height: 4,
    backgroundColor: '#27272a',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#18d89b',
    borderRadius: 2,
  },

  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabelCompleted: {
    fontSize: 12,
    color: '#18d89b',
    fontWeight: '600',
  },

  progressLabelActive: {
    fontSize: 12,
    color: '#e6e6fa',
    fontWeight: '600',
  },

  progressLabelPending: {
    fontSize: 12,
    color: '#8e8a98',
  },

  // Content Scroll
  contentScroll: {
    padding: 20,
    gap: 24,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 16,
    marginBottom: 8,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },

  iconCircleText: {
    fontSize: 32,
  },

  heroText: {
    alignItems: 'center',
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e6e6fa',
    marginBottom: 8,
  },

  heroDesc: {
    fontSize: 14,
    color: '#8e8a98',
    lineHeight: 21,
    textAlign: 'center',
  },

  // Method Card Recommended
  methodCardRecommended: {
    backgroundColor: '#0f1115',
    borderWidth: 1,
    borderColor: '#8b5cf6',
    borderRadius: 16,
    overflow: 'hidden',
  },

  methodHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  methodInfo: {
    flex: 1,
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6e6fa',
    marginBottom: 4,
  },

  methodDesc: {
    fontSize: 12,
    color: '#18d89b',
    fontWeight: '500',
  },

  checkIcon: {
    fontSize: 24,
    color: '#4ade80',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.5,
  },

  inputGroup: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },

  inputGroupLast: {
    borderBottomWidth: 0,
  },

  inputLabel: {
    fontSize: 12,
    color: '#8e8a98',
    marginBottom: 8,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#e6e6fa',
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
  },

  lockIcon: {
    fontSize: 16,
  },

  calendarIcon: {
    fontSize: 18,
  },

  // Section Label
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8a98',
    marginTop: 8,
  },

  // Method Card
  methodCard: {
    backgroundColor: '#0f1115',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  methodIconText: {
    fontSize: 20,
  },

  methodDetails: {
    flex: 1,
  },

  methodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6e6fa',
    marginBottom: 2,
  },

  methodSub: {
    fontSize: 12,
    color: '#8e8a98',
  },

  chevron: {
    fontSize: 20,
    color: '#8e8a98',
  },

  // Consent Box
  consentBox: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginTop: 8,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#8e8a98',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  checkboxActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },

  checkboxIcon: {
    fontSize: 14,
    color: '#ffffff',
  },

  consentText: {
    flex: 1,
    fontSize: 12,
    color: '#8e8a98',
    lineHeight: 18,
  },

  // Sticky Footer
  footerSticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34,
    gap: 16,
  },

  primaryBtn: {
    backgroundColor: '#FF914D',
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FF914D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  primaryBtnDisabled: {
    backgroundColor: '#27272a',
    shadowOpacity: 0,
  },

  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  primaryBtnIcon: {
    fontSize: 18,
    color: '#ffffff',
  },

  securityBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  securityIcon: {
    fontSize: 12,
    color: '#8e8a98',
  },

  securityText: {
    fontSize: 11,
    color: '#8e8a98',
    opacity: 0.7,
  },
});

export default KYCVerificationScreen;
