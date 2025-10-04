import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import './DashboardLayout.css';

const DashboardLayout = ({ children, role, title }) => {
  const { currentUser, company, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { name: 'Users', path: '/admin/users', icon: '👥' },
          { name: 'Approval Rules', path: '/admin/rules', icon: '⚙️' },
          { name: 'All Expenses', path: '/admin/expenses', icon: '💰' }
        ];
      case 'manager':
        return [
          { name: 'Dashboard', path: '/manager/dashboard', icon: '📊' },
          { name: 'Team Expenses', path: '/manager/team-expenses', icon: '👥' },
          { name: 'Approvals', path: '/manager/approvals', icon: '✅' }
        ];
      case 'employee':
        return [
          { name: 'Dashboard', path: '/employee/dashboard', icon: '📊' },
          { name: 'Submit Expense', path: '/employee/submit', icon: '➕' },
          { name: 'My Expenses', path: '/employee/history', icon: '📋' }
        ];
      default:
        return [];
    }
  };

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = [{ name: 'Home', path: `/${pathnames[0]}` }];
    
    for (let i = 1; i < pathnames.length; i++) {
      const path = `/${pathnames.slice(0, i + 1).join('/')}`;
      const name = pathnames[i].charAt(0).toUpperCase() + pathnames[i].slice(1);
      breadcrumbs.push({ name, path });
    }
    
    return breadcrumbs;
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.length > 1 
      ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}` 
      : names[0].charAt(0);
  };

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </button>
          <h1 className="navbar-title">{title}</h1>
        </div>
        
        <div className="navbar-right">
          <div className="user-info">
            <div className="user-avatar">
              {getUserInitials(currentUser?.name)}
            </div>
            <div className="user-details">
              <span className="user-name">{currentUser?.name}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </header>
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>ExpenseFlow</h2>
          <p>{company?.name}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {getNavItems().map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="breadcrumbs">
          {getBreadcrumbs().map((crumb, index) => (
            <span key={index} className="breadcrumb-item">
              {index > 0 && <span className="breadcrumb-separator">/</span>}
              <Link to={crumb.path} className="breadcrumb-link">{crumb.name}</Link>
            </span>
          ))}
        </div>
        
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;