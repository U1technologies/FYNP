/**
 * FYNP Transactions Screen
 */

import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTransactionStore} from '../../store/transactionStore';
import {formatCurrency, formatDate} from '../../utils/formatters';
import {colors, spacing} from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Card from '../../components/Card';
import Button from '../../components/Button';

const TransactionsScreen = () => {
  const {transactions} = useTransactionStore();

  const renderTransaction = ({item}) => (
    <Card style={styles.transactionCard}>
      <View style={globalStyles.rowBetween}>
        <View style={styles.transactionInfo}>
          <Text style={globalStyles.body}>{item.title || 'Transaction'}</Text>
          <Text style={globalStyles.bodySmall}>
            {item.category || 'Uncategorized'}
          </Text>
          <Text style={globalStyles.caption}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.transactionAmount}>
          <Text
            style={[
              globalStyles.heading4,
              item.type === 'income' ? styles.incomeText : styles.expenseText,
            ]}>
            {item.type === 'income' ? '+' : '-'}
            {formatCurrency(item.amount)}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.heading2}>Transactions</Text>
          <Button title="Add New" variant="primary" size="small" />
        </View>

        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.body}>No transactions yet</Text>
            <Button
              title="Add Your First Transaction"
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

  transactionCard: {
    marginBottom: spacing.md,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionAmount: {
    alignItems: 'flex-end',
  },

  incomeText: {
    color: colors.income,
  },

  expenseText: {
    color: colors.expense,
  },

  addButton: {
    marginTop: spacing.xl,
  },
});

export default TransactionsScreen;
