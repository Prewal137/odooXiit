import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
      duration
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showSuccess = (message, duration) => {
    addNotification(message, 'success', duration);
  };

  const showError = (message, duration) => {
    addNotification(message, 'error', duration);
  };

  const showInfo = (message, duration) => {
    addNotification(message, 'info', duration);
  };

  const showWarning = (message, duration) => {
    addNotification(message, 'warning', duration);
  };

  return (
    <NotificationContext.Provider value={{
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
      <div className="notifications-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};