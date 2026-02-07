/**
 * FYNP Education Loan Application Success Screen
 * Shows confirmation and next steps after education loan application submission
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {X, CheckCircle, Phone, MessageCircle, ArrowRight} from 'lucide-react-native';

const EducationLoanApplicationSuccessScreen = ({navigation, route}) => {
  const {applicationData} = route.params || {};

  // Generate Application ID
  const generateApplicationID = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    return `EDU-${Math.floor(Math.random() * 10000)}-${randomNum}`;
  };

  const applicationID = React.useMemo(() => generateApplicationID(), []);

  const handleCallSupport = () => {
    // In a real app, this would trigger a phone call
    console.log('Call Support');
  };

  const handleChatSupport = () => {
    // In a real app, this would open a chat interface
    console.log('Chat with Support');
  };

  const handleGoToStatus = () => {
    // Navigate to the loan application status screen
    navigation.navigate('LoanApplicationStatus');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header with Close Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <X size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <CheckCircle size={48} color="#22c55e" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Application Submitted</Text>

        {/* Description */}
        <Text style={styles.description}>
          Our education loan consultant will contact you shortly to assist with
          the documentation and further process.
        </Text>

        {/* Application ID Card */}
        <View style={styles.idCard}>
          <Text style={styles.idLabel}>Application ID</Text>
          <Text style={styles.idValue}>#{applicationID}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Status: In Review</Text>
          </View>
        </View>

        {/* Support Options */}
        <View style={styles.supportOptions}>
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={handleCallSupport}
          >
            <Phone size={20} color="#ffffff" />
            <Text style={styles.supportBtnText}>Call Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.supportBtn}
            onPress={handleChatSupport}
          >
            <MessageCircle size={20} color="#ffffff" />
            <Text style={styles.supportBtnText}>Chat with Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleGoToStatus}
        >
          <Text style={styles.actionBtnText}>Go to Status of Apply</Text>
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
    paddingVertical: 12,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },

  // Success Icon
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },

  // Description
  description: {
    fontSize: 15,
    color: '#71717a',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 8,
  },

  // Application ID Card
  idCard: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },

  idLabel: {
    fontSize: 13,
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },

  idValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },

  statusBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    marginTop: 4,
  },

  statusText: {
    fontSize: 12,
    color: '#7c3aed',
    fontWeight: '600',
  },

  // Support Options
  supportOptions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },

  supportBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#18181b',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  supportBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    backgroundColor: '#09090b',
  },

  actionBtn: {
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

  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default EducationLoanApplicationSuccessScreen;
