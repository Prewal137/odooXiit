import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import CurrencyConverter from './CurrencyConverter';
import '../styles/ExpenseSubmissionForm.css';

const ExpenseSubmissionForm = () => {
  const { submitExpense, company } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    amount: '',
    currency: company?.currency || 'USD',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null,
    paidBy: 'Employee' // New field for paid by
  });
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);

  const categories = [
    'Travel',
    'Meals',
    'Office Supplies',
    'Entertainment',
    'Transportation',
    'Accommodation',
    'Conference',
    'Training',
    'Other'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
  const paidByOptions = ['Employee', 'Company'];

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
      
      // Process with OCR
      processWithOCR(file);
    }
  };

  const processWithOCR = (file) => {
    setIsProcessingOCR(true);
    
    // In a real app, this would call an OCR API
    // For demo, we'll simulate with mock data after a delay
    setTimeout(() => {
      const mockOCRData = {
        amount: '42.50',
        currency: company?.currency || 'USD',
        date: new Date().toISOString().split('T')[0],
        merchant: 'Starbucks',
        description: 'Coffee and snacks for team meeting',
        category: 'Meals'
      };
      
      // Auto-fill form with OCR data
      setFormData(prev => ({
        ...prev,
        amount: mockOCRData.amount,
        currency: mockOCRData.currency,
        date: mockOCRData.date,
        description: `${mockOCRData.description} at ${mockOCRData.merchant}`,
        category: mockOCRData.category
      }));
      
      setIsProcessingOCR(false);
      showSuccess('Receipt processed successfully! Form auto-filled with extracted data.');
    }, 2000);
  };

  const handleConversion = (converted) => {
    setConvertedAmount(converted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.amount || !formData.category || !formData.description || !formData.date) {
      showError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const expenseData = {
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        description: formData.description,
        date: formData.date,
        paidBy: formData.paidBy
        // Note: In a real implementation, you would handle file upload separately
      };
      
      // Submit expense using the API
      const response = await submitExpense(expenseData);
      showSuccess(response.message || 'Expense submitted successfully!');
      
      // Reset form
      setFormData({
        amount: '',
        currency: company?.currency || 'USD',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        receipt: null,
        paidBy: 'Employee'
      });
      setReceiptPreview(null);
      setConvertedAmount(null);
    } catch (error) {
      showError(error.message || 'Failed to submit expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="expense-submission-form">
      <h2>Submit New Expense</h2>
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
        
        {formData.currency !== company?.currency && (
          <div className="form-group">
            <label>Converted Amount</label>
            <CurrencyConverter 
              amount={parseFloat(formData.amount) || 0}
              fromCurrency={formData.currency}
              toCurrency={company?.currency}
              onConversion={handleConversion}
            />
            {convertedAmount && (
              <div className="converted-info">
                This expense will be recorded as {convertedAmount} {company?.currency} in your company's books.
              </div>
            )}
          </div>
        )}
        
        <div className="form-row">
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
            <label htmlFor="paidBy">Paid By *</label>
            <select
              id="paidBy"
              name="paidBy"
              value={formData.paidBy}
              onChange={handleChange}
              required
            >
              {paidByOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
          <div className="ocr-info">
            Upload a receipt image to automatically extract expense details
          </div>
          {isProcessingOCR && (
            <div className="ocr-processing">
              <div className="spinner"></div>
              Processing receipt with OCR...
            </div>
          )}
          {receiptPreview && (
            <div className="receipt-preview">
              <img src={receiptPreview} alt="Receipt preview" />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="remarks">Remarks (Optional)</label>
          <textarea
            id="remarks"
            name="remarks"
            placeholder="Any additional notes about this expense"
            rows="2"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || isProcessingOCR}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseSubmissionForm;