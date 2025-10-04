import React from 'react';
import { useAuth } from '../context/AuthProvider';

const EmployeeOverview = () => {
  const { currentUser, getUserExpenses } = useAuth();
  
  const userExpenses = getUserExpenses(currentUser?.id);
  const pendingExpenses = userExpenses.filter(expense => expense.status === 'pending').length;
  const approvedExpenses = userExpenses.filter(expense => expense.status === 'approved').length;
  const rejectedExpenses = userExpenses.filter(expense => expense.status === 'rejected').length;

  return (
    <div className="employee-overview">
      <div className="overview-header">
        <h2>Welcome, {currentUser?.name}!</h2>
        <p>Submit and track your expense claims</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Expenses</h3>
          <p className="stat-value">{pendingExpenses}</p>
          <p className="stat-detail">Awaiting approval</p>
        </div>

        <div className="stat-card">
          <h3>Approved Expenses</h3>
          <p className="stat-value">{approvedExpenses}</p>
          <p className="stat-detail">Successfully processed</p>
        </div>

        <div className="stat-card">
          <h3>Rejected Expenses</h3>
          <p className="stat-value">{rejectedExpenses}</p>
          <p className="stat-detail">Declined requests</p>
        </div>

        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">{userExpenses.length}</p>
          <p className="stat-detail">All submissions</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-card">
            <h4>Submit Expense</h4>
            <p>Create a new expense claim</p>
          </button>
          <button className="action-card">
            <h4>View History</h4>
            <p>See all your submitted expenses</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;