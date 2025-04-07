import styles from './UserTaskProgress.module.css';
import React from 'react';

const UserTaskProgress = () => {
  // यूजर डेटा अब कंपोनेंट के अंदर
  const users = [
    {
      username: "john_doe",
      emailId: "john@example.com",
      phone: "123-456-7890",
      displayName: "John Doe",
      gender: "Male",
      country: "USA",
      state: "California",
      pincode: "90210",
      language: "English",
      role: "User"
    },
    {
      username: "jane_smith",
      emailId: "jane@example.com",
      phone: "987-654-3210",
      displayName: "Jane Smith",
      gender: "Female",
      country: "Canada",
      state: "Ontario",
      pincode: "M5H 2N2",
      language: "French",
      role: "Admin"
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Display Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Language</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.emailId}</td>
              <td>{user.phone}</td>
              <td>{user.displayName}</td>
              <td>{user.gender}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.pincode}</td>
              <td>{user.language}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTaskProgress;