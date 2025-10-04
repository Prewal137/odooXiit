import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we should show signup form based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('signup') === 'true') {
      setIsSignUp(true);
    }
  }, [location]);

  // Fetch countries data
  useEffect(() => {
    // In a real app, this would fetch from REST Countries API
    // For demo, we'll use a static list
    const staticCountries = [
      { code: 'US', name: 'United States', currency: 'USD' },
      { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
      { code: 'EU', name: 'European Union', currency: 'EUR' },
      { code: 'JP', name: 'Japan', currency: 'JPY' },
      { code: 'CA', name: 'Canada', currency: 'CAD' },
      { code: 'AU', name: 'Australia', currency: 'AUD' },
      { code: 'CH', name: 'Switzerland', currency: 'CHF' },
      { code: 'CN', name: 'China', currency: 'CNY' },
      { code: 'IN', name: 'India', currency: 'INR' },
      { code: 'BR', name: 'Brazil', currency: 'BRL' },
      { code: 'SG', name: 'Singapore', currency: 'SGD' },
      { code: 'AE', name: 'United Arab Emirates', currency: 'AED' }
    ];
    setCountries(staticCountries);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      
      if (!formData.country) {
        newErrors.country = 'Country is required';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Call the actual login API
      const result = await login(formData.email, formData.password);
      
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (result.user.role === 'manager') {
        navigate('/manager/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (error) {
      setErrors({ general: error.message || 'Login failed. Please check your credentials and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const selectedCountry = countries.find(c => c.code === formData.country);
    
    if (!selectedCountry) {
      setErrors(prev => ({ ...prev, country: 'Please select a valid country' }));
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Prepare data for signup
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        country: selectedCountry.code,
        currency: selectedCountry.currency
      };
      
      // Call the actual signup API
      const result = await signup(signupData);
      
      // Redirect to admin dashboard (first user is admin)
      navigate('/admin/dashboard');
    } catch (error) {
      setErrors({ general: error.message || 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>ExpenseFlow</h1>
          <p>{isSignUp ? 'Create your professional expense management account' : 'Sign in to your expense management account'}</p>
        </div>
        
        {errors.general && (
          <div className="error-message" style={{ marginBottom: '25px' }}>
            {errors.general}
          </div>
        )}
        
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="login-form">
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={errors.companyName ? 'error' : ''}
                  placeholder="Enter your company name"
                  disabled={isLoading}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>
            </>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your work email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {!isSignUp && (
            <div className="forgot-password-link">
              <button 
                type="button" 
                className="forgot-password-button"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
          )}
          
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
                disabled={isLoading}
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.currency})
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
          )}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span className="spinner"></span>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button" 
              className="toggle-button"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isLoading}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;