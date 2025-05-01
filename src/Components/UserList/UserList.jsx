import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './UserList.module.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Auth.getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>Loading user data...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Details</h2>
      <div className={styles.tableContainer}>
        <div className={styles.scrollableTable}> {/* Added this div for scrolling */}
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Display Name</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Country</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Languages</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.employeeId}</td>
                  <td>{user.username}</td>
                  <td>{user.displayName}</td>
                  <td>{user.gender}</td>
                  <td>{user.role ? user.role : "NA"}</td>
                  <td>{user.contact.phone}</td>
                  <td>{user.contact.emailId}</td>
                  <td>{user.address.country}</td>
                  <td>{user.address.state}</td>
                  <td>{user.address.pincode}</td>
                  <td>{user.language.join(', ')}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;