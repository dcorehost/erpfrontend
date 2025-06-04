import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './AttendanceAdmin.module.css';

const AttendanceAdmin = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment());

  // Get token from storage
  const getAuthToken = () => {
    // Check multiple possible storage locations
    return localStorage.getItem('authToken') || 
           localStorage.getItem('userToken') ||
           sessionStorage.getItem('authToken') ||
           sessionStorage.getItem('userToken');
  };

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        
        if (!token) {
          setError('Authentication required. Please login.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-attendance-summary',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.attendanceRecords) {
          setAttendanceData(response.data.attendanceRecords);
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

  // Get status for specific date
  const getDateStatus = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return attendanceData.some(item => 
      moment(item.checkInStatus).format('YYYY-MM-DD') === dateStr
    ) ? 'Present' : 'Absent';
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

  // Check authentication
  if (!getAuthToken()) {
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

  // Main render
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Attendance</h2>
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
};

export default AttendanceAdmin;