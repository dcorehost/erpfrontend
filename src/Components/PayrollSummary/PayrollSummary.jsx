// // import React, { useState, useEffect } from "react";
// // import styles from "./PayrollSummary.module.css";
// // import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// // import { FaCheck, FaTimes, FaRegCalendarAlt } from "react-icons/fa";
// // import Auth from "../Services/Auth";
// // import axios from "axios";

// // const PayrollSummary = () => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
// //   const [selectedLeave, setSelectedLeave] = useState(null);
// //   const [remarks, setRemarks] = useState("");
// //   const [leaveData, setLeaveData] = useState([]); // Changed to an array to hold multiple users' leaves
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const itemsPerPage = 5;

// //   const fetchPendingLeaves = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       const token = Auth.getToken();
// //       if (!token) {
// //         throw new Error("Please login to access this page");
// //       }

// //       const response = await axios.get("http://209.74.89.83/erpbackend/get-pending-leave-details", {
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //           "Content-Type": "application/json"
// //         }
// //       });

// //       if (!response.data.leaveDetails) {
// //         throw new Error("Failed to fetch leave details");
// //       }

// //       setLeaveData(response.data.leaveDetails); // Store all leave details
// //     } catch (err) {
// //       setError(err.message);
// //       if (err.message.includes("login") || err.message.includes("401")) {
// //         Auth.logout();
// //         window.location.href = "/login";
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPendingLeaves();
// //   }, []);

// //   const handleApprove = async (id, username) => { // Added username parameter
// //     try {
// //       const token = Auth.getToken();
// //       if (!token) {
// //         throw new Error("Please login to access this page");
// //       }
  
// //       const response = await axios.put(
// //         `http://209.74.89.83/erpbackend/approve-leaves?_id=${id}&action=approve`,
// //         {},
// //         {
// //           headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
  
// //       if (response.status === 200) {
// //         alert(`You have successfully approved leave for ${username}`); // Use username passed as parameter
// //         fetchPendingLeaves(); // Refresh leave data
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       if (err.message.includes("login") || err.message.includes("401")) {
// //         Auth.logout();
// //         window.location.href = "/login";
// //       }
// //     }
// //   };
  

// //   const handleRejectSubmit = async () => {
// //     try {
// //       const token = Auth.getToken();
// //       if (!token) {
// //         throw new Error("Please login to access this page");
// //       }
  
// //       const response = await axios.put(
// //         `http://209.74.89.83/erpbackend/approve-leaves?_id=${selectedLeave._id}&action=reject`,
// //         { remarks },
// //         {
// //           headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
  
// //       if (response.status === 200) {
// //         alert(`You have successfully rejected leave for ${selectedLeave.username}`); // Use selectedLeave's username
// //         fetchPendingLeaves(); // Refresh leave data
// //         setIsRejectPopupOpen(false);
// //         setRemarks("");
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       if (err.message.includes("login") || err.message.includes("401")) {
// //         Auth.logout();
// //         window.location.href = "/login";
// //       }
// //     }
// //   };
  

// //   const formatDate = (dateString) => {
// //     const options = { day: 'numeric', month: 'short', year: 'numeric' };
// //     return new Date(dateString).toLocaleDateString('en-US', options);
// //   };

// //   // Flatten the leaveData to display all user leaves
// //   const totalLeaves = leaveData.reduce((total, user) => total + user.userLeaves.length, 0);
// //   const totalPages = Math.ceil(totalLeaves / itemsPerPage);

// //   // Create a flattened array of leaves for pagination
// //   const currentItems = leaveData.flatMap(user => user.userLeaves).slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   if (loading) {
// //     return (
// //       <div className={styles.container}>
// //         <div className={styles.loading}>Loading leave requests...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className={styles.container}>
// //         <div className={styles.error}>
// //           {error}
// //           <button onClick={fetchPendingLeaves} className={styles.retryButton}>
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.header}>
// //         <h2>Pending Leave Requests</h2>
// //         <div className={styles.summary}>
// //           <span>Total Requests: {totalLeaves}</span>
// //           <span className={styles.pendingCount}>
// //             <FaRegCalendarAlt /> Pending: {totalLeaves}
// //           </span>
// //         </div>
// //       </div>

// //       <div className={styles.tableContainer}>
// //         <table className={styles.table}>
// //           <thead>
// //             <tr>
// //               <th>Employee</th>
// //               <th>Leave Dates</th>
// //               <th>Type</th>
// //               <th>Reason</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {currentItems.map((leave) => {
// //               const employee = leaveData.find(user => user.userLeaves.some(l => l._id === leave._id)); // Find employee data
// //               return (
// //                 <tr key={leave._id}>
// //                   <td>
// //                     <div className={styles.employeeInfo}>
// //                       <div className={styles.avatar}>
// //                         {employee.username.charAt(0).toUpperCase()}
// //                       </div>
// //                       <div>
// //                         <div className={styles.name}>{employee.username}</div>
// //                         <div className={styles.email}>{employee.contact?.emailId || 'N/A'}</div>
// //                         <div className={styles.userType}>{employee.typeOfUser}</div>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <div className={styles.dates}>
// //                       <div>{formatDate(leave.from)}</div>
// //                       <div className={styles.to}>to</div>
// //                       <div>{formatDate(leave.to)}</div>
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <span className={`${styles.leaveType} ${leave.leaveType === 'Sick Leave' ? styles.sickLeave : leave.leaveType === 'Casual Leave' ? styles.casualLeave : styles.otherLeave}`}>
// //                       {leave.leaveType}
// //                     </span>
// //                   </td>
// //                   <td className={styles.reason}>{leave.reason || '-'}</td>
// //                   <td>
// //                     <span className={`${styles.status} ${leave.state === 'Pending' ? styles.pending : leave.state === 'Approved' ? styles.approved : styles.rejected}`}>
// //                       {leave.state}
// //                     </span>
// //                   </td>
// //                   <td>
// //                     <div className={styles.actions}>
// //                       <button
// //                         className={styles.approveBtn}
// //                         onClick={() => handleApprove(leave._id, employee.username)} // Pass username
// //                         title="Approve"
// //                         disabled={leave.state !== 'Pending'}
// //                       >
// //                         <FaCheck />
// //                       </button>
// //                       <button
// //                         className={styles.rejectBtn}
// //                         onClick={() => {
// //                           setSelectedLeave(leave);
// //                           setIsRejectPopupOpen(true);
// //                         }}
// //                         title="Reject"
// //                         disabled={leave.state !== 'Pending'}
// //                       >
// //                         <FaTimes />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {totalPages > 1 && (
// //         <div className={styles.pagination}>
// //           <button
// //             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //             disabled={currentPage === 1}
// //             className={styles.paginationButton}
// //           >
// //             <FiChevronLeft />
// //           </button>
// //           <span>
// //             Page {currentPage} of {totalPages}
// //           </span>
// //           <button
// //             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //             disabled={currentPage === totalPages}
// //             className={styles.paginationButton}
// //           >
// //             <FiChevronRight />
// //           </button>
// //         </div>
// //       )}

// //       {isRejectPopupOpen && (
// //         <div className={styles.popupOverlay}>
// //           <div className={styles.popup}>
// //             <h3>Reject Leave Request</h3>
// //             <div className={styles.leaveDetails}>
// //               <div>
// //                 <strong>Employee:</strong> {selectedLeave.username} {/* Correctly reference username */}
// //               </div>
// //               <div>
// //                 <strong>Leave Type:</strong> {selectedLeave.leaveType}
// //               </div>
// //               <div>
// //                 <strong>Dates:</strong> {formatDate(selectedLeave.from)} to {formatDate(selectedLeave.to)}
// //               </div>
// //               <div>
// //                 <strong>Reason:</strong> {selectedLeave.reason || '-'}
// //               </div>
// //             </div>
// //             <div className={styles.remarksContainer}>
// //               <label htmlFor="remarks">Remarks (required):</label>
// //               <textarea
// //                 id="remarks"
// //                 placeholder="Enter rejection remarks..."
// //                 value={remarks}
// //                 onChange={(e) => setRemarks(e.target.value)}
// //                 className={styles.remarksTextarea}
// //                 rows={4}
// //                 required
// //               />
// //             </div>
// //             <div className={styles.popupActions}>
// //               <button
// //                 onClick={handleRejectSubmit}
// //                 className={styles.submitBtn}
// //                 disabled={!remarks.trim()}
// //               >
// //                 Confirm Rejection
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setIsRejectPopupOpen(false);
// //                   setRemarks("");
// //                 }}
// //                 className={styles.cancelBtn}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PayrollSummary;
  
// // import React from "react";
// // import styles from "./PayrollSummary.module.css"; // Changed file name

// // const PayrollSummary = () => {
// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.header}>
// //         <h2>Payroll Summary</h2>
// //         <div className={styles.summary}>
// //           <span>Month: June 2023</span>
// //           <span>Total Employees: 2</span>
// //         </div>
// //       </div>

// //       <div className={styles.tableContainer}>
// //         <table className={styles.table}>
// //           <thead>
// //             <tr>
// //               <th>Username</th>
// //               <th>Email</th>
// //               <th>Phone</th>
// //               <th>Employee ID</th>
// //               <th>Month</th>
// //               <th>Year</th>
// //               <th>Gross Salary</th>
// //               <th>Deductions</th>
// //               <th>Net Salary</th>
// //               <th>PF Amount</th>
// //               <th>Health Insurance</th>
// //               <th>Leave Amount</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {/* Static row 1 */}
// //             <tr>
// //               <td>john_doe</td>
// //               <td>john@example.com</td>
// //               <td>9876543210</td>
// //               <td>EMP001</td>
// //               <td>June</td>
// //               <td>2023</td>
// //               <td>₹50,000</td>
// //               <td>₹7,500</td>
// //               <td>₹42,500</td>
// //               <td>₹3,000</td>
// //               <td>₹2,500</td>
// //               <td>₹2,000</td>
// //             </tr>

// //             {/* Static row 2 */}
// //             <tr>
// //               <td>sarah_smith</td>
// //               <td>sarah@example.com</td>
// //               <td>8765432109</td>
// //               <td>EMP002</td>
// //               <td>June</td>
// //               <td>2023</td>
// //               <td>₹65,000</td>
// //               <td>₹9,750</td>
// //               <td>₹55,250</td>
// //               <td>₹3,900</td>
// //               <td>₹3,500</td>
// //               <td>₹2,350</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PayrollSummary;


// import React, { useState } from "react";
// import styles from "./PayrollSummary.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const PayrollSummary = () => {
//   // Static payroll data
//   const payrollData = [
//     {
//       username: "john_doe",
//       email: "john@example.com",
//       phone: "9876543210",
//       employeeId: "EMP001",
//       month: "June",
//       year: "2023",
//       grossSalary: "₹50,000",
//       deductions: "₹7,500",
//       netSalary: "₹42,500",
//       pfAmount: "₹3,000",
//       healthInsuranceAmount: "₹2,500",
//       leaveAmount: "₹2,000"
//     },
//     {
//       username: "sarah_smith",
//       email: "sarah@example.com",
//       phone: "8765432109",
//       employeeId: "EMP002",
//       month: "June",
//       year: "2023",
//       grossSalary: "₹65,000",
//       deductions: "₹9,750",
//       netSalary: "₹55,250",
//       pfAmount: "₹3,900",
//       healthInsuranceAmount: "₹3,500",
//       leaveAmount: "₹2,350"
//     },
//     {
//       username: "mike_johnson",
//       email: "mike@example.com",
//       phone: "7654321098",
//       employeeId: "EMP003",
//       month: "June",
//       year: "2023",
//       grossSalary: "₹45,000",
//       deductions: "₹6,750",
//       netSalary: "₹38,250",
//       pfAmount: "₹2,700",
//       healthInsuranceAmount: "₹2,300",
//       leaveAmount: "₹1,750"
//     },
//     {
//       username: "emma_wilson",
//       email: "emma@example.com",
//       phone: "6543210987",
//       employeeId: "EMP004",
//       month: "June",
//       year: "2023",
//       grossSalary: "₹55,000",
//       deductions: "₹8,250",
//       netSalary: "₹46,750",
//       pfAmount: "₹3,300",
//       healthInsuranceAmount: "₹2,800",
//       leaveAmount: "₹2,150"
//     },
//     {
//       username: "david_brown",
//       email: "david@example.com",
//       phone: "5432109876",
//       employeeId: "EMP005",
//       month: "June",
//       year: "2023",
//       grossSalary: "₹60,000",
//       deductions: "₹9,000",
//       netSalary: "₹51,000",
//       pfAmount: "₹3,600",
//       healthInsuranceAmount: "₹3,200",
//       leaveAmount: "₹2,200"
//     }
//   ];

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   // Calculate pagination values
//   const totalPages = Math.ceil(payrollData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = payrollData.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Payroll Summary</h2>
//         <div className={styles.summary}>
//           <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, payrollData.length)} of {payrollData.length} records</span>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Employee ID</th>
//               <th>Month</th>
//               <th>Year</th>
//               <th>Gross Salary</th>
//               <th>Deductions</th>
//               <th>Net Salary</th>
//               <th>PF Amount</th>
//               <th>Health Insurance</th>
//               <th>Leave Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((employee, index) => (
//               <tr key={index}>
//                 <td>{employee.username}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.phone}</td>
//                 <td>{employee.employeeId}</td>
//                 <td>{employee.month}</td>
//                 <td>{employee.year}</td>
//                 <td>{employee.grossSalary}</td>
//                 <td>{employee.deductions}</td>
//                 <td>{employee.netSalary}</td>
//                 <td>{employee.pfAmount}</td>
//                 <td>{employee.healthInsuranceAmount}</td>
//                 <td>{employee.leaveAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className={styles.pagination}>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={styles.paginationButton}
//         >
//           <FiChevronLeft />
//         </button>
        
//         <div className={styles.pageNumbers}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => handlePageChange(i + 1)}
//               className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
        
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={styles.paginationButton}
//         >
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PayrollSummary;



// import React, { useState, useEffect } from "react";
// import styles from "./PayrollSummary.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Auth from "../Services/Auth";
// import axios from "axios";

// const PayrollSummary = () => {
//   const [payrollData, setPayrollData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch payroll data from API
//   const fetchPayrollData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = Auth.getToken();
//       if (!token) {
//         throw new Error("Please login to access this page");
//       }

//       const response = await axios.get("http://209.74.89.83/erpbackend/get-user-payroll", {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.data || !response.data.users) {
//         throw new Error("Failed to fetch payroll details");
//       }

//       // Transform the API data to match our table structure
//       const transformedData = {
//         username: response.data.users.username || 'N/A',
//         email: response.data.users.contact?.emailId || 'N/A',
//         phone: response.data.users.contact?.phoneNumber || 'N/A',
//         employeeId: response.data.users.employeeId || 'N/A',
//         month: response.data.users.payroll[0]?.month || 'N/A',
//         year: response.data.users.payroll[0]?.year || 'N/A',
//         grossSalary: `₹${response.data.users.payroll[0]?.grossSalary?.toLocaleString('en-IN') || '0'}`,
//         deductions: `₹${response.data.users.payroll[0]?.deductions?.toLocaleString('en-IN') || '0'}`,
//         netSalary: `₹${response.data.users.payroll[0]?.netSalary?.toLocaleString('en-IN') || '0'}`,
//         pfAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.4)?.toLocaleString('en-IN') || '0'}`,
//         healthInsuranceAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.3)?.toLocaleString('en-IN') || '0'}`,
//         leaveAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.2)?.toLocaleString('en-IN') || '0'}`
//       };

//       setPayrollData([transformedData]); // Wrap in array since we're getting single user data
//     } catch (err) {
//       setError(err.message);
//       if (err.message.includes("login") || err.message.includes("401")) {
//         Auth.logout();
//         window.location.href = "/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayrollData();
//   }, []);

//   // Calculate pagination values
//   const totalPages = Math.ceil(payrollData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = payrollData.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Loading payroll data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.error}>
//           {error}
//           <button onClick={fetchPayrollData} className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Payroll Summary</h2>
//         <div className={styles.summary}>
//           <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, payrollData.length)} of {payrollData.length} records</span>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Employee ID</th>
//               <th>Month</th>
//               <th>Year</th>
//               <th>Gross Salary</th>
//               <th>Deductions</th>
//               <th>Net Salary</th>
//               <th>PF Amount</th>
//               <th>Health Insurance</th>
//               <th>Leave Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((employee, index) => (
//               <tr key={index}>
//                 <td>{employee.username}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.phone}</td>
//                 <td>{employee.employeeId}</td>
//                 <td>{employee.month}</td>
//                 <td>{employee.year}</td>
//                 <td>{employee.grossSalary}</td>
//                 <td>{employee.deductions}</td>
//                 <td>{employee.netSalary}</td>
//                 <td>{employee.pfAmount}</td>
//                 <td>{employee.healthInsuranceAmount}</td>
//                 <td>{employee.leaveAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className={styles.pagination}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={styles.paginationButton}
//           >
//             <FiChevronLeft />
//           </button>
          
//           <div className={styles.pageNumbers}>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={styles.paginationButton}
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PayrollSummary;



import React, { useState, useEffect } from "react";
import styles from "./PayrollSummary.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";

const PayrollSummary = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch payroll data from API
  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get("http://209.74.89.83/erpbackend/get-user-payroll", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data || !response.data.users) {
        throw new Error("Failed to fetch payroll details");
      }

      // Transform the API data to match our table structure
      const transformedData = {
        employeeId: response.data.users.employeeId || 'N/A',
        month: response.data.users.payroll[0]?.month || 'N/A',
        year: response.data.users.payroll[0]?.year || 'N/A',
        grossSalary: `₹${response.data.users.payroll[0]?.grossSalary?.toLocaleString('en-IN') || '0'}`,
        deductions: `₹${response.data.users.payroll[0]?.deductions?.toLocaleString('en-IN') || '0'}`,
        netSalary: `₹${response.data.users.payroll[0]?.netSalary?.toLocaleString('en-IN') || '0'}`,
        pfAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.4)?.toLocaleString('en-IN') || '0'}`,
        healthInsuranceAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.3)?.toLocaleString('en-IN') || '0'}`,
        leaveAmount: `₹${(response.data.users.payroll[0]?.deductions * 0.2)?.toLocaleString('en-IN') || '0'}`
      };

      setPayrollData([transformedData]); // Wrap in array since we're getting single user data
    } catch (err) {
      setError(err.message);
      if (err.message.includes("login") || err.message.includes("401")) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payrollData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading payroll data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchPayrollData} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Payroll Summary</h2>
        <div className={styles.summary}>
          <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, payrollData.length)} of {payrollData.length} records</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Gross Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>PF Amount</th>
              <th>Health Insurance</th>
              <th>Leave Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeId}</td>
                <td>{employee.month}</td>
                <td>{employee.year}</td>
                <td>{employee.grossSalary}</td>
                <td>{employee.deductions}</td>
                <td>{employee.netSalary}</td>
                <td>{employee.pfAmount}</td>
                <td>{employee.healthInsuranceAmount}</td>
                <td>{employee.leaveAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            <FiChevronLeft />
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PayrollSummary;