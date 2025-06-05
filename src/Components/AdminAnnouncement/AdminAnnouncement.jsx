import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AdminAnnouncement.module.css';
import Auth from '../Services/Auth';
import { useNavigate } from 'react-router-dom';

const AdminAnnouncement = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    notificationType: 'announcement',
    targetRoles: [],
  });
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // MODIFICATION START: Only 'User' role remains
  const roles = ['User']; // Original: ['User', 'Admin', 'Superadmin', 'Client'];
  // MODIFICATION END

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) {
          navigate('/login');
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
        setInitialLoadComplete(true);
      } catch (err) {
        console.error("Failed to fetch Announcement:", err);
        if (initialLoadComplete || (err.response && err.response.status === 401)) {
            toast.error('Failed to fetch Announcement.');
        }

        if (err.response && err.response.status === 401) {
          Auth.logout();
          navigate('/login');
        }
      }
    };

    fetchNotifications();
  }, [currentPage, navigate, initialLoadComplete]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'targetRoles') {
      if (type === 'checkbox') {
        setFormData(prev => ({
          ...prev,
          targetRoles: checked
            ? [...prev.targetRoles, value]
            : prev.targetRoles.filter(role => role !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, message, targetRoles } = formData;

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
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setFormData({ title: '', message: '', notificationType: 'announcement', targetRoles: [] });
      toast.success('Notification created successfully!');

      setCurrentPage(1);
      navigate('/superadmin-notifications-history');
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
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Target Roles</label>
          <div className={styles['checkbox-group']}>
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
                <td>{notification.targetRoles.join(', ')}</td>
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

export default AdminAnnouncement;