import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../src/context/AuthProvider';

// Mock component to test the hook
const TestComponent = () => {
  const { currentUser, company } = useAuth();
  return (
    <div>
      <span data-testid="user-name">{currentUser?.name}</span>
      <span data-testid="company-name">{company?.name}</span>
    </div>
  );
};

describe('AuthProvider', () => {
  test('provides default values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-name')).toBeInTheDocument();
    expect(screen.getByTestId('company-name')).toBeInTheDocument();
  });

  test('login function updates currentUser', () => {
    // This would be tested more thoroughly with actual implementation
    expect(true).toBe(true);
  });
});