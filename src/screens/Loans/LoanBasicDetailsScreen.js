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

const LoanBasicDetailsScreen = ({navigation, route}) => {
  const {bankName, loanAmount, tenure, emi} = route.params || {};

  const [fullName, setFullName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [employmentType, setEmploymentType] = React.useState('Salaried');
  const [monthlyIncome, setMonthlyIncome] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [annualTurnover, setAnnualTurnover] = React.useState('');
  const [pincode, setPincode] = React.useState('');

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

    // Validate Date of Birth
    if (!dateOfBirth || dateOfBirth === '') {
      return { valid: false, message: 'Please select your date of birth' };
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
      if (!monthlyIncome || monthlyIncome.trim() === '') {
        return { valid: false, message: 'Please enter your monthly income' };
      }
    } else if (employmentType === 'Self-Employed') {
      if (!companyName || companyName.trim() === '') {
        return { valid: false, message: 'Please enter your company/business name' };
      }
      if (!annualTurnover || annualTurnover.trim() === '') {
        return { valid: false, message: 'Please enter your annual turnover' };
      }
    }

    return { valid: true, message: '' };
  };

  const handleContinue = () => {
    const validation = validateForm();

    if (!validation.valid) {
      Alert.alert('Required Field', validation.message, [{ text: 'OK' }]);
      return;
    }

    // All validations passed - proceed with navigation
    const formData = {
      bankName,
      loanAmount,
      tenure,
      emi,
      fullName: fullName.trim(),
      dateOfBirth,
      employmentType,
      pincode,
    };

    // Add employment-specific fields
    if (employmentType === 'Salaried') {
      formData.monthlyIncome = monthlyIncome.trim();
    } else {
      formData.companyName = companyName.trim();
      formData.annualTurnover = annualTurnover.trim();
    }

    navigation.navigate('KYCVerification', formData);
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
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#71717a"
            />
            <CheckCircle size={18} color="#22c55e" />
          </View>
        </View>

        {/* Date of Birth Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Birth</Text>
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

        {/* Employment Type Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Employment Type</Text>
          <View style={styles.selectionGrid}>
            <TouchableOpacity
              style={[
                styles.selectionCard,
                employmentType === 'Salaried' && styles.selectionCardActive,
              ]}
              onPress={() => setEmploymentType('Salaried')}
            >
              <Briefcase
                size={24}
                color={
                  employmentType === 'Salaried' ? '#8b5cf6' : '#71717a'
                }
              />
              <Text style={styles.selectionText}>Salaried</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectionCard,
                employmentType === 'Self-Employed' &&
                  styles.selectionCardActive,
              ]}
              onPress={() => setEmploymentType('Self-Employed')}
            >
              <Store
                size={24}
                color={
                  employmentType === 'Self-Employed' ? '#8b5cf6' : '#71717a'
                }
              />
              <Text style={styles.selectionText}>Self-Employed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Employment Specific Fields */}
        {employmentType === 'Salaried' ? (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Monthly Income</Text>
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
        ) : (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Company/Business Name</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.inputText}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder="Enter company or business name"
                  placeholderTextColor="#71717a"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Annual Turnover</Text>
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

        {/* Pincode Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pincode</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              value={pincode}
              onChangeText={setPincode}
              placeholder="Enter current residence pincode"
              placeholderTextColor="#71717a"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* Action Area */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleContinue}
        >
          <Text style={styles.primaryBtnText}>Continue</Text>
          <ArrowRight size={18} color="#ffffff" />
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
    gap: 12,
  },

  selectionCard: {
    flex: 1,
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
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
