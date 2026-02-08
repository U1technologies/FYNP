/**
 * FYNP Loan Service
 * Handles all loan application API calls
 */

import axiosInstance from './api/axiosInstance';
import API_ENDPOINTS from './api/apiEndpoints';

/**
 * Create a new loan application draft
 * @param {string} loanType - Type of loan (PERSONAL_LOAN, BUSINESS_LOAN, HOME_LOAN, EDUCATION_LOAN, etc.)
 * @returns {Promise} Application draft data with applicationId
 */
export const createLoanApplication = async (loanType) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOANS.CREATE, {
      loanType,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating loan application:', error);
    throw error;
  }
};

/**
 * Save personal and loan details
 * @param {string} applicationId - Application ID
 * @param {object} details - Personal and loan details
 * @returns {Promise} Updated application data
 */
export const saveLoanDetails = async (applicationId, details) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.LOANS.SAVE_DETAILS(applicationId),
      details
    );
    return response.data;
  } catch (error) {
    console.error('Error saving loan details:', error);
    throw error;
  }
};

/**
 * Upload documents for loan application
 * @param {string} applicationId - Application ID
 * @param {object} documentData - Document data including files
 * @returns {Promise} Upload confirmation
 */
export const uploadLoanDocuments = async (applicationId, documentData) => {
  try {
    const formData = new FormData();

    // Add document type
    formData.append('docType', documentData.docType);

    // Add files
    if (documentData.files && documentData.files.length > 0) {
      documentData.files.forEach((file, index) => {
        formData.append('files', file);
      });
    }

    const response = await axiosInstance.post(
      API_ENDPOINTS.LOANS.UPLOAD_DOCUMENTS(applicationId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading loan documents:', error);
    throw error;
  }
};

/**
 * Submit loan application
 * @param {string} applicationId - Application ID
 * @returns {Promise} Submission confirmation
 */
export const submitLoanApplication = async (applicationId) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.LOANS.SUBMIT(applicationId)
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};

/**
 * Get all user's loan applications
 * @param {object} query - Query parameters (page, limit, status, etc.)
 * @returns {Promise} List of applications
 */
export const getUserLoanApplications = async (query = {}) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.LOANS.LIST, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching loan applications:', error);
    throw error;
  }
};

/**
 * Get single loan application by ID
 * @param {string} applicationId - Application ID
 * @returns {Promise} Application details
 */
export const getLoanApplicationById = async (applicationId) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.LOANS.GET(applicationId)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching loan application:', error);
    throw error;
  }
};

/**
 * Get loan application status
 * @param {string} applicationId - Application ID
 * @returns {Promise} Application status
 */
export const getLoanApplicationStatus = async (applicationId) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.LOANS.STATUS(applicationId)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching loan application status:', error);
    throw error;
  }
};

/**
 * Delete loan application
 * @param {string} applicationId - Application ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteLoanApplication = async (applicationId) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.LOANS.DELETE(applicationId)
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting loan application:', error);
    throw error;
  }
};

export default {
  createLoanApplication,
  saveLoanDetails,
  uploadLoanDocuments,
  submitLoanApplication,
  getUserLoanApplications,
  getLoanApplicationById,
  getLoanApplicationStatus,
  deleteLoanApplication,
};
