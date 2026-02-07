/**
 * FYNP Education Loan Application Screen
 * Collects education-specific details for loan eligibility
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

const EducationLoanApplicationScreen = ({navigation, route}) => {
  const {lenderData} = route.params || {};

  const [fullName, setFullName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [targetCountry, setTargetCountry] = React.useState(null);
  const [collegeName, setCollegeName] = React.useState('');
  const [courseProgram, setCourseProgram] = React.useState('');
  const [loanAmount, setLoanAmount] = React.useState('4500000');
  const [showCountryModal, setShowCountryModal] = React.useState(false);

  const countryOptions = [
    {label: 'USA', value: 'USA'},
    {label: 'Canada', value: 'Canada'},
    {label: 'UK', value: 'UK'},
    {label: 'Australia', value: 'Australia'},
    {label: 'Germany', value: 'Germany'},
    {label: 'Singapore', value: 'Singapore'},
    {label: 'India', value: 'India'},
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
    if (!targetCountry) {
      Alert.alert('Required Field', 'Please select target country');
      return;
    }
    if (!collegeName.trim()) {
      Alert.alert('Required Field', 'Please enter college/university name');
      return;
    }
    if (!courseProgram.trim()) {
      Alert.alert('Required Field', 'Please enter course/program name');
      return;
    }

    // Proceed to next screen
    const applicationData = {
      fullName: fullName.trim(),
      dateOfBirth,
      targetCountry,
      collegeName: collegeName.trim(),
      courseProgram: courseProgram.trim(),
      loanAmount,
      lenderName: lenderData?.name || 'Education Loan',
    };

    navigation.navigate('EducationLoanApplicationSuccess', {
      applicationData,
    });
  };

  const formatCurrency = (amount) => {
    return '₹ ' + (parseInt(amount) / 100000).toFixed(2) + 'L';
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
        <Text style={styles.headerTitle}>Education Loan Application</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lender Summary Card */}
        <View style={styles.lenderSummary}>
          <View style={styles.lenderInfo}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>{lenderData?.logo || 'HDFC'}</Text>
            </View>
            <View style={styles.lenderDetails}>
              <Text style={styles.lenderName}>{lenderData?.name || 'HDFC Credila'}</Text>
              <Text style={styles.lenderDesc}>Applying for Education Loan</Text>
            </View>
          </View>
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

          {/* Target Country */}
          <View style={styles.field}>
            <Text style={styles.label}>Target Country</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowCountryModal(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  !targetCountry && styles.placeholder,
                ]}
              >
                {targetCountry || 'Select country'}
              </Text>
              <ChevronDown size={16} color="#71717a" />
            </TouchableOpacity>
          </View>

          {/* College Name */}
          <View style={styles.field}>
            <Text style={styles.label}>College / University Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter college or university name"
              placeholderTextColor="#71717a"
              value={collegeName}
              onChangeText={setCollegeName}
            />
          </View>

          {/* Course Program */}
          <View style={styles.field}>
            <Text style={styles.label}>Course / Program</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter course or program name"
              placeholderTextColor="#71717a"
              value={courseProgram}
              onChangeText={setCourseProgram}
            />
          </View>

          {/* Loan Amount */}
          <View style={styles.field}>
            <Text style={styles.label}>Loan Amount Required</Text>
            <View style={styles.loanAmountContainer}>
              <Text style={styles.loanAmountText}>
                {formatCurrency(loanAmount)}
              </Text>
            </View>
            <Text style={styles.loanAmountNote}>
              Auto-selected based on your preference
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

      {/* Country Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {countryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setTargetCountry(option.value);
                  setShowCountryModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    targetCountry === option.value &&
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

  // Lender Summary
  lenderSummary: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 24,
  },

  lenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },

  lenderDetails: {
    flex: 1,
    gap: 4,
  },

  lenderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  lenderDesc: {
    fontSize: 13,
    color: '#71717a',
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
  },

  loanAmountText: {
    fontSize: 16,
    color: '#ffffff',
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

export default EducationLoanApplicationScreen;
