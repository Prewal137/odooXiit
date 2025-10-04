import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './context/AuthProvider';
import { NotificationProvider } from './context/NotificationProvider';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/employee/*" element={<EmployeeDashboard />} />
              <Route path="/manager/*" element={<ManagerDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;