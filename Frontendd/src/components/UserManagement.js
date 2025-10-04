import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import './UserManagement.css';

const UserManagement = () => {
  const { users, createEmployee, createManager, updateUserRole } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    manager: '' // For on-the-fly manager creation
  });
  const [errors, setErrors] = useState({});
  const [managers, setManagers] = useState(users.filter(user => user.role === 'manager'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (formData.role === 'employee') {
        createEmployee({
          name: formData.name,
          email: formData.email
        });
        showSuccess('Employee created successfully!');
      } else if (formData.role === 'manager') {
        createManager({
          name: formData.name,
          email: formData.email
        });
        showSuccess('Manager created successfully!');
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: 'employee',
        manager: ''
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

  const handleSendPassword = (userId) => {
    // In a real app, this would generate a random password and send it via email
    // For demo, we'll just show a success message
    showSuccess('Password sent to user\'s email successfully!');
  };

  // Filter managers for the dropdown
  const managerOptions = users.filter(user => user.role === 'manager');

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button 
          className="add-user-button"
          onClick={() => setShowAddUserForm(true)}
        >
          Add User
        </button>
      </div>

      {showAddUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddUserForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="add-user-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddUserForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="action-button view-button"
                    onClick={() => handleSendPassword(user.id)}
                  >
                    Send Password
                  </button>
                  <button className="action-button edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;