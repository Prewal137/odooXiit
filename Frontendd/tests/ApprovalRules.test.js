import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ApprovalRules from '../src/components/ApprovalRules';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    approvalRules: [
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
    ],
    users: [
      { id: 1, name: 'John Admin', role: 'admin' },
      { id: 2, name: 'Jane Manager', role: 'manager' }
    ],
    createApprovalRule: jest.fn()
  })
}));

// Mock the useNotification hook
jest.mock('../src/context/NotificationProvider', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn()
  })
}));

describe('ApprovalRules', () => {
  test('renders approval rules list', () => {
    render(<ApprovalRules />);

    expect(screen.getByText('Approval Rules')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Rule' })).toBeInTheDocument();
    expect(screen.getByText('Standard Approval')).toBeInTheDocument();
    expect(screen.getByText('Standard approval rule for all expenses')).toBeInTheDocument();
  });

  test('opens add rule modal when add rule button is clicked', () => {
    render(<ApprovalRules />);

    const addRuleButton = screen.getByRole('button', { name: 'Add Rule' });
    fireEvent.click(addRuleButton);

    expect(screen.getByText('Create Approval Rule')).toBeInTheDocument();
    expect(screen.getByLabelText('Rule Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
  });

  test('displays rule configuration options', () => {
    render(<ApprovalRules />);

    expect(screen.getByText('Manager Approver: Yes')).toBeInTheDocument();
    expect(screen.getByText('Sequence Matters: No')).toBeInTheDocument();
    expect(screen.getByText('Minimum Approval %: 60%')).toBeInTheDocument();
  });

  test('shows approvers list', () => {
    render(<ApprovalRules />);

    expect(screen.getByText('Jane Manager')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});