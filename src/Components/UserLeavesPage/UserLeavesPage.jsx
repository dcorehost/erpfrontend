
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Auth from '../Services/Auth';
import styles from './UserLeavesPage.module.css';
import Loader from '../Loader/Loader';

const UserLeavesPage = () => {
  const [loader, setLoader] = useState(false);
  
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication first
        if (!Auth.isAuthenticated()) {
          setError('Please login to view leave details');
          setLoading(false);
          setLoader(false)
          return;
        }

        // Get current user data
        const userData = Auth.getAuthData();
        setCurrentUser(userData);

        // Create Axios instance with base URL and authorization header
        const api = axios.create({
          baseURL: 'http://209.74.89.83/erpbackend', 
          headers: {
            'Authorization': `Bearer ${Auth.getToken()}`
          }
        });

        // Fetch leave data using Axios
        const response = await api.get('get-user-leaves-for-Superadmin');
        
        if (response.data && response.data.leaveDetails) {
          setLeaveData(response.data.leaveDetails);
        } else {
          setError('No leave data available');
        }
      } catch (err) {
        console.error('Error fetching leave data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch leave data');
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStatusBadge = (status) => {
    const statusClass = status.toLowerCase();
    return <span className={styles[`status-${statusClass}`]}>{status}</span>;
  };

  if (loading) {
    return (<Loader /> );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        {!Auth.isAuthenticated() && (
          <button 
            className={styles.loginButton}
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Leave Management</h1>
        {/* {currentUser && (
          <div className={styles.userInfo}>
            <span>Logged in as: {currentUser.email}</span>
          </div>
        )} */}
      </div>

      {leaveData.length === 0 ? (
        <div className={styles.noData}>No leave records found</div>
      ) : (
        leaveData.map(user => (
          <div key={user._id} className={styles.userSection}>
            <h2 className={styles.userName}>
              {user.username}
              <span className={styles.userType}>{user.typeOfUser}</span>
            </h2>
            <div className={styles.userDetails}>
              <span>Email: {user.contact.emailId}</span>
              {user.contact.phone && <span>Phone: {user.contact.phone}</span>}
            </div>
            
            <div className={styles.tableResponsive}>
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Period</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Applied On</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {user.userLeaves.map(leave => {
                    const fromDate = new Date(leave.from);
                    const toDate = new Date(leave.to);
                    const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <tr key={leave._id} className={styles[leave.state.toLowerCase()]}>
                        <td>{leave.leaveType}</td>
                        <td>
                          {formatDate(leave.from)} to {formatDate(leave.to)}
                        </td>
                        <td>{days} day{days > 1 ? 's' : ''}</td>
                        <td>{leave.reason}</td>
                        <td>{renderStatusBadge(leave.state)}</td>
                        <td>{leave.remarks || '-'}</td>
                        <td>{formatDate(leave.createdAt)}</td>
                        <td>{formatDate(leave.updatedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserLeavesPage;