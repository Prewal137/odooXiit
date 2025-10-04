import React from 'react';
import { useAuth } from '../context/AuthProvider';

const ManagerOverview = () => {
  const { currentUser, getTeamExpenses } = useAuth();
  
  const teamExpenses = getTeamExpenses(currentUser?.id);
  const pendingExpenses = teamExpenses.filter(expense => expense.status === 'pending').length;
  const approvedExpenses = teamExpenses.filter(expense => expense.status === 'approved').length;
  const rejectedExpenses = teamExpenses.filter(expense => expense.status === 'rejected').length;

  return (
    <div className="manager-overview">
      <div className="overview-header">
        <h2>Welcome, {currentUser?.name}!</h2>
        <p>Review and approve expense claims from your team</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-value">{pendingExpenses}</p>
          <p className="stat-detail">Awaiting your review</p>
        </div>

        <div className="stat-card">
          <h3>Team Expenses</h3>
          <p className="stat-value">{teamExpenses.length}</p>
          <p className="stat-detail">Total submissions</p>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <p className="stat-value">{approvedExpenses}</p>
          <p className="stat-detail">This month</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-value">{rejectedExpenses}</p>
          <p className="stat-detail">This month</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-card">
            <h4>Approval Queue</h4>
            <p>Review pending expense claims</p>
          </button>
          <button className="action-card">
            <h4>Team Expenses</h4>
            <p>View all team submissions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;