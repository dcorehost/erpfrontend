
import styles from './AdminUserTable.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../Services/Auth';

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Auth.getToken();
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingId(user.employeeId);
    setEditUser({
      ...user,
      contact: { ...user.contact },
      address: { ...user.address }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const path = name.split('.');
    
    setEditUser(prev => {
      const newUser = { ...prev };
      let current = newUser;
      
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newUser;
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Display Name</th>
              <th>Gender</th>
              <th>Country</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Language</th>
              <th>Role</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.employeeId}>
                {editingId === user.employeeId ? (
                  <>
                    <td>{user.employeeId}</td>
                    <td><input name="username" value={editUser.username} onChange={handleChange} /></td>
                    <td><input name="contact.emailId" value={editUser.contact?.emailId || ''} onChange={handleChange} /></td>
                    <td><input name="contact.phone" value={editUser.contact?.phone || ''} onChange={handleChange} /></td>
                    <td><input name="displayName" value={editUser.displayName} onChange={handleChange} /></td>
                    <td>
                      <select name="gender" value={editUser.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td><input name="address.country" value={editUser.address?.country || ''} onChange={handleChange} /></td>
                    <td><input name="address.state" value={editUser.address?.state || ''} onChange={handleChange} /></td>
                    <td><input name="address.pincode" value={editUser.address?.pincode || ''} onChange={handleChange} /></td>
                    <td>
                      <select 
                        name="language" 
                        value={editUser.language?.[0] || ''} 
                        onChange={(e) => setEditUser(prev => ({
                          ...prev,
                          language: [e.target.value]
                        }))}
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                      </select>
                    </td>
                    <td>
                      <select name="role" value={editUser.role || ''} onChange={handleChange}>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.employeeId}</td>
                    <td>{user.username}</td>
                    <td>{user.contact?.emailId}</td>
                    <td>{user.contact?.phone}</td>
                    <td>{user.displayName}</td>
                    <td>{user.gender}</td>
                    <td>{user.address?.country}</td>
                    <td>{user.address?.state}</td>
                    <td>{user.address?.pincode}</td>
                    <td>{user.language?.join(', ')}</td>
                    <td>{user.role}</td>
                    {/* <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                    </td> */}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUserTable;