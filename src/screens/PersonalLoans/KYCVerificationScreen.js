/**
 * FYNP KYC Verification Screen
 * Success screen after application submission
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
import {CheckCircle, Phone, ArrowRight} from 'lucide-react-native';
import {colors} from '../../theme';

const KYCVerificationScreen = ({navigation, route}) => {
  const formData = route.params || {};

  // Generate a random Application ID
  const generateApplicationID = () => {
    const randomNum = Math.floor(Math.random() * 10000000);
    return `FYNP-${randomNum}`;
  };

  const applicationID = React.useMemo(() => generateApplicationID(), []);

  const handleGoHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleCallSupport = () => {
    // In a real app, this would trigger a phone call
    console.log('Call Support');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Success Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <CheckCircle size={40} color="#22c55e" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Application Submitted</Text>

        {/* Description */}
        <Text style={styles.description}>
          Your details have been received securely. Our team will verify your
          profile and contact you shortly to process your loan.
        </Text>

        {/* Application ID Card */}
        <View style={styles.idCard}>
          <Text style={styles.idLabel}>Application ID</Text>
          <Text style={styles.idValue}>{applicationID}</Text>
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={handleCallSupport}
          >
            <Phone size={20} color="#ffffff" />
            <Text style={styles.supportBtnText}>Call Support Team</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleGoHome}>
          <Text style={styles.primaryBtnText}>Go to Home</Text>
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

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Success Icon
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#ffffff',
    textAlign: 'center',
  },

  // Description
  description: {
    fontSize: 15,
    color: '#71717a',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 300,
    textAlign: 'center',
  },

  // ID Card
  idCard: {
    backgroundColor: '#141417',
    borderWidth: 1,
    borderColor: 'colors.secondaryBg',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
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

  // Support Section
  supportSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  supportBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  checkboxActive: {
    backgroundColor: 'colors.secondaryBg',
    borderColor: 'colors.secondaryBg',
  },

  supportBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
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
});

export default KYCVerificationScreen;
