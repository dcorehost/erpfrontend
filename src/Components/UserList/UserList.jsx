
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Auth from '../../Components/Services/Auth';
// // import styles from './UserList.module.css';
// // import Modal from 'react-modal';
// // import Loader from '../Loader/Loader';



// // Modal.setAppElement('#root');

// // const UserList = () => {

// //   // State management
  
// //   const [loader, setLoader] = useState(false);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [userDetails, setUserDetails] = useState(null);
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [detailsLoading, setDetailsLoading] = useState(false);
// //   const [password, setPassword] = useState(''); 
// //   const [showPasswordInput, setShowPasswordInput] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   // Get admin token
// //   const adminToken = Auth.getToken();

// //   // Fetch all users on component mount
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       setLoader(true);

// //       try {
// //         const response = await axios.get(
// //           'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
// //           {
// //             headers: { Authorization: `Bearer ${adminToken}` }
// //           }
// //         );
// //         setUsers(response.data.users);
// //         setLoading(false);
// //         setLoader(false);

// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //         setLoader(false);
// //         console.error('Error fetching users:', err);
// //       }
// //     };

// //     fetchUsers();
// //   }, [adminToken]);

// //   // Fetch detailed user information
// //   const fetchUserDetails = async (user, userPassword) => {
// //     setDetailsLoading(true);
// //     setError(null);
// //     setLoader(true);
    
// //     try {
// //       // 1. Login as the user to get their token
// //       const loginResponse = await axios.post(
// //         'http://209.74.89.83/erpbackend/log-in',
// //         {
// //           emailId: user.contact.emailId,
// //           password: userPassword
// //         }
// //       );

// //       const userToken = loginResponse.data.token;
      
// //       // 2. Fetch user details with their token
// //       const detailsResponse = await axios.get(
// //         'http://209.74.89.83/erpbackend/get-user-detail',
// //         {
// //           headers: { Authorization: `Bearer ${userToken}` }
// //         }
// //       );
      
// //       setUserDetails(detailsResponse.data.users);
// //       setModalIsOpen(true);
// //       setShowPasswordInput(false);
// //     } catch (err) {
// //       console.error('Error fetching user details:', err);
// //       setError(err.response?.data?.message || 'Failed to load user details. Please check the password and try again.');
// //       setShowPasswordInput(true); // Show password input again if failed
// //     } finally {
// //       setDetailsLoading(false);
// //     }
// //   };

// //   // Handle clicking on user name
// //   const handleNameClick = (user) => {
// //     setSelectedUser(user);
// //     setShowPasswordInput(true);
// //   };

// //   // Handle password submission
// //   const handlePasswordSubmit = (e) => {
// //     e.preventDefault();
// //     if (selectedUser && password) {
// //       fetchUserDetails(selectedUser, password);
// //     }
// //   };

// //   // Close modal
// //   const closeModal = () => {
// //     setModalIsOpen(false);
// //     setUserDetails(null);
// //     setError(null);
// //     setPassword('');
// //     setShowPasswordInput(false);
// //   };

// //   // Loading state
 
// //   if (loader) {
// //     return <Loader />;
// //   }

// //   // Error state
// //   if (error && !modalIsOpen) {
// //     return <div className={styles.error}>Error: {error}</div>;
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <h2 className={styles.title}>User Management</h2>
// //       <div className={styles.tableContainer}>
// //         <div className={styles.scrollableTable}> 
// //           <table className={styles.userTable}>
// //             <thead>
// //               <tr>
// //                 <th>Employee ID</th>
// //                 <th>Name</th>
// //                 <th>Role</th>
// //                 <th>Email</th>
// //                 <th>Phone</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.map((user, index) => (
// //                 <tr key={index}>
// //                   <td>{user.employeeId}</td>
// //                   <td>
// //                     <button 
// //                       className={styles.nameButton} 
// //                       onClick={() => handleNameClick(user)}
// //                     >
// //                       {user.username}
// //                     </button>
// //                   </td>
// //                   <td>{user.role || "NA"}</td>
// //                   <td>{user.contact.emailId}</td>
// //                   <td>{user.contact.phone}</td>
// //                   <td>
// //                     <button 
// //                       className={styles.viewButton}
// //                       onClick={() => handleNameClick(user)}
// //                     >
// //                       View Details
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Password Input Modal */}
// //       <Modal
// //         isOpen={showPasswordInput}
// //         onRequestClose={() => setShowPasswordInput(false)}
// //         className={styles.modal}
// //         overlayClassName={styles.overlay}
// //       >
// //         <div className={styles.passwordModal}>
// //           <h3>Enter Password for {selectedUser?.username}</h3>
// //           <form onSubmit={handlePasswordSubmit}>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Enter user's password"
// //               required
// //               className={styles.passwordInput}
// //             />
// //             {error && <div className={styles.error}>{error}</div>}
// //             <div className={styles.buttonGroup}>
// //               <button type="submit" className={styles.submitButton}>
// //                 {detailsLoading ? 'Loading...' : 'Submit'}
// //               </button>
// //               <button 
// //                 type="button" 
// //                 onClick={() => setShowPasswordInput(false)}
// //                 className={styles.cancelButton}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </Modal>

// //       {/* User Details Modal */}
// //       <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={closeModal}
// //         className={styles.modal}
// //         overlayClassName={styles.overlay}
// //       >
// //         {detailsLoading ? (
// //           <div className={styles.loading}>Loading user details...</div>
// //         ) : error ? (
// //           <div className={styles.error}>
// //             <h3>Error</h3>
// //             <p>{error}</p>
// //             <button onClick={closeModal} className={styles.closeButton}>
// //               Close
// //             </button>
// //           </div>
// //         ) : userDetails ? (
// //           <div className={styles.userDetails}>
// //             <div className={styles.modalHeader}>
// //               <h2>{userDetails.username}'s Dashboard</h2>
// //               <button className={styles.closeButton} onClick={closeModal}>×</button>
// //             </div>
            
// //             <div className={styles.detailsGrid}>
// //               {/* Basic Information */}
// //               <div className={styles.detailsSection}>
// //                 <h3>Basic Information</h3>
// //                 <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
// //                 <p><strong>Role:</strong> {userDetails.role}</p>
// //                 <p><strong>Gender:</strong> {userDetails.gender}</p>
// //                 <p><strong>Created:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
// //               </div>

// //               {/* Contact Information */}
// //               <div className={styles.detailsSection}>
// //                 <h3>Contact Information</h3>
// //                 <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
// //                 <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
// //                 <p><strong>Languages:</strong> {userDetails.language?.join(', ') || 'None'}</p>
// //               </div>

// //               {/* Leave Balance */}
// //               <div className={styles.detailsSection}>
// //                 <h3>Leave Balance</h3>
// //                 <div className={styles.leaveBalance}>
// //                   <div className={styles.leaveType}>
// //                     <h4>Casual Leaves</h4>
// //                     <p>Available: {userDetails.leaveBalance?.casualLeaves?.available || 0}</p>
// //                     <p>Booked: {userDetails.leaveBalance?.casualLeaves?.booked || 0}</p>
// //                   </div>
// //                   <div className={styles.leaveType}>
// //                     <h4>Sick Leaves</h4>
// //                     <p>Available: {userDetails.leaveBalance?.sickLeaves?.available || 0}</p>
// //                     <p>Booked: {userDetails.leaveBalance?.sickLeaves?.booked || 0}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Recent Leaves */}
// //               <div className={styles.detailsSection}>
// //                 <h3>Recent Leaves (Last 3)</h3>
// //                 {userDetails.userLeaves?.length > 0 ? (
// //                   <div className={styles.leaveList}>
// //                     {userDetails.userLeaves.slice(0, 3).map((leave, index) => (
// //                       <div key={index} className={`${styles.leaveItem} ${styles[leave.state.toLowerCase()]}`}>
// //                         <p><strong>{leave.leaveType}</strong></p>
// //                         <p>{new Date(leave.from).toLocaleDateString()} to {new Date(leave.to).toLocaleDateString()}</p>
// //                         <p>Status: {leave.state}</p>
// //                         {leave.remarks && <p>Remarks: {leave.remarks}</p>}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p>No leave records found</p>
// //                 )}
// //               </div>

// //               {/* Recent Attendance */}
// //               <div className={styles.detailsSection}>
// //                 <h3>Recent Attendance (Last 3)</h3>
// //                 {userDetails.attendance?.length > 0 ? (
// //                   <div className={styles.attendanceList}>
// //                     {userDetails.attendance.slice(0, 3).map((record, index) => (
// //                       <div key={index} className={styles.attendanceItem}>
// //                         <p><strong>{record.status}</strong> on {new Date(record.checkInStatus).toLocaleDateString()}</p>
// //                         <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
// //                         {record.checkOutStatus && (
// //                           <>
// //                             <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
// //                             <p>Duration: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
// //                           </>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p>No attendance records found</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className={styles.error}>No user details available</div>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default UserList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './UserList.module.css';
import Modal from 'react-modal';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

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

  const navigate = useNavigate(); // Initialize useNavigate hook

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
  const fetchUserDetails = async (user) => {
    setDetailsLoading(true);
    setLoader(true);
    setError(null);
    setUserDetails(null);

    try {
      const detailsResponse = await axios.get(
        `http://209.74.89.83/erpbackend/get-users-by-id?_id=${user._id}`, // Using user._id as the query parameter
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );
      // Assuming the response structure is similar and contains the user details directly
      setUserDetails(detailsResponse.data.users);
      setModalIsOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError(err.response?.data?.message || 'Failed to load user details.');
    } finally {
      setDetailsLoading(false);
      setLoader(false);
    }
  };

  // Handle clicking on user name or "View Details" button
  const handleViewDetailsClick = (user) => {
    fetchUserDetails(user);
  };

  // Handle "Login as User" button click
  const handleLoginAsUser = async (user) => {
    setLoader(true); // Show loader while impersonating
    try {
      const response = await axios.post(
        'http://209.74.89.83/erpbackend/admin-login-as-user', // Your new backend endpoint
        { userId: user._id, emailId: user.contact.emailId }, // Send data needed by backend
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );

      const userToken = response.data.token;
      if (userToken) {
        Auth.setToken(userToken); // Store the user's token
        Auth.setRole(response.data.role); // Store the user's role if available from response

        // Redirect to the user's dashboard or main page
        navigate('/user-dashboard'); // Replace with your actual user dashboard route
      } else {
        setError('Failed to get user token for impersonation.');
      }
    } catch (err) {
      console.error('Error logging in as user:', err);
      setError(err.response?.data?.message || 'Failed to login as user. Check backend setup.');
    } finally {
      setLoader(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setUserDetails(null);
    setError(null);
  };

  // Loading state for initial user list fetch
  if (loader && !modalIsOpen) {
    return <Loader />;
  }

  // Error state for initial user list fetch
  if (error && !modalIsOpen && !loading) {
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
                      onClick={() => handleViewDetailsClick(user)}
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
                      onClick={() => handleViewDetailsClick(user)}
                    >
                      View Details
                    </button>
                    <button
                      className={styles.loginAsUserButton}
                      onClick={() => handleLoginAsUser(user)}
                      disabled={loader}
                    >
                      Login as User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

              {/* NEW: Recent Tasks */}
              <div className={styles.detailsSection}>
                <h3>Recent Tasks (Last 3)</h3>
                {userDetails.tasks?.length > 0 ? (
                  <div className={styles.taskList}> {/* You'll need to define taskList and taskItem in CSS */}
                    {userDetails.tasks.slice(0, 3).map((task, index) => (
                      <div key={index} className={`${styles.taskItem} ${styles[task.status?.toLowerCase()]}`}>
                        <p><strong>{task.title}</strong></p>
                        <p>Project: {task.project || 'N/A'}</p>
                        <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                        <p>Status: {task.status}</p>
                        {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No task records found</p>
                )}
              </div>

            </div> {/* End detailsGrid */}
          </div>
        ) : (
          <div className={styles.error}>No user details available</div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth'; // Make sure this path is correct
// import styles from './UserList.module.css'; // Your CSS module
// import Modal from 'react-modal'; // For the modal popups
// import Loader from '../Loader/Loader'; // Your Loader component
// import { useNavigate } from 'react-router-dom'; // For redirection after "Login as User"

// // Set the app element for react-modal (important for accessibility)
// Modal.setAppElement('#root'); // Assuming your root div in public/index.html has id="root"

// const UserList = () => {
//     // State management for various UI elements and data
//     const [loader, setLoader] = useState(false); // For full page loading
//     const [users, setUsers] = useState([]); // List of users fetched from API
//     const [loading, setLoading] = useState(true); // Initial loading state for users list
//     const [error, setError] = useState(null); // To display general errors
//     const [userDetails, setUserDetails] = useState(null); // Details of a specific user for the modal
//     const [modalIsOpen, setModalIsOpen] = useState(false); // Controls visibility of the user details modal
//     const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for user details modal content

//     const navigate = useNavigate(); // Initialize the navigate hook for programmatic redirection

//     // Get the admin token from your Auth service
//     const adminToken = Auth.getToken();

//     // --- Fetch all users on component mount ---
//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoader(true); // Show loader while fetching initial user list

//             try {
//                 const response = await axios.get(
//                     'http://209.74.89.83/erpbackend/get-user-prsnl-detail-for-admin',
//                     {
//                         headers: { Authorization: `Bearer ${adminToken}` } // Send admin token
//                     }
//                 );
//                 setUsers(response.data.users); // Set the fetched users
//                 setLoading(false); // Stop initial loading
//                 setLoader(false); // Hide full page loader
//             } catch (err) {
//                 setError(err.message); // Set error message
//                 setLoading(false); // Stop initial loading
//                 setLoader(false); // Hide full page loader
//                 console.error('Error fetching users:', err); // Log the error
//             }
//         };

//         fetchUsers();
//     }, [adminToken]); // Re-run if adminToken changes

//     // --- Fetch detailed user information for the modal ---
//     const fetchUserDetails = async (user) => {
//         setDetailsLoading(true); // Show loading inside the modal
//         setLoader(true); // Show overall loader as well, for consistency
//         setError(null); // Clear any previous errors
//         setUserDetails(null); // Clear previous user details

//         try {
//             const detailsResponse = await axios.get(
//                 `http://209.74.89.83/erpbackend/get-users-by-id?_id=${user._id}`, // API endpoint to get user details by ID
//                 {
//                     headers: { Authorization: `Bearer ${adminToken}` } // Admin token is used here
//                 }
//             );
//             setUserDetails(detailsResponse.data.users); // Set the detailed user data
//             setModalIsOpen(true); // Open the details modal
//         } catch (err) {
//             console.error('Error fetching user details:', err);
//             setError(err.response?.data?.message || 'Failed to load user details.'); // Display error in modal
//         } finally {
//             setDetailsLoading(false); // Hide modal loading
//             setLoader(false); // Hide overall loader
//         }
//     };

//     // --- Handle "Login as User" button click ---
//     const handleLoginAsUser = async (user) => {
//         setLoader(true); // Show loader while impersonating

//         try {
//             // Make an API call to your backend to get the impersonated user's token
//             const response = await axios.post(
//                 'http://209.74.89.83/erpbackend/admin-login-as-user', // This is the new backend endpoint you need to create
//                 { userId: user._id, emailId: user.contact.emailId }, // Send data required by your backend
//                 {
//                     headers: { Authorization: `Bearer ${adminToken}` } // Admin's token is sent for authorization
//                 }
//             );

//             const userToken = response.data.token; // Get the new token for the impersonated user
//             const userRole = response.data.role; // Get the role of the impersonated user

//             if (userToken) {
//                 Auth.setToken(userToken); // Store the user's token in local storage/cookies via Auth service
//                 Auth.setRole(userRole);   // Store the user's role

//                 // Redirect to the user's dashboard or main page
//                 navigate('/user-dashboard'); // IMPORTANT: Replace with your actual user dashboard route (e.g., '/dashboard', '/profile')
//             } else {
//                 setError('Failed to get user token for impersonation.');
//             }
//         } catch (err) {
//             console.error('Error logging in as user:', err);
//             setError(err.response?.data?.message || 'Failed to login as user. Check backend setup.');
//         } finally {
//             setLoader(false); // Hide loader
//         }
//     };

//     // --- Close modal function ---
//     const closeModal = () => {
//         setModalIsOpen(false);
//         setUserDetails(null); // Clear details when modal closes
//         setError(null);      // Clear errors
//     };

//     // --- Conditional Rendering for Loader and Initial Error ---
//     if (loader && !modalIsOpen) { // Show full page loader if no modal is open
//         return <Loader />;
//     }

//     if (error && !modalIsOpen && !loading) { // Show general error if no modal is open and not loading
//         return <div className={styles.error}>Error: {error}</div>;
//     }

//     // --- Main Component Render ---
//     return (
//         <div className={styles.container}>
//             <h2 className={styles.title}>User Management</h2>
//             <div className={styles.tableContainer}>
//                 <div className={styles.scrollableTable}>
//                     <table className={styles.userTable}>
//                         <thead>
//                             <tr>
//                                 <th>Employee ID</th>
//                                 <th>Name</th>
//                                 <th>Role</th>
//                                 <th>Email</th>
//                                 <th>Phone</th>
//                                 <th>Actions</th> {/* Added Actions column */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Map through the users array to display each user */}
//                             {users.map((user, index) => (
//                                 <tr key={index}>
//                                     <td>{user.employeeId}</td>
//                                     <td>
//                                         <button
//                                             className={styles.nameButton}
//                                             onClick={() => fetchUserDetails(user)} // Click name to view details
//                                         >
//                                             {user.username}
//                                         </button>
//                                     </td>
//                                     <td>{user.role || "NA"}</td> {/* Display user's role */}
//                                     <td>{user.contact.emailId}</td>
//                                     <td>{user.contact.phone}</td>
//                                     <td>
//                                         {/* View Details button */}
//                                         <button
//                                             className={styles.viewButton}
//                                             onClick={() => fetchUserDetails(user)}
//                                         >
//                                             View Details
//                                         </button>
//                                         {/* Login as User button */}
//                                         <button
//                                             className={styles.loginAsUserButton} // Define this class in your CSS
//                                             onClick={() => handleLoginAsUser(user)}
//                                             disabled={loader} // Disable during any loading state
//                                         >
//                                             Login as User
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* --- User Details Modal --- */}
//             <Modal
//                 isOpen={modalIsOpen} // Control visibility
//                 onRequestClose={closeModal} // Close on escape or overlay click
//                 className={styles.modal} // Custom modal styles
//                 overlayClassName={styles.overlay} // Custom overlay styles
//             >
//                 {detailsLoading ? ( // Show loading inside modal if fetching details
//                     <div className={styles.loading}>Loading user details...</div>
//                 ) : error && userDetails === null ? ( // Show error if fetching failed and no details loaded
//                     <div className={styles.error}>
//                         <h3>Error</h3>
//                         <p>{error}</p>
//                         <button onClick={closeModal} className={styles.closeButton}>
//                             Close
//                         </button>
//                     </div>
//                 ) : userDetails ? ( // Display user details if available
//                     <div className={styles.userDetails}>
//                         <div className={styles.modalHeader}>
//                             <h2>{userDetails.username}'s Dashboard</h2>
//                             <button className={styles.closeButton} onClick={closeModal}>×</button>
//                         </div>

//                         <div className={styles.detailsGrid}>
//                             {/* Basic Information Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Basic Information</h3>
//                                 <p><strong>Employee ID:</strong> {userDetails.employeeId}</p>
//                                 <p><strong>Role:</strong> {userDetails.role}</p>
//                                 <p><strong>Gender:</strong> {userDetails.gender}</p>
//                                 <p><strong>Created:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
//                             </div>

//                             {/* Contact Information Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Contact Information</h3>
//                                 <p><strong>Email:</strong> {userDetails.contact.emailId}</p>
//                                 <p><strong>Phone:</strong> {userDetails.contact.phone}</p>
//                                 <p><strong>Languages:</strong> {userDetails.language?.join(', ') || 'None'}</p>
//                             </div>

//                             {/* Leave Balance Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Leave Balance</h3>
//                                 <div className={styles.leaveBalance}>
//                                     <div className={styles.leaveType}>
//                                         <h4>Casual Leaves</h4>
//                                         <p>Available: {userDetails.leaveBalance?.casualLeaves?.available || 0}</p>
//                                         <p>Booked: {userDetails.leaveBalance?.casualLeaves?.booked || 0}</p>
//                                     </div>
//                                     <div className={styles.leaveType}>
//                                         <h4>Sick Leaves</h4>
//                                         <p>Available: {userDetails.leaveBalance?.sickLeaves?.available || 0}</p>
//                                         <p>Booked: {userDetails.leaveBalance?.sickLeaves?.booked || 0}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Recent Leaves Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Recent Leaves (Last 3)</h3>
//                                 {userDetails.userLeaves?.length > 0 ? (
//                                     <div className={styles.leaveList}>
//                                         {userDetails.userLeaves.slice(0, 3).map((leave, index) => (
//                                             <div key={index} className={`${styles.leaveItem} ${styles[leave.state.toLowerCase()]}`}>
//                                                 <p><strong>{leave.leaveType}</strong></p>
//                                                 <p>{new Date(leave.from).toLocaleDateString()} to {new Date(leave.to).toLocaleDateString()}</p>
//                                                 <p>Status: {leave.state}</p>
//                                                 {leave.remarks && <p>Remarks: {leave.remarks}</p>}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p>No leave records found</p>
//                                 )}
//                             </div>

//                             {/* Recent Attendance Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Recent Attendance (Last 3)</h3>
//                                 {userDetails.attendance?.length > 0 ? (
//                                     <div className={styles.attendanceList}>
//                                         {userDetails.attendance.slice(0, 3).map((record, index) => (
//                                             <div key={index} className={styles.attendanceItem}>
//                                                 <p><strong>{record.status}</strong> on {new Date(record.checkInStatus).toLocaleDateString()}</p>
//                                                 <p>Check-in: {new Date(record.checkInStatus).toLocaleTimeString()}</p>
//                                                 {record.checkOutStatus && (
//                                                     <>
//                                                         <p>Check-out: {new Date(record.checkOutStatus).toLocaleTimeString()}</p>
//                                                         <p>Duration: {Math.floor(record.timeSpent / 60)}h {record.timeSpent % 60}m</p>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p>No attendance records found</p>
//                                 )}
//                             </div>

//                             {/* Recent Tasks Section */}
//                             <div className={styles.detailsSection}>
//                                 <h3>Recent Tasks (Last 3)</h3>
//                                 {userDetails.tasks?.length > 0 ? (
//                                     <div className={styles.taskList}>
//                                         {userDetails.tasks.slice(0, 3).map((task, index) => (
//                                             <div key={index} className={`${styles.taskItem} ${styles[task.status?.toLowerCase()]}`}>
//                                                 <p><strong>{task.title}</strong></p>
//                                                 <p>Project: {task.project || 'N/A'}</p>
//                                                 <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
//                                                 <p>Status: {task.status}</p>
//                                                 {task.description && <p className={styles.taskDescription}>{task.description}</p>}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p>No task records found</p>
//                                 )}
//                             </div>

//                         </div> {/* End detailsGrid */}
//                     </div>
//                 ) : (
//                     <div className={styles.error}>No user details available</div> // Fallback if no details
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default UserList;