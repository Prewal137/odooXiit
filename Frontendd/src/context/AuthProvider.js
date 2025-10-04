import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient'; // Fixed import path

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [approvalRules, setApprovalRules] = useState([]);

  // Login function that calls the backend API
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/signin', { email, password });
      
      // Save token to localStorage
      localStorage.setItem('token', response.accessToken);
      
      // Set current user with the correct field names
      const user = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role
      };
      
      setCurrentUser(user);
      
      return { user, token: response.accessToken };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  // Signup function that calls the backend API
  const signup = async (userData) => {
    try {
      // For signup, we need to send the data in the format expected by the backend
      const signupData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        companyName: userData.companyName,
        currency: userData.currency
      };
      
      const response = await apiClient.post('/auth/signup', signupData);
      
      // After signup, we need to login to get the token and user data
      const loginResponse = await login(userData.email, userData.password);
      
      return loginResponse;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    setCurrentUser(null);
    setCompany(null);
  };

  // Expense submission function that calls the backend API
  const submitExpense = async (expenseData) => {
    try {
      const response = await apiClient.post('/expenses', expenseData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to submit expense');
    }
  };

  // Get user expenses from backend
  const getUserExpenses = async () => {
    try {
      const response = await apiClient.get(`/expenses`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch expenses');
    }
  };

  // Get all expenses (for admin)
  const getAllExpenses = async () => {
    try {
      const response = await apiClient.get(`/expenses`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch expenses');
    }
  };

  // Get pending expenses for manager approval
  const getPendingExpenses = async () => {
    try {
      const response = await apiClient.get(`/expenses/pending`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pending expenses');
    }
  };

  // Update expense status (approve/reject)
  const updateExpenseStatus = async (expenseId, status, comments = '') => {
    try {
      // The backend expects status to be "Approved" or "Rejected"
      const response = await apiClient.put(`/expenses/${expenseId}/status`, { status, comments });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update expense status');
    }
  };

  const value = {
    currentUser,
    company,
    users,
    expenses,
    approvalRules,
    login,
    logout,
    signup,
    submitExpense,
    getUserExpenses,
    getAllExpenses,
    getPendingExpenses,
    updateExpenseStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};