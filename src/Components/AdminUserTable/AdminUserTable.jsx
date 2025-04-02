// import React, { useState } from "react";
// import styles from "./AdminUserTable.module.css";

// const AdminUserTable = () => {
//   const users = Array.from({ length: 50 }, (_, i) => ({
//     username: `User ${i + 1}`,
//     emailId: `user${i + 1}@example.com`,
//     phone: `123456789${i % 10}`,
//     password: "********",
//     confirmPassword: "********",
//     displayName: `User ${i + 1}`,
//     gender: i % 2 === 0 ? "Male" : "Female",
//     country: "Country",
//     state: "State",
//     pincode: "123456",
//     language: "English",
//     role: "User",
//   }));

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(users.length / usersPerPage);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Admin User Table</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Display Name</th>
//             <th>Gender</th>
//             <th>Country</th>
//             <th>State</th>
//             <th>Pincode</th>
//             <th>Language</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user, index) => (
//             <tr key={index}>
//               <td>{user.username}</td>
//               <td>{user.emailId}</td>
//               <td>{user.phone}</td>
//               <td>{user.displayName}</td>
//               <td>{user.gender}</td>
//               <td>{user.country}</td>
//               <td>{user.state}</td>
//               <td>{user.pincode}</td>
//               <td>{user.language}</td>
//               <td>{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className={styles.pagination}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminUserTable;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../Services/Auth";
import styles from "./AdminUserTable.module.css";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://209.74.89.83/erpbackend/get-user-detail-for-admin",
          {
            headers: Auth.getAuthHeaders()
          }
        );

        // Check if response data is in expected format
        if (!Array.isArray(response.data)) {
          throw new Error("Unexpected API response structure");
        }

        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("API Error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate pagination values
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>User Management Dashboard</h2>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="10" className={styles.noData}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.pageNumber} ${
              currentPage === number ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
      
      <div className={styles.pageInfo}>
        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} entries
      </div>
    </div>
  );
};

export default AdminUserTable;