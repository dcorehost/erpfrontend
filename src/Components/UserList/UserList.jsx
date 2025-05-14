// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import styles from './UserList.module.css';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = Auth.getToken();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('Error fetching users:', err);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   if (loading) {
//     return <div className={styles.loading}>Loading user data...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>User Details</h2>
//       <div className={styles.tableContainer}>
//         <div className={styles.scrollableTable}> 
//           <table className={styles.userTable}>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Display Name</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>State</th>
//                 <th>Pincode</th>
//                 <th>Languages</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.employeeId}</td>
//                   <td>{user.username}</td>
//                   <td>{user.displayName}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role ? user.role : "NA"}</td>
//                   <td>{user.contact.phone}</td>
//                   <td>{user.contact.emailId}</td>
//                   <td>{user.address.country}</td>
//                   <td>{user.address.state}</td>
//                   <td>{user.address.pincode}</td>
//                   <td>{user.language.join(', ')}</td>
//                   <td>{new Date(user.createdAt).toLocaleString()}</td>
//                   <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import styles from './UserList.module.css';
// import Modal from 'react-modal'; // Make sure to install this package

// // Make sure to bind modal to your appElement (for accessibility reasons)
// Modal.setAppElement('#root'); // Or your app's root element ID

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const token = Auth.getToken();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('Error fetching users:', err);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   const fetchUserDetails = async (userId) => {
//     setDetailsLoading(true);
//     try {
//       const response = await axios.get(
//         `http://209.74.89.83/erpbackend/get-user-detail?employeeId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setUserDetails(response.data.users);
//       setModalIsOpen(true);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//       setError('Failed to load user details');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleNameClick = (user) => {
//     setSelectedUser(user);
//     fetchUserDetails(user.employeeId);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setUserDetails(null);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading user data...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>User Details</h2>
//       <div className={styles.tableContainer}>
//         <div className={styles.scrollableTable}> 
//           <table className={styles.userTable}>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Display Name</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>State</th>
//                 <th>Pincode</th>
//                 <th>Languages</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.employeeId}</td>
//                   <td>
//                     <button 
//                       className={styles.nameButton} 
//                       onClick={() => handleNameClick(user)}
//                     >
//                       {user.username}
//                     </button>
//                   </td>
//                   <td>{user.displayName}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role ? user.role : "NA"}</td>
//                   <td>{user.contact.phone}</td>
//                   <td>{user.contact.emailId}</td>
//                   <td>{user.address.country}</td>
//                   <td>{user.address.state}</td>
//                   <td>{user.address.pincode}</td>
//                   <td>{user.language.join(', ')}</td>
//                   <td>{new Date(user.createdAt).toLocaleString()}</td>
//                   <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={styles.modal}
//         overlayClassName={styles.overlay}
//       >
//         {detailsLoading ? (
//           <div className={styles.loading}>Loading user details...</div>
//         ) : userDetails ? (
//           <div className={styles.userDetails}>
//             <h2>{userDetails.username}'s Details</h2>
//             <button className={styles.closeButton} onClick={closeModal}>×</button>
            
//             <div className={styles.detailsSection}>
//               <h3>Basic Information</h3>
//               <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
//               <p><strong>Role:</strong> {userDetails.role}</p>
//               <p><strong>Gender:</strong> {userDetails.gender}</p>
//               <p><strong>Created At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
//               <p><strong>Updated At:</strong> {new Date(userDetails.updatedAt).toLocaleString()}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Contact Information</h3>
//               <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
//               <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
//               <p><strong>Languages:</strong> {userDetails.language.join(', ')}</p>
//               <p><strong>Address:</strong> {userDetails.address.country}, {userDetails.address.state || 'N/A'}, Pincode: {userDetails.address.pincode}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Leave Balance</h3>
//               <p><strong>Casual Leaves:</strong> {userDetails.leaveBalance.casualLeaves.available} available, {userDetails.leaveBalance.casualLeaves.booked} booked</p>
//               <p><strong>Sick Leaves:</strong> {userDetails.leaveBalance.sickLeaves.available} available, {userDetails.leaveBalance.sickLeaves.booked} booked</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Leaves</h3>
//               {userDetails.userLeaves.length > 0 ? (
//                 <ul>
//                   {userDetails.userLeaves.slice(0, 3).map((leave, index) => (
//                     <li key={index}>
//                       <p><strong>{leave.leaveType}</strong>: {new Date(leave.from).toLocaleDateString()} to {new Date(leave.to).toLocaleDateString()}</p>
//                       <p>Status: {leave.state}</p>
//                       {leave.remarks && <p>Remarks: {leave.remarks}</p>}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No leave records found</p>
//               )}
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Attendance</h3>
//               {userDetails.attendance.length > 0 ? (
//                 <ul>
//                   {userDetails.attendance.slice(0, 3).map((record, index) => (
//                     <li key={index}>
//                       <p><strong>{record.status}</strong> on {new Date(record.checkInStatus).toLocaleDateString()}</p>
//                       {record.checkOutStatus && (
//                         <p>Time spent: {Math.floor(record.timeSpent / 60)} hours {record.timeSpent % 60} minutes</p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No attendance records found</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className={styles.error}>No user details available</div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default UserList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import styles from './UserList.module.css';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const adminToken = Auth.getToken(); // Admin token for initial user list

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//           {
//             headers: { Authorization: `Bearer ${adminToken}` }
//           }
//         );
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('Error fetching users:', err);
//       }
//     };

//     fetchUsers();
//   }, [adminToken]);

//   const fetchUserDetails = async (user) => {
//     setDetailsLoading(true);
//     try {
//       // First, get the user's token by logging in as them (this assumes you have an endpoint for this)
//       const loginResponse = await axios.post(
//         'http://209.74.89.83/erpbackend/login',
//         {
//           employeeId: user.employeeId,
//           password: 'default_password' // You might need to handle this differently
//         }
//       );
      
//       const userToken = loginResponse.data.token;
      
//       // Then fetch the user details with their own token
//       const detailsResponse = await axios.get(
//         `http://209.74.89.83/erpbackend/get-user-detail`,
//         {
//           headers: { Authorization: `Bearer ${userToken}` }
//         }
//       );
      
//       setUserDetails(detailsResponse.data.users);
//       setModalIsOpen(true);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//       setError('Failed to load user details');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleNameClick = (user) => {
//     setSelectedUser(user);
//     fetchUserDetails(user);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setUserDetails(null);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading user data...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>User Details</h2>
//       <div className={styles.tableContainer}>
//         <div className={styles.scrollableTable}> 
//           <table className={styles.userTable}>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Display Name</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>State</th>
//                 <th>Pincode</th>
//                 <th>Languages</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.employeeId}</td>
//                   <td>
//                     <button 
//                       className={styles.nameButton} 
//                       onClick={() => handleNameClick(user)}
//                     >
//                       {user.username}
//                     </button>
//                   </td>
//                   <td>{user.displayName}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role ? user.role : "NA"}</td>
//                   <td>{user.contact.phone}</td>
//                   <td>{user.contact.emailId}</td>
//                   <td>{user.address.country}</td>
//                   <td>{user.address.state}</td>
//                   <td>{user.address.pincode}</td>
//                   <td>{user.language.join(', ')}</td>
//                   <td>{new Date(user.createdAt).toLocaleString()}</td>
//                   <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={styles.modal}
//         overlayClassName={styles.overlay}
//       >
//         {detailsLoading ? (
//           <div className={styles.loading}>Loading user details...</div>
//         ) : userDetails ? (
//           <div className={styles.userDetails}>
//             <h2>{userDetails.username}'s Personal Dashboard</h2>
//             <button className={styles.closeButton} onClick={closeModal}>×</button>
            
//             <div className={styles.detailsSection}>
//               <h3>Basic Information</h3>
//               <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
//               <p><strong>Role:</strong> {userDetails.role}</p>
//               <p><strong>Gender:</strong> {userDetails.gender}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Contact Information</h3>
//               <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
//               <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
//               <p><strong>Languages:</strong> {userDetails.language.join(', ')}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Leave Balance</h3>
//               <div className={styles.leaveBalance}>
//                 <div>
//                   <h4>Casual Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.casualLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.casualLeaves.booked}</p>
//                 </div>
//                 <div>
//                   <h4>Sick Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.sickLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.sickLeaves.booked}</p>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Leaves</h3>
//               {userDetails.userLeaves.length > 0 ? (
//                 <div className={styles.leaveList}>
//                   {userDetails.userLeaves.slice(0, 5).map((leave, index) => (
//                     <div key={index} className={styles.leaveItem}>
//                       <p><strong>{leave.leaveType}</strong></p>
//                       <p>From: {new Date(leave.from).toLocaleDateString()}</p>
//                       <p>To: {new Date(leave.to).toLocaleDateString()}</p>
//                       <p>Status: <span className={leave.state === 'Completed' ? styles.completed : 
//                                               leave.state === 'Rejected' ? styles.rejected : styles.pending}>
//                           {leave.state}
//                         </span>
//                       </p>
//                       {leave.remarks && <p>Remarks: {leave.remarks}</p>}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No leave records found</p>
//               )}
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Attendance</h3>
//               {userDetails.attendance.length > 0 ? (
//                 <div className={styles.attendanceList}>
//                   {userDetails.attendance.slice(0, 5).map((record, index) => (
//                     <div key={index} className={styles.attendanceItem}>
//                       <p><strong>{record.status}</strong></p>
//                       <p>Date: {new Date(record.checkInStatus).toLocaleDateString()}</p>
//                       <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
//                       {record.checkOutStatus && (
//                         <>
//                           <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
//                           <p>Time spent: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No attendance records found</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className={styles.error}>No user details available</div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default UserList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import styles from './UserList.module.css';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   const adminToken = Auth.getToken();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//           {
//             headers: { Authorization: `Bearer ${adminToken}` },
//           }
//         );
//         setUsers(response.data.users);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         setError('Failed to fetch users.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [adminToken]);

//   const fetchUserDetails = async (user) => {
//     setDetailsLoading(true);
//     try {
//       // Step 1: Login as the user
//       const loginResponse = await axios.post(
//         'http://209.74.89.83/erpbackend/log-in',
//         {
//           emailId: user.contact.emailId,
//           password: '123456', // Caution: Hardcoded password
//         }
//       );

//       const userToken = loginResponse.data.token;

//       // Step 2: Fetch user details
//       const detailsResponse = await axios.get(
//         'http://209.74.89.83/erpbackend/get-user-detail',
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );

//       setUserDetails(detailsResponse.data.users);
//       setModalIsOpen(true);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//       setError('Failed to load user details.');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleNameClick = (user) => {
//     setSelectedUser(user);
//     fetchUserDetails(user);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setUserDetails(null);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading user data...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>User Details</h2>
//       <div className={styles.tableContainer}>
//         <div className={styles.scrollableTable}>
//           <table className={styles.userTable}>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Display Name</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>State</th>
//                 <th>Pincode</th>
//                 <th>Languages</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.employeeId}</td>
//                   <td>
//                     <button
//                       className={styles.nameButton}
//                       onClick={() => handleNameClick(user)}
//                     >
//                       {user.username}
//                     </button>
//                   </td>
//                   <td>{user.displayName}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role || 'NA'}</td>
//                   <td>{user.contact.phone}</td>
//                   <td>{user.contact.emailId}</td>
//                   <td>{user.address.country}</td>
//                   <td>{user.address.state}</td>
//                   <td>{user.address.pincode}</td>
//                   <td>{user.language.join(', ')}</td>
//                   <td>{new Date(user.createdAt).toLocaleString()}</td>
//                   <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={styles.modal}
//         overlayClassName={styles.overlay}
//       >
//         {detailsLoading ? (
//           <div className={styles.loading}>Loading user details...</div>
//         ) : userDetails ? (
//           <div className={styles.userDetails}>
//             <h2>{userDetails.username}'s Personal Dashboard</h2>
//             <button className={styles.closeButton} onClick={closeModal}>
//               ×
//             </button>

//             <div className={styles.detailsSection}>
//               <h3>Basic Information</h3>
//               <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
//               <p><strong>Role:</strong> {userDetails.role}</p>
//               <p><strong>Gender:</strong> {userDetails.gender}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Contact Information</h3>
//               <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
//               <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
//               <p><strong>Languages:</strong> {userDetails.language.join(', ')}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Leave Balance</h3>
//               <div className={styles.leaveBalance}>
//                 <div>
//                   <h4>Casual Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.casualLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.casualLeaves.booked}</p>
//                 </div>
//                 <div>
//                   <h4>Sick Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.sickLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.sickLeaves.booked}</p>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Leaves</h3>
//               {userDetails.userLeaves.length > 0 ? (
//                 <div className={styles.leaveList}>
//                   {userDetails.userLeaves.slice(0, 5).map((leave, index) => (
//                     <div key={index} className={styles.leaveItem}>
//                       <p><strong>{leave.leaveType}</strong></p>
//                       <p>From: {new Date(leave.from).toLocaleDateString()}</p>
//                       <p>To: {new Date(leave.to).toLocaleDateString()}</p>
//                       <p>Status: <span className={
//                         leave.state === 'Completed' ? styles.completed :
//                         leave.state === 'Rejected' ? styles.rejected : styles.pending
//                       }>{leave.state}</span></p>
//                       {leave.remarks && <p>Remarks: {leave.remarks}</p>}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No leave records found</p>
//               )}
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Attendance</h3>
//               {userDetails.attendance.length > 0 ? (
//                 <div className={styles.attendanceList}>
//                   {userDetails.attendance.slice(0, 5).map((record, index) => (
//                     <div key={index} className={styles.attendanceItem}>
//                       <p><strong>{record.status}</strong></p>
//                       <p>Date: {new Date(record.checkInStatus).toLocaleDateString()}</p>
//                       <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
//                       {record.checkOutStatus && (
//                         <>
//                           <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
//                           <p>Time spent: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No attendance records found</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className={styles.error}>No user details available</div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default UserList;



 // working but with login


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import styles from './UserList.module.css';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const adminToken = Auth.getToken();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//           {
//             headers: { Authorization: `Bearer ${adminToken}` }
//           }
//         );
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('Error fetching users:', err);
//       }
//     };

//     fetchUsers();
//   }, [adminToken]);

//   const fetchUserDetails = async (user) => {
//     setDetailsLoading(true);
//     try {
//       const email = user?.contact?.emailId;

//       if (!email) {
//         throw new Error('No email found for selected user.');
//       }

//       console.log('Logging in with email:', email);

//       const loginResponse = await axios.post(
//         'http://209.74.89.83/erpbackend/log-in',
//         {
//           emailId: email,
//           password: '1234567'
//         }
//       );

//       const userToken = loginResponse.data.token;

//       const detailsResponse = await axios.get(
//         'http://209.74.89.83/erpbackend/get-user-detail',
//         {
//           headers: { Authorization: `Bearer ${userToken}` }
//         }
//       );

//       setUserDetails(detailsResponse.data.users);
//       setModalIsOpen(true);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//       setError(err.response?.data?.message || 'Failed to load user details.');
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleNameClick = (user) => {
//     setSelectedUser(user);
//     fetchUserDetails(user);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setUserDetails(null);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading user data...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>User Details</h2>
//       <div className={styles.tableContainer}>
//         <div className={styles.scrollableTable}>
//           <table className={styles.userTable}>
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Display Name</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>State</th>
//                 <th>Pincode</th>
//                 <th>Languages</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.employeeId}</td>
//                   <td>
//                     <button
//                       className={styles.nameButton}
//                       onClick={() => handleNameClick(user)}
//                     >
//                       {user.username}
//                     </button>
//                   </td>
//                   <td>{user.displayName}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role ? user.role : 'NA'}</td>
//                   <td>{user.contact?.phone}</td>
//                   <td>{user.contact?.emailId}</td>
//                   <td>{user.address?.country}</td>
//                   <td>{user.address?.state}</td>
//                   <td>{user.address?.pincode}</td>
//                   <td>{user.language?.join(', ')}</td>
//                   <td>{new Date(user.createdAt).toLocaleString()}</td>
//                   <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={styles.modal}
//         overlayClassName={styles.overlay}
//       >
//         {detailsLoading ? (
//           <div className={styles.loading}>Loading user details...</div>
//         ) : userDetails ? (
//           <div className={styles.userDetails}>
//             <h2>{userDetails.username}'s Personal Dashboard</h2>
//             <button className={styles.closeButton} onClick={closeModal}>×</button>

//             <div className={styles.detailsSection}>
//               <h3>Basic Information</h3>
//               <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
//               <p><strong>Role:</strong> {userDetails.role}</p>
//               <p><strong>Gender:</strong> {userDetails.gender}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Contact Information</h3>
//               <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
//               <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
//               <p><strong>Languages:</strong> {userDetails.language.join(', ')}</p>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Leave Balance</h3>
//               <div className={styles.leaveBalance}>
//                 <div>
//                   <h4>Casual Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.casualLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.casualLeaves.booked}</p>
//                 </div>
//                 <div>
//                   <h4>Sick Leaves</h4>
//                   <p>Available: {userDetails.leaveBalance.sickLeaves.available}</p>
//                   <p>Booked: {userDetails.leaveBalance.sickLeaves.booked}</p>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Leaves</h3>
//               {userDetails.userLeaves.length > 0 ? (
//                 <div className={styles.leaveList}>
//                   {userDetails.userLeaves.slice(0, 5).map((leave, index) => (
//                     <div key={index} className={styles.leaveItem}>
//                       <p><strong>{leave.leaveType}</strong></p>
//                       <p>From: {new Date(leave.from).toLocaleDateString()}</p>
//                       <p>To: {new Date(leave.to).toLocaleDateString()}</p>
//                       <p>Status: <span className={
//                         leave.state === 'Completed' ? styles.completed :
//                         leave.state === 'Rejected' ? styles.rejected : styles.pending
//                       }>
//                         {leave.state}
//                       </span></p>
//                       {leave.remarks && <p>Remarks: {leave.remarks}</p>}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No leave records found</p>
//               )}
//             </div>

//             <div className={styles.detailsSection}>
//               <h3>Recent Attendance</h3>
//               {userDetails.attendance.length > 0 ? (
//                 <div className={styles.attendanceList}>
//                   {userDetails.attendance.slice(0, 5).map((record, index) => (
//                     <div key={index} className={styles.attendanceItem}>
//                       <p><strong>{record.status}</strong></p>
//                       <p>Date: {new Date(record.checkInStatus).toLocaleDateString()}</p>
//                       <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
//                       {record.checkOutStatus && (
//                         <>
//                           <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
//                           <p>Time spent: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No attendance records found</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className={styles.error}>No user details available</div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './UserList.module.css';
import Modal from 'react-modal';

// Set the root element for accessibility
Modal.setAppElement('#root');

const UserList = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [password, setPassword] = useState(''); // For secure password input
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Get admin token
  const adminToken = Auth.getToken();

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
          {
            headers: { Authorization: `Bearer ${adminToken}` }
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
  }, [adminToken]);

  // Fetch detailed user information
  const fetchUserDetails = async (user, userPassword) => {
    setDetailsLoading(true);
    setError(null);
    
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
  if (loading) {
    return <div className={styles.loading}>Loading user data...</div>;
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