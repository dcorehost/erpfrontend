import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserNotifications.module.css'; // This is correct
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
    // CHANGE 1: Use styles.notificationsContainer
    <div className={styles['notifications-container']}>
      <h1>User Panel</h1>

      {/* CHANGE 2: Use styles.errorMessage */}
      {error && <div className={styles['error-message']}>{error}</div>}
      {loading ? (
        // CHANGE 3: Use styles.loading
        <div className={styles.loading}>Loading notifications...</div>
      ) : (
        // CHANGE 4: Use styles.notificationsList
        <div className={styles['notifications-list']}>
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              // CHANGE 5: Use styles.notificationItem
              <div key={notification._id} className={styles['notification-item']}>
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