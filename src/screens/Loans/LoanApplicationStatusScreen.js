/**
 * FYNP Loan Application Status Screen
 * Shows all submitted loan applications with their status
 * Integrated with Portfolio screen design
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Briefcase,
  GraduationCap,
  Banknote,
  Home,
  ArrowLeft,
} from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';
import loanService from '../../services/loanService';

const LoanApplicationStatusScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeStore();

  // Theme Variables
  const theme = isDarkMode ? colors : colors.light;
  const currentBackground = theme.background;
  const currentCard = theme.card;
  const currentText = theme.textPrimary;
  const currentMuted = theme.textMuted || '#8e8a98';
  const currentBorder = isDarkMode ? theme.border : '#93c5fd';
  const primaryColor = colors.primary;

  const tabs = ['All', 'Draft', 'Pending', 'Approved', 'Rejected'];

  // Load applications from backend API
  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await loanService.getUserLoanApplications();

      if (response.success && response.data) {
        // Map backend response to frontend format
        const mappedApps = response.data.applications.map((app) => ({
          applicationId: app.applicationId,
          loanType: formatLoanType(app.loanType),
          lenderName: formatLoanType(app.loanType),
          loanAmount: app.loan?.requestedAmount || 0,
          status: app.status,
          submittedAt: app.submittedAt || app.createdAt,
        }));
        setApplications(mappedApps);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload applications when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadApplications();
    }, [loadApplications])
  );

  // Format loan type from backend (BUSINESS_LOAN → Business Loan)
  const formatLoanType = (loanType) => {
    if (!loanType) return 'Loan';
    return loanType
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getLoanTypeIcon = (loanType, color) => {
    const type = loanType?.toLowerCase() || '';
    if (type.includes('business')) {
      return <Briefcase size={20} color={color} />;
    } else if (type.includes('education')) {
      return <GraduationCap size={20} color={color} />;
    } else if (type.includes('home')) {
      return <Home size={20} color={color} />;
    } else {
      return <Banknote size={20} color={color} />;
    }
  };

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || 'draft';

    if (statusLower === 'approved') {
      return {
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.3)',
      };
    } else if (statusLower === 'rejected') {
      return {
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.3)',
      };
    } else if (statusLower === 'pending') {
      return {
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.3)',
      };
    } else if (statusLower === 'draft') {
      return {
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(139, 92, 246, 0.3)',
      };
    } else {
      // Default fallback
      return {
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.15)',
        border: 'rgba(59, 130, 246, 0.3)',
      };
    }
  };

  const getLoanTypeConfig = (loanType) => {
    const type = loanType?.toLowerCase() || '';
    if (type.includes('business')) {
      return {
        color: primaryColor,
        bg: isDarkMode ? 'rgba(255, 145, 77, 0.1)' : 'rgba(255, 145, 77, 0.15)',
      };
    } else if (type.includes('education')) {
      return {
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.1)',
      };
    } else if (type.includes('home')) {
      return {
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.1)',
      };
    } else {
      return {
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
      };
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return 'N/A';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (date) => {
    if (!date) return new Date().toLocaleDateString('en-IN');
    return new Date(date).toLocaleDateString('en-IN');
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'All') return true;
    const status = app.status?.toLowerCase() || 'draft';

    if (activeTab === 'Draft') return status === 'draft';
    if (activeTab === 'Pending') return status === 'pending';
    if (activeTab === 'Approved') return status === 'approved';
    if (activeTab === 'Rejected') return status === 'rejected';
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
          <Text style={[styles.headerTitle, { color: currentText }]}>Application Status</Text>
          <Text style={[styles.headerDesc, { color: currentMuted }]}>Track your loan applications</Text>
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
          <Text style={[styles.loadingText, { color: currentMuted }]}>Loading applications...</Text>
        </View>
      ) : (
        <ScrollView
  contentContainerStyle={[styles.listContent, { flexGrow: 1 }]}
  showsVerticalScrollIndicator={false}
>

          {filteredApplications.length > 0 ? (
            filteredApplications.map((app, index) => {
              const statusConfig = getStatusConfig(app.status);
              const loanTypeConfig = getLoanTypeConfig(app.loanType);

              return (
                <TouchableOpacity
                  key={app.applicationId || index}
                  style={[
                    styles.card,
                    { backgroundColor: currentCard, borderColor: currentBorder },
                  ]}
                >
                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardInfo}>
                      <View
                        style={[
                          styles.iconBox,
                          { backgroundColor: loanTypeConfig.bg },
                        ]}
                      >
                        {getLoanTypeIcon(app.loanType, loanTypeConfig.color)}
                      </View>
                      <View style={styles.infoContent}>
                        <Text style={[styles.loanType, { color: currentText }]}>{app.loanType || 'Loan'}</Text>
                        <Text style={[styles.appId, { color: currentMuted }]}>#{app.applicationId || 'N/A'}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusConfig.bg, borderColor: statusConfig.border },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: statusConfig.color }]}>
                        {app.status || 'DRAFT'}
                      </Text>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={[styles.divider, { backgroundColor: currentBorder }]} />

                  {/* Info Box */}
                  <View style={[styles.infoBox, { backgroundColor: currentBackground }]}>
                    <View>
                      <Text style={[styles.infoLabel, { color: currentMuted }]}>Loan Amount</Text>
                      <Text style={[styles.infoValue, { color: currentText }]}>
                        {formatAmount(app.loanAmount)}
                      </Text>
                    </View>
                    <View style={styles.infoRight}>
                      <Text style={[styles.infoLabel, { color: currentMuted }]}>Applied On</Text>
                      <Text style={[styles.infoValue, { color: currentText }]}>
                        {formatDate(app.submittedAt)}
                      </Text>
                    </View>
                  </View>

                  {/* Lender Info */}
                  {app.lenderName && (
                    <View style={styles.lenderInfo}>
                      <Text style={[styles.lenderLabel, { color: currentMuted }]}>Lender: </Text>
                      <Text style={[styles.lenderValue, { color: currentText }]}>{app.lenderName}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateTitle, { color: currentText }]}>No Applications Found</Text>
              <Text style={[styles.emptyStateDesc, { color: currentMuted }]}>
                {activeTab === 'All'
                  ? "You haven't submitted any loan applications yet."
                  : `No applications with status: ${activeTab}`
                }
              </Text>
              {activeTab === 'All' && (
                <TouchableOpacity
                  style={[styles.emptyBtn, { backgroundColor: primaryColor }]}
                  onPress={() => navigation.navigate('LoanMarketplace')}
                >
                  <Text style={styles.emptyBtnText}>Explore Loans</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      )}
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
    paddingTop: 16,
    gap: 8,
    flexGrow: 0,
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

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  loadingText: {
    fontSize: 14,
  },

  // List
 listContent: {
  paddingHorizontal: 20,
  paddingTop: 12,
  paddingBottom: 20,
  gap: 12,
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

  // Lender Info
  lenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  lenderLabel: {
    fontSize: 12,
    fontWeight: '500',
  },

  lenderValue: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  emptyStateDesc: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },

  emptyBtn: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  emptyBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default LoanApplicationStatusScreen;
