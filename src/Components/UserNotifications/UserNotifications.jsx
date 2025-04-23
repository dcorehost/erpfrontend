import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserNotifications.module.css';
import Auth from '../Services/Auth';

const UserPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) throw new Error("Please login to access this page");

        const response = await axios.get('http://209.74.89.83/erpbackend/get-notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch notifications.');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h1>User Panel</h1>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading notifications...</div>
      ) : (
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span>
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
