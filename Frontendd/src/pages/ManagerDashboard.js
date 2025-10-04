import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import DashboardLayout from '../components/layout/DashboardLayout';
import CurrencyConverter from '../components/CurrencyConverter';
import ManagerOverview from '../components/ManagerOverview';
import ApprovalQueue from '../components/ApprovalQueue';
import TeamExpenses from '../components/TeamExpenses';
import '../styles/ManagerDashboard.css';

const ManagerDashboard = () => {
  const { company, currentUser, getTeamExpenses, updateExpenseStatus, users } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [actionType, setActionType] = useState('');

  return (
    <DashboardLayout role="manager" title={`Manager Dashboard - ${company?.name}`}>
      <Routes>
        <Route index element={<ManagerOverview />} />
        <Route path="overview" element={<ManagerOverview />} />
        <Route path="approvals" element={<ApprovalQueue />} />
        <Route path="team-expenses" element={<TeamExpenses />} />
      </Routes>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reject Expense</h3>
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
                <label htmlFor="comment">Reason for Rejection *</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  rows="4"
                  required
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
                  className="reject-button"
                  onClick={() => {
                    if (!comment.trim()) {
                      showError('Please provide a reason for rejection');
                      return;
                    }
                    
                    try {
                      updateExpenseStatus(currentExpense.id, 'rejected', currentUser.id, comment);
                      showSuccess('Expense rejected successfully!');
                      setShowCommentModal(false);
                      setComment('');
                      setCurrentExpense(null);
                    } catch (error) {
                      showError('Failed to reject expense. Please try again.');
                    }
                  }}
                >
                  Reject Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManagerDashboard;