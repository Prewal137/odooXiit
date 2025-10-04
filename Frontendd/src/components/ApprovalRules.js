import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNotification } from '../context/NotificationProvider';
import './ApprovalRules.css';

const ApprovalRules = () => {
  const { approvalRules, createApprovalRule, users } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showAddRuleForm, setShowAddRuleForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isManagerApprover: false,
    approversSequence: false,
    minimumApprovalPercentage: 60,
    approvers: [
      { userId: '', required: false, sequence: 1 }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleApproverChange = (index, field, value) => {
    const updatedApprovers = [...formData.approvers];
    updatedApprovers[index] = {
      ...updatedApprovers[index],
      [field]: value
    };
    setFormData({
      ...formData,
      approvers: updatedApprovers
    });
  };

  const addApprover = () => {
    setFormData({
      ...formData,
      approvers: [
        ...formData.approvers,
        { userId: '', required: false, sequence: formData.approvers.length + 1 }
      ]
    });
  };

  const removeApprover = (index) => {
    const updatedApprovers = [...formData.approvers];
    updatedApprovers.splice(index, 1);
    setFormData({
      ...formData,
      approvers: updatedApprovers
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const ruleData = {
        name: formData.name,
        description: formData.description,
        isManagerApprover: formData.isManagerApprover,
        approversSequence: formData.approversSequence,
        minimumApprovalPercentage: parseInt(formData.minimumApprovalPercentage),
        approvers: formData.approvers
      };
      
      createApprovalRule(ruleData);
      showSuccess('Approval rule created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        isManagerApprover: false,
        approversSequence: false,
        minimumApprovalPercentage: 60,
        approvers: [
          { userId: '', required: false, sequence: 1 }
        ]
      });
      
      setShowAddRuleForm(false);
    } catch (error) {
      showError('Failed to create approval rule. Please try again.');
    }
  };

  // Get managers and approvers for dropdowns
  const managerOptions = users.filter(user => user.role === 'manager');
  const approverOptions = users.filter(user => user.role === 'manager' || user.role === 'admin');

  return (
    <div className="approval-rules">
      <div className="rules-header">
        <h2>Approval Rules</h2>
        <button 
          className="add-rule-button"
          onClick={() => setShowAddRuleForm(true)}
        >
          Add Rule
        </button>
      </div>

      {showAddRuleForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Approval Rule</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddRuleForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="rule-form">
              <div className="form-group">
                <label htmlFor="name">Rule Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter rule name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe when this rule applies"
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="isManagerApprover"
                    checked={formData.isManagerApprover}
                    onChange={handleChange}
                  />
                  Is manager an approver?
                </label>
                <span className="help-text">If checked, the expense request will go to the employee's manager first</span>
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="approversSequence"
                    checked={formData.approversSequence}
                    onChange={handleChange}
                  />
                  Approvers Sequence Matters
                </label>
                <span className="help-text">If checked, approvers must approve in sequence (e.g., John → Mitchell)</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="minimumApprovalPercentage">Minimum Approval Percentage</label>
                <input
                  type="number"
                  id="minimumApprovalPercentage"
                  name="minimumApprovalPercentage"
                  value={formData.minimumApprovalPercentage}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  placeholder="Enter percentage"
                />
                <span className="help-text">Percentage of approvals needed for the request to be approved</span>
              </div>
              
              <div className="form-group">
                <label>Approvers List</label>
                <div className="approvers-list">
                  {formData.approvers.map((approver, index) => (
                    <div key={index} className="approver-item">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Approver</label>
                          <select
                            value={approver.userId}
                            onChange={(e) => handleApproverChange(index, 'userId', e.target.value)}
                          >
                            <option value="">Select approver</option>
                            {approverOptions.map(user => (
                              <option key={user.id} value={user.id}>
                                {user.name} ({user.role})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              checked={approver.required}
                              onChange={(e) => handleApproverChange(index, 'required', e.target.checked)}
                            />
                            Required
                          </label>
                        </div>
                        
                        {formData.approversSequence && (
                          <div className="form-group">
                            <label>Sequence</label>
                            <input
                              type="number"
                              value={approver.sequence}
                              onChange={(e) => handleApproverChange(index, 'sequence', parseInt(e.target.value))}
                              min="1"
                            />
                          </div>
                        )}
                        
                        <div className="form-group">
                          <button 
                            type="button" 
                            className="remove-approver-button"
                            onClick={() => removeApprover(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    className="add-approver-button"
                    onClick={addApprover}
                  >
                    Add Approver
                  </button>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddRuleForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Create Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="rules-list">
        {approvalRules.length === 0 ? (
          <div className="empty-state">
            <h3>No approval rules configured</h3>
            <p>Create your first approval rule to automate expense approvals</p>
          </div>
        ) : (
          <div className="rules-grid">
            {approvalRules.map(rule => (
              <div key={rule.id} className="rule-card">
                <h3>{rule.name}</h3>
                <p className="rule-description">{rule.description}</p>
                
                <div className="rule-details">
                  <p><strong>Manager Approver:</strong> {rule.isManagerApprover ? 'Yes' : 'No'}</p>
                  <p><strong>Sequence Matters:</strong> {rule.approversSequence ? 'Yes' : 'No'}</p>
                  <p><strong>Minimum Approval %:</strong> {rule.minimumApprovalPercentage}%</p>
                  
                  <div className="approvers-section">
                    <h4>Approvers:</h4>
                    {rule.approvers && rule.approvers.map((approver, index) => {
                      const user = users.find(u => u.id === approver.userId);
                      return (
                        <p key={index}>
                          {user ? user.name : 'Unknown User'} 
                          {approver.required && ' (Required)'}
                          {rule.approversSequence && ` [Sequence: ${approver.sequence}]`}
                        </p>
                      );
                    })}
                  </div>
                </div>
                
                <div className="rule-actions">
                  <button className="action-button edit-button">Edit</button>
                  <button className="action-button delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRules;