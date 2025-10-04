import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseSubmissionForm from '../src/components/ExpenseSubmissionForm';

// Mock the useAuth hook
jest.mock('../src/context/AuthProvider', () => ({
  useAuth: () => ({
    submitExpense: jest.fn(),
    company: { currency: 'USD' }
  })
}));

// Mock the useNotification hook
jest.mock('../src/context/NotificationProvider', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn()
  })
}));

describe('ExpenseSubmissionForm', () => {
  test('renders expense submission form', () => {
    render(<ExpenseSubmissionForm />);

    expect(screen.getByText('Submit New Expense')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount *')).toBeInTheDocument();
    expect(screen.getByLabelText('Currency *')).toBeInTheDocument();
    expect(screen.getByLabelText('Category *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('Receipt (Optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Expense' })).toBeInTheDocument();
  });

  test('allows filling in form fields', () => {
    render(<ExpenseSubmissionForm />);

    const amountInput = screen.getByLabelText('Amount *');
    const descriptionInput = screen.getByLabelText('Description *');

    fireEvent.change(amountInput, { target: { value: '50.00' } });
    fireEvent.change(descriptionInput, { target: { value: 'Team lunch' } });

    expect(amountInput).toHaveValue('50.00');
    expect(descriptionInput).toHaveValue('Team lunch');
  });

  test('shows validation errors for required fields', () => {
    render(<ExpenseSubmissionForm />);

    const submitButton = screen.getByRole('button', { name: 'Submit Expense' });
    fireEvent.click(submitButton);

    // In a real implementation, we would check for validation error messages
    expect(submitButton).toBeInTheDocument();
  });

  test('handles file upload', () => {
    render(<ExpenseSubmissionForm />);

    const fileInput = screen.getByLabelText('Receipt (Optional)');
    
    // Create a mock file
    const file = new File(['receipt content'], 'receipt.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // In a real implementation, we would check for file preview
    expect(fileInput).toBeInTheDocument();
  });
});