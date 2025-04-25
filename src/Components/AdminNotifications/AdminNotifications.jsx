import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from "../Services/Auth";
import styles from './AdminNotifications.module.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Notification Form Component
const NotificationForm = ({ 
  userType, 
  onSubmit, 
  title, 
  setTitle, 
  message, 
  setMessage, 
  notificationType, 
  setNotificationType,
  error,
  success
}) => {
  return (
    <div className={`${styles['create-container']} ${styles[`${userType}-panel`]}`}>
      <form className={`${styles['notification-form']}`} onSubmit={onSubmit}>
        <h2>Create a New Notification</h2>
        <div className={styles['form-group']}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="notificationType">Notification Type</label>
          <select
            id="notificationType"
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
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

      {/* Added success and error message handling */}
      {error && <div className={styles['error-message']}>{error}</div>}
      {success && <div className={styles['success-message']}>{success}</div>}
    </div>
  );
};

// Notification List Component
const NotificationList = ({ notifications, loading, error, userType }) => {
  if (loading) {
    // Check if loading is true and log to verify
    console.log("Loading state is true, rendering spinner...");
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return <div className={styles['error-message']}>{error}</div>;
  }

  if (notifications.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        <p>No notifications available</p>
      </div>
    );
  }

  return (
    <div className={styles['notifications-list']}>
      {notifications.map((notification) => (
        <div key={notification._id} className={`${styles['notification-item']} ${styles[`${userType}-panel`]}`}>
          <div className={styles['notification-header']}>
            <h3>{notification.title}</h3>
            <span className={styles['notification-type']}>{notification.notificationType}</span>
          </div>
          <p>{notification.message}</p>
          <span className={styles['notification-date']}>
            {new Date(notification.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// Main Admin Panel Component
// Main Admin Panel Component
const AdminPanel = () => {
    const [userType, setUserType] = useState('');
    const [currentPage, setCurrentPage] = useState('view');
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
      title: '',
      message: '',
      notificationType: 'announcement'
    });
    const [formStatus, setFormStatus] = useState({
      error: '',
      success: ''
    });
    const [toastMessage, setToastMessage] = useState(''); 
    const [isToastVisible, setIsToastVisible] = useState(false);  
  
    useEffect(() => {
      const fetchUserData = async () => {
        const type = Auth.getUserType();
        setUserType(type);
        await fetchNotifications();
      };
  
      fetchUserData();
    }, []);
  
    const fetchNotifications = async () => {
      setLoading(true); // Ensure that the loading state is set to true before the API request
      try {
        const token = Auth.getToken();
        const type = Auth.getUserType();
  
        if (!token) throw new Error("Please login to access this page");
  
        const response = await axios.get('http://209.74.89.83/erpbackend/get-notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          params: { typeOfUser: type }
        });
  
        setNotifications(Array.isArray(response.data) ? response.data : []);
        setError('');
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch notifications.');
      } finally {
        setLoading(false); // Ensure that the loading state is set to false after the request is completed
      }
    };
    const handleCreateNotification = async (e) => {
        e.preventDefault();
        const { title, message } = formData;
    
        if (!title || !message) {
          setFormStatus({ error: 'Title and message are required.', success: '' });
          toast.error("Title and message are required!");  // Error Toast
          return;
        }
    
        try {
          const token = Auth.getToken();
          if (!token) throw new Error("Please login to access this page");
    
          await axios.post(
            'http://209.74.89.83/erpbackend/create-notifications',
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          );
    
          setFormData({ title: '', message: '', notificationType: 'announcement' });
        //   setFormStatus({ error: '', success: 'Notification created successfully!' });
          toast.success("Notification created successfully!");  // Success Toast
          await fetchNotifications();
          setTimeout(() => setCurrentPage('view'), 1500);
        } catch (err) {
          console.error(err.message);
          setFormStatus({ error: 'Failed to create notification.', success: '' });
          toast.error("Failed to create notification!");  // Error Toast
        }
      };
    
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    return (
        <div className={`${styles['notifications-container']} ${styles[`${userType}-panel`]}`}>
          <div className={styles['navigation-tabs']}>
            <button
              className={`${styles['tab-button']} ${currentPage === 'view' ? styles.active : ''}`}
              onClick={() => setCurrentPage('view')}
            >
              View Notifications
            </button>
            <button
              className={`${styles['tab-button']} ${currentPage === 'create' ? styles.active : ''}`}
              onClick={() => {
                setCurrentPage('create');
                setFormStatus({ error: '', success: '' });
              }}
            >
              Create Notification
            </button>
          </div>
    
          {currentPage === 'create' ? (
            <NotificationForm
              userType={userType}
              onSubmit={handleCreateNotification}
              title={formData.title}
              setTitle={(value) => handleFormChange({ target: { name: 'title', value } })}
              message={formData.message}
              setMessage={(value) => handleFormChange({ target: { name: 'message', value } })}
              notificationType={formData.notificationType}
              setNotificationType={(value) => handleFormChange({ target: { name: 'notificationType', value } })}
              error={formStatus.error}
              success={formStatus.success}
            />
          ) : (
            <div className={styles['view-container']}>
              <h2>All Notifications</h2>
              <NotificationList 
                notifications={notifications} 
                loading={loading} 
                error={error} 
                userType={userType} 
              />
            </div>
          )}
    
          {/* Render the ToastContainer here */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }    
  export default AdminPanel;
  