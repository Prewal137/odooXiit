import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import DashboardLayout from '../components/layout/DashboardLayout';
import ExpenseSubmissionForm from '../components/ExpenseSubmissionForm';
import ExpenseHistory from './ExpenseHistory';
import EmployeeOverview from '../components/EmployeeOverview';
import '../styles/DashboardOverview.css';

const EmployeeDashboard = () => {
  const { company, currentUser, getUserExpenses } = useAuth();

  return (
    <DashboardLayout role="employee" title={`Employee Dashboard - ${company?.name}`}>
      <Routes>
        <Route index element={<EmployeeOverview />} />
        <Route path="overview" element={<EmployeeOverview />} />
        <Route path="submit" element={<ExpenseSubmissionForm />} />
        <Route path="history" element={<ExpenseHistory />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;