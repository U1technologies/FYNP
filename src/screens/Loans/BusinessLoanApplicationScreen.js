/**
 * FYNP Business Loan Application Screen
 * Collects business details for loan eligibility
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react-native';

const BusinessLoanApplicationScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  const [businessName, setBusinessName] = React.useState('');
  const [applicantName, setApplicantName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [businessVintage, setBusinessVintage] = React.useState(null);
  const [annualTurnover, setAnnualTurnover] = React.useState(null);
  const [loanAmount, setLoanAmount] = React.useState('500000');
  const [showVintageModal, setShowVintageModal] = React.useState(false);
  const [showTurnoverModal, setShowTurnoverModal] = React.useState(false);
  const [editableLoanAmount, setEditableLoanAmount] = React.useState('500000');

  const vintageOptions = [
    {label: '0-1 Years', value: '0-1'},
    {label: '1-3 Years', value: '1-3'},
    {label: '3-5 Years', value: '3-5'},
    {label: '5-10 Years', value: '5-10'},
    {label: '10+ Years', value: '10+'},
  ];

  const turnoverOptions = [
    {label: '< ₹5 Lakhs', value: '<5L'},
    {label: '₹5 - 10 Lakhs', value: '5-10L'},
    {label: '₹10 - 25 Lakhs', value: '10-25L'},
    {label: '₹25 - 50 Lakhs', value: '25-50L'},
    {label: '₹50 - 1 Cr', value: '50L-1Cr'},
    {label: '> ₹1 Cr', value: '>1Cr'},
  ];

  const handleProceed = () => {
    // Validation
    if (!businessName.trim()) {
      Alert.alert('Required Field', 'Please enter your business name');
      return;
    }
    if (!applicantName.trim()) {
      Alert.alert('Required Field', 'Please enter your name');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Required Field', 'Please enter your city');
      return;
    }
    if (!businessVintage) {
      Alert.alert('Required Field', 'Please select business vintage');
      return;
    }
    if (!annualTurnover) {
      Alert.alert('Required Field', 'Please select annual turnover');
      return;
    }

    // Proceed to next screen
    const applicationData = {
      businessName: businessName.trim(),
      applicantName: applicantName.trim(),
      city: city.trim(),
      businessVintage,
      annualTurnover,
      loanAmount: editableLoanAmount,
      lenderName: lenderData?.name || 'Business Loan',
    };

    // Navigate to success screen first
    navigation.navigate('BusinessLoanApplicationSuccess', {
      applicationData,
    });
  };

  const formatCurrency = (amount) => {
    return '₹' + (parseInt(amount) / 100000).toFixed(2) + 'L';
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
        <Text style={styles.headerTitle}>Business Loan Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tell us about your business</Text>
          <Text style={styles.sectionDesc}>
            We need a few details to check your eligibility.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          {/* Business Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter registered business name"
              placeholderTextColor="#71717a"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          {/* Applicant Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Applicant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Person applied for this loan"
              placeholderTextColor="#71717a"
              value={applicantName}
              onChangeText={setApplicantName}
            />
          </View>

          {/* City */}
          <View style={styles.field}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              placeholderTextColor="#71717a"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Two Column Row */}
          <View style={styles.twoColumnRow}>
            {/* Business Vintage */}
            <View style={[styles.field, {flex: 1}]}>
              <Text style={styles.label}>Business Vintage</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowVintageModal(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    !businessVintage && styles.placeholder,
                  ]}
                >
                  {businessVintage
                    ? vintageOptions.find((v) => v.value === businessVintage)
                        ?.label
                    : 'Select years'}
                </Text>
                <ChevronDown size={16} color="#71717a" />
              </TouchableOpacity>
            </View>

            {/* Annual Turnover */}
            <View style={[styles.field, {flex: 1, marginLeft: 16}]}>
              <Text style={styles.label}>Annual Turnover</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowTurnoverModal(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    !annualTurnover && styles.placeholder,
                  ]}
                >
                  {annualTurnover
                    ? turnoverOptions.find((t) => t.value === annualTurnover)
                        ?.label
                    : 'Select turnover'}
                </Text>
                <ChevronDown size={16} color="#71717a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Loan Amount */}
          <View style={styles.field}>
            <Text style={styles.label}>Required Loan Amount</Text>
            <View style={styles.loanAmountContainer}>
              <TextInput
                style={styles.loanAmountInput}
                value={editableLoanAmount}
                onChangeText={setEditableLoanAmount}
                placeholder="Enter loan amount"
                placeholderTextColor="#71717a"
                keyboardType="numeric"
              />
              <Text style={styles.loanAmountDisplay}>
                {formatCurrency(editableLoanAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustBadge}>
          <ShieldCheck size={16} color="#22c55e" />
          <Text style={styles.trustText}>
            Your data is 100% secure with FYNP
          </Text>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Action Area */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={handleProceed}
        >
          <Text style={styles.proceedBtnText}>Proceed</Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Business Vintage Modal */}
      <Modal
        visible={showVintageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVintageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Business Vintage</Text>
              <TouchableOpacity onPress={() => setShowVintageModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {vintageOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setBusinessVintage(option.value);
                  setShowVintageModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    businessVintage === option.value &&
                      styles.modalOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Annual Turnover Modal */}
      <Modal
        visible={showTurnoverModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTurnoverModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Annual Turnover</Text>
              <TouchableOpacity onPress={() => setShowTurnoverModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {turnoverOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setAnnualTurnover(option.value);
                  setShowTurnoverModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    annualTurnover === option.value &&
                      styles.modalOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  },

  // Section Header
  sectionHeader: {
    marginBottom: 24,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },

  sectionDesc: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },

  // Form
  formGroup: {
    gap: 20,
    marginBottom: 32,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#a1a1aa',
  },

  input: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 15,
  },

  // Select Input
  selectInput: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },

  placeholder: {
    color: '#71717a',
    fontWeight: '400',
  },

  // Two Column Row
  twoColumnRow: {
    flexDirection: 'row',
    gap: 16,
  },

  // Loan Amount Container
  loanAmountContainer: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loanAmountInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    padding: 0,
  },

  loanAmountDisplay: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
  },

  // Trust Badge
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },

  trustText: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '500',
  },

  // Action Area
  actionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  proceedBtn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#8b5cf6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  proceedBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#141417',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  closeBtn: {
    fontSize: 24,
    color: '#71717a',
    fontWeight: '300',
  },

  modalOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  modalOptionText: {
    fontSize: 15,
    color: '#a1a1aa',
    fontWeight: '500',
  },

  modalOptionTextActive: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
});

export default BusinessLoanApplicationScreen;
