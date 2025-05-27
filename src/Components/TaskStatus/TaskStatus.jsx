
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styles from './TaskStatus.module.css';
// import Auth from '../Services/Auth';
// import { toast } from 'react-toastify';

// const TaskStatus = () => {
//   const [tasks, setTasks] = useState({
//     todo: [],
//     inProgress: [],
//     done: [],
//     submitted: [],
//     completed: [],
//   });
  
//   const [isDragging, setIsDragging] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const columnDisplayNames = {
//     todo: 'To Do',
//     inProgress: 'In Progress',
//     done: 'Done',
//     submitted: 'Submitted For Review',
//     completed: 'Completed'
//   };

//   const statusToColumnMap = {
//     'todo': 'todo',
//     'inprogress': 'inProgress',
//     'done': 'done',
//     'submitted': 'submitted',
//     'completed': 'completed'
//   };

//   // Format time spent into a readable format
//   const formatTimeSpent = (timeString) => {
//     if (!timeString) return '0h 0m 0s';
//     if (typeof timeString === 'string') return timeString;
//     if (typeof timeString === 'number') {
//       const hours = Math.floor(timeString / 3600);
//       const minutes = Math.floor((timeString % 3600) / 60);
//       const seconds = Math.floor(timeString % 60);
//       return `${hours}h ${minutes}m ${seconds}s`;
//     }
//     return '0h 0m 0s';
//   };

//   // Fetch tasks from the backend
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = Auth.getToken();
//       if (!token) {
//         toast.error('User not authenticated.');
//         navigate('/login');
//         return;
//       }

//       setLoading(true);
//       try {
//         // Fetch tasks for each status
//         const endpoints = [
//           { url: 'http://209.74.89.83/erpbackend/get-todo-task-details', status: 'todo' },
//           { url: 'http://209.74.89.83/erpbackend/get-progress-task-details', status: 'inProgress' },
//           { url: 'http://209.74.89.83/erpbackend/get-done-task-details', status: 'done' },
//           { url: 'http://209.74.89.83/erpbackend/get-submit-task-details', status: 'submitted' },
//           { url: 'http://209.74.89.83/erpbackend/get-completed-task-details', status: 'completed' }
//         ];

//         const responses = await Promise.all(
//           endpoints.map(endpoint => 
//             axios.get(endpoint.url, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             })
//           )
//         );

//         const serverTasks = {
//           todo: [],
//           inProgress: [],
//           done: [],
//           submitted: [],
//           completed: [],
//         };

//         responses.forEach((response, index) => {
//           const status = endpoints[index].status;
//           if (response.data.message === 'task details fetched successfully' && response.data.taskDetails) {
//             serverTasks[status] = response.data.taskDetails.map(task => ({
//               id: task._id,
//               name: task.taskName,
//               description: task.description,
//               project: task.projectName,
//               user: task.userId?.username || 'Unassigned',
//               email: task.userId?.contact?.emailId || 'No email',
//               state: statusToColumnMap[status.toLowerCase()] || status,
//               timeSpent: formatTimeSpent(task.timeSpent),
//               isRunning: task.isRunning,
//               createdAt: task.createdAt,
//               updatedAt: task.updatedAt,
//               startTime: task.startTime
//             }));
//           }
//         });

//         setTasks(serverTasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         if (error.response?.status === 401) {
//           toast.error('Session expired. Please login again.');
//           Auth.logout();
//           navigate('/login');
//         } else {
//           toast.error('Error fetching tasks.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [navigate]);

//   const handleDragStart = (e, taskId, sourceColumn) => {
//     e.dataTransfer.setData('taskId', taskId);
//     e.dataTransfer.setData('sourceColumn', sourceColumn);
//     setIsDragging(true);
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = async (e, targetColumn) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const taskId = e.dataTransfer.getData('taskId');
//     const sourceColumn = e.dataTransfer.getData('sourceColumn');

//     if (!taskId || sourceColumn === targetColumn) return;

//     const task = tasks[sourceColumn].find(t => t.id === taskId);
//     if (!task) return;

//     const token = Auth.getToken();
//     if (!token) {
//       toast.error('User not authenticated.');
//       navigate('/login');
//       return;
//     }

//     // Save original tasks for potential rollback
//     const originalTasks = {...tasks};

//     try {
//       // Optimistic UI update
//       setTasks(prev => {
//         const newTasks = {...prev};
//         newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== taskId);
//         const updatedTask = {
//           ...task,
//           state: targetColumn
//         };
//         newTasks[targetColumn] = [...newTasks[targetColumn], updatedTask];
//         return newTasks;
//       });

//       // Determine the appropriate API endpoint based on target column
//       let apiUrl;
//       if (targetColumn === 'completed' || targetColumn === 'submitted') {
//         apiUrl = `http://209.74.89.83/erpbackend/update-task-state-by-admin?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[targetColumn])}`;
//       } else {
//         apiUrl = `http://209.74.89.83/erpbackend/update-task-state?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[targetColumn])}`;
//       }

//       const response = await axios.put(
//         apiUrl,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.message !== 'Task state updated successfully.') {
//         throw new Error('Status update failed');
//       }

//       toast.success('Task status updated successfully');
//     } catch (error) {
//       // Rollback on error
//       setTasks(originalTasks);
//       console.error('Error updating task status:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         Auth.logout();
//         navigate('/login');
//       } else {
//         toast.error('Failed to update task status');
//       }
//     }
//   };

//   const handleCreateTask = () => {
//     navigate('/add-task');
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not available';
//     return new Date(dateString).toLocaleString();
//   };

//   return (
//     <div className={styles.board}>
//       <button className={styles.createTaskButton} onClick={handleCreateTask}>
//         + Create Task
//       </button>

//       <div className={styles.columnsContainer}>
//         {Object.keys(tasks).map((column) => (
//           <div
//             key={column}
//             className={`${styles.column} ${isDragging ? styles.dragging : ''}`}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, column)}
//           >
//             <h3>{columnDisplayNames[column]}</h3>
//             <div className={styles.taskList}>
//               {tasks[column].map((task) => (
//                 <div
//                   key={task.id}
//                   className={styles.taskCard}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, task.id, column)}
//                   onDragEnd={handleDragEnd}
//                 >
//                   <h4>{task.name}</h4>
//                   <p>{task.description}</p>
//                   <div className={styles.taskDetails}>
//                     <p><strong>Project:</strong> {task.project}</p>
//                     <p><strong>Assigned to:</strong> {task.user}</p>
//                     <p><strong>Email:</strong> {task.email}</p>
//                     <p className={styles.timeSpent}>
//                       <strong>Time Spent:</strong> 
//                       <span className={task.timeSpent !== '0h 0m 0s' ? styles.highlight : ''}>
//                         {task.timeSpent}
//                       </span>
//                     </p>
//                     <p><strong>Status:</strong> {columnDisplayNames[column]}</p>
//                     <p><strong>Created:</strong> {formatDate(task.createdAt)}</p>
//                     <p><strong>Updated:</strong> {formatDate(task.updatedAt)}</p>
//                     {task.startTime && <p><strong>Started:</strong> {formatDate(task.startTime)}</p>}
//                     <p className={styles.timerStatus}>
//                       <strong>Timer Status:</strong> {task.isRunning ? 'Running' : 'Stopped'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskStatus;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TaskStatus.module.css';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';

const TaskStatus = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
    submitted: [],
    completed: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [movingTask, setMovingTask] = useState(null);
  const navigate = useNavigate();

  const columnOrder = ['todo', 'inProgress', 'done', 'submitted', 'completed'];
  const columnDisplayNames = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    submitted: 'Submitted For Review',
    completed: 'Completed'
  };

  const statusToColumnMap = {
    'todo': 'todo',
    'inprogress': 'inProgress',
    'inProgress': 'inProgress',
    'done': 'done',
    'submitted': 'submitted',
    'completed': 'completed'
  };

  // Format time spent into a readable format
  const formatTimeSpent = (timeString) => {
    if (!timeString) return '0h 0m 0s';
    if (typeof timeString === 'string') return timeString;
    if (typeof timeString === 'number') {
      const hours = Math.floor(timeString / 3600);
      const minutes = Math.floor((timeString % 3600) / 60);
      const seconds = Math.floor(timeString % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return '0h 0m 0s';
  };

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Fetch tasks for each status
      const endpoints = [
        { url: 'http://209.74.89.83/erpbackend/get-todo-task-details', status: 'todo' },
        { url: 'http://209.74.89.83/erpbackend/get-progress-task-details', status: 'inProgress' },
        { url: 'http://209.74.89.83/erpbackend/get-done-task-details', status: 'done' },
        { url: 'http://209.74.89.83/erpbackend/get-submit-task-details', status: 'submitted' },
        { url: 'http://209.74.89.83/erpbackend/get-completed-task-details', status: 'completed' }
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint => 
          axios.get(endpoint.url, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );

      const serverTasks = {
        todo: [],
        inProgress: [],
        done: [],
        submitted: [],
        completed: [],
      };

      responses.forEach((response, index) => {
        const status = endpoints[index].status;
        if (response.data.message === 'task details fetched successfully' && response.data.taskDetails) {
          serverTasks[status] = response.data.taskDetails.map(task => ({
            id: task._id,
            name: task.taskName,
            description: task.description,
            project: task.projectName,
            user: task.userId?.username || 'Unassigned',
            email: task.userId?.contact?.emailId || 'No email',
            state: statusToColumnMap[status.toLowerCase()] || status,
            timeSpent: formatTimeSpent(task.timeSpent),
            isRunning: task.isRunning,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            startTime: task.startTime
          }));
        }
      });

      setTasks(serverTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        Auth.logout();
        navigate('/login');
      } else {
        toast.error('Error fetching tasks.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  const moveTaskToNextColumn = async (taskId, currentColumn) => {
    const currentIndex = columnOrder.indexOf(currentColumn);
    if (currentIndex === -1 || currentIndex === columnOrder.length - 1) return;

    const nextColumn = columnOrder[currentIndex + 1];
    const task = tasks[currentColumn].find(t => t.id === taskId);
    if (!task) return;

    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      navigate('/login');
      return;
    }

    setMovingTask(taskId);

    try {
      // Determine the appropriate API endpoint based on target column
      let apiUrl;
      if (nextColumn === 'completed' || nextColumn === 'submitted') {
        apiUrl = `http://209.74.89.83/erpbackend/update-task-state-by-admin?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[nextColumn])}`;
      } else {
        apiUrl = `http://209.74.89.83/erpbackend/update-task-state?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[nextColumn])}`;
      }

      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message !== 'Task state updated successfully.') {
        throw new Error('Status update failed');
      }

      // Refresh tasks after successful move
      await fetchTasks();
      toast.success(`Task moved to ${columnDisplayNames[nextColumn]}`);
    } catch (error) {
      console.error('Error moving task:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        Auth.logout();
        navigate('/login');
      } else {
        toast.error('Failed to move task');
      }
    } finally {
      setMovingTask(null);
    }
  };

  const handleCreateTask = () => {
    navigate('/add-task');
  };

  const refreshTasks = () => {
    fetchTasks();
    toast.info('Refreshing tasks...');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <button className={styles.createTaskButton} onClick={handleCreateTask}>
          + Create Task
        </button>
        <button className={styles.refreshButton} onClick={refreshTasks}>
          ↻ Refresh
        </button>
      </div>

      <div className={styles.columnsContainer}>
        {columnOrder.map((column) => (
          <div key={column} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3>{columnDisplayNames[column]}</h3>
              <span className={styles.taskCount}>{tasks[column].length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks[column].length > 0 ? (
                tasks[column].map((task) => (
                  <div 
                    key={task.id} 
                    className={`${styles.taskCard} ${movingTask === task.id ? styles.moving : ''}`}
                  >
                    <h4>{task.name}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>
                    <div className={styles.taskDetails}>
                      <p><strong>Project:</strong> {task.project}</p>
                      <p><strong>Assigned to:</strong> {task.user}</p>
                      <p><strong>Email:</strong> {task.email}</p>
                      <p className={styles.timeSpent}>
                        <strong>Time Spent:</strong> 
                        <span className={task.timeSpent !== '0h 0m 0s' ? styles.highlight : ''}>
                          {task.timeSpent}
                        </span>
                      </p>
                      <p><strong>Status:</strong> {columnDisplayNames[column]}</p>
                      <p><strong>Created:</strong> {formatDate(task.createdAt)}</p>
                      <p><strong>Updated:</strong> {formatDate(task.updatedAt)}</p>
                      {task.startTime && <p><strong>Started:</strong> {formatDate(task.startTime)}</p>}
                      <p className={styles.timerStatus}>
                        <strong>Timer Status:</strong> {task.isRunning ? 'Running' : 'Stopped'}
                      </p>
                    </div>
                    {column !== 'completed' && (
                      <button 
                        className={styles.moveButton}
                        onClick={() => moveTaskToNextColumn(task.id, column)}
                        disabled={movingTask === task.id}
                      >
                        {movingTask === task.id ? 'Moving...' : `Move to ${columnDisplayNames[columnOrder[columnOrder.indexOf(column) + 1]]}`}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.emptyColumn}>No tasks in this column</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;