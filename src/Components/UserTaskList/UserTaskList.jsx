

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiChevronLeft, FiChevronRight, FiRefreshCw, FiClock, FiCalendar, FiUser, FiFlag } from "react-icons/fi";
// import Auth from "../Services/Auth";
// import styles from "./UserTaskList.module.css";

// const UserTaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 8; 

//   const fetchTasks = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = Auth.getToken();

//       if (!token) {
//         throw new Error("Authentication required. Please login.");
//       }

//       const response = await axios.get(
//         "http://209.74.89.83/erpbackend/get-task-createdBy-admin",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           params: {
//             page,
//             limit: itemsPerPage,
//           },
//         }
//       );

//       if (!response.data?.users) {
//         throw new Error("Invalid response format");
//       }

//       const allTasks = response.data.users.flatMap(
//         (user) =>
//           user.adminTasks?.map((task) => ({
//             ...task,
//             employeeId: user.employeeId,
//           })) || []
//       );

//       const totalCount = response.data.totalCount || allTasks.length;
//       const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);

//       setTasks(allTasks);
//       setTotalPages(calculatedTotalPages);
//       setCurrentPage(page);

//       if (allTasks.length === 0) {
//         setError("No tasks found");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to fetch tasks"
//       );
//       if (err.response?.status === 401) {
//         Auth.logout();
//         window.location.href = "/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       fetchTasks(newPage);
//     }
//   };

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pageNumbers = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     if (startPage > 1) {
//       pageNumbers.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className={`${styles.pageButton} ${
//             1 === currentPage ? styles.activePage : ""
//           }`}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pageNumbers.push(
//           <span key="start-ellipsis" className={styles.ellipsis}>
//             ...
//           </span>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`${styles.pageButton} ${
//             i === currentPage ? styles.activePage : ""
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(
//           <span key="end-ellipsis" className={styles.ellipsis}>
//             ...
//           </span>
//         );
//       }
//       pageNumbers.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className={`${styles.pageButton} ${
//             totalPages === currentPage ? styles.activePage : ""
//           }`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return (
//       <div className={styles.pagination}>
//         {/* <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={styles.paginationButton}
//           aria-label="Previous page"
//         >
//           <FiChevronLeft />
//         </button> */}

//         {/* <div className={styles.pageNumbers}>{pageNumbers}</div> */}

//         {/* <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={styles.paginationButton}
//           aria-label="Next page"
//         >
//           <FiChevronRight />
//         </button> */}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const options = { day: 'numeric', month: 'short', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case 'high':
//         return '#ff4444';
//       case 'medium':
//         return '#ffbb33';
//       case 'low':
//         return '#00C851';
//       default:
//         return '#33b5e5';
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loadingContainer}>
//           <div className={styles.spinner}></div>
//           <p>Loading tasks...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.errorContainer}>
//           <div className={styles.errorMessage}>
//             {error === "No tasks found" ? (
//               <>
//                 <p>No tasks have been created yet.</p>
//                 <p>When admin creates tasks, they will appear here.</p>
//               </>
//             ) : (
//               <p>{error}</p>
//             )}
//           </div>
//           <button
//             onClick={() => fetchTasks(currentPage)}
//             className={styles.retryButton}
//           >
//             <FiRefreshCw className={styles.refreshIcon} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Assigned Tasks</h2>
//         <div className={styles.controls}>
//           <span className={styles.taskCount}>
//             Showing {(currentPage - 1) * itemsPerPage + 1}-
//             {Math.min(currentPage * itemsPerPage, tasks.length)} of{" "}
//             {totalPages * itemsPerPage} tasks
//           </span>
//           <button
//             onClick={() => fetchTasks(currentPage)}
//             className={styles.refreshButton}
//             title="Refresh tasks"
//           >
//             <FiRefreshCw />
//           </button>
//         </div>
//       </div>

//       <div className={styles.cardsContainer}>
//         {tasks.map((task, index) => (
//           <div key={`${task.employeeId}-${index}`} className={styles.taskCard}>
//             <div className={styles.cardHeader}>
//               <h3 className={styles.taskName}>{task.taskName || "Untitled Task"}</h3>
//               <span 
//                 className={styles.priorityBadge}
//                 style={{ backgroundColor: getPriorityColor(task.priority) }}
//               >
//                 <FiFlag className={styles.priorityIcon} />
//                 {task.priority || "Medium"}
//               </span>
//             </div>
            
//             <div className={styles.cardBody}>
//               <div className={styles.taskMeta}>
//                 <div className={styles.metaItem}>
//                   <FiUser className={styles.metaIcon} />
//                   <span>{task.employeeId || "N/A"}</span>
//                 </div>
//                 <div className={styles.metaItem}>
//                   <FiClock className={styles.metaIcon} />
//                   <span>{task.estimatedTime || "N/A"}</span>
//                 </div>
//               </div>
              
//               <div className={styles.projectInfo}>
//                 <span className={styles.projectName}>{task.projectName || "No Project"}</span>
//                 {task.subTask && (
//                   <span className={styles.subTask}>{task.subTask}</span>
//                 )}
//               </div>
              
//               {task.description && (
//                 <div className={styles.description}>
//                   <p>{task.description}</p>
//                 </div>
//               )}
              
//               <div className={styles.deadline}>
//                 <FiCalendar className={styles.deadlineIcon} />
//                 <span>Due: {formatDate(task.deadline)}</span>
//               </div>
//             </div>
            
//             <div className={styles.cardFooter}>
//               <div className={styles.dateInfo}>
//                 <span>Created: {formatDate(task.createdAt)}</span>
//                 {task.updatedAt !== task.createdAt && (
//                   <span>Updated: {formatDate(task.updatedAt)}</span>
//                 )}
//               </div>
//               {task.additionalNotes && (
//                 <div className={styles.notes}>
//                   <p>{task.additionalNotes}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* {renderPagination()} */}
//     </div>
//   );
// };

// export default UserTaskList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiClock, FiCalendar, FiUser, FiFlag } from "react-icons/fi";
import Auth from "../Services/Auth";
import styles from "./UserTaskList.module.css";

const UserTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 1000; // Set high value to fetch all

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Auth.getToken();

      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-task-createdBy-admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            limit: itemsPerPage,
          },
        }
      );

      if (!response.data?.users) {
        throw new Error("Invalid response format");
      }

      const allTasks = response.data.users.flatMap(
        (user) =>
          user.adminTasks?.map((task) => ({
            ...task,
            employeeId: user.employeeId,
          })) || []
      );

      setTasks(allTasks);

      if (allTasks.length === 0) {
        setError("No tasks found");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch tasks"
      );
      if (err.response?.status === 401) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#ff4444";
      case "medium":
        return "#ffbb33";
      case "low":
        return "#00C851";
      default:
        return "#33b5e5";
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            {error === "No tasks found" ? (
              <>
                <p>No tasks have been created yet.</p>
                <p>When admin creates tasks, they will appear here.</p>
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Assigned Tasks</h2>
        <span className={styles.taskCount}>{tasks.length} tasks</span>
      </div>

      <div className={styles.cardsContainer}>
        {tasks.map((task, index) => (
          <div key={`${task.employeeId}-${index}`} className={styles.taskCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.taskName}>
                {task.taskName || "Untitled Task"}
              </h3>
              <span
                className={styles.priorityBadge}
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                <FiFlag className={styles.priorityIcon} />
                {task.priority || "Medium"}
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.taskMeta}>
                <div className={styles.metaItem}>
                  <FiUser className={styles.metaIcon} />
                  <span>{task.employeeId || "N/A"}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiClock className={styles.metaIcon} />
                  <span>{task.estimatedTime || "N/A"}</span>
                </div>
              </div>

              <div className={styles.projectInfo}>
                <span className={styles.projectName}>
                  {task.projectName || "No Project"}
                </span>
                {task.subTask && (
                  <span className={styles.subTask}>{task.subTask}</span>
                )}
              </div>

              {task.description && (
                <div className={styles.description}>
                  <p>{task.description}</p>
                </div>
              )}

              <div className={styles.deadline}>
                <FiCalendar className={styles.deadlineIcon} />
                <span>Due: {formatDate(task.deadline)}</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.dateInfo}>
                <span>Created: {formatDate(task.createdAt)}</span>
                {task.updatedAt !== task.createdAt && (
                  <span>Updated: {formatDate(task.updatedAt)}</span>
                )}
              </div>
              {task.additionalNotes && (
                <div className={styles.notes}>
                  <p>{task.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTaskList;
