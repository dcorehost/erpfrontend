// import styles from './AdminUserTable.module.css';
// import React, { useState } from 'react';

// const AdminUserTable = () => {
//   // पूरा यूजर डेटा
//   const users = [
//     {
//       username: "राजेश_वर्मा",
//       emailId: "rajesh@example.com",
//       phone: "91-9876543210",
//       displayName: "राजेश वर्मा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "उत्तर प्रदेश",
//       pincode: "226001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "प्रिया_शर्मा",
//       emailId: "priya@example.com",
//       phone: "91-8765432109",
//       displayName: "प्रिया शर्मा",
//       gender: "महिला",
//       country: "भारत",
//       state: "महाराष्ट्र",
//       pincode: "400001",
//       language: "मराठी",
//       role: "यूजर"
//     },
//     {
//       username: "अमित_पटेल",
//       emailId: "amit@example.com",
//       phone: "91-7654321098",
//       displayName: "अमित पटेल",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "गुजरात",
//       pincode: "380001",
//       language: "गुजराती",
//       role: "मोडरेटर"
//     },
//     {
//       username: "नीता_सिंह",
//       emailId: "neeta@example.com",
//       phone: "91-6543210987",
//       displayName: "नीता सिंह",
//       gender: "महिला",
//       country: "भारत",
//       state: "बिहार",
//       pincode: "800001",
//       language: "हिंदी",
//       role: "यूजर"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     },
//     {
//       username: "संजय_मिश्रा",
//       emailId: "sanjay@example.com",
//       phone: "91-9432109876",
//       displayName: "संजय मिश्रा",
//       gender: "पुरुष",
//       country: "भारत",
//       state: "मध्य प्रदेश",
//       pincode: "462001",
//       language: "हिंदी",
//       role: "एडमिन"
//     }
//   ];

//   // पेजिनेशन लॉजिक (पहले जैसा)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(users.length / itemsPerPage);

//   // पेजिनेशन फंक्शन्स
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//   return (
//     <div>
//       <div className={styles.tableContainer}>
//         <table className={styles.usersTable}>
//           <thead>
//             <tr>
//               <th>UserName</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Display Name</th>
//               <th>Gender</th>
//               <th>Country</th>
//               <th>State</th>
//               <th>PineCode</th>
//               <th>Language</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.username}</td>
//                 <td>{user.emailId}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.displayName}</td>
//                 <td>{user.gender}</td>
//                 <td>{user.country}</td>
//                 <td>{user.state}</td>
//                 <td>{user.pincode}</td>
//                 <td>{user.language}</td>
//                 <td>{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* पेजिनेशन कंट्रोल्स (पहले जैसा ही) */}
//       <div className={styles.pagination}>
//         {/* ... पेजिनेशन बटन्स ... */}
//         <button 
//           onClick={prevPage} 
//           disabled={currentPage === 1}
//           className={styles.paginationButton}
//         >
//           पिछला
//         </button>
        
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//           <button
//             key={number}
//             onClick={() => paginate(number)}
//             className={`${styles.pageNumber} ${currentPage === number ? styles.active : ''}`}
//           >
//             {number}
//           </button>
//         ))}

// <button 
//           onClick={nextPage} 
//           disabled={currentPage === totalPages}
//           className={styles.paginationButton}
//         >
//           अगला
//         </button>

//         <select 
//           value={itemsPerPage}
//           onChange={(e) => {
//             setItemsPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//           className={styles.pageSizeSelect}
//         >
//           <option value="5">5 आइटम</option>
//           <option value="10">10 आइटम</option>
//           <option value="20">20 आइटम</option>
//         </select>
//       </div>


      
//     </div>
//   );
// };

// export default AdminUserTable;

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

  // const handleUpdate = async () => {
  //   try {
  //     const token = Auth.getToken();
  //     const response = await axios.patch(
  //       'http://209.74.89.83/erpbackend/update-user', // Update with your actual endpoint
  //       editUser,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     if (response.status === 200) {
  //       setUsers(users.map(user => 
  //         user.employeeId === editingId ? { ...editUser } : user
  //       ));
  //       setEditingId(null);
  //       setError('');
  //     }
  //   } catch (err) {
  //     setError('Failed to update user. Please try again.');
  //     console.error('Update error:', err);
  //   }
  // };

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