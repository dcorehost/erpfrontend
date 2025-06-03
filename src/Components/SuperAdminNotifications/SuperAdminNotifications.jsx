import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SuperAdminNotifications.module.css'; 
import Auth from '../Services/Auth'; 
import { useNavigate } from 'react-router-dom';

const SuperAdminNotification = () => {
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

  // Define the roles here. Ensure these match the roles expected by your backend.
  const roles = ['User', 'Admin', 'Superadmin', 'Client'];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) {
          // Redirect to login or handle unauthorized access
          navigate('/login'); // Example: navigate to login page
          return;
        }

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
        console.error("Failed to fetch notifications:", err);
        toast.error('Failed to fetch notifications.');
        // Optionally handle token expiration or invalid token here
        if (err.response && err.response.status === 401) {
          Auth.logout(); // Example: clear token and logout
          navigate('/login');
        }
      }
    };

    fetchNotifications();
  }, [currentPage, navigate]); // Added navigate to dependency array

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'targetRoles') {
      // If the input is a checkbox
      if (type === 'checkbox') {
        setFormData(prev => ({
          ...prev,
          targetRoles: checked
            ? [...prev.targetRoles, value] // Add role if checked
            : prev.targetRoles.filter(role => role !== value) // Remove role if unchecked
        }));
      } else {
        // Fallback for other input types with the same name if any
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, message, targetRoles } = formData; // Removed notificationType from destructuring as it's handled by select

    if (!title || !message) {
      toast.error('Title and message are required!');
      return;
    }
    if (targetRoles.length === 0) {
      toast.error('At least one target role must be selected!');
      return;
    }

    try {
      const token = Auth.getToken();
      if (!token) {
        toast.error('Unauthorized. Please log in.');
        navigate('/login');
        return;
      }

      await axios.post(
        'http://209.74.89.83/erpbackend/create-notifications',
        formData, // formData directly contains title, message, notificationType, and targetRoles
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

      // Refresh notifications list and navigate
      setCurrentPage(1); // Reset to first page to see new notification if pagination is active
      navigate('/superadmin-notifications-history'); // Navigate to a history page
    } catch (err) {
      console.error("Failed to create notification:", err.response ? err.response.data : err.message);
      toast.error('Failed to create notification. Please check your input and try again.');
      if (err.response && err.response.status === 401) {
        Auth.logout();
        navigate('/login');
      }
    }
  };

  return (
    <div className={`${styles['notifications-container']} ${styles['superadmin-panel']}`}>
      <form onSubmit={handleSubmit} className={styles['notification-form']}>
        <h2>New Announcement</h2>

        <div className={styles['form-group']}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Announcement title"
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
            placeholder="Enter Announcement message"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="notificationType">Announcement Type</label>
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
          <label>Target Roles</label>
          <div className={styles['checkbox-group']}> {/* Add a div for styling checkboxes */}
            {roles.map(role => (
              <label key={role} className={styles['checkbox-label']}>
                <input
                  type="checkbox"
                  name="targetRoles"
                  value={role}
                  checked={formData.targetRoles.includes(role)}
                  onChange={handleChange}
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className={styles['submit-button']}>
          Create Notification
        </button>
      </form>

      <div className={styles.notificationsList}>
        <h3>New Announcement</h3>
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

export default SuperAdminNotification;