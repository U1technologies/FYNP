/**
 * FYNP Transaction Service
 * Transaction and wallet API calls
 */

import axiosInstance from './api/axiosInstance';
import API_ENDPOINTS from './api/apiEndpoints';

/**
 * Get all transactions
 */
export const getTransactions = async (params = {}) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.LIST, {
      params,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch transactions',
      error,
    };
  }
};

/**
 * Get single transaction
 */
export const getTransaction = async id => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.TRANSACTIONS.GET(id),
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch transaction',
      error,
    };
  }
};

/**
 * Create transaction
 */
export const createTransaction = async transactionData => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.TRANSACTIONS.CREATE,
      transactionData,
    );

    return {
      success: true,
      data: response.data,
      message: 'Transaction created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to create transaction',
      error,
    };
  }
};

/**
 * Update transaction
 */
export const updateTransaction = async (id, updates) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.TRANSACTIONS.UPDATE(id),
      updates,
    );

    return {
      success: true,
      data: response.data,
      message: 'Transaction updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update transaction',
      error,
    };
  }
};

/**
 * Delete transaction
 */
export const deleteTransaction = async id => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.TRANSACTIONS.DELETE(id));

    return {
      success: true,
      message: 'Transaction deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete transaction',
      error,
    };
  }
};

/**
 * Get transaction statistics
 */
export const getTransactionStats = async (params = {}) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.STATS, {
      params,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch statistics',
      error,
    };
  }
};

/**
 * Get all wallets
 */
export const getWallets = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.WALLETS.LIST);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch wallets',
      error,
    };
  }
};

/**
 * Get single wallet
 */
export const getWallet = async id => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.WALLETS.GET(id));

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch wallet',
      error,
    };
  }
};

/**
 * Create wallet
 */
export const createWallet = async walletData => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.WALLETS.CREATE,
      walletData,
    );

    return {
      success: true,
      data: response.data,
      message: 'Wallet created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to create wallet',
      error,
    };
  }
};

/**
 * Update wallet
 */
export const updateWallet = async (id, updates) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.WALLETS.UPDATE(id),
      updates,
    );

    return {
      success: true,
      data: response.data,
      message: 'Wallet updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to update wallet',
      error,
    };
  }
};

/**
 * Delete wallet
 */
export const deleteWallet = async id => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.WALLETS.DELETE(id));

    return {
      success: true,
      message: 'Wallet deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete wallet',
      error,
    };
  }
};

/**
 * Get wallet balance
 */
export const getWalletBalance = async id => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.WALLETS.BALANCE(id));

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to fetch wallet balance',
      error,
    };
  }
};

export const transactionService = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet,
  getWalletBalance,
};

export default transactionService;
