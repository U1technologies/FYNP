/**
 * FYNP Portfolio Screen - Application Status
 * Track and manage all loan applications
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Briefcase,
  GraduationCap,
  Banknote,
  ArrowLeft,
} from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

const PortfolioScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState('All');
  const { isDarkMode } = useThemeStore();

  // Theme Variables
  const theme = isDarkMode ? colors : colors.light;
  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentMuted = theme.textMuted || '#8e8a98';
  const currentBorder = isDarkMode ? theme.border : '#93c5fd';
  const primaryColor = colors.primary; // Orange

  const tabs = ['All', 'Action Required', 'In Progress', 'Closed', 'Rejected'];

  const applications = [
    {
      id: 1,
      type: 'Business Loan',
      appId: '#BL-88392',
      icon: 'Briefcase',
      iconColor: primaryColor,
      iconBg: isDarkMode ? 'rgba(255, 145, 77, 0.1)' : 'rgba(255, 145, 77, 0.15)',
      status: 'Action Needed',
      statusBg: 'rgba(245, 158, 11, 0.15)',
      statusColor: '#f59e0b',
      statusBorder: 'rgba(245, 158, 11, 0.3)',
      amount: '₹5,00,000',
      date: '14 Oct 2023',
      actionText: 'Complete KYC Verification',
      showProgress: false,
      leftBorder: true,
    },
    {
      id: 2,
      type: 'Education Loan',
      appId: 'HDFC Credila',
      icon: 'GraduationCap',
      iconColor: '#06b6d4',
      iconBg: 'rgba(6, 182, 212, 0.1)',
      status: 'In Review',
      statusBg: 'rgba(245, 158, 11, 0.15)',
      statusColor: '#f59e0b',
      statusBorder: 'rgba(245, 158, 11, 0.3)',
      progress: 70,
      progressColor: '#f59e0b',
      description:
        'Document verification is in progress. Our team will contact you shortly.',
      showProgress: true,
    },
    {
      id: 3,
      type: 'Personal Loan',
      appId: '#PL-29931',
      icon: 'Banknote',
      iconColor: '#10b981',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      status: 'Disbursed',
      statusBg: 'rgba(16, 185, 129, 0.15)',
      statusColor: '#10b981',
      statusBorder: 'rgba(16, 185, 129, 0.3)',
      amount: '₹1,50,000',
      emiDate: '5th Nov',
      hasButtons: true,
      showProgress: false,
    },
    {
      id: 4,
      type: 'Auto Loan',
      appId: '#AL-55621',
      icon: 'Briefcase',
      iconColor: '#ef4444',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      status: 'Rejected',
      statusBg: 'rgba(239, 68, 68, 0.15)',
      statusColor: '#ef4444',
      statusBorder: 'rgba(239, 68, 68, 0.3)',
      amount: '₹8,00,000',
      date: '05 Nov 2023',
      description: 'Application rejected due to low credit score. You can reapply after 6 months.',
      actionText: 'Appeal Decision',
      showProgress: false,
      leftBorder: false,
    },
  ];

  const getIcon = (iconType, color) => {
    switch (iconType) {
      case 'Briefcase':
        return <Briefcase size={20} color={color} />;
      case 'GraduationCap':
        return <GraduationCap size={20} color={color} />;
      case 'Banknote':
        return <Banknote size={20} color={color} />;
      default:
        return <Briefcase size={20} color={color} />;
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Action Required') return app.status === 'Action Needed';
    if (activeTab === 'In Progress') return app.status === 'In Review';
    if (activeTab === 'Closed') return app.status === 'Disbursed';
    if (activeTab === 'Rejected') return app.status === 'Rejected';
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={currentBackground} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentBorder }]}>
        <TouchableOpacity
          style={[styles.backBtn, {
            backgroundColor: isDarkMode ? theme.backgroundSecondary : '#f4f4f5',
            borderColor: currentBorder
          }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={currentText} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: currentText }]}>My Applications</Text>
          <Text style={[styles.headerDesc, { color: currentMuted }]}>Track your loan status in real-time</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === tab ? primaryColor : (isDarkMode ? theme.backgroundSecondary : '#f4f4f5'),
                borderColor: activeTab === tab ? primaryColor : currentBorder
              }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? '#ffffff' : currentMuted }
              ]}
              numberOfLines={1}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Applications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredApplications.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={[
              styles.card,
              { backgroundColor: currentCard, borderColor: currentBorder },
              app.leftBorder && { borderLeftWidth: 4, borderLeftColor: primaryColor },
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: app.iconBg },
                  ]}
                >
                  {getIcon(app.icon, app.iconColor)}
                </View>
                <View style={styles.infoContent}>
                  <Text style={[styles.loanType, { color: currentText }]}>{app.type}</Text>
                  <Text style={[styles.appId, { color: currentMuted }]}>{app.appId}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: app.statusBg, borderColor: app.statusBorder },
                ]}
              >
                <Text style={[styles.statusText, { color: app.statusColor }]}>
                  {app.status}
                </Text>
              </View>
            </View>

            {/* Divider */}
            {app.showProgress && (
              <View style={[styles.divider, { backgroundColor: currentBorder }]} />
            )}

            {/* Progress Bar */}
            {app.showProgress && (
              <>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressTrack, { backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7' }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${app.progress}%`,
                          backgroundColor: app.progressColor,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressText, { color: app.progressColor }]}>{app.progress}%</Text>
                </View>
                <Text style={[styles.description, { color: currentMuted }]}>{app.description}</Text>
              </>
            )}

            {/* Amount & Date Info */}
            {!app.showProgress && app.status !== 'Rejected' && (
              <View style={[styles.infoBox, { backgroundColor: currentBackground }]}>
                <View>
                  <Text style={[styles.infoLabel, { color: currentMuted }]}>
                    {app.emiDate ? 'EMI Date' : 'Amount'}
                  </Text>
                  <Text style={[styles.infoValue, { color: currentText }]}>
                    {app.amount || app.emiDate}
                  </Text>
                </View>
                {app.date && (
                  <View style={styles.infoRight}>
                    <Text style={[styles.infoLabel, { color: currentMuted }]}>Applied On</Text>
                    <Text style={[styles.infoValue, { color: currentText }]}>{app.date}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Amount & Date Info for Rejected */}
            {app.status === 'Rejected' && (
              <>
                <View style={[styles.infoBox, { backgroundColor: currentBackground }]}>
                  <View>
                    <Text style={[styles.infoLabel, { color: currentMuted }]}>Amount</Text>
                    <Text style={[styles.infoValue, { color: currentText }]}>{app.amount}</Text>
                  </View>
                  <View style={styles.infoRight}>
                    <Text style={[styles.infoLabel, { color: currentMuted }]}>Applied On</Text>
                    <Text style={[styles.infoValue, { color: currentText }]}>{app.date}</Text>
                  </View>
                </View>
                <Text style={[styles.description, { color: currentMuted }]}>{app.description}</Text>
              </>
            )}

            {/* Action Button or Buttons */}
            {app.actionText && (
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: primaryColor }]}>
                <Text style={styles.actionBtnText}>{app.actionText}</Text>
              </TouchableOpacity>
            )}

            {app.hasButtons && (
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={[styles.secondaryBtn, { borderColor: currentBorder }]}>
                  <Text style={[styles.secondaryBtnText, { color: currentText }]}>View Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.secondaryBtn, { borderColor: currentBorder }]}>
                  <Text style={[styles.secondaryBtnText, { color: currentText }]}>Support</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },

  headerDesc: {
    fontSize: 13,
  },

  // Tabs
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
    includeFontPadding: false,
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
    flexGrow: 1,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoContent: {
    flex: 1,
  },

  loanType: {
    fontSize: 15,
    fontWeight: '600',
  },

  appId: {
    fontSize: 12,
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },

  description: {
    fontSize: 12,
    lineHeight: 18,
  },

  // Info Box
  infoBox: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoRight: {
    alignItems: 'flex-end',
  },

  infoLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Buttons
  actionBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  secondaryBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },

  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PortfolioScreen;
