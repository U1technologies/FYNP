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
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Briefcase,
  GraduationCap,
  Banknote,
  ChevronRight,
} from 'lucide-react-native';

const PortfolioScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = React.useState('All');

  const tabs = ['All', 'Action Required', 'In Progress', 'Closed', 'Rejected'];

  const applications = [
    {
      id: 1,
      type: 'Business Loan',
      appId: '#BL-88392',
      icon: 'Briefcase',
      iconColor: '#7c3aed',
      iconBg: 'rgba(124, 58, 237, 0.1)',
      status: 'Action Needed',
      statusBg: 'rgba(245, 158, 11, 0.15)',
      statusColor: '#f59e0b',
      statusBorder: 'rgba(245, 158, 11, 0.3)',
      amount: '₹ 5,00,000',
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
      amount: '₹ 1,50,000',
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
      amount: '₹ 8,00,000',
      date: '05 Nov 2023',
      description: 'Application rejected due to low credit score. You can reapply after 6 months.',
      actionText: 'Appeal Decision',
      showProgress: false,
      leftBorder: false,
    },
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'Briefcase':
        return <Briefcase size={20} />;
      case 'GraduationCap':
        return <GraduationCap size={20} />;
      case 'Banknote':
        return <Banknote size={20} />;
      default:
        return <Briefcase size={20} />;
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Applications</Text>
        <Text style={styles.headerDesc}>Track your loan status in real-time</Text>
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
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
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
              app.leftBorder && styles.cardWithBorder,
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <View
                  style={[
                    styles.iconBox,
                    {backgroundColor: app.iconBg},
                  ]}
                >
                  <View style={{color: app.iconColor}}>
                    {getIcon(app.icon)}
                  </View>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.loanType}>{app.type}</Text>
                  <Text style={styles.appId}>{app.appId}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: app.statusBg, borderColor: app.statusBorder},
                ]}
              >
                <Text style={[styles.statusText, {color: app.statusColor}]}>
                  {app.status}
                </Text>
              </View>
            </View>

            {/* Divider */}
            {app.showProgress && (
              <View style={styles.divider} />
            )}

            {/* Progress Bar */}
            {app.showProgress && (
              <>
                <View style={styles.progressContainer}>
                  <View style={styles.progressTrack}>
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
                  <Text style={styles.progressText}>{app.progress}%</Text>
                </View>
                <Text style={styles.description}>{app.description}</Text>
              </>
            )}

            {/* Amount & Date Info */}
            {!app.showProgress && app.status !== 'Rejected' && (
              <View style={styles.infoBox}>
                <View>
                  <Text style={styles.infoLabel}>
                    {app.emiDate ? 'EMI Date' : 'Amount'}
                  </Text>
                  <Text style={styles.infoValue}>
                    {app.amount || app.emiDate}
                  </Text>
                </View>
                <View style={{textAlign: 'right'}}>
                  <Text style={styles.infoLabel}>
                    {app.date ? 'Applied On' : ''}
                  </Text>
                  <Text style={styles.infoValue}>{app.date || ''}</Text>
                </View>
              </View>
            )}

            {/* Amount & Date Info for Rejected */}
            {app.status === 'Rejected' && (
              <>
                <View style={styles.infoBox}>
                  <View>
                    <Text style={styles.infoLabel}>Amount</Text>
                    <Text style={styles.infoValue}>{app.amount}</Text>
                  </View>
                  <View style={{textAlign: 'right'}}>
                    <Text style={styles.infoLabel}>Applied On</Text>
                    <Text style={styles.infoValue}>{app.date}</Text>
                  </View>
                </View>
                <Text style={styles.description}>{app.description}</Text>
              </>
            )}

            {/* Action Button or Buttons */}
            {app.actionText && (
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>{app.actionText}</Text>
              </TouchableOpacity>
            )}

            {app.hasButtons && (
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>View Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Support</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{height: 80}} />
      </ScrollView>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: -0.5,
  },

  headerDesc: {
    fontSize: 13,
    color: '#71717a',
  },

  // Tabs
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#141417',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  tabActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },

  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#71717a',
    whiteSpace: 'nowrap',
  },

  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 100,
    gap: 12,
  },

  card: {
    backgroundColor: '#141417',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 10,
  },

  cardWithBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  iconBox: {
    width: 36,
    height: 36,
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
    color: '#ffffff',
  },

  appId: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#27272a',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  progressText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#f59e0b',
  },

  description: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 18,
  },

  // Info Box
  infoBox: {
    backgroundColor: '#09090b',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoLabel: {
    fontSize: 10,
    color: '#71717a',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Buttons
  actionBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 2,
  },

  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
  },

  secondaryBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
  },

  secondaryBtnText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
  },
});

export default PortfolioScreen;
