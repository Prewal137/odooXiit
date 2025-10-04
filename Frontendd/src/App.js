import React, { useEffect, useState } from 'react';
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
import testConnection from './api/testConnection';

function App() {
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    const checkBackendConnection = async () => {
      const connected = await testConnection();
      setIsBackendConnected(connected);
    };

    checkBackendConnection();
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            {!isBackendConnected && (
              <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                backgroundColor: '#f44336', 
                color: 'white', 
                textAlign: 'center', 
                padding: '10px',
                zIndex: 1000
              }}>
                Warning: Backend server is not connected. Please start the backend server.
              </div>
            )}
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