import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseHistory from '../src/pages/ExpenseHistory';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    currentUser: { id: 1, name: 'Test User' },
    getUserExpenses: () => [
      {
        id: 1,
        userId: 1,
        amount: 50.00,
        currency: 'USD',
        category: 'Meals',
        description: 'Team lunch',
        date: '2023-05-15',
        status: 'pending',
        approvalHistory: []
      }
    ],
    company: { currency: 'USD' },
    users: [{ id: 1, name: 'Test User' }]
  })
}));

describe('ExpenseHistory', () => {
  test('renders expense history table', () => {
    render(<ExpenseHistory />);

    expect(screen.getByText('Expense History')).toBeInTheDocument();
    expect(screen.getByText('View and manage your submitted expenses')).toBeInTheDocument();
    expect(screen.getByText('Team lunch')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('USD 50')).toBeInTheDocument();
  });

  test('shows empty state when no expenses', () => {
    // Mock the useAuth hook to return empty expenses
    jest.mock('../src/context/AuthProvider', () => ({
      useAuth: () => ({
        currentUser: { id: 1, name: 'Test User' },
        getUserExpenses: () => [],
        company: { currency: 'USD' },
        users: [{ id: 1, name: 'Test User' }]
      })
    }));

    // Clear the module cache to apply the new mock
    jest.resetModules();
    
    const ExpenseHistory = require('../src/pages/ExpenseHistory').default;
    
    render(<ExpenseHistory />);

    expect(screen.getByText('No expenses found')).toBeInTheDocument();
  });

  test('displays expense status correctly', () => {
    render(<ExpenseHistory />);

    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});