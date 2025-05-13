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
    targetRoles: [], // Array to store selected roles
  });
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Define the roles here
  const roles = ['user', 'admin', 'superadmin', 'client']; // Add roles here

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

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'targetRoles') {
      const selectedRoles = Array.from(e.target.selectedOptions, option => option.value); // Handle multiple selections
      setFormData(prev => ({ ...prev, [name]: selectedRoles }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, message, notificationType, targetRoles } = formData;

    if (!title || !message) {
      toast.error('Title and message are required!');
      return;
    }

    try {
      const token = Auth.getToken();
      if (!token) throw new Error('Unauthorized');

      await axios.post(
        'http://209.74.89.83/erpbackend/create-notifications',
        formData, // Send the whole form data with targetRoles
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Reset form data after successful submission
      setFormData({ title: '', message: '', notificationType: 'announcement', targetRoles: [] });
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
            {/* You can add more types here */}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="targetRoles">Target Roles</label>
          <select
            id="targetRoles"
            name="targetRoles"
            value={formData.targetRoles}  // Ensure this is an array
            onChange={handleChange}
            multiple // Allow multiple selections
            required
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
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
              <th>Target Roles</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.notificationType}</td>
                <td>{new Date(notification.createdAt).toLocaleDateString()}</td>
                <td>{notification.targetRoles.join(', ')}</td> {/* Display target roles */}
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
