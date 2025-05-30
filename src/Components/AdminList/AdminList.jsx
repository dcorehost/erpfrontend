


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './AdminList.module.css';
import Loader from '../Loader/Loader';

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
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const adminData = Array.isArray(response.data)
          ? response.data
          : response.data.users || response.data.admins || [];

        setAdmins(adminData);
      } catch (err) {
        setError(err.message || 'Error fetching admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [token]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>❌ {error}</div>;
  if (admins.length === 0) return <div className={styles.error}>No admin data found.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Admin Details</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Emp ID</th>
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
              <th>Created</th>
              <th>Updated</th>
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
                <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>{admin.updatedAt ? new Date(admin.updatedAt).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
