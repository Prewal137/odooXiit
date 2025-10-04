import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmployeeDashboard from '../src/pages/EmployeeDashboard';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    company: { name: 'Test Company', currency: 'USD' },
    currentUser: { id: 1, name: 'Bob Employee' },
    getUserExpenses: () => [
      { id: 1, userId: 1, amount: 50.00, currency: 'USD', status: 'pending' },
      { id: 2, userId: 1, amount: 120.50, currency: 'USD', status: 'approved' }
    ]
  })
}));

describe('EmployeeDashboard', () => {
  test('renders employee dashboard overview', () => {
    render(
      <BrowserRouter>
        <EmployeeDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome, Bob Employee!')).toBeInTheDocument();
    expect(screen.getByText('Submit and track your expense claims with our streamlined platform. Save time and get faster approvals.')).toBeInTheDocument();
    
    // Check for stats
    expect(screen.getByText('Pending Expenses')).toBeInTheDocument();
    expect(screen.getByText('Approved Expenses')).toBeInTheDocument();
    expect(screen.getByText('Rejected Expenses')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
  });

  test('displays employee statistics correctly', () => {
    render(
      <BrowserRouter>
        <EmployeeDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument(); // Pending Expenses
    expect(screen.getByText('1')).toBeInTheDocument(); // Approved Expenses
    expect(screen.getByText('0')).toBeInTheDocument(); // Rejected Expenses
    expect(screen.getByText('2')).toBeInTheDocument(); // Total Expenses
  });

  test('shows quick actions', () => {
    render(
      <BrowserRouter>
        <EmployeeDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Submit Expense')).toBeInTheDocument();
    expect(screen.getByText('View History')).toBeInTheDocument();
  });
});