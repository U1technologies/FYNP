/**
 * FYNP Home Loan Application Screen
 * Collects home-specific details for loan eligibility
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
  ArrowRight,
  Calendar,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react-native';

const HomeLoanApplicationScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  const [fullName, setFullName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [propertyCity, setPropertyCity] = React.useState(null);
  const [employmentType, setEmploymentType] = React.useState(null);
  const [propertyPincode, setPropertyPincode] = React.useState('');
  const [loanAmount, setLoanAmount] = React.useState('5000000');
  const [showCityModal, setShowCityModal] = React.useState(false);
  const [showEmploymentModal, setShowEmploymentModal] = React.useState(false);

  const cityOptions = [
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Pune', value: 'Pune'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Chennai', value: 'Chennai'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Ahmedabad', value: 'Ahmedabad'},
  ];

  const employmentOptions = [
    {label: 'Salaried', value: 'Salaried'},
    {label: 'Self-Employed', value: 'Self-Employed'},
    {label: 'Business Owner', value: 'Business Owner'},
    {label: 'Freelancer', value: 'Freelancer'},
  ];

  const handleProceed = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name');
      return;
    }
    if (!dateOfBirth.trim()) {
      Alert.alert('Required Field', 'Please select your date of birth');
      return;
    }
    if (!propertyCity) {
      Alert.alert('Required Field', 'Please select property location');
      return;
    }
    if (!employmentType) {
      Alert.alert('Required Field', 'Please select employment type');
      return;
    }
    if (!propertyPincode.trim()) {
      Alert.alert('Required Field', 'Please enter property pincode');
      return;
    }

    // Proceed to next screen
    const applicationData = {
      fullName: fullName.trim(),
      dateOfBirth,
      propertyCity,
      employmentType,
      propertyPincode: propertyPincode.trim(),
      loanAmount,
      lenderName: lenderData?.name || 'Home Loan',
    };

    navigation.navigate('HomeLoanApplicationSuccess', {
      applicationData,
    });
  };

  const formatCurrency = (amount) => {
    const num = parseInt(amount);
    if (num >= 10000000) {
      return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    }
    return '₹' + (num / 100000).toFixed(2) + ' L';
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
        <Text style={styles.headerTitle}>Home Loan</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <Text style={styles.sectionDesc}>
            We need a few details to fetch the best home loan offers for you.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          {/* Full Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Full Name (as per PAN)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#71717a"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputText}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#71717a"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
              <Calendar size={18} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* Property City */}
          <View style={styles.field}>
            <Text style={styles.label}>Property Location (City)</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowCityModal(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  !propertyCity && styles.placeholder,
                ]}
              >
                {propertyCity || 'Select city'}
              </Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* Employment Type */}
          <View style={styles.field}>
            <Text style={styles.label}>Employment Type</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowEmploymentModal(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  !employmentType && styles.placeholder,
                ]}
              >
                {employmentType || 'Select employment type'}
              </Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* Property Pincode */}
          <View style={styles.field}>
            <Text style={styles.label}>Property Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter property pincode"
              placeholderTextColor="#71717a"
              value={propertyPincode}
              onChangeText={setPropertyPincode}
              keyboardType="numeric"
            />
          </View>

          {/* Loan Amount */}
          <View style={styles.field}>
            <Text style={styles.label}>Required Loan Amount</Text>
            <View style={styles.loanAmountContainer}>
              <TextInput
                style={styles.loanAmountInput}
                value={loanAmount}
                onChangeText={setLoanAmount}
                placeholder="Enter loan amount"
                placeholderTextColor="#71717a"
                keyboardType="numeric"
              />
              <Text style={styles.loanAmountDisplay}>
                {formatCurrency(loanAmount)}
              </Text>
            </View>
            <Text style={styles.loanAmountNote}>
              Range: ₹1 Lakh - ₹5 Crore
            </Text>
          </View>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustBadge}>
          <ShieldCheck size={14} color="#22c55e" />
          <Text style={styles.trustText}>
            Your data is encrypted & secure
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
        <Text style={styles.termsText}>
          By proceeding, you agree to FYNP Terms & Conditions
        </Text>
      </View>

      {/* City Modal */}
      <Modal
        visible={showCityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {cityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setPropertyCity(option.value);
                  setShowCityModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    propertyCity === option.value &&
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

      {/* Employment Type Modal */}
      <Modal
        visible={showEmploymentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmploymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Employment Type</Text>
              <TouchableOpacity onPress={() => setShowEmploymentModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {employmentOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setEmploymentType(option.value);
                  setShowEmploymentModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    employmentType === option.value &&
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
    paddingVertical: 20,
    paddingBottom: 140,
  },

  // Title Section
  titleSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },

  sectionDesc: {
    fontSize: 15,
    color: '#71717a',
    lineHeight: 22,
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
    fontSize: 14,
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

  inputWithIcon: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    padding: 0,
  },

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
  },

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

  loanAmountNote: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 8,
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
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  proceedBtn: {
    width: '100%',
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

  proceedBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  termsText: {
    fontSize: 11,
    color: '#71717a',
    textAlign: 'center',
    marginTop: 12,
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
    color: '#7c3aed',
    fontWeight: '600',
  },
});

export default HomeLoanApplicationScreen;
