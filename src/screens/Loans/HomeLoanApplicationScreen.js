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
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as loanService from '../../services/loanService';

const HomeLoanApplicationScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  // Personal details
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pan, setPan] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Address details
  const [addressLine, setAddressLine] = React.useState('');
  const [city, setCity] = React.useState('');
  const [pincode, setPincode] = React.useState('');
  const [residenceType, setResidenceType] = React.useState('RENTED');
  const [showResidenceModal, setShowResidenceModal] = React.useState(false);

  // Employment details
  const [employmentType, setEmploymentType] = React.useState(null);
  const [showEmploymentModal, setShowEmploymentModal] = React.useState(false);

  // Salaried fields
  const [employerName, setEmployerName] = React.useState('');
  const [monthlyIncome, setMonthlyIncome] = React.useState('');

  // Self-Employed Professional fields
  const [profession, setProfession] = React.useState('');
  const [annualIncome, setAnnualIncome] = React.useState('');

  // Loan details
  const [loanAmount, setLoanAmount] = React.useState('5000000');
  const [loading, setLoading] = React.useState(false);

  // Load mobile from AsyncStorage
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setMobile(user.mobile || '');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const employmentOptions = [
    {label: 'Salaried', value: 'Salaried'},
    {label: 'Self-Employed Professional', value: 'Self-Employed Professional'},
  ];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      setDateOfBirth(formatDate(date));
    }
  };

  const handleProceed = async () => {
    // Validation - Personal Details
    if (!fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Required Field', 'Please enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (!pan.trim()) {
      Alert.alert('Required Field', 'Please enter your PAN number');
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan.trim().toUpperCase())) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN number (e.g., ABCDE1234F)');
      return;
    }
    if (!dateOfBirth) {
      Alert.alert('Required Field', 'Please select your date of birth');
      return;
    }

    // Validation - Address Details
    if (!addressLine.trim()) {
      Alert.alert('Required Field', 'Please enter your address');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Required Field', 'Please enter your city');
      return;
    }
    if (!pincode.trim()) {
      Alert.alert('Required Field', 'Please enter your pincode');
      return;
    }

    // Validation - Employment Type
    if (!employmentType) {
      Alert.alert('Required Field', 'Please select employment type');
      return;
    }

    // Validation - Employment-Specific Fields
    if (employmentType === 'Salaried') {
      if (!employerName.trim()) {
        Alert.alert('Required Field', 'Please enter employer name');
        return;
      }
      if (!monthlyIncome.trim()) {
        Alert.alert('Required Field', 'Please enter monthly income');
        return;
      }
    } else if (employmentType === 'Self-Employed Professional') {
      if (!profession.trim()) {
        Alert.alert('Required Field', 'Please enter your profession');
        return;
      }
      if (!annualIncome.trim()) {
        Alert.alert('Required Field', 'Please enter annual income');
        return;
      }
    }

    setLoading(true);

    try {
      // Step 1: Create draft application
      const draftResponse = await loanService.createLoanApplication('HOME_LOAN');

      if (!draftResponse.success || !draftResponse.data) {
        throw new Error('Failed to create loan application');
      }

      const applicationId = draftResponse.data.applicationId;

      // Step 2: Prepare loan details (nested structure matching website)
      const loanDetails = {
        personal: {
          fullName: fullName.trim(),
          email: email.trim(),
          pan: pan.trim().toUpperCase(),
          mobile: mobile,
          dob: dateOfBirth,
        },
        address: {
          current: {
            line1: addressLine.trim(),
            city: city.trim(),
            pincode: pincode.trim(),
            residenceType: residenceType,
          },
          permanent: {
            line1: addressLine.trim(),
            city: city.trim(),
            pincode: pincode.trim(),
            residenceType: residenceType,
          },
        },
        loan: {
          requestedAmount: parseInt(loanAmount),
        },
      };

      // Add employment details based on type
      if (employmentType === 'Salaried') {
        loanDetails.employment = {
          employmentType: 'SALARIED',
          employerName: employerName.trim(),
          monthlyIncome: parseInt(monthlyIncome),
        };
      } else if (employmentType === 'Self-Employed Professional') {
        loanDetails.employment = {
          employmentType: 'SELF_EMPLOYED_PROFESSIONAL',
          profession: profession.trim(),
          annualIncome: parseInt(annualIncome),
        };
      }

      // Step 4: Save loan details
      const detailsResponse = await loanService.saveLoanDetails(applicationId, loanDetails);

      if (!detailsResponse.success) {
        throw new Error('Failed to save loan details');
      }

      // Step 5: Submit application
      const submitResponse = await loanService.submitLoanApplication(applicationId);

      if (!submitResponse.success) {
        throw new Error('Failed to submit loan application');
      }

      // Step 6: Save to AsyncStorage for status tracking
      try {
        const existingApps = await AsyncStorage.getItem('loanApplications');
        const applications = existingApps ? JSON.parse(existingApps) : [];

        const newApplication = {
          applicationId: applicationId,
          loanType: 'Home Loan',
          lenderName: lenderData?.name || 'Home Loan',
          loanAmount: parseInt(loanAmount),
          status: 'In Review',
          submittedAt: new Date().toISOString(),
        };

        applications.unshift(newApplication);
        await AsyncStorage.setItem('loanApplications', JSON.stringify(applications));
      } catch (storageError) {
        console.error('Failed to save to AsyncStorage:', storageError);
      }

      // Step 7: Navigate to success screen with real data
      navigation.navigate('HomeLoanApplicationSuccess', {
        applicationId: applicationId,
        applicationData: submitResponse.data,
        lenderName: lenderData?.name || 'Home Loan',
        loanAmount: loanAmount,
      });

    } catch (error) {
      console.error('Error submitting home loan application:', error);
      Alert.alert(
        'Submission Failed',
        error.message || 'Failed to submit loan application. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.sectionTitle}>Home Loan Application</Text>
          <Text style={styles.sectionDesc}>
            Please provide your details to fetch the best home loan offers.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          {/* ========== PERSONAL DETAILS ========== */}
          <View style={styles.field}>
            <Text style={styles.label}>Full Name (as per PAN) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#71717a"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#71717a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>PAN Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., ABCDE1234F"
              placeholderTextColor="#71717a"
              value={pan}
              onChangeText={setPan}
              autoCapitalize="characters"
              maxLength={10}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TouchableOpacity
              style={styles.inputWithIcon}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.inputText, !dateOfBirth && styles.placeholder]}>
                {dateOfBirth || 'DD / MM / YYYY'}
              </Text>
              <Calendar size={18} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* ========== ADDRESS DETAILS ========== */}
          <View style={styles.field}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              placeholderTextColor="#71717a"
              value={addressLine}
              onChangeText={setAddressLine}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              placeholderTextColor="#71717a"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Pincode *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              placeholderTextColor="#71717a"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Residence Type *</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowResidenceModal(true)}
            >
              <Text style={styles.selectText}>{residenceType}</Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* ========== EMPLOYMENT DETAILS ========== */}
          <View style={styles.field}>
            <Text style={styles.label}>Employment Type *</Text>
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

          {/* Conditional fields based on employment type */}
          {employmentType === 'Salaried' && (
            <>
              <View style={styles.field}>
                <Text style={styles.label}>Employer Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter employer name"
                  placeholderTextColor="#71717a"
                  value={employerName}
                  onChangeText={setEmployerName}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Monthly Income *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter monthly income"
                  placeholderTextColor="#71717a"
                  value={monthlyIncome}
                  onChangeText={setMonthlyIncome}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          {employmentType === 'Self-Employed Professional' && (
            <>
              <View style={styles.field}>
                <Text style={styles.label}>Profession *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Doctor, Lawyer, CA"
                  placeholderTextColor="#71717a"
                  value={profession}
                  onChangeText={setProfession}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Annual Income *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter annual income"
                  placeholderTextColor="#71717a"
                  value={annualIncome}
                  onChangeText={setAnnualIncome}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          {/* ========== LOAN DETAILS ========== */}
          <View style={styles.field}>
            <Text style={styles.label}>Required Loan Amount *</Text>
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
          style={[styles.proceedBtn, loading && styles.proceedBtnDisabled]}
          onPress={handleProceed}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={styles.proceedBtnText}>Proceed</Text>
              <ArrowRight size={18} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By proceeding, you agree to FYNP Terms & Conditions
        </Text>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          />
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.confirmBtn}>Done</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          </View>
        </View>
      </Modal>

      {/* Residence Type Modal */}
      <Modal
        visible={showResidenceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowResidenceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Residence Type</Text>
              <TouchableOpacity onPress={() => setShowResidenceModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {['RENTED', 'OWNED', 'PARENTAL'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.modalOption}
                onPress={() => {
                  setResidenceType(type);
                  setShowResidenceModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    residenceType === type && styles.modalOptionTextActive,
                  ]}
                >
                  {type}
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

  proceedBtnDisabled: {
    opacity: 0.6,
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

  // Date Picker Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  datePickerContainer: {
    backgroundColor: '#141417',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  cancelBtn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#71717a',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  confirmBtn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7c3aed',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default HomeLoanApplicationScreen;
