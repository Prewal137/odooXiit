import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import CurrencyConverter from '../components/CurrencyConverter';
import '../styles/ExpenseHistory.css';

const ExpenseHistory = () => {
  const { currentUser, getUserExpenses, company, users } = useAuth();
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    startDate: '',
    endDate: ''
  });
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  const userExpenses = getUserExpenses(currentUser?.id);
  
  const categories = [
    'Travel', 'Meals', 'Office Supplies', 'Entertainment', 
    'Transportation', 'Accommodation', 'Conference', 'Training', 'Other'
  ];
  
  const statuses = ['Pending', 'Approved', 'Rejected'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredExpenses = userExpenses.filter(expense => {
    // Status filter
    if (filters.status !== 'all' && expense.status !== filters.status.toLowerCase()) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && expense.category !== filters.category) {
      return false;
    }
    
    // Date filters
    if (filters.startDate && new Date(expense.date) < new Date(filters.startDate)) {
      return false;
    }
    
    if (filters.endDate && new Date(expense.date) > new Date(filters.endDate)) {
      return false;
    }
    
    return true;
  });
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };
  
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
  };

  const handleCloseDetails = () => {
    setSelectedExpense(null);
  };

  return (
    <div className="expense-history">
      <div className="history-header">
        <h2>Expense History</h2>
        <p>View and manage your submitted expenses</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <h3><span className="filter-icon">🔍</span> Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="expenses-table-container">
        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No expenses found</h3>
            <p>You haven't submitted any expenses yet</p>
          </div>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>
                    {expense.currency} {expense.amount}
                    {expense.currency !== company?.currency && (
                      <div className="converted-amount">
                        <CurrencyConverter 
                          amount={expense.amount}
                          fromCurrency={expense.currency}
                          toCurrency={company?.currency}
                        />
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(expense.status)}`}>
                      {getStatusText(expense.status)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-button view-button"
                      onClick={() => handleViewDetails(expense)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Expense Details Modal */}
      {selectedExpense && (
        <div className="modal-overlay">
          <div className="modal-content expense-details-modal">
            <div className="modal-header">
              <h3>Expense Details</h3>
              <button 
                className="close-button"
                onClick={handleCloseDetails}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="expense-summary">
                <h4>{selectedExpense.description}</h4>
                <div className="expense-meta">
                  <p><strong>Category:</strong> {selectedExpense.category}</p>
                  <p><strong>Date:</strong> {new Date(selectedExpense.date).toLocaleDateString()}</p>
                  <p><strong>Paid By:</strong> {selectedExpense.paidBy || 'Employee'}</p>
                  <p><strong>Amount:</strong> {selectedExpense.currency} {selectedExpense.amount}</p>
                  {selectedExpense.currency !== company?.currency && (
                    <p>
                      <strong>Converted Amount:</strong> 
                      <CurrencyConverter 
                        amount={selectedExpense.amount}
                        fromCurrency={selectedExpense.currency}
                        toCurrency={company?.currency}
                      />
                    </p>
                  )}
                  <p>
                    <strong>Status:</strong> 
                    <span className={`status-badge ${getStatusClass(selectedExpense.status)}`}>
                      {getStatusText(selectedExpense.status)}
                    </span>
                  </p>
                </div>
                
                {selectedExpense.remarks && (
                  <div className="remarks-section">
                    <h5>Remarks</h5>
                    <p>{selectedExpense.remarks}</p>
                  </div>
                )}
                
                {selectedExpense.receipt && (
                  <div className="receipt-section">
                    <h5>Receipt</h5>
                    <div className="receipt-placeholder">
                      Receipt Image Attached
                    </div>
                  </div>
                )}
                
                {/* Approval History */}
                <div className="approval-history">
                  <h5>Approval History</h5>
                  {selectedExpense.approvalHistory && selectedExpense.approvalHistory.length > 0 ? (
                    <div className="history-list">
                      {selectedExpense.approvalHistory.map((entry, index) => (
                        <div key={index} className="history-item">
                          <div className="history-header">
                            <span className={`status-badge ${getStatusClass(entry.status)}`}>
                              {getStatusText(entry.status)}
                            </span>
                            <span className="timestamp">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="approver-info">
                            <strong>Approver:</strong> {getUserName(entry.approverId)}
                          </div>
                          {entry.comments && (
                            <div className="comments">
                              <strong>Comments:</strong> {entry.comments}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-history">No approval history available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;