import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { users } = useAuth();
  const { showSuccess, showError } = useNotification();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if user exists
      const user = users.find(u => u.email === email);
      
      if (!user) {
        showError('No account found with that email address');
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send a password reset email
      // For demo, we'll just show success
      setSubmitSuccess(true);
      showSuccess('Password reset instructions sent to your email');
    } catch (error) {
      showError('Failed to process password reset request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <h1>ExpenseFlow</h1>
          <h2>Reset Your Password</h2>
          <p>Enter your email address and we'll send you instructions to reset your password</p>
        </div>
        
        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Password Reset Email Sent</h3>
            <p>We've sent password reset instructions to <strong>{email}</strong></p>
            <p>Please check your email and follow the instructions to reset your password.</p>
            <button 
              className="back-to-login-button"
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your work email"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <button 
              type="submit" 
              className="reset-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Instructions...' : 'Send Reset Instructions'}
            </button>
            
            <div className="form-footer">
              <button 
                type="button" 
                className="back-button"
                onClick={handleBackToLogin}
                disabled={isSubmitting}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;