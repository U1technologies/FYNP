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
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react-native';
import * as loanService from '../../services/loanService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar} from 'lucide-react-native';
import {Platform} from 'react-native';

const BusinessLoanApplicationScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  // Personal details
  const [applicantName, setApplicantName] = React.useState('');
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

  // Business details
  const [businessName, setBusinessName] = React.useState('');
  const [businessType, setBusinessType] = React.useState('PROPRIETORSHIP');
  const [gstNumber, setGstNumber] = React.useState('');
  const [annualTurnover, setAnnualTurnover] = React.useState('');
  const [showBusinessTypeModal, setShowBusinessTypeModal] = React.useState(false);

  const [editableLoanAmount, setEditableLoanAmount] = React.useState('500000');
  const [loading, setLoading] = React.useState(false);

  // Load mobile number from AsyncStorage
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
    // Validation - Required fields
    if (!applicantName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Required Field', 'Please enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email');
      return;
    }
    if (!pan.trim()) {
      Alert.alert('Required Field', 'Please enter your PAN number');
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan.toUpperCase())) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN (e.g., ABCDE1234F)');
      return;
    }
    if (!dateOfBirth) {
      Alert.alert('Required Field', 'Please select your date of birth');
      return;
    }
    if (!addressLine.trim()) {
      Alert.alert('Required Field', 'Please enter your address');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Required Field', 'Please enter your city');
      return;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      Alert.alert('Required Field', 'Please enter a valid 6-digit pincode');
      return;
    }
    if (!businessName.trim()) {
      Alert.alert('Required Field', 'Please enter your business name');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create draft application
      const draftResponse = await loanService.createLoanApplication('BUSINESS_LOAN');

      if (!draftResponse.success || !draftResponse.data) {
        throw new Error('Failed to create loan application');
      }

      const applicationId = draftResponse.data.applicationId;

      // Step 2: Prepare loan details (nested structure matching website)
      const loanDetails = {
        personal: {
          fullName: applicantName.trim(),
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
        business: {
          businessName: businessName.trim(),
          businessType: businessType,
          ...(gstNumber.trim() && { gstNumber: gstNumber.trim() }),
          ...(annualTurnover && { annualTurnover: parseInt(annualTurnover) }),
        },
        loan: {
          requestedAmount: parseInt(editableLoanAmount),
        },
      };

      // Step 3: Save loan details
      const detailsResponse = await loanService.saveLoanDetails(applicationId, loanDetails);

      if (!detailsResponse.success) {
        throw new Error('Failed to save loan details');
      }

      // Step 4: Submit application
      const submitResponse = await loanService.submitLoanApplication(applicationId);

      if (!submitResponse.success) {
        throw new Error('Failed to submit loan application');
      }

      // Step 5: Save to AsyncStorage for status tracking
      try {
        const existingApps = await AsyncStorage.getItem('loanApplications');
        const applications = existingApps ? JSON.parse(existingApps) : [];

        const newApplication = {
          applicationId: applicationId,
          loanType: 'Business Loan',
          lenderName: lenderData?.name || 'Business Loan',
          loanAmount: parseInt(editableLoanAmount),
          status: 'In Review',
          submittedAt: new Date().toISOString(),
        };

        applications.unshift(newApplication);
        await AsyncStorage.setItem('loanApplications', JSON.stringify(applications));
      } catch (storageError) {
        console.error('Failed to save to AsyncStorage:', storageError);
      }

      // Step 6: Navigate to success screen with real data
      navigation.navigate('BusinessLoanApplicationSuccess', {
        applicationId: applicationId,
        applicationData: submitResponse.data,
        lenderName: lenderData?.name || 'Business Loan',
        loanAmount: editableLoanAmount,
      });

    } catch (error) {
      console.error('Error submitting business loan application:', error);
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
          {/* Applicant Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Full Name (as per PAN) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#71717a"
              value={applicantName}
              onChangeText={setApplicantName}
            />
          </View>

          {/* Email */}
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

          {/* PAN */}
          <View style={styles.field}>
            <Text style={styles.label}>PAN Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="ABCDE1234F"
              placeholderTextColor="#71717a"
              value={pan}
              onChangeText={(text) => setPan(text.toUpperCase())}
              maxLength={10}
              autoCapitalize="characters"
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.selectText, !dateOfBirth && styles.placeholder]}>
                {dateOfBirth || 'DD / MM / YYYY'}
              </Text>
              <Calendar size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* Address Line */}
          <View style={styles.field}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your current address"
              placeholderTextColor="#71717a"
              value={addressLine}
              onChangeText={setAddressLine}
            />
          </View>

          {/* City */}
          <View style={styles.field}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              placeholderTextColor="#71717a"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Pincode */}
          <View style={styles.field}>
            <Text style={styles.label}>Pincode *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit pincode"
              placeholderTextColor="#71717a"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          {/* Residence Type */}
          <View style={styles.field}>
            <Text style={styles.label}>Residence Type *</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowResidenceModal(true)}
            >
              <Text style={styles.selectText}>
                {residenceType === 'OWNED' ? 'Owned' : residenceType === 'RENTED' ? 'Rented' : 'Parental'}
              </Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* Business Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Business Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter registered business name"
              placeholderTextColor="#71717a"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          {/* Business Type */}
          <View style={styles.field}>
            <Text style={styles.label}>Business Type *</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowBusinessTypeModal(true)}
            >
              <Text style={styles.selectText}>
                {businessType === 'PROPRIETORSHIP' ? 'Proprietorship' :
                 businessType === 'PARTNERSHIP' ? 'Partnership' :
                 businessType === 'PVT_LTD' ? 'Private Limited' : 'LLP'}
              </Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* GST Number - Optional */}
          <View style={styles.field}>
            <Text style={styles.label}>GST Number (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter GST number"
              placeholderTextColor="#71717a"
              value={gstNumber}
              onChangeText={setGstNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Annual Turnover - Optional */}
          <View style={styles.field}>
            <Text style={styles.label}>Annual Turnover (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter annual turnover"
              placeholderTextColor="#71717a"
              value={annualTurnover}
              onChangeText={setAnnualTurnover}
              keyboardType="numeric"
            />
          </View>

          {/* Loan Amount */}
          <View style={styles.field}>
            <Text style={styles.label}>Required Loan Amount *</Text>
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

      {/* Business Type Modal */}
      <Modal
        visible={showBusinessTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBusinessTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Business Type</Text>
              <TouchableOpacity onPress={() => setShowBusinessTypeModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.modalOption}
                onPress={() => {
                  setBusinessType(type);
                  setShowBusinessTypeModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    businessType === type && styles.modalOptionTextActive,
                  ]}
                >
                  {type}
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

  proceedBtnDisabled: {
    opacity: 0.6,
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
    color: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default BusinessLoanApplicationScreen;
