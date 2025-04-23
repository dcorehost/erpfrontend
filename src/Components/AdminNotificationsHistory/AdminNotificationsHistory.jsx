import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminNotificationsHistory.module.css';
import Auth from '../Services/Auth'; // Assuming you have an Auth service for token management

const AdminNotificationsHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) {
          setError('Unauthorized: No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://209.74.89.83/erpbackend/get-notifications-by-both', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err.message);
        setError('Failed to fetch notifications.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className={styles['history-container']}>
      <h1>Notification History</h1>

      {loading ? (
        <div className={styles.loading}>Loading notifications...</div>
      ) : error ? (
        <div className={styles['error-message']}>{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Notification Type</th>
              <th>Target Roles</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification._id}>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>{notification.notificationType}</td>
                  <td>{notification.targetRoles.join(', ')}</td>
                  <td>{new Date(notification.createdAt).toLocaleString()}</td>
                  <td>{new Date(notification.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNotificationsHistory;
