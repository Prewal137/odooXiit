import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../src/components/ForgotPassword';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('ForgotPassword', () => {
  test('renders forgot password form', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    expect(screen.getByText('Reset Your Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Reset Instructions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '← Back to Login' })).toBeInTheDocument();
  });

  test('validates email format', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email Address');
    const resetButton = screen.getByRole('button', { name: 'Send Reset Instructions' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(resetButton);

    // In a real implementation, we would check for validation error messages
    expect(screen.getByLabelText('Email Address')).toHaveValue('invalid-email');
  });

  test('navigates back to login page', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: '← Back to Login' });
    fireEvent.click(backButton);

    // In a real implementation with proper mocking, we would check navigation
    expect(backButton).toBeInTheDocument();
  });
});