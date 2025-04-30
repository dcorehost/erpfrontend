
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './UserTask.module.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Auth from '../Services/Auth';

// const UserTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const token = Auth.getToken();

//   useEffect(() => {
//     if (!token) {
//       toast.error('User not authenticated.');
//       return;
//     }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://209.74.89.83/erpbackend/get-all-Tasks-forUser', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.taskDetails) {
//           setTasks(response.data.taskDetails);
//         } else {
//           toast.info('No tasks found.');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         toast.error('Failed to fetch tasks.');
//       }
//     };

//     fetchTasks();
//   }, [token]);

//   return (
//     <div className={styles.container}>
//       <ToastContainer />
//       <h1 className={styles.heading}>All Tasks</h1>
//       <div className={styles.tableWrapper}>
//         <table className={styles.taskTable}>
//           <thead>
//             <tr>
//               <th>Project Name</th>
//               <th>Task Name</th>
//               <th>Description</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>State</th>
//               <th>Time Spent</th>
//               <th>Start Time</th>
//               <th>Is Running</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map(taskDetails => (
//               <tr key={taskDetails._id}>
//                 <td>{taskDetails.projectName}</td>
//                 <td>{taskDetails.taskName}</td>
//                 <td>{taskDetails.description}</td>
//                 <td>{taskDetails.userId?.username || 'N/A'}</td>
//                 <td>{taskDetails.userId?.contact?.emailId || 'N/A'}</td>
//                 <td>{taskDetails.state || 'N/A'}</td>
//                 <td>{taskDetails.timeSpent || '0s'}</td>
//                 <td>
//                   {taskDetails.startTime
//                     ? new Date(taskDetails.startTime).toLocaleString()
//                     : 'Null'}
//                 </td>
//                 <td>{taskDetails.isRunning ? 'True' : 'False'}</td>
//                 <td>{new Date(taskDetails.createdAt).toLocaleString()}</td>
//                 <td>{new Date(taskDetails.updatedAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTask;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserTask.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../Services/Auth';

const UserTask = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const token = Auth.getToken();

  useEffect(() => {
    if (!token) {
      toast.error('User not authenticated.');
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
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks.');
        setTotalPages(1);
      }
    };

    fetchTasks();
  }, [token, tasksPerPage]); // Re-fetch if tasksPerPage changes (though unlikely here)

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.heading}>Team Tasks Summary</h1>
      
      <div className={styles.usersContainer}>
        {users.map((user) => (
          <div key={user.employeeId} className={styles.userCard}>
            <div 
              className={styles.userHeader} 
              onClick={() => toggleUser(user.employeeId)}
            >
              <div className={styles.userInfo}>
                <h3>{user.username}</h3>
                <span className={styles.employeeId}>{user.employeeId}</span>
              </div>
              <div className={styles.contactInfo}>
                <span>{user.contact.emailId}</span>
                <span>{user.contact.phone}</span>
              </div>
              <div className={styles.toggleIcon}>
                {expandedUser === user.employeeId ? '−' : '+'}
              </div>
            </div>

            {expandedUser === user.employeeId && (
              <div className={styles.projectsContainer}>
                {Object.entries(user.projects).map(([projectName, tasks]) => (
                  <div key={projectName} className={styles.projectCard}>
                    <div 
                      className={styles.projectHeader}
                      onClick={() => toggleProject(projectName, user.employeeId)}
                    >
                      <h4 className={styles.projectName}>{projectName.toUpperCase()}</h4>
                      <span className={styles.taskCount}>{tasks.length} tasks</span>
                      <div className={styles.toggleIcon}>
                        {expandedProject === projectName ? '−' : '+'}
                      </div>
                    </div>

                    {expandedProject === projectName && (
                      <div className={styles.tasksContainer}>
                        {tasks.map((task, index) => (
                          <div key={index} className={styles.taskCard}>
                            <div className={styles.taskHeader}>
                              <h5>{task.taskName}</h5>
                              <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className={styles.taskSubtitle}>
                              <span>{task.subTask}</span>
                              <span>Estimated: {task.estimatedTime}</span>
                            </div>
                            <p className={styles.description}>{task.description}</p>
                            <div className={styles.taskMeta}>
                              <div>
                                <span className={styles.metaLabel}>Deadline:</span>
                                <span>{formatDate(task.deadline)}</span>
                              </div>
                              <div>
                                <span className={styles.metaLabel}>Created:</span>
                                <span>{formatDate(task.createdAt)}</span>
                              </div>
                              <div>
                                <span className={styles.metaLabel}>Updated:</span>
                                <span>{formatDate(task.updatedAt)}</span>
                              </div>
                            </div>
                            {task.additionalNotes && (
                              <div className={styles.notes}>
                                <span className={styles.notesLabel}>Notes:</span>
                                <p>{task.additionalNotes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <nav className={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className={styles.paginationArrow}>
          &lt;
        </button>
        <span className={styles.paginationInfo}>
          {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className={styles.paginationArrow}>
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default UserTask;