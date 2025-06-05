
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './SuperAdminleave.module.css';
import Auth from '../Services/Auth'; 

const SuperAdminleave = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment());

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Auth.getToken();
        
        if (!token) {
          setError('Authentication required. Please login.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-attendance-of-all-user',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.attendance) {
          setUsers(response.data.attendance);
        } else {
          setError('No attendance records found');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get status for specific date for selected user
  const getDateStatus = (date) => {
    if (!selectedUser) return 'Absent';
    
    const dateStr = date.format('YYYY-MM-DD');
    const hasAttendance = selectedUser.attendance.some(item => 
      moment(item.checkInStatus).format('YYYY-MM-DD') === dateStr
    );
    
    return hasAttendance ? 'Present' : 'Absent';
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const startDay = currentDate.clone().startOf('month').startOf('week');
    const endDay = currentDate.clone().endOf('month').endOf('week');
    const days = [];
    let day = startDay.clone();

    while (day <= endDay) {
      days.push(day.clone());
      day.add(1, 'day');
    }

    return days;
  };

  // Handle month navigation
  const changeMonth = (months) => {
    setCurrentDate(currentDate.clone().add(months, 'month'));
  };

  // Render calendar day
  const renderDay = (day) => {
    const status = getDateStatus(day);
    const isCurrentMonth = day.month() === currentDate.month();
    const isToday = day.isSame(moment(), 'day');
    const date = day.date();

    return (
      <div
        key={day.format('YYYY-MM-DD')}
        className={`${styles.day} 
          ${status === 'Present' ? styles.present : styles.absent}
          ${isCurrentMonth ? '' : styles.otherMonth}
          ${isToday ? styles.today : ''}`}
      >
        <span className={styles.date}>{date}</span>
        <span className={styles.status}>{status}</span>
      </div>
    );
  };

  // Handle login redirect
  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  // Handle back to user list
  const handleBackToList = () => {
    setSelectedUser(null);
  };

  // Check authentication
  if (!Auth.isAuthenticated()) {
    return (
      <div className={styles.authContainer}>
        <h3>Login Required</h3>
        <p>Please sign in to view your attendance records</p>
        <button 
          onClick={redirectToLogin}
          className={styles.loginButton}
        >
          Sign In
        </button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <div className={styles.loading}>Loading attendance data...</div>;
  }

  // Error state
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // If a user is selected, show their attendance calendar
  if (selectedUser) {
    return (
      <div className={styles.container}>
        <button onClick={handleBackToList} className={styles.backButton}>
          &larr; Back to Users
        </button>
        <div className={styles.header}>
          <h2>{selectedUser.username}'s Attendance</h2>
          <div className={styles.monthNavigation}>
            <button onClick={() => changeMonth(-1)}>&lt;</button>
            <h3>{currentDate.format('MMMM YYYY')}</h3>
            <button onClick={() => changeMonth(1)}>&gt;</button>
          </div>
        </div>

        <div className={styles.calendar}>
          <div className={styles.weekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.weekday}>{day}</div>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {generateCalendarDays().map(renderDay)}
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.present}`}></div>
            <span>Present</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.absent}`}></div>
            <span>Absent</span>
          </div>
        </div>
      </div>
    );
  }

  // Main render - show list of users
  return (
    <div className={styles.container}>
      <h2>User Attendance</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Attendance Days</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr 
              key={user._id} 
              onClick={() => setSelectedUser(user)}
              className={styles.userRow}
            >
              <td>{user.username}</td>
              <td>{user.employeeId}</td>
              <td>{user.contact?.emailId || 'N/A'}</td>
              <td>{user.contact?.phone || 'N/A'}</td>
              <td>{user.attendance?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminleave;