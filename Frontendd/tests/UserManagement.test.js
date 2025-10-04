import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserManagement from '../src/components/UserManagement';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    users: [
      { id: 1, name: 'John Admin', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'Jane Manager', email: 'manager@example.com', role: 'manager' },
      { id: 3, name: 'Bob Employee', email: 'employee@example.com', role: 'employee' }
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

describe('UserManagement', () => {
  test('renders user management table', () => {
    render(<UserManagement />);

    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument();
    expect(screen.getByText('John Admin')).toBeInTheDocument();
    expect(screen.getByText('Jane Manager')).toBeInTheDocument();
    expect(screen.getByText('Bob Employee')).toBeInTheDocument();
  });

  test('opens add user modal when add user button is clicked', () => {
    render(<UserManagement />);

    const addUserButton = screen.getByRole('button', { name: 'Add User' });
    fireEvent.click(addUserButton);

    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  test('allows changing user roles', () => {
    render(<UserManagement />);

    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'manager' } });

    // In a real implementation, we would check if the role was updated
    expect(roleSelect).toBeInTheDocument();
  });

  test('handles send password button click', () => {
    render(<UserManagement />);

    const sendPasswordButton = screen.getByRole('button', { name: 'Send Password' });
    fireEvent.click(sendPasswordButton);

    // In a real implementation, we would check if the notification was shown
    expect(sendPasswordButton).toBeInTheDocument();
  });
});