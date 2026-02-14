/**
 * FYNP Credit Score Screen
 * Displays user's credit health with score, insights, and actions
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Banknote,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';

const CreditScoreScreen = ({ navigation }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? colors : colors.light;

  const [loading, setLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show loading for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Animate loading circle
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Scale in animation when content appears
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentBorder = theme.border;
  const descTextColor = theme.textSecondary;

  if (loading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: currentBackground }]} edges={['top']}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <View style={[styles.loadingCircle, { borderColor: currentBorder, borderTopColor: colors.success }]}>
            <View style={[styles.loadingInner, { backgroundColor: currentCard }]} />
          </View>
        </Animated.View>
        <Text style={[styles.loadingText, { color: currentText }]}>Loading your credit health...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentBorder }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentText }]}>Credit Health</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {/* Score Container */}
          <View style={[styles.scoreContainer, { borderBottomColor: currentBorder }]}>
            <View style={[styles.scoreCircle, { borderColor: currentBorder, backgroundColor: currentCard }]}>
              <Text style={[styles.scoreValue, { color: currentText }]}>785</Text>
              <Text style={[styles.scoreMax, { color: descTextColor }]}>out of 900</Text>
            </View>
            <Text style={[styles.scoreStatus, { color: colors.success }]}>Excellent</Text>
            <View style={[styles.scoreUpdate, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.scoreUpdateText, { color: descTextColor }]}>Updated today</Text>
            </View>
          </View>

          {/* Insights Grid */}
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.insightLabel, { color: descTextColor }]}>Payment History</Text>
              <Text style={[styles.insightValue, { color: currentText }]}>100% On Time</Text>
              <View style={[styles.insightStatus, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                <Text style={[styles.insightStatusText, { color: colors.success }]}>Excellent</Text>
              </View>
            </View>

            <View style={[styles.insightCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.insightLabel, { color: descTextColor }]}>Credit Usage</Text>
              <Text style={[styles.insightValue, { color: currentText }]}>12% Used</Text>
              <View style={[styles.insightStatus, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                <Text style={[styles.insightStatusText, { color: colors.success }]}>Excellent</Text>
              </View>
            </View>

            <View style={[styles.insightCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.insightLabel, { color: descTextColor }]}>Credit Age</Text>
              <Text style={[styles.insightValue, { color: currentText }]}>4 Yrs 2 Mos</Text>
              <View style={[styles.insightStatus, styles.insightStatusWarning, { backgroundColor: 'rgba(234, 179, 8, 0.15)' }]}>
                <Text style={[styles.insightStatusText, { color: colors.warning }]}>Average</Text>
              </View>
            </View>

            <View style={[styles.insightCard, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <Text style={[styles.insightLabel, { color: descTextColor }]}>Total Accounts</Text>
              <Text style={[styles.insightValue, { color: currentText }]}>6 Active</Text>
              <View style={[styles.insightStatus, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                <Text style={[styles.insightStatusText, { color: colors.success }]}>Good</Text>
              </View>
            </View>
          </View>

          {/* Offer Banner */}
          <View style={styles.offerBanner}>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Pre-approved Loan</Text>
              <Text style={styles.offerDesc}>
                Based on your excellent score, you are eligible for up to ₹5 Lakhs.
              </Text>
              <TouchableOpacity style={styles.offerBtn}>
                <Text style={[styles.offerBtnText, { color: colors.primaryBg }]}>View Offer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerIconBox}>
              <Banknote size={80} color="rgba(255, 255, 255, 0.3)" />
            </View>
          </View>

          {/* Report Actions */}
          <View style={styles.reportActions}>
            <Text style={[styles.reportSectionTitle, { color: currentText }]}>Report Actions</Text>

            <TouchableOpacity style={[styles.reportItem, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <View style={styles.reportLeft}>
                <View style={[styles.reportIconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <FileText size={20} color={currentText} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={[styles.reportTitle, { color: currentText }]}>Full Credit Report</Text>
                  <Text style={[styles.reportDesc, { color: descTextColor }]}>Download detailed PDF statement</Text>
                </View>
              </View>
              <ChevronRight size={20} color={descTextColor} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.reportItem, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <View style={styles.reportLeft}>
                <View style={[styles.reportIconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <RefreshCw size={20} color={currentText} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={[styles.reportTitle, { color: currentText }]}>Refresh Score</Text>
                  <Text style={[styles.reportDesc, { color: descTextColor }]}>Last checked 2 mins ago</Text>
                </View>
              </View>
              <ChevronRight size={20} color={descTextColor} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.reportItem, { backgroundColor: currentCard, borderColor: currentBorder }]}>
              <View style={styles.reportLeft}>
                <View style={[styles.reportIconBox, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <AlertCircle size={20} color={currentText} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={[styles.reportTitle, { color: currentText }]}>Raise a Dispute</Text>
                  <Text style={[styles.reportDesc, { color: descTextColor }]}>Found an error? Report it here</Text>
                </View>
              </View>
              <ChevronRight size={20} color={descTextColor} />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.border,
    borderTopColor: colors.success,
    borderRightColor: colors.success,
    position: 'relative',
  },
  loadingInner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 6,
    left: 6,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Score Container
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderTopColor: colors.success,
    borderRightColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 48,
  },
  scoreMax: {
    fontSize: 13,
    marginTop: 4,
  },
  scoreStatus: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  scoreUpdate: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  scoreUpdateText: {
    fontSize: 13,
  },

  // Insights Grid
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  insightCard: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  insightLabel: {
    fontSize: 12,
  },
  insightValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  insightStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  insightStatusWarning: {
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
  },
  insightStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Offer Banner
  offerBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#6d28d9',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  offerContent: {
    flex: 1,
    zIndex: 1,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  offerDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    maxWidth: '70%',
  },
  offerBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  offerIconBox: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    transform: [{ rotate: '-15deg' }],
  },

  // Report Actions
  reportActions: {
    paddingHorizontal: 20,
    gap: 12,
  },
  reportSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  reportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reportIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  reportDesc: {
    fontSize: 12,
  },
});

export default CreditScoreScreen;
