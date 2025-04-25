
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './AdminList.module.css';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Auth.getToken();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-admin-detail-for-superadmin',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        // Check if response.data is an array or needs to be accessed differently
        const adminData = Array.isArray(response.data) ? response.data : 
                         response.data.users ? response.data.users : 
                         response.data.admins ? response.data.admins : 
                         [];
        
        setAdmins(adminData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching admins:', err);
      }
    };

    fetchAdmins();
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>Loading admin data...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (admins.length === 0) {
    return <div className={styles.error}>No admin data available</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Details</h2>
      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Username</th>
              <th>Display Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Languages</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.employeeId}</td>
                <td>{admin.username}</td>
                <td>{admin.displayName}</td>
                <td>{admin.gender}</td>
                <td>{admin.contact?.phone || 'N/A'}</td>
                <td>{admin.contact?.emailId || 'N/A'}</td>
                <td>{admin.address?.country || 'N/A'}</td>
                <td>{admin.address?.state || 'N/A'}</td>
                <td>{admin.address?.pincode || 'N/A'}</td>
                <td>{admin.language?.join(', ') || 'N/A'}</td>
                <td>{admin.role || 'N/A'}</td>
                <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleString() : 'N/A'}</td>
                <td>{admin.updatedAt ? new Date(admin.updatedAt).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;