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


import React, { useState, useEffect } from "react";
import styles from "./AdminTaskSummary.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";

const AdminTaskSummary = () => {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch task data from API
  const fetchTaskData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get("http://209.74.89.83/erpbackend/get-admin-tasks-summary", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data || !response.data.users) {
        throw new Error("Failed to fetch task details");
      }

      // Transform the API data to match our table structure
      const transformedData = response.data.users.flatMap(user => {
        // If user has no tasks, return empty array
        if (!user.adminTasks || user.adminTasks.length === 0) {
          return [];
        }
        
        // Map each task entry for the user
        return user.adminTasks.map(task => ({
          employeeId: user.employeeId || 'N/A',
          username: user.username || 'N/A',
          email: user.contact?.emailId || 'N/A',
          phone: user.contact?.phone || 'N/A',
          projectName: task.projectName || 'N/A',
          taskName: task.taskName || 'N/A',
          subTask: task.subTask || 'N/A',
          description: task.description || 'N/A',
          deadline: task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A',
          priority: task.priority || 'Medium',
          estimatedTime: task.estimatedTime || 'N/A',
          additionalNotes: task.additionalNotes || 'N/A'
        }));
      });

      setTasksData(transformedData);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("login") || err.response?.status === 401) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(tasksData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tasksData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading task data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchTaskData} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Admin Task Summary</h2>
        <div className={styles.summary}>
          <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tasksData.length)} of {tasksData.length} tasks</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Project Name</th>
              <th>Task Name</th>
              <th>Sub Task</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Estimated Time</th>
              <th>Additional Notes</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((task, index) => (
                <tr key={index}>
                  <td>{task.employeeId}</td>
                  <td>{task.username}</td>
                  <td>{task.email}</td>
                  <td>{task.phone}</td>
                  <td>{task.projectName}</td>
                  <td>{task.taskName}</td>
                  <td>{task.subTask}</td>
                  <td className={styles.descriptionCell}>{task.description}</td>
                  <td>{task.deadline}</td>
                  <td>
                    <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.estimatedTime}</td>
                  <td className={styles.notesCell}>{task.additionalNotes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className={styles.noData}>
                  No tasks found
                </td>
              </tr>
            )}
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

export default AdminTaskSummary;