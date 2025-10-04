import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './ExpenseHistory.css';

const ExpenseHistory = () => {
  const { currentUser, getUserExpenses } = useAuth();
  const [filter, setFilter] = useState('all');
  
  const userExpenses = getUserExpenses(currentUser?.id);
  
  const filteredExpenses = userExpenses.filter(expense => {
    return filter === 'all' || expense.status === filter;
  });
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <div className="expense-history">
      <div className="history-header">
        <h2>Expense History</h2>
        <div className="history-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="history-list">
        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <h3>No expenses found</h3>
            <p>You haven't submitted any expenses yet</p>
          </div>
        ) : (
          <div className="expenses-grid">
            {filteredExpenses.map(expense => (
              <div key={expense.id} className="expense-card">
                <div className="expense-header">
                  <h3>{expense.description}</h3>
                  <span className={`status-badge ${getStatusClass(expense.status)}`}>
                    {getStatusText(expense.status)}
                  </span>
                </div>
                
                <div className="expense-details">
                  <p><strong>Amount:</strong> {expense.currency} {expense.amount}</p>
                  <p><strong>Category:</strong> {expense.category}</p>
                  <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                  {expense.comments && (
                    <p><strong>Comments:</strong> {expense.comments}</p>
                  )}
                </div>
                
                {expense.receipt && (
                  <div className="receipt-preview">
                    <p><strong>Receipt:</strong></p>
                    <div className="receipt-placeholder">
                      Receipt Image
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;