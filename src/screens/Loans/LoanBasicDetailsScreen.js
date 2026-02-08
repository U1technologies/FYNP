/**
 * FYNP Loan Basic Details Screen
 * Collects user personal information for loan application
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
  Platform,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  Briefcase,
  Store,
  ShieldCheck,
} from 'lucide-react-native';
import * as loanService from '../../services/loanService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoanBasicDetailsScreen = ({navigation, route}) => {
  const {bankName, loanAmount, tenure, emi, interestRate} = route.params || {};

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
  const [employmentType, setEmploymentType] = React.useState('Salaried');
  const [employerName, setEmployerName] = React.useState('');
  const [monthlyIncome, setMonthlyIncome] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [annualIncome, setAnnualIncome] = React.useState('');

  // Business details
  const [companyName, setCompanyName] = React.useState('');
  const [businessType, setBusinessType] = React.useState('PROPRIETORSHIP');
  const [annualTurnover, setAnnualTurnover] = React.useState('');
  const [showBusinessTypeModal, setShowBusinessTypeModal] = React.useState(false);

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

  const validateForm = () => {
    // Validate Full Name
    if (!fullName || fullName.trim() === '') {
      return { valid: false, message: 'Please enter your full name' };
    }

    // Validate Email
    if (!email || email.trim() === '') {
      return { valid: false, message: 'Please enter your email' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email' };
    }

    // Validate PAN
    if (!pan || pan.trim() === '') {
      return { valid: false, message: 'Please enter your PAN number' };
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan.toUpperCase())) {
      return { valid: false, message: 'Please enter a valid PAN (e.g., ABCDE1234F)' };
    }

    // Validate Date of Birth
    if (!dateOfBirth || dateOfBirth === '') {
      return { valid: false, message: 'Please select your date of birth' };
    }

    // Validate Address
    if (!addressLine || addressLine.trim() === '') {
      return { valid: false, message: 'Please enter your address' };
    }

    if (!city || city.trim() === '') {
      return { valid: false, message: 'Please enter your city' };
    }

    // Validate Pincode
    if (!pincode || pincode === '') {
      return { valid: false, message: 'Please enter your pincode' };
    }

    if (pincode.length !== 6) {
      return { valid: false, message: 'Pincode must be exactly 6 digits' };
    }

    if (!/^\d+$/.test(pincode)) {
      return { valid: false, message: 'Pincode must contain only numbers' };
    }

    // Validate employment-specific fields
    if (employmentType === 'Salaried') {
      if (!employerName || employerName.trim() === '') {
        return { valid: false, message: 'Please enter your employer name' };
      }
      if (!monthlyIncome || monthlyIncome.trim() === '') {
        return { valid: false, message: 'Please enter your monthly income' };
      }
    } else if (employmentType === 'Self-Employed Professional') {
      if (!profession || profession.trim() === '') {
        return { valid: false, message: 'Please enter your profession' };
      }
      if (!annualIncome || annualIncome.trim() === '') {
        return { valid: false, message: 'Please enter your annual income' };
      }
    } else if (employmentType === 'Self-Employed Business') {
      // Business Type and Annual Turnover are optional for Personal Loan
      // No required validation needed
    }

    return { valid: true, message: '' };
  };

  const handleContinue = async () => {
    const validation = validateForm();

    if (!validation.valid) {
      Alert.alert('Required Field', validation.message, [{ text: 'OK' }]);
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create draft application
      const draftResponse = await loanService.createLoanApplication('PERSONAL_LOAN');

      if (!draftResponse.success || !draftResponse.data) {
        throw new Error('Failed to create loan application');
      }

      const applicationId = draftResponse.data.applicationId;

      // Step 2: Prepare loan details for backend (nested structure matching website)
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
          tenure: parseInt(tenure),
        },
      };

      // Add employment or business data based on type
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
      } else if (employmentType === 'Self-Employed Business') {
        loanDetails.employment = {
          employmentType: 'SELF_EMPLOYED_BUSINESS',
        };
        // Business fields are optional for Personal Loan
        if (businessType || annualTurnover) {
          loanDetails.business = {};
          if (businessType) {
            loanDetails.business.businessType = businessType;
          }
          if (annualTurnover && annualTurnover.trim()) {
            loanDetails.business.annualTurnover = parseInt(annualTurnover);
          }
        }
      }

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

      // Step 5: Navigate to success screen with real application data
      navigation.navigate('KYCVerification', {
        applicationId: applicationId,
        applicationData: submitResponse.data,
        bankName,
        loanAmount,
        tenure,
        emi,
      });

    } catch (error) {
      console.error('Error submitting loan application:', error);
      Alert.alert(
        'Submission Failed',
        error.message || 'Failed to submit loan application. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
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
        <Text style={styles.headerTitle}>Basic Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Text */}
        <View style={styles.introText}>
          <Text style={styles.introTitle}>Tell us about yourself</Text>
          <Text style={styles.introDesc}>
            We need a few details to verify your identity and customize your
            loan offer.
          </Text>
        </View>

        {/* Full Name Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name (as per PAN) *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#71717a"
            />
          </View>
        </View>

        {/* Email Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#71717a"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* PAN Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>PAN Number *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={pan}
              onChangeText={(text) => setPan(text.toUpperCase())}
              placeholder="ABCDE1234F"
              placeholderTextColor="#71717a"
              maxLength={10}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Date of Birth Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Birth *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={dateOfBirth}
              placeholder="DD / MM / YYYY"
              placeholderTextColor="#71717a"
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Calendar size={18} color={dateOfBirth ? '#8b5cf6' : '#71717a'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Address Line Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Address *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={addressLine}
              onChangeText={setAddressLine}
              placeholder="Enter your current address"
              placeholderTextColor="#71717a"
            />
          </View>
        </View>

        {/* City Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>City *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              placeholderTextColor="#71717a"
            />
          </View>
        </View>

        {/* Pincode Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pincode *</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={pincode}
              onChangeText={setPincode}
              placeholder="Enter 6-digit pincode"
              placeholderTextColor="#71717a"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>

        {/* Residence Type Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Residence Type *</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowResidenceModal(true)}
          >
            <Text style={styles.inputText}>
              {residenceType === 'OWNED' ? 'Owned' : residenceType === 'RENTED' ? 'Rented' : 'Parental'}
            </Text>
            <ArrowRight size={18} color="#71717a" />
          </TouchableOpacity>
        </View>

        {/* Employment Type Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Employment Type *</Text>
          <View style={styles.selectionGrid}>
            <TouchableOpacity
              style={[
                styles.selectionCard,
                employmentType === 'Salaried' && styles.selectionCardActive,
              ]}
              onPress={() => setEmploymentType('Salaried')}
            >
              <Briefcase
                size={20}
                color={
                  employmentType === 'Salaried' ? '#8b5cf6' : '#71717a'
                }
              />
              <Text style={styles.selectionText}>Salaried</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectionCard,
                employmentType === 'Self-Employed Professional' &&
                  styles.selectionCardActive,
              ]}
              onPress={() => setEmploymentType('Self-Employed Professional')}
            >
              <Briefcase
                size={20}
                color={
                  employmentType === 'Self-Employed Professional' ? '#8b5cf6' : '#71717a'
                }
              />
              <Text style={[styles.selectionText, {fontSize: 12}]}>Professional</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectionCard,
                employmentType === 'Self-Employed Business' &&
                  styles.selectionCardActive,
              ]}
              onPress={() => setEmploymentType('Self-Employed Business')}
            >
              <Store
                size={20}
                color={
                  employmentType === 'Self-Employed Business' ? '#8b5cf6' : '#71717a'
                }
              />
              <Text style={[styles.selectionText, {fontSize: 12}]}>Business</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Employment Specific Fields */}
        {employmentType === 'Salaried' && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Employer Name *</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={employerName}
                  onChangeText={setEmployerName}
                  placeholder="Enter your company name"
                  placeholderTextColor="#71717a"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Monthly Income *</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={monthlyIncome}
                  onChangeText={setMonthlyIncome}
                  placeholder="Enter monthly income"
                  placeholderTextColor="#71717a"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        )}

        {employmentType === 'Self-Employed Professional' && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Profession *</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={profession}
                  onChangeText={setProfession}
                  placeholder="Enter your profession (e.g., Doctor, CA)"
                  placeholderTextColor="#71717a"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Annual Income *</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={annualIncome}
                  onChangeText={setAnnualIncome}
                  placeholder="Enter annual income"
                  placeholderTextColor="#71717a"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        )}

        {employmentType === 'Self-Employed Business' && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Business Type (Optional)</Text>
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => setShowBusinessTypeModal(true)}
              >
                <Text style={styles.inputText}>
                  {businessType === 'PROPRIETORSHIP' ? 'Proprietorship' :
                   businessType === 'PARTNERSHIP' ? 'Partnership' :
                   businessType === 'PVT_LTD' ? 'Private Limited' : 'LLP'}
                </Text>
                <ArrowRight size={18} color="#71717a" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Annual Turnover (Optional)</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={annualTurnover}
                  onChangeText={setAnnualTurnover}
                  placeholder="Enter annual turnover"
                  placeholderTextColor="#71717a"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        )}

        {/* Loan Amount Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Loan Amount</Text>
          <View style={styles.inputField}>
            <Text style={styles.inputText}>
              ₹ {loanAmount ? (loanAmount / 100000).toFixed(2) : '0'}L
            </Text>
            <Text style={styles.inputPlaceholder}>
              Auto-filled from previous step
            </Text>
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Action Area */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={styles.primaryBtnText}>Continue</Text>
              <ArrowRight size={18} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
        <View style={styles.trustBadge}>
          <ShieldCheck size={12} color="#71717a" />
          <Text style={styles.trustText}>
            100% security • iOS 2007 verified ad fintech
          </Text>
        </View>
      </View>

      {/* Date Time Picker Modal */}
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
              <Text style={styles.datePickerTitle}>Select Date</Text>
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
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowResidenceModal(false)}
          />
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowResidenceModal(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Select Residence Type</Text>
              <TouchableOpacity onPress={() => setShowResidenceModal(false)}>
                <Text style={styles.confirmBtn}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
              {['OWNED', 'RENTED', 'PARENTAL'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={{paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#27272a'}}
                  onPress={() => {
                    setResidenceType(type);
                    setShowResidenceModal(false);
                  }}
                >
                  <Text style={{color: residenceType === type ? '#8b5cf6' : '#ffffff', fontSize: 16}}>
                    {type === 'OWNED' ? 'Owned' : type === 'RENTED' ? 'Rented' : 'Parental'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowBusinessTypeModal(false)}
          />
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowBusinessTypeModal(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Select Business Type</Text>
              <TouchableOpacity onPress={() => setShowBusinessTypeModal(false)}>
                <Text style={styles.confirmBtn}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
              {[
                {value: 'PROPRIETORSHIP', label: 'Proprietorship'},
                {value: 'PARTNERSHIP', label: 'Partnership'},
                {value: 'PVT_LTD', label: 'Private Limited'},
                {value: 'LLP', label: 'LLP'},
              ].map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={{paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#27272a'}}
                  onPress={() => {
                    setBusinessType(type.value);
                    setShowBusinessTypeModal(false);
                  }}
                >
                  <Text style={{color: businessType === type.value ? '#8b5cf6' : '#ffffff', fontSize: 16}}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
    gap: 24,
    paddingBottom: 200,
  },

  // Intro Text
  introText: {
    gap: 8,
  },

  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 32,
  },

  introDesc: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },

  // Form Group
  formGroup: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#a1a1aa',
  },

  // Input Field
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },

  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },

  inputPlaceholder: {
    fontSize: 12,
    color: '#71717a',
  },

  // Selection Grid
  selectionGrid: {
    flexDirection: 'row',
    gap: 8,
  },

  selectionCard: {
    flex: 1,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 6,
  },

  selectionCardActive: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },

  selectionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Action Area
  actionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  primaryBtn: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
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

  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  // Trust Badge
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
  },

  trustText: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '500',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalOverlay: {
    flex: 1,
  },

  datePickerContainer: {
    backgroundColor: '#141417',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    paddingBottom: 20,
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
    fontWeight: '500',
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

export default LoanBasicDetailsScreen;
