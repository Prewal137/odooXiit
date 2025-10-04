import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './ApprovalQueue.css';

const ApprovalQueue = () => {
  const { currentUser, getTeamExpenses, updateExpenseStatus } = useAuth();
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState('');

  const teamExpenses = getTeamExpenses(currentUser?.id);
  
  const filteredExpenses = teamExpenses.filter(expense => {
    const matchesFilter = filter === 'all' || expense.status === filter;
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const pendingExpenses = teamExpenses.filter(expense => expense.status === 'pending').length;

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

  const handleApprove = (expenseId) => {
    updateExpenseStatus(expenseId, 'approved', currentUser.id, 'Approved by manager');
  };

  const handleReject = (expenseId) => {
    const expense = teamExpenses.find(e => e.id === expenseId);
    setCurrentExpense(expense);
    setActionType('reject');
    setShowCommentModal(true);
  };

  const handleRejectWithComment = () => {
    updateExpenseStatus(currentExpense.id, 'rejected', currentUser.id, comment);
    setShowCommentModal(false);
    setComment('');
    setCurrentExpense(null);
  };

  const handleApproveWithComment = (expenseId) => {
    const expense = teamExpenses.find(e => e.id === expenseId);
    setCurrentExpense(expense);
    setActionType('approve');
    setShowCommentModal(false); // For approve, we don't require comment
    handleApprove(expenseId);
  };

  return (
    <div className="approval-queue">
      <div className="queue-header">
        <h2>Approval Queue</h2>
        <div className="queue-stats">
          <span className="pending-count">{pendingExpenses} pending</span>
        </div>
        <div className="queue-controls">
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
            <option value="pending">Pending Only</option>
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {showCommentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{actionType === 'reject' ? 'Reject Expense' : 'Approve Expense'}</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowCommentModal(false);
                  setComment('');
                  setCurrentExpense(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p><strong>Expense:</strong> {currentExpense?.description}</p>
              <p><strong>Amount:</strong> {currentExpense?.currency} {currentExpense?.amount}</p>
              
              <div className="form-group">
                <label htmlFor="comment">Comments</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={actionType === 'reject' ? 'Reason for rejection...' : 'Optional comments...'}
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="cancel-button"
                  onClick={() => {
                    setShowCommentModal(false);
                    setComment('');
                    setCurrentExpense(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className={actionType === 'reject' ? 'reject-button' : 'approve-button'}
                  onClick={actionType === 'reject' ? handleRejectWithComment : handleApproveWithComment}
                >
                  {actionType === 'reject' ? 'Reject Expense' : 'Approve Expense'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="expenses-table-container">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Employee</th>
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
                  <td>{expense.userId}</td>
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
                          onClick={() => handleApproveWithComment(expense.id)}
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

export default ApprovalQueue;