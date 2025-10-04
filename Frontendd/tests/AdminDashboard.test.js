import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../src/pages/AdminDashboard';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    company: { name: 'Test Company', country: 'US', currency: 'USD' },
    users: [
      { id: 1, name: 'John Admin', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'Jane Manager', email: 'manager@example.com', role: 'manager' },
      { id: 3, name: 'Bob Employee', email: 'employee@example.com', role: 'employee' }
    ],
    expenses: [
      { id: 1, userId: 3, amount: 50.00, currency: 'USD', status: 'pending' },
      { id: 2, userId: 3, amount: 120.50, currency: 'USD', status: 'approved' }
    ],
    createEmployee: jest.fn(),
    createManager: jest.fn(),
    updateUserRole: jest.fn()
  })
}));

// Mock the useNotification hook
jest.mock('../src/context/NotificationProvider', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn()
  })
}));

describe('AdminDashboard', () => {
  test('renders admin dashboard overview', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    expect(screen.getByText('Welcome back! Here\'s what\'s happening with your expense management system.')).toBeInTheDocument();
    
    // Check for summary cards
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    
    // Check for stats
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('US (USD)')).toBeInTheDocument();
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Managers')).toBeInTheDocument();
    expect(screen.getByText('Admins')).toBeInTheDocument();
  });

  test('displays company statistics correctly', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('2')).toBeInTheDocument(); // Active Users
    expect(screen.getByText('1')).toBeInTheDocument(); // Pending Expenses
    expect(screen.getByText('1')).toBeInTheDocument(); // Approved Expenses
  });

  test('shows admin actions', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByText('Approval Rules')).toBeInTheDocument();
    expect(screen.getByText('All Expenses')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  test('displays users table', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('John Admin')).toBeInTheDocument();
    expect(screen.getByText('Jane Manager')).toBeInTheDocument();
    expect(screen.getByText('Bob Employee')).toBeInTheDocument();
  });
});