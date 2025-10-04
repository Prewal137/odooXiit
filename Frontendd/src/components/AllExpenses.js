import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './AllExpenses.css';

const AllExpenses = () => {
  const { expenses, users, updateExpenseStatus } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesFilter = filter === 'all' || expense.status === filter;
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getUserName(expense.userId).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (expenseId) => {
    updateExpenseStatus(expenseId, 'approved', 1, 'Approved by admin');
  };

  const handleReject = (expenseId) => {
    updateExpenseStatus(expenseId, 'rejected', 1, 'Rejected by admin');
  };

  return (
    <div className="all-expenses">
      <div className="expenses-header">
        <h2>All Expenses</h2>
        <div className="expenses-controls">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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

      <div className="expenses-table-container">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-expenses">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{getUserName(expense.userId)}</td>
                  <td>{expense.description}</td>
                  <td>{expense.currency} {expense.amount}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(expense.status)}`}>
                      {getStatusText(expense.status)}
                    </span>
                  </td>
                  <td>
                    {expense.status === 'pending' && (
                      <>
                        <button 
                          className="action-button approve-button"
                          onClick={() => handleApprove(expense.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="action-button reject-button"
                          onClick={() => handleReject(expense.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExpenses;