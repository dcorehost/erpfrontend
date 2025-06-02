

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../Services/Auth';
import styles from './CompletedLeavesPage.module.css';

const CompletedLeavesPage = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState({});

  useEffect(() => {
    const fetchCompletedLeaves = async () => {
      try {
        if (!Auth.isAuthenticated()) {
          setError('Please login to view leave details');
          setLoading(false);
          return;
        }

        const token = Auth.getToken();
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-admincomplete-leave-details',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data && response.data.leaveDetails) {
          // Transform the data to match the API structure
          const transformedData = response.data.leaveDetails.map(user => ({
            ...user,
            userLeaves: user.userLeaves.map(leave => ({
              ...leave,
              userId: {  // Add the userId structure from the sample API
                username: user.username,
                contact: user.contact,
                typeOfUser: user.typeOfUser
              },
              createdAt: leave.createdAt || new Date().toISOString(),
              updatedAt: leave.updatedAt || new Date().toISOString()
            }))
          }));
          setLeaveData(transformedData);
          
          const initialExpanded = {};
          transformedData.forEach(user => {
            initialExpanded[user._id] = false;
          });
          setExpandedUsers(initialExpanded);
        } else {
          setError('No leave data available');
        }
      } catch (err) {
        console.error('Error fetching leave data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch leave data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedLeaves();
  }, []);

  const toggleUserExpand = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? '-' 
        : date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return '-';
    }
  };

  const calculateLeaveDays = (from, to) => {
    try {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    } catch (e) {
      console.error('Error calculating leave days:', e);
      return '-';
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = status?.toLowerCase() || '';
    return (
      <span className={`${styles.statusBadge} ${styles[statusClass]}`}>
        {status || '-'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading leave data...</p>
      </div>
    );
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
        <h1>Completed/Rejected Leaves</h1>
        {/* <div className={styles.userInfo}>
          <span>Logged in as: {Auth.getAuthData().username}</span>
          <span>({Auth.getAuthData().typeOfUser})</span>
        </div> */}
      </div>

      {leaveData.length === 0 ? (
        <div className={styles.noData}>No leave records found</div>
      ) : (
        <div className={styles.usersContainer}>
          {leaveData.map(user => (
            <div key={user._id} className={styles.userCard}>
              <div 
                className={styles.userHeader}
                onClick={() => toggleUserExpand(user._id)}
              >
                <div className={styles.userMainInfo}>
                  <h2>{user.username}</h2>
                  <span className={styles.userType}>{user.typeOfUser}</span>
                  <span className={styles.userEmail}>{user.contact?.emailId || '-'}</span>
                </div>
                <div className={styles.toggleIcon}>
                  {expandedUsers[user._id] ? '▼' : '►'}
                </div>
              </div>

              {expandedUsers[user._id] && (
                <div className={styles.leaveTableContainer}>
                  <table className={styles.leaveTable}>
                    <thead>
                      <tr>
                        <th>Leave Type</th>
                        <th>Period</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.userLeaves.map(leave => (
                        <tr key={leave._id} className={styles[leave.state?.toLowerCase() || '']}>
                          <td>{leave.leaveType || '-'}</td>
                          <td>
                            {formatDateTime(leave.from)} - {formatDateTime(leave.to)}
                          </td>
                          <td>{calculateLeaveDays(leave.from, leave.to)}</td>
                          <td>{leave.reason || '-'}</td>
                          <td>{getStatusBadge(leave.state)}</td>
                          <td>{leave.remarks || '-'}</td>
                          <td>{formatDateTime(leave.createdAt)}</td>
                          <td>{formatDateTime(leave.updatedAt)}</td>
                         
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedLeavesPage;