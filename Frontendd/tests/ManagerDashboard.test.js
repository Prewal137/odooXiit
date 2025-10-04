import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManagerDashboard from '../src/pages/ManagerDashboard';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    company: { name: 'Test Company', currency: 'USD' },
    currentUser: { id: 1, name: 'Jane Manager' },
    getTeamExpenses: () => [
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
      }
    ],
    updateExpenseStatus: jest.fn(),
    users: [
      { id: 1, name: 'Jane Manager' },
      { id: 3, name: 'Bob Employee' }
    ]
  })
}));

// Mock the useNotification hook
jest.mock('../src/context/NotificationProvider', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn()
  })
}));

describe('ManagerDashboard', () => {
  test('renders manager dashboard overview', () => {
    render(
      <BrowserRouter>
        <ManagerDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Approval Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Review and approve expense claims from your team')).toBeInTheDocument();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
    expect(screen.getByText('Team Expenses')).toBeInTheDocument();
    expect(screen.getByText('Approved This Month')).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
  });

  test('displays pending expenses', () => {
    render(
      <BrowserRouter>
        <ManagerDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Team lunch')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('USD 50')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('shows empty state when no pending expenses', () => {
    // Mock the useAuth hook to return no pending expenses
    jest.mock('../src/context/AuthProvider', () => ({
      useAuth: () => ({
        company: { name: 'Test Company', currency: 'USD' },
        currentUser: { id: 1, name: 'Jane Manager' },
        getTeamExpenses: () => [],
        updateExpenseStatus: jest.fn(),
        users: [
          { id: 1, name: 'Jane Manager' },
          { id: 3, name: 'Bob Employee' }
        ]
      })
    }));

    // Clear the module cache to apply the new mock
    jest.resetModules();
    
    const ManagerDashboard = require('../src/pages/ManagerDashboard').default;
    
    render(
      <BrowserRouter>
        <ManagerDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('No pending approvals')).toBeInTheDocument();
  });
});