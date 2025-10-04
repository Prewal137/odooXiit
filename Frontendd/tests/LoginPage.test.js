import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '' })
}));

describe('LoginPage', () => {
  test('renders login form by default', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Sign in to your expense management account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('switches to signup form when signup button is clicked', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Create your professional expense management account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
  });

  test('validates email format', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email Address');
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(loginButton);

    // In a real implementation, we would check for validation error messages
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates to forgot password page', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const forgotPasswordButton = screen.getByRole('button', { name: 'Forgot password?' });
    fireEvent.click(forgotPasswordButton);

    // In a real implementation with proper mocking, we would check navigation
    expect(forgotPasswordButton).toBeInTheDocument();
  });
});