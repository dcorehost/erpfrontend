import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SuperAdminNotifications.module.css';
import Auth from '../Services/Auth';
import { useNavigate } from 'react-router-dom';

const SuperAdminCreateNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    notificationType: 'announcement',
  });
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) return;

        const response = await axios.get(
          `http://209.74.89.83/erpbackend/notifications?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        setNotifications(response.data.notifications);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        toast.error('Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, message } = formData;

    if (!title || !message) {
      toast.error('Title and message are required!');
      return;
    }

    try {
      const token = Auth.getToken();
      if (!token) throw new Error('Unauthorized');

      await axios.post(
        'http://209.74.89.83/erpbackend/create-notifications',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setFormData({ title: '', message: '', notificationType: 'announcement' });
      toast.success('Notification created successfully!');
      
      // Refresh notifications list
      setCurrentPage(1);
      navigate('/superadmin-notifications-history');
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to create notification.');
    }
  };

  return (
    <div className={`${styles['notifications-container']} ${styles['superadmin-panel']}`}>
      <form onSubmit={handleSubmit} className={styles['notification-form']}>
        <h2>Create Notification</h2>

        <div className={styles['form-group']}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notification title"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter notification message"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="notificationType">Notification Type</label>
          <select
            id="notificationType"
            name="notificationType"
            value={formData.notificationType}
            onChange={handleChange}
          >
            <option value="announcement">Announcement</option>
            <option value="activity">Activity</option>
            <option value="alert">Alert</option>
          </select>
        </div>

        <button type="submit" className={styles['submit-button']}>
          Create Notification
        </button>
      </form>

      <div className={styles.notificationsList}>
        <h3>Existing Notifications</h3>
        <table className={styles.notificationsTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.notificationType}</td>
                <td>{new Date(notification.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SuperAdminCreateNotification;