import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminOverview from '../components/AdminOverview';
import UserManagement from '../components/UserManagement';
import ApprovalRules from '../components/ApprovalRules';
import AllExpenses from '../components/AllExpenses';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { company, users, expenses, createEmployee, createManager, updateUserRole } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'employee'
  });

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    
    try {
      if (userForm.role === 'employee') {
        createEmployee({
          name: userForm.name,
          email: userForm.email
        });
      } else if (userForm.role === 'manager') {
        createManager({
          name: userForm.name,
          email: userForm.email
        });
      }
      
      showSuccess(`${userForm.role.charAt(0).toUpperCase() + userForm.role.slice(1)} created successfully!`);
      
      // Reset form
      setUserForm({
        name: '',
        email: '',
        role: 'employee'
      });
      
      setShowAddUserForm(false);
    } catch (error) {
      showError('Failed to create user. Please try again.');
    }
  };

  const handleRoleChange = (userId, newRole) => {
    try {
      updateUserRole(userId, newRole);
      showSuccess('User role updated successfully!');
    } catch (error) {
      showError('Failed to update user role. Please try again.');
    }
  };

  return (
    <DashboardLayout role="admin" title={`Admin Dashboard - ${company?.name}`}>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="rules" element={<ApprovalRules />} />
        <Route path="expenses" element={<AllExpenses />} />
      </Routes>

      {/* Add User Modal */}
      {showAddUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New User</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddUserForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="user-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={userForm.role}
                  onChange={handleUserFormChange}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddUserForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;