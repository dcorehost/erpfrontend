import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SuperAdminNotifications.module.css'; // Reuse admin styles
import Auth from '../Services/Auth';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting

const SuperAdminCreateNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    notificationType: 'announcement',
  });

  const navigate = useNavigate();  // Initialize useNavigate for redirection


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

      navigate('/superadmin-notifications-history');  // This line will redirect

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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SuperAdminCreateNotification;
