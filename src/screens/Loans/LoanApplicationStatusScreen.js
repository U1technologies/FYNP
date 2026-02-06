/**
 * FYNP Loan Application Status Screen
 * Shows all submitted loan applications with their status
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
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react-native';

const LoanApplicationStatusScreen = ({navigation}) => {
  // Sample application data
  const [applications] = React.useState([
    {
      id: 'BL-2024-1234',
      lenderName: 'HDFC Business Loan',
      loanAmount: '5.00L',
      status: 'Under Review',
      statusColor: '#3b82f6',
      statusBg: 'rgba(59, 130, 246, 0.15)',
      icon: 'Clock',
      appliedDate: '2024-01-15',
      businessName: 'Tech Solutions Pvt Ltd',
    },
    {
      id: 'BL-2024-5678',
      lenderName: 'Avanse MSME Loan',
      loanAmount: '3.50L',
      status: 'Approved',
      statusColor: '#22c55e',
      statusBg: 'rgba(34, 197, 94, 0.15)',
      icon: 'CheckCircle',
      appliedDate: '2024-01-10',
      businessName: 'Digital Marketing Agency',
    },
    {
      id: 'BL-2024-9012',
      lenderName: 'SBI SME Loan',
      loanAmount: '7.50L',
      status: 'Pending Documents',
      statusColor: '#f59e0b',
      statusBg: 'rgba(245, 158, 11, 0.15)',
      icon: 'AlertCircle',
      appliedDate: '2024-01-05',
      businessName: 'Manufacturing Solutions Inc',
    },
  ]);

  const getStatusIcon = (iconType) => {
    switch (iconType) {
      case 'Clock':
        return <Clock size={16} color="#3b82f6" />;
      case 'CheckCircle':
        return <CheckCircle size={16} color="#22c55e" />;
      case 'AlertCircle':
        return <AlertCircle size={16} color="#f59e0b" />;
      default:
        return <Clock size={16} color="#3b82f6" />;
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
        <Text style={styles.headerTitle}>Application Status</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.bannerTitle}>Track Your Applications</Text>
          <Text style={styles.bannerDesc}>
            Monitor the status of all your submitted loan applications in one
            place
          </Text>
        </View>

        {/* Applications List */}
        <View style={styles.applicationsList}>
          {applications.length > 0 ? (
            applications.map((app) => (
              <TouchableOpacity
                key={app.id}
                style={styles.applicationCard}
              >
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.appId}>{app.id}</Text>
                    <Text style={styles.businessName}>{app.businessName}</Text>
                  </View>
                  <View style={[styles.statusBadge, {backgroundColor: app.statusBg}]}>
                    <View style={{marginRight: 4}}>
                      {getStatusIcon(app.icon)}
                    </View>
                    <Text style={[styles.statusText, {color: app.statusColor}]}>
                      {app.status}
                    </Text>
                  </View>
                </View>

                {/* Card Body */}
                <View style={styles.cardBody}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Lender</Text>
                    <Text style={styles.infoValue}>{app.lenderName}</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Loan Amount</Text>
                    <Text style={styles.infoValue}>₹ {app.loanAmount}</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Applied On</Text>
                    <Text style={styles.infoValue}>{app.appliedDate}</Text>
                  </View>
                </View>

                {/* Card Footer */}
                <View style={styles.cardFooter}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <ChevronRight size={16} color="#8b5cf6" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No Applications Yet</Text>
              <Text style={styles.emptyStateDesc}>
                You haven't submitted any loan applications yet. Start by applying for a loan.
              </Text>
            </View>
          )}
        </View>

        {/* Status Legend */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Status Guide</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <Clock size={14} color="#3b82f6" />
              <Text style={styles.legendText}>
                <Text style={styles.legendLabel}>Under Review</Text> - Being
                processed
              </Text>
            </View>
            <View style={styles.legendItem}>
              <CheckCircle size={14} color="#22c55e" />
              <Text style={styles.legendText}>
                <Text style={styles.legendLabel}>Approved</Text> - Ready for
                disbursement
              </Text>
            </View>
            <View style={styles.legendItem}>
              <AlertCircle size={14} color="#f59e0b" />
              <Text style={styles.legendText}>
                <Text style={styles.legendLabel}>Pending</Text> - Action
                required
              </Text>
            </View>
          </View>
        </View>

        <View style={{height: 20}} />
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
    paddingBottom: 40,
    gap: 24,
  },

  // Info Banner
  infoBanner: {
    backgroundColor: '#141417',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  bannerDesc: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
  },

  // Applications List
  applicationsList: {
    gap: 12,
  },

  applicationCard: {
    backgroundColor: '#141417',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    overflow: 'hidden',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },

  cardHeaderLeft: {
    flex: 1,
    gap: 4,
  },

  appId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8b5cf6',
    letterSpacing: 0.5,
  },

  businessName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Card Body
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  infoLabel: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '500',
  },

  infoValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 4,
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },

  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8b5cf6',
  },

  // Empty State
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },

  emptyStateDesc: {
    fontSize: 13,
    color: '#71717a',
    textAlign: 'center',
    maxWidth: 250,
  },

  // Legend Section
  legendSection: {
    backgroundColor: '#141417',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },

  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  legendItems: {
    gap: 12,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  legendLabel: {
    fontWeight: '600',
    color: '#ffffff',
  },

  legendText: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 16,
    flex: 1,
  },
});

export default LoanApplicationStatusScreen;
