/**
 * FYNP Wallet Screen
 */

import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTransactionStore} from '../../store/transactionStore';
import {formatCurrency} from '../../utils/formatters';
import {colors, spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Card from '../../components/Card';
import Button from '../../components/Button';

const WalletScreen = () => {
  const {wallets} = useTransactionStore();

  const renderWallet = ({item}) => (
    <Card style={styles.walletCard}>
      <View>
        <Text style={globalStyles.bodySmall}>{item.type || 'Bank'}</Text>
        <Text style={globalStyles.heading3}>{item.name || 'My Wallet'}</Text>
        <Text style={styles.balance}>{formatCurrency(item.balance || 0)}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.heading2}>Wallets</Text>
          <Button title="Add Wallet" variant="primary" size="small" />
        </View>

        {wallets.length > 0 ? (
          <FlatList
            data={wallets}
            renderItem={renderWallet}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            numColumns={2}
          />
        ) : (
          <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.body}>No wallets yet</Text>
            <Button
              title="Add Your First Wallet"
              variant="primary"
              style={styles.addButton}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.screenPadding,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  listContent: {
    paddingBottom: spacing.xl,
  },

  walletCard: {
    flex: 1,
    margin: spacing.sm,
    backgroundColor: colors.primary,
  },

  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginTop: spacing.md,
  },

  addButton: {
    marginTop: spacing.xl,
  },
});

export default WalletScreen;
