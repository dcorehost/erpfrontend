
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch attendance data from the backend
    const fetchAttendance = async () => {
      try {
        const response = await fetch('/api/attendance'); //API URL
        const data = await response.json();
        setAttendance(data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className={styles.userProfileContainer}>
        <div className={styles.profileImageContainer}>
        <img
          src="https://via.placeholder.com/150"
          alt="User Profile"
          className={styles.profileImage}
        />
      </div>
      <h1 className={styles.heading}>User Profile</h1>
      
      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <label className={styles.label}>Name:</label>
          <span className={styles.value}>John Doe</span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Email:</label>
          <span className={styles.value}>johndoe@example.com</span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Role:</label>
          <span className={styles.value}>Administrator</span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Designation:</label>
          <span className={styles.value}>Software Engineer</span>
        </div>
      </div>
      <div className={styles.attendanceSheet}>
        <h2 className={styles.subHeading}>Attendance Sheet</h2>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.taskSection}>
        <h2 className={styles.subHeading}>Tasks</h2>
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Complete project documentation</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Code review for Module X</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className={styles.editButton}>Edit Profile</button>
      <Link to="/logout" className={styles.logoutLink}>
        Logout
      </Link>
    </div>
  );
};

export default UserProfile;
