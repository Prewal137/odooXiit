import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './TeamExpenses.css';

const TeamExpenses = () => {
  const { currentUser, getTeamExpenses, users } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const teamExpenses = getTeamExpenses(currentUser?.id);
  
  const filteredExpenses = teamExpenses.filter(expense => {
    const matchesFilter = filter === 'all' || expense.status === filter;
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
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
  
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="team-expenses">
      <div className="expenses-header">
        <h2>Team Expenses</h2>
        <div className="expenses-controls">
          <input
            type="text"
            placeholder="Search team expenses..."
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
              <th>Employee</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-expenses">
                  No team expenses found
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamExpenses;