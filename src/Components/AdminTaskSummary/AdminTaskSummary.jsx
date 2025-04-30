// import React, { useState, useEffect } from "react";
// import styles from "./AdminTaskSummary.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Auth from "../Services/Auth";
// import axios from "axios";

// const AdminTaskSummary = () => {
//   const [tasksData, setTasksData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 5;

//   // Fetch tasks data from API
//   const fetchTasksData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = Auth.getToken();
//       if (!token) {
//         throw new Error("Please login to access this page");
//       }

//       const response = await axios.get("http://209.74.89.83/erpbackend/get-admin-tasks-summary", {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.data || !response.data.users) {
//         throw new Error("Failed to fetch tasks details");
//       }

//       // Transform the API data to match our table structure
//       const transformedData = response.data.users.flatMap(user => {
//         // If user has no tasks, return empty array
//         if (!user.adminTasks || user.adminTasks.length === 0) {
//           return [];
//         }
        
//         // Map each task for the user
//         return user.adminTasks.map(task => ({
//           username: user.username || 'N/A',
//           email: user.contact?.emailId || 'N/A',
//           phone: user.contact?.phone || 'N/A',
//           employeeId: user.employeeId || 'N/A',
//           projectName: task.projectName || 'N/A',
//           taskName: task.taskName || 'N/A',
//           subTask: task.subTask || 'N/A',
//           description: task.description || 'N/A',
//           deadline: task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A',
//           priority: task.priority || 'N/A',
//           estimatedTime: task.estimatedTime || 'N/A',
//           notes: task.additionalNotes || 'N/A'
//         }));
//       });

//       setTasksData(transformedData);
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
//     fetchTasksData();
//   }, []);

//   // Filter tasks based on search term
//   const filteredTasks = tasksData.filter(task => 
//     task.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate pagination values
//   const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Loading tasks data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.error}>
//           {error}
//           <button onClick={fetchTasksData} className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Admin Tasks Summary</h2>
//         <div className={styles.controls}>
//           <div className={styles.searchContainer}>
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//           <div className={styles.summary}>
//             Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTasks.length)} of {filteredTasks.length} tasks
//           </div>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Employee ID</th>
//               <th>Project</th>
//               <th>Task</th>
//               <th>Sub Task</th>
//               <th>Description</th>
//               <th>Deadline</th>
//               <th>Priority</th>
//               <th>Time</th>
//               <th>Notes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.length > 0 ? (
//               currentItems.map((task, index) => (
//                 <tr key={index}>
//                   <td>{task.username}</td>
//                   <td>{task.employeeId}</td>
//                   <td>{task.projectName}</td>
//                   <td>{task.taskName}</td>
//                   <td>{task.subTask}</td>
//                   <td className={styles.descriptionCell}>{task.description}</td>
//                   <td>{task.deadline}</td>
//                   <td>
//                     <span className={`${styles.priority} ${task.priority === 'High' ? styles.highPriority : 
//                                       task.priority === 'Medium' ? styles.mediumPriority : styles.lowPriority}`}>
//                       {task.priority}
//                     </span>
//                   </td>
//                   <td>{task.estimatedTime}</td>
//                   <td className={styles.notesCell}>{task.notes}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className={styles.noData}>
//                   No tasks found
//                 </td>
//               </tr>
//             )}
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
          
//           <div className={styles.pageInfo}>
//             Page {currentPage} of {totalPages}
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

// export default AdminTaskSummary;






// import React, { useState, useEffect } from "react";
// import styles from "./AdminTaskSummary.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Auth from "../Services/Auth";
// import axios from "axios";

// const AdminTaskSummary = () => {
//   const [tasksData, setTasksData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch task data from API
//   const fetchTaskData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = Auth.getToken();
//       if (!token) {
//         throw new Error("Please login to access this page");
//       }

//       const response = await axios.get("http://209.74.89.83/erpbackend/get-admin-tasks-summary", {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.data || !response.data.users) {
//         throw new Error("Failed to fetch task details");
//       }

//       // Transform the API data to match our table structure
//       const transformedData = response.data.users.flatMap(user => {
//         // If user has no tasks, return empty array
//         if (!user.adminTasks || user.adminTasks.length === 0) {
//           return [];
//         }
        
//         // Map each task entry for the user
//         return user.adminTasks.map(task => ({
//           employeeId: user.employeeId || 'N/A',
//           username: user.username || 'N/A',
//           email: user.contact?.emailId || 'N/A',
//           phone: user.contact?.phone || 'N/A',
//           projectName: task.projectName || 'N/A',
//           taskName: task.taskName || 'N/A',
//           subTask: task.subTask || 'N/A',
//           description: task.description || 'N/A',
//           deadline: task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A',
//           priority: task.priority || 'Medium',
//           estimatedTime: task.estimatedTime || 'N/A',
//           additionalNotes: task.additionalNotes || 'N/A'
//         }));
//       });

//       setTasksData(transformedData);
//     } catch (err) {
//       setError(err.message);
//       if (err.message.includes("login") || err.response?.status === 401) {
//         Auth.logout();
//         window.location.href = "/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTaskData();
//   }, []);

//   // Calculate pagination values
//   const totalPages = Math.ceil(tasksData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = tasksData.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Loading task data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.error}>
//           {error}
//           <button onClick={fetchTaskData} className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Admin Task Summary</h2>
//         <div className={styles.summary}>
//           <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tasksData.length)} of {tasksData.length} tasks</span>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Project Name</th>
//               <th>Task Name</th>
//               <th>Sub Task</th>
//               <th>Description</th>
//               <th>Deadline</th>
//               <th>Priority</th>
//               <th>Estimated Time</th>
//               <th>Additional Notes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.length > 0 ? (
//               currentItems.map((task, index) => (
//                 <tr key={index}>
//                   <td>{task.employeeId}</td>
//                   <td>{task.username}</td>
//                   <td>{task.email}</td>
//                   <td>{task.phone}</td>
//                   <td>{task.projectName}</td>
//                   <td>{task.taskName}</td>
//                   <td>{task.subTask}</td>
//                   <td className={styles.descriptionCell}>{task.description}</td>
//                   <td>{task.deadline}</td>
//                   <td>
//                     <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
//                       {task.priority}
//                     </span>
//                   </td>
//                   <td>{task.estimatedTime}</td>
//                   <td className={styles.notesCell}>{task.additionalNotes}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" className={styles.noData}>
//                   No tasks found
//                 </td>
//               </tr>
//             )}
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

// export default AdminTaskSummary;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './AdminTaskSummary.module.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Auth from '../Services/Auth';
// import { FiUser, FiPhone, FiMail, FiClock, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// const AdminTaskSummary = () => {
//   const [users, setUsers] = useState([]);
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = Auth.getToken();

//   useEffect(() => {
//     if (!token) {
//       toast.error('User not authenticated.');
//       setIsLoading(false);
//       return;
//     }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://209.74.89.83/erpbackend/get-admin-tasks-summary', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           toast.info('No tasks found.');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         toast.error('Failed to fetch tasks.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [token]);

//   const toggleRow = (userId) => {
//     if (expandedRows.includes(userId)) {
//       setExpandedRows(expandedRows.filter(id => id !== userId));
//     } else {
//       setExpandedRows([...expandedRows, userId]);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getPriorityClass = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return styles.priorityHigh;
//       case 'medium':
//         return styles.priorityMedium;
//       case 'low':
//         return styles.priorityLow;
//       default:
//         return '';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading tasks...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className={styles.heading}>
//         <span className={styles.headerIcon}>📋</span>
//         Team Tasks Overview
//       </h1>
      
//       <div className={styles.tableWrapper}>
//         <table className={styles.taskTable}>
//           <thead>
//             <tr>
//               <th>Team Member</th>
//               <th>Contact</th>
//               <th>Projects</th>
//               <th>Total Tasks</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className={styles.emptyMessage}>
//                   No tasks assigned to team members yet
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <React.Fragment key={user.employeeId}>
//                   <tr 
//                     className={styles.mainRow}
//                     onClick={() => toggleRow(user.employeeId)}
//                   >
//                     <td>
//                       <div className={styles.userCell}>
//                         <div className={styles.avatar}>
//                           <FiUser className={styles.avatarIcon} />
//                         </div>
//                         <div>
//                           <div className={styles.userName}>{user.username}</div>
//                           <div className={styles.userId}>{user.employeeId}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className={styles.contactCell}>
//                         <div className={styles.contactItem}>
//                           <FiMail className={styles.contactIcon} /> {user.contact.emailId}
//                         </div>
//                         <div className={styles.contactItem}>
//                           <FiPhone className={styles.contactIcon} /> {user.contact.phone}
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className={styles.projectsCell}>
//                         {Object.keys(user.projects).join(', ')}
//                       </div>
//                     </td>
//                     <td>
//                       {Object.values(user.projects).reduce((acc, tasks) => acc + tasks.length, 0)}
//                     </td>
//                     <td className={styles.toggleCell}>
//                       {expandedRows.includes(user.employeeId) ? (
//                         <FiChevronUp className={styles.toggleIcon} />
//                       ) : (
//                         <FiChevronDown className={styles.toggleIcon} />
//                       )}
//                     </td>
//                   </tr>
                  
//                   {expandedRows.includes(user.employeeId) && (
//                     <tr className={styles.expandedRow}>
//                       <td colSpan="5">
//                         <div className={styles.detailsContainer}>
//                           {Object.entries(user.projects).map(([projectName, tasks]) => (
//                             <div key={projectName} className={styles.projectSection}>
//                               <h3 className={styles.projectTitle}>
//                                 <span className={styles.projectBadge}>{projectName.toUpperCase()}</span>
//                                 <span className={styles.taskCount}>{tasks.length} tasks</span>
//                               </h3>
                              
//                               <table className={styles.taskSubTable}>
//                                 <thead>
//                                   <tr>
//                                     <th>Task Name</th>
//                                     <th>Subtask</th>
//                                     <th>Description</th>
//                                     <th>Priority</th>
//                                     <th>Deadline</th>
//                                     <th>Time</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {tasks.map((task, index) => {
//                                     const isOverdue = new Date(task.deadline) < new Date();
//                                     return (
//                                       <tr 
//                                         key={index} 
//                                         className={`${styles.taskRow} ${isOverdue ? styles.overdue : ''}`}
//                                       >
//                                         <td>{task.taskName}</td>
//                                         <td>{task.subTask}</td>
//                                         <td className={styles.descriptionCell}>{task.description}</td>
//                                         <td>
//                                           <span className={`${styles.priorityBadge} ${getPriorityClass(task.priority)}`}>
//                                             {task.priority}
//                                           </span>
//                                         </td>
//                                         <td>
//                                           <div className={styles.dateCell}>
//                                             <FiCalendar className={styles.dateIcon} />
//                                             <span>{formatDate(task.deadline)}</span>
//                                             {isOverdue && <span className={styles.overdueLabel}>Overdue</span>}
//                                           </div>
//                                         </td>
//                                         <td>
//                                           <div className={styles.timeCell}>
//                                             <FiClock className={styles.timeIcon} />
//                                             <span>{task.estimatedTime}</span>
//                                           </div>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })}
//                                 </tbody>
//                               </table>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTaskSummary;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './AdminTaskSummary.module.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Auth from '../Services/Auth';
// import { FiChevronDown, FiChevronUp, FiUser, FiPhone, FiMail, FiClock, FiCalendar } from 'react-icons/fi';
// import { FaTasks, FaRegStickyNote } from 'react-icons/fa';

// const AdminTaskSummary = () => {
//   const [users, setUsers] = useState([]);
//   const [expandedUser, setExpandedUser] = useState(null);
//   const [expandedProject, setExpandedProject] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = Auth.getToken();

//   useEffect(() => {
//     if (!token) {
//       toast.error('User not authenticated.');
//       setIsLoading(false);
//       return;
//     }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://209.74.89.83/erpbackend/get-admin-tasks-summary', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           toast.info('No tasks found.');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         toast.error('Failed to fetch tasks.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [token]);

//   const toggleUser = (userId) => {
//     if (expandedUser === userId) {
//       setExpandedUser(null);
//       setExpandedProject(null);
//     } else {
//       setExpandedUser(userId);
//       setExpandedProject(null);
//     }
//   };

//   const toggleProject = (projectName, userId) => {
//     if (expandedProject === projectName && expandedUser === userId) {
//       setExpandedProject(null);
//     } else {
//       setExpandedProject(projectName);
//       setExpandedUser(userId);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return '#ff4757';
//       case 'medium':
//         return '#ffa502';
//       case 'low':
//         return '#2ed573';
//       default:
//         return '#57606f';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading tasks...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <header className={styles.header}>
//         <h1 className={styles.heading}>
//           <FaTasks className={styles.headerIcon} />
//           Team Tasks Dashboard
//         </h1>
//         <div className={styles.summary}>
//           <span>{users.length} Team Members</span>
//           <span>{users.reduce((acc, user) => acc + Object.values(user.projects).flat().length, 0)} Total Tasks</span>
//         </div>
//       </header>
      
//       <div className={styles.usersContainer}>
//         {users.length === 0 ? (
//           <div className={styles.emptyState}>
//             <img src="/empty-tasks.svg" alt="No tasks" className={styles.emptyImage} />
//             <h3>No tasks assigned yet</h3>
//             <p>When tasks are assigned, they'll appear here</p>
//           </div>
//         ) : (
//           users.map((user) => (
//             <div key={user.employeeId} className={styles.userCard}>
//               <table className={styles.userTable}>
//                 <thead>
//                   <tr>
//                     <th colSpan={5} className={styles.userHeader} onClick={() => toggleUser(user.employeeId)}>
//                       <div className={styles.userAvatar}>
//                         <FiUser className={styles.avatarIcon} />
//                       </div>
//                       <div className={styles.userInfo}>
//                         <h3>{user.username}</h3>
//                         <div className={styles.userMeta}>
//                           <span className={styles.employeeId}>{user.employeeId}</span>
//                           <span className={styles.userContact}>
//                             <FiMail className={styles.contactIcon} /> {user.contact.emailId}
//                           </span>
//                           <span className={styles.userContact}>
//                             <FiPhone className={styles.contactIcon} /> {user.contact.phone}
//                           </span>
//                         </div>
//                       </div>
//                       <div className={styles.toggleIcon}>
//                         {expandedUser === user.employeeId ? <FiChevronUp /> : <FiChevronDown />}
//                       </div>
//                     </th>
//                   </tr>
//                 </thead>
//                 {expandedUser === user.employeeId && (
//                   <tbody>
//                     {Object.entries(user.projects).map(([projectName, tasks]) => (
//                       <React.Fragment key={projectName}>
//                         <tr>
//                           <th colSpan={5} className={styles.projectHeader} onClick={() => toggleProject(projectName, user.employeeId)}>
//                             <div className={styles.projectInfo}>
//                               <h4 className={styles.projectName}>
//                                 <span className={styles.projectBadge}>{projectName.toUpperCase()}</span>
//                                 <span className={styles.taskCount}>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
//                               </h4>
//                               <div className={styles.projectStats}>
//                                 <span className={styles.statItem}>
//                                   <FiClock /> {tasks.reduce((acc, task) => acc + parseInt(task.estimatedTime.split(':')[0]), 0)}h
//                                 </span>
//                                 <span className={styles.statItem}>
//                                   {tasks.filter(t => new Date(t.deadline) < new Date()).length} overdue
//                                 </span>
//                               </div>
//                             </div>
//                             <div className={styles.toggleIcon}>
//                               {expandedProject === projectName ? <FiChevronUp /> : <FiChevronDown />}
//                             </div>
//                           </th>
//                         </tr>
//                         {expandedProject === projectName && tasks.map((task, index) => {
//                           const isOverdue = new Date(task.deadline) < new Date();
//                           return (
//                             <tr key={index} className={`${styles.taskRow} ${isOverdue ? styles.overdue : ''}`}>
//                               <td className={styles.taskName}>{task.taskName}</td>
//                               <td className={styles.taskSubTask}>{task.subTask}</td>
//                               <td className={styles.taskPriority}>
//                                 <span 
//                                   className={styles.priority} 
//                                   style={{ backgroundColor: getPriorityColor(task.priority) }}
//                                 >
//                                   {task.priority}
//                                 </span>
//                               </td>
//                               <td className={styles.taskDeadline}>
//                                 <div className={styles.taskMeta}>
//                                   <div className={styles.metaItem}>
//                                     <FiClock className={styles.metaIcon} />
//                                     <span>Estimated: {task.estimatedTime}</span>
//                                   </div>
//                                   <div className={styles.metaItem}>
//                                     <FiCalendar className={`${styles.metaIcon} ${isOverdue ? styles.overdueIcon : ''}`} />
//                                     <span>Deadline: {formatDate(task.deadline)}</span>
//                                     {isOverdue && <span className={styles.overdueLabel}>OVERDUE</span>}
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className={styles.taskActions}>
//                                 <div className={styles.taskDates}>
//                                   <span>Created: {formatDate(task.createdAt)}</span>
//                                   <span>Updated: {formatDate(task.updatedAt)}</span>
//                                 </div>
//                                 {task.additionalNotes && (
//                                   <div className={styles.notes}>
//                                     <div className={styles.notesHeader}>
//                                       <FaRegStickyNote className={styles.notesIcon} />
//                                       <span className={styles.notesLabel}>Additional Notes</span>
//                                     </div>
//                                     <p>{task.additionalNotes}</p>
//                                   </div>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 )}
//               </table>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminTaskSummary;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminTaskSummary.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../Services/Auth';
import { FiChevronDown, FiChevronUp, FiUser, FiPhone, FiMail, FiClock, FiCalendar } from 'react-icons/fi';
import { FaTasks, FaRegStickyNote } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminTaskSummary = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = Auth.getToken();

  useEffect(() => {
    if (!token) {
      toast.error('User not authenticated.');
      setIsLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://209.74.89.83/erpbackend/get-admin-tasks-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          toast.info('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const toggleUser = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setExpandedProject(null);
    } else {
      setExpandedUser(userId);
      setExpandedProject(null);
    }
  };

  const toggleProject = (projectName, userId) => {
    if (expandedProject === projectName && expandedUser === userId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
      setExpandedUser(userId);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#ff4757';
      case 'medium':
        return '#ffa502';
      case 'low':
        return '#2ed573';
      default:
        return '#57606f';
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <header className={styles.header}>
        <h1 className={styles.heading}>
          <FaTasks className={styles.headerIcon} />
          Team Tasks Dashboard
        </h1>
        <div className={styles.summary}>
          <span>{users.length} Team Members</span>
          <span>{users.reduce((acc, user) => acc + Object.values(user.projects).flat().length, 0)} Total Tasks</span>
        </div>
      </header>
      
      <div className={styles.usersContainer}>
        {users.length === 0 ? (
          <div className={styles.emptyState}>
            <img src="/empty-tasks.svg" alt="No tasks" className={styles.emptyImage} />
            <h3>No tasks assigned yet</h3>
            <p>When tasks are assigned, they'll appear here</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.employeeId} className={styles.userCard}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th colSpan={5} className={styles.userHeader} onClick={() => toggleUser(user.employeeId)}>
                      <div className={styles.userAvatar}>
                        <FiUser className={styles.avatarIcon} />
                      </div>
                      <div className={styles.userInfo}>
                        <h3>{user.username}</h3>
                        <div className={styles.userMeta}>
                          <span className={styles.employeeId}>{user.employeeId}</span>
                          <span className={styles.userContact}>
                            <FiMail className={styles.contactIcon} /> {user.contact.emailId}
                          </span>
                          <span className={styles.userContact}>
                            <FiPhone className={styles.contactIcon} /> {user.contact.phone}
                          </span>
                        </div>
                      </div>
                      <div className={styles.toggleIcon}>
                        {expandedUser === user.employeeId ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </th>
                  </tr>
                </thead>
                {expandedUser === user.employeeId && (
                  <tbody>
                    {Object.entries(user.projects).map(([projectName, tasks]) => (
                      <React.Fragment key={projectName}>
                        <tr>
                          <th colSpan={5} className={styles.projectHeader} onClick={() => toggleProject(projectName, user.employeeId)}>
                            <div className={styles.projectInfo}>
                              <h4 className={styles.projectName}>
                                <span className={styles.projectBadge}>{projectName.toUpperCase()}</span>
                                <span className={styles.taskCount}>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
                              </h4>
                              <div className={styles.projectStats}>
                                <span className={styles.statItem}>
                                  <FiClock /> {tasks.reduce((acc, task) => acc + parseInt(task.estimatedTime.split(':')[0]), 0)}h
                                </span>
                                <span className={styles.statItem}>
                                  {tasks.filter(t => new Date(t.deadline) < new Date()).length} overdue
                                </span>
                              </div>
                            </div>
                            <div className={styles.toggleIcon}>
                              {expandedProject === projectName ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </th>
                        </tr>
                        {expandedProject === projectName && tasks.map((task, index) => {
                          const isOverdue = new Date(task.deadline) < new Date();
                          return (
                            <motion.tr
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              key={index}
                              className={`${styles.taskRow} ${isOverdue ? styles.overdue : ''}`}
                            >
                              <td className={styles.taskName}>{task.taskName}</td>
                              <td className={styles.taskSubTask}>{task.subTask}</td>
                              <td className={styles.taskPriority}>
                                <span 
                                  className={styles.priority} 
                                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                                >
                                  {task.priority}
                                </span>
                              </td>
                              <td className={styles.taskDeadline}>
                                <div className={styles.taskMeta}>
                                  <div className={styles.metaItem}>
                                    <FiClock className={styles.metaIcon} />
                                    <span>Estimated: {task.estimatedTime}</span>
                                  </div>
                                  <div className={styles.metaItem}>
                                    <FiCalendar className={`${styles.metaIcon} ${isOverdue ? styles.overdueIcon : ''}`} />
                                    <span>Deadline: {formatDate(task.deadline)}</span>
                                    {isOverdue && <span className={styles.overdueLabel}>OVERDUE</span>}
                                  </div>
                                </div>
                              </td>
                              <td className={styles.taskActions}>
                                <div className={styles.taskDates}>
                                  <span>Created: {formatDate(task.createdAt)}</span>
                                  <span>Updated: {formatDate(task.updatedAt)}</span>
                                </div>
                                {task.additionalNotes && (
                                  <div className={styles.notes}>
                                    <div className={styles.notesHeader}>
                                      <FaRegStickyNote className={styles.notesIcon} />
                                      <span className={styles.notesLabel}>Additional Notes</span>
                                    </div>
                                    <p>{task.additionalNotes}</p>
                                  </div>
                                )}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AdminTaskSummary;