/**
 * FYNP Transaction Store
 * Transaction and wallet state management
 */

import React, {createContext, useContext, useState} from 'react';

const TransactionContext = createContext(null);

export const TransactionProvider = ({children}) => {
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState({
    total: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(false);

  const addTransaction = transaction => {
    setTransactions(prev => [transaction, ...prev]);
    updateBalance(transaction);
  };

  const updateTransaction = (id, updates) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id ? {...transaction, ...updates} : transaction,
      ),
    );
  };

  const deleteTransaction = id => {
    const transaction = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));

    if (transaction) {
      // Reverse the balance update
      updateBalance({
        ...transaction,
        amount: -transaction.amount,
      });
    }
  };

  const setTransactionsList = list => {
    setTransactions(list);
    calculateBalance(list);
  };

  const updateBalance = transaction => {
    setBalance(prev => {
      const newBalance = {...prev};

      if (transaction.type === 'income') {
        newBalance.income += transaction.amount;
        newBalance.total += transaction.amount;
      } else if (transaction.type === 'expense') {
        newBalance.expense += transaction.amount;
        newBalance.total -= transaction.amount;
      }

      return newBalance;
    });
  };

  const calculateBalance = transactionList => {
    const calculated = transactionList.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
          acc.total += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.expense += transaction.amount;
          acc.total -= transaction.amount;
        }
        return acc;
      },
      {total: 0, income: 0, expense: 0},
    );

    setBalance(calculated);
  };

  const addWallet = wallet => {
    setWallets(prev => [...prev, wallet]);
  };

  const updateWallet = (id, updates) => {
    setWallets(prev =>
      prev.map(wallet => (wallet.id === id ? {...wallet, ...updates} : wallet)),
    );
  };

  const deleteWallet = id => {
    setWallets(prev => prev.filter(wallet => wallet.id !== id));
  };

  const setWalletsList = list => {
    setWallets(list);
  };

  const clearTransactionData = () => {
    setTransactions([]);
    setWallets([]);
    setBalance({total: 0, income: 0, expense: 0});
  };

  const value = {
    transactions,
    wallets,
    balance,
    loading,
    setLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setTransactionsList,
    addWallet,
    updateWallet,
    deleteWallet,
    setWalletsList,
    clearTransactionData,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionStore = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactionStore must be used within TransactionProvider',
    );
  }

  return context;
};

export default {TransactionProvider, useTransactionStore};
