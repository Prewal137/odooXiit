import React, { createContext, useContext } from 'react';

const mockUsers = [
  { id: 1, name: 'John Admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Jane Manager', email: 'manager@example.com', role: 'manager' },
  { id: 3, name: 'Bob Employee', email: 'employee@example.com', role: 'employee' }
];

const mockExpenses = [
  { 
    id: 1, 
    userId: 3, 
    amount: 50.00, 
    currency: 'USD', 
    category: 'Meals', 
    description: 'Team lunch', 
    date: '2023-05-15', 
    status: 'pending',
    approvalHistory: []
  },
  { 
    id: 2, 
    userId: 3, 
    amount: 120.50, 
    currency: 'USD', 
    category: 'Travel', 
    description: 'Taxi to client', 
    date: '2023-05-10', 
    status: 'approved',
    approvalHistory: [
      {
        approverId: 2,
        status: 'approved',
        comments: 'Approved',
        timestamp: '2023-05-11T10:00:00Z'
      }
    ]
  }
];

const mockApprovalRules = [
  {
    id: 1,
    name: 'Standard Approval',
    description: 'Standard approval rule for all expenses',
    isManagerApprover: true,
    approversSequence: false,
    minimumApprovalPercentage: 60,
    approvers: [
      { userId: 2, required: true, sequence: 1 }
    ]
  }
];

const mockCompany = {
  id: 1,
  name: 'Test Company',
  country: 'US',
  currency: 'USD'
};

const mockAuthContext = {
  currentUser: mockUsers[0],
  company: mockCompany,
  users: mockUsers,
  expenses: mockExpenses,
  approvalRules: mockApprovalRules,
  login: jest.fn(),
  logout: jest.fn(),
  signup: jest.fn(),
  createEmployee: jest.fn(),
  createManager: jest.fn(),
  updateUserRole: jest.fn(),
  submitExpense: jest.fn(),
  updateExpenseStatus: jest.fn(),
  getUserExpenses: jest.fn(() => mockExpenses.filter(e => e.userId === 3)),
  getTeamExpenses: jest.fn(() => mockExpenses),
  getAllExpenses: jest.fn(() => mockExpenses),
  createApprovalRule: jest.fn()
};

export const useAuth = () => mockAuthContext;

export const AuthProvider = ({ children }) => {
  return children;
};