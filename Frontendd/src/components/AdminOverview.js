import React from 'react';
import { useAuth } from '../context/AuthProvider';

const AdminOverview = () => {
  const { users, expenses, company } = useAuth();

  const employeeCount = users.filter(user => user.role === 'employee').length;
  const managerCount = users.filter(user => user.role === 'manager').length;
  const adminCount = users.filter(user => user.role === 'admin').length;
  
  const pendingExpenses = expenses.filter(expense => expense.status === 'pending').length;
  const approvedExpenses = expenses.filter(expense => expense.status === 'approved').length;
  const rejectedExpenses = expenses.filter(expense => expense.status === 'rejected').length;

  return (
    <div className="admin-overview">
      <div className="overview-header">
        <h2>Company Overview</h2>
        <p>Welcome to your admin dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Company</h3>
          <p className="stat-value">{company?.name}</p>
          <p className="stat-detail">{company?.country} ({company?.currency})</p>
        </div>

        <div className="stat-card">
          <h3>Employees</h3>
          <p className="stat-value">{employeeCount}</p>
          <p className="stat-detail">Active employees</p>
        </div>

        <div className="stat-card">
          <h3>Managers</h3>
          <p className="stat-value">{managerCount}</p>
          <p className="stat-detail">Team leaders</p>
        </div>

        <div className="stat-card">
          <h3>Admins</h3>
          <p className="stat-value">{adminCount}</p>
          <p className="stat-detail">System admins</p>
        </div>
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
          <p className="stat-value">{expenses.length}</p>
          <p className="stat-detail">All submissions</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-card">
            <h4>Add Employee</h4>
            <p>Create a new employee account</p>
          </button>
          <button className="action-card">
            <h4>Add Manager</h4>
            <p>Create a new manager account</p>
          </button>
          <button className="action-card">
            <h4>Set Approval Rules</h4>
            <p>Configure expense approval workflow</p>
          </button>
          <button className="action-card">
            <h4>View All Expenses</h4>
            <p>Review all expense submissions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;