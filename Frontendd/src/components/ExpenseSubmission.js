import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './ExpenseSubmission.css';

const ExpenseSubmission = () => {
  const { submitExpense, company } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    currency: company?.currency || 'USD',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    'Travel',
    'Meals',
    'Office Supplies',
    'Entertainment',
    'Transportation',
    'Accommodation',
    'Other'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        receipt: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setReceiptPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString()
      };
      
      submitExpense(expenseData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        amount: '',
        currency: company?.currency || 'USD',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        receipt: null
      });
      setReceiptPreview(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="expense-submission">
      <div className="submission-header">
        <h2>Submit Expense</h2>
        <p>Fill in the details below to submit a new expense claim</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          Expense submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="currency">Currency *</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a detailed description of the expense"
            rows="3"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="receipt">Receipt (Optional)</label>
          <input
            type="file"
            id="receipt"
            name="receipt"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          {receiptPreview && (
            <div className="receipt-preview">
              <img src={receiptPreview} alt="Receipt preview" />
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseSubmission;