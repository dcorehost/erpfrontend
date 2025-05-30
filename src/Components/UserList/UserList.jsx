
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './UserList.module.css';
import Modal from 'react-modal';
import Loader from '../Loader/Loader';



Modal.setAppElement('#root');

const UserList = () => {

  // State management
  
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [password, setPassword] = useState(''); 
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Get admin token
  const adminToken = Auth.getToken();

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoader(true);

      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
          {
            headers: { Authorization: `Bearer ${adminToken}` }
          }
        );
        setUsers(response.data.users);
        setLoading(false);
        setLoader(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
        setLoader(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [adminToken]);

  // Fetch detailed user information
  const fetchUserDetails = async (user, userPassword) => {
    setDetailsLoading(true);
    setError(null);
    setLoader(true);
    
    try {
      // 1. Login as the user to get their token
      const loginResponse = await axios.post(
        'http://209.74.89.83/erpbackend/log-in',
        {
          emailId: user.contact.emailId,
          password: userPassword
        }
      );

      const userToken = loginResponse.data.token;
      
      // 2. Fetch user details with their token
      const detailsResponse = await axios.get(
        'http://209.74.89.83/erpbackend/get-user-detail',
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      
      setUserDetails(detailsResponse.data.users);
      setModalIsOpen(true);
      setShowPasswordInput(false);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError(err.response?.data?.message || 'Failed to load user details. Please check the password and try again.');
      setShowPasswordInput(true); // Show password input again if failed
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle clicking on user name
  const handleNameClick = (user) => {
    setSelectedUser(user);
    setShowPasswordInput(true);
  };

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && password) {
      fetchUserDetails(selectedUser, password);
    }
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setUserDetails(null);
    setError(null);
    setPassword('');
    setShowPasswordInput(false);
  };

  // Loading state
 
  if (loader) {
    return <Loader />;
  }

  // Error state
  if (error && !modalIsOpen) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Management</h2>
      <div className={styles.tableContainer}>
        <div className={styles.scrollableTable}> 
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.employeeId}</td>
                  <td>
                    <button 
                      className={styles.nameButton} 
                      onClick={() => handleNameClick(user)}
                    >
                      {user.username}
                    </button>
                  </td>
                  <td>{user.role || "NA"}</td>
                  <td>{user.contact.emailId}</td>
                  <td>{user.contact.phone}</td>
                  <td>
                    <button 
                      className={styles.viewButton}
                      onClick={() => handleNameClick(user)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Input Modal */}
      <Modal
        isOpen={showPasswordInput}
        onRequestClose={() => setShowPasswordInput(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.passwordModal}>
          <h3>Enter Password for {selectedUser?.username}</h3>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter user's password"
              required
              className={styles.passwordInput}
            />
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                {detailsLoading ? 'Loading...' : 'Submit'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowPasswordInput(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* User Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {detailsLoading ? (
          <div className={styles.loading}>Loading user details...</div>
        ) : error ? (
          <div className={styles.error}>
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        ) : userDetails ? (
          <div className={styles.userDetails}>
            <div className={styles.modalHeader}>
              <h2>{userDetails.username}'s Dashboard</h2>
              <button className={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            
            <div className={styles.detailsGrid}>
              {/* Basic Information */}
              <div className={styles.detailsSection}>
                <h3>Basic Information</h3>
                <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
                <p><strong>Role:</strong> {userDetails.role}</p>
                <p><strong>Gender:</strong> {userDetails.gender}</p>
                <p><strong>Created:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Contact Information */}
              <div className={styles.detailsSection}>
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
                <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
                <p><strong>Languages:</strong> {userDetails.language?.join(', ') || 'None'}</p>
              </div>

              {/* Leave Balance */}
              <div className={styles.detailsSection}>
                <h3>Leave Balance</h3>
                <div className={styles.leaveBalance}>
                  <div className={styles.leaveType}>
                    <h4>Casual Leaves</h4>
                    <p>Available: {userDetails.leaveBalance?.casualLeaves?.available || 0}</p>
                    <p>Booked: {userDetails.leaveBalance?.casualLeaves?.booked || 0}</p>
                  </div>
                  <div className={styles.leaveType}>
                    <h4>Sick Leaves</h4>
                    <p>Available: {userDetails.leaveBalance?.sickLeaves?.available || 0}</p>
                    <p>Booked: {userDetails.leaveBalance?.sickLeaves?.booked || 0}</p>
                  </div>
                </div>
              </div>

              {/* Recent Leaves */}
              <div className={styles.detailsSection}>
                <h3>Recent Leaves (Last 3)</h3>
                {userDetails.userLeaves?.length > 0 ? (
                  <div className={styles.leaveList}>
                    {userDetails.userLeaves.slice(0, 3).map((leave, index) => (
                      <div key={index} className={`${styles.leaveItem} ${styles[leave.state.toLowerCase()]}`}>
                        <p><strong>{leave.leaveType}</strong></p>
                        <p>{new Date(leave.from).toLocaleDateString()} to {new Date(leave.to).toLocaleDateString()}</p>
                        <p>Status: {leave.state}</p>
                        {leave.remarks && <p>Remarks: {leave.remarks}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No leave records found</p>
                )}
              </div>

              {/* Recent Attendance */}
              <div className={styles.detailsSection}>
                <h3>Recent Attendance (Last 3)</h3>
                {userDetails.attendance?.length > 0 ? (
                  <div className={styles.attendanceList}>
                    {userDetails.attendance.slice(0, 3).map((record, index) => (
                      <div key={index} className={styles.attendanceItem}>
                        <p><strong>{record.status}</strong> on {new Date(record.checkInStatus).toLocaleDateString()}</p>
                        <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
                        {record.checkOutStatus && (
                          <>
                            <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
                            <p>Duration: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No attendance records found</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.error}>No user details available</div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;