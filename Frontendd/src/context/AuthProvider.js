import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [approvalRules, setApprovalRules] = useState([]);

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    setCompany(null);
  };

  const signup = (userData, companyData) => {
    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'admin', // First user is admin
      companyId: companyData.id
    };
    
    // Create company
    const newCompany = {
      id: companyData.id,
      ...companyData,
      adminId: newUser.id
    };
    
    setCurrentUser(newUser);
    setCompany(newCompany);
    
    // Add to users list
    setUsers([newUser]);
    
    return { user: newUser, company: newCompany };
  };

  const createEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      companyId: company.id,
      role: 'employee'
    };
    
    setUsers(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  const createManager = (managerData) => {
    const newManager = {
      id: Date.now(),
      ...managerData,
      companyId: company.id,
      role: 'manager'
    };
    
    setUsers(prev => [...prev, newManager]);
    return newManager;
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
  };

  const submitExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      userId: currentUser.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvalHistory: [] // Track approval history
    };
    
    setExpenses(prev => [...prev, newExpense]);
    return newExpense;
  };

  const updateExpenseStatus = (expenseId, status, approverId, comments = '') => {
    setExpenses(prev => prev.map(expense => {
      if (expense.id === expenseId) {
        // Add to approval history
        const updatedHistory = [
          ...expense.approvalHistory,
          {
            approverId,
            status,
            comments,
            timestamp: new Date().toISOString()
          }
        ];
        
        return {
          ...expense,
          status,
          approverId,
          comments,
          approvalHistory: updatedHistory,
          updatedAt: new Date().toISOString()
        };
      }
      return expense;
    }));
  };

  const getUserExpenses = (userId) => {
    return expenses.filter(expense => expense.userId === userId);
  };

  const getTeamExpenses = (managerId) => {
    // Get employees who report to this manager
    const teamMembers = users.filter(user => 
      user.role === 'employee' && user.managerId === managerId
    );
    
    const teamMemberIds = teamMembers.map(member => member.id);
    
    // Get expenses from team members
    return expenses.filter(expense => 
      teamMemberIds.includes(expense.userId)
    );
  };

  const getAllExpenses = () => {
    return expenses;
  };

  const createApprovalRule = (ruleData) => {
    const newRule = {
      id: Date.now(),
      ...ruleData
    };
    
    setApprovalRules(prev => [...prev, newRule]);
    return newRule;
  };

  const value = {
    currentUser,
    company,
    users,
    expenses,
    approvalRules,
    login,
    logout,
    signup,
    createEmployee,
    createManager,
    updateUserRole,
    submitExpense,
    updateExpenseStatus,
    getUserExpenses,
    getTeamExpenses,
    getAllExpenses,
    createApprovalRule
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};