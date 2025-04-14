// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from "./AddTask.module.css";
// import { FaPlay, FaPause } from 'react-icons/fa';
// import Auth from '../Services/Auth';
// import { toast } from 'react-toastify';

// const AddTaskPage = () => {
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskProject, setTaskProject] = useState('');
//   const [createdTasks, setCreatedTasks] = useState([]);
//   const navigate = useNavigate();

//   const projects = ['Project A', 'Project B', 'Project C'];
//   const intervalsRef = useRef([]);

//   useEffect(() => {
//     return () => {
//       intervalsRef.current.forEach(clearInterval);
//     };
//   }, []);

//   const token = Auth.getToken();
//   if (!token) {
//     toast.error('User not authenticated.');
//     return null;
//   }

//   const addTask = async () => {
//     if (createdTasks.some(task => task.isRunning)) {
//       toast.error('Please pause all tasks before creating a new one.');
//       return;
//     }

//     const requestData = {
//       projectName: taskProject,
//       taskName: taskTitle,
//       description: taskDescription,
//     };

//     try {
//       const response = await axios.post('http://209.74.89.83/erpbackend/create-tasks', requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const newTask = {
//         ...response.data.task,
//         timer: 0,
//         isRunning: false,
//       };

//       setCreatedTasks((prevTasks) => [...prevTasks, newTask]);
//       resetForm();
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error('Error creating task:', error);
//       toast.error('Error creating task.');
//     }
//   };

//   const resetForm = () => {
//     setTaskTitle('');
//     setTaskDescription('');
//     setTaskProject('');
//   };

//   const toggleTimer = async (index) => {
//     setCreatedTasks((prevTasks) => {
//       const updatedTasks = prevTasks.map((task, i) => {
//         if (i === index) {
//           const isRunning = !task.isRunning;
//           console.log(`Task "${task.taskName}" is now ${isRunning ? 'resume' : 'pause'}`);

//           if (isRunning) {
//             if (intervalsRef.current[index]) {
//               clearInterval(intervalsRef.current[index]);
//               intervalsRef.current[index] = null;
//             }

//             const interval = setInterval(() => {
//               setCreatedTasks((prevTasks) =>
//                 prevTasks.map((t, idx) =>
//                   idx === index ? { ...t, timer: t.timer + 1 } : t
//                 )
//               );
//             }, 1000);

//             intervalsRef.current[index] = interval;
//           } else {
//             if (intervalsRef.current[index]) {
//               clearInterval(intervalsRef.current[index]);
//               intervalsRef.current[index] = null;
//             }
//           }

//           return { ...task, isRunning };
//         }
//         return task;
//       });

//       return updatedTasks;
//     });

//     const task = createdTasks[index];
//     await updateTaskStatus(task._id, task.isRunning ? 'pause' : 'resume');
//   };

//   const updateTaskStatus = async (taskId, action) => {
//     console.log(`Updating task ${taskId} status to ${action}`);
//     try {
//       const response = await axios.put(`http://209.74.89.83/erpbackend/update-task-action?_id=${taskId}`, { action }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(`Successfully updated task ${taskId} to ${action}`, response.data);

//       setCreatedTasks((prevTasks) =>
//         prevTasks.map(task =>
//           task._id === taskId ? { ...task, timeSpent: response.data.task.timeSpent } : task
//         )
//       );
//     } catch (error) {
//       console.error('Error updating task status:', error);
//       toast.error('Error updating task status.');
//     }
//   };

//   return (
//     <div className={styles.app}>
//       <div className={styles.container}>
//         <h1>Add Task</h1>
//         <div className={styles.taskForm}>
//           <div className={styles.taskRow}>
//             <select value={taskProject} onChange={(e) => setTaskProject(e.target.value)} className={styles.projectSelect}>
//               <option value="">Select Project</option>
//               {projects.map((project) => (
//                 <option key={project} value={project}>{project}</option>
//               ))}
//             </select>

//             <input
//               type="text"
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               required
//               className={styles.taskInput}
//             />
//           </div>

//           <textarea
//             placeholder="Task Description"
//             value={taskDescription}
//             onChange={(e) => setTaskDescription(e.target.value)}
//             className={styles.taskTextarea}
//           />
          
//           <button onClick={addTask} className={styles.addButton} disabled={createdTasks.some(task => task.isRunning)}>Add Task</button>
//         </div>

//         <div className={styles.createdTasksContainer}>
//           {createdTasks.map((task, index) => (
//             <div key={index} className={styles.createdTask}>
//               <h2>Task: {task.taskName}</h2>
//               <p><strong>Project:</strong> {task.projectName}</p>
//               <p><strong>Description:</strong> {task.description}</p>
//               <p><strong>Timer:</strong> {String(Math.floor(task.timer / 3600)).padStart(2, '0')}:{String(Math.floor((task.timer % 3600) / 60)).padStart(2, '0')}:{String(task.timer % 60).padStart(2, '0')}</p>
//               <button onClick={() => toggleTimer(index)} className={styles.timerButton}>
//                 {task.isRunning ? <FaPause /> : <FaPlay />}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button className={styles.viewTasks} onClick={() => navigate('/task-list')}>View Tasks</button>
//     </div>
//   );
// };

// export default AddTaskPage;



import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./AddTask.module.css";
import { FaPlay, FaPause } from 'react-icons/fa';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';

const AddTaskPage = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [createdTasks, setCreatedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const intervalsRef = useRef([]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const token = Auth.getToken();
  if (!token) {
    toast.error('User not authenticated.');
    return null;
  }

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
          const response = await axios.get('http://209.74.89.83/erpbackend/get-projects-name?employeeId=dcore5447', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.data && response.data.projects) {
              setProjects(response.data.projects.map(project => project.name));
          }
      } catch (error) {
          console.error('Error fetching projects:', error);
          toast.error('Error fetching projects');
      } finally {
          setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const addTask = async () => {
    if (createdTasks.some(task => task.isRunning)) {
      toast.error('Please pause all tasks before creating a new one.');
      return;
    }

    if (!taskProject) {
      toast.error('Please select a project');
      return;
    }

    const requestData = {
      projectName: taskProject,
      taskName: taskTitle,
      description: taskDescription,
    };

    try {
      const response = await axios.post('http://209.74.89.83/erpbackend/create-tasks', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newTask = {
        ...response.data.task,
        timer: 0,
        isRunning: false,
      };

      setCreatedTasks((prevTasks) => [...prevTasks, newTask]);
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task.');
    }
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskProject('');
  };

  const toggleTimer = async (index) => {
    setCreatedTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          const isRunning = !task.isRunning;
          console.log(`Task "${task.taskName}" is now ${isRunning ? 'resume' : 'pause'}`);

          if (isRunning) {
            if (intervalsRef.current[index]) {
              clearInterval(intervalsRef.current[index]);
              intervalsRef.current[index] = null;
            }

            const interval = setInterval(() => {
              setCreatedTasks((prevTasks) =>
                prevTasks.map((t, idx) =>
                  idx === index ? { ...t, timer: t.timer + 1 } : t
                )
              );
            }, 1000);

            intervalsRef.current[index] = interval;
          } else {
            if (intervalsRef.current[index]) {
              clearInterval(intervalsRef.current[index]);
              intervalsRef.current[index] = null;
            }
          }

          return { ...task, isRunning };
        }
        return task;
      });

      return updatedTasks;
    });

    const task = createdTasks[index];
    await updateTaskStatus(task._id, task.isRunning ? 'pause' : 'resume');
  };

  const updateTaskStatus = async (taskId, action) => {
    console.log(`Updating task ${taskId} status to ${action}`);
    try {
      const response = await axios.put(`http://209.74.89.83/erpbackend/update-task-action?_id=${taskId}`, { action }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(`Successfully updated task ${taskId} to ${action}`, response.data);

      setCreatedTasks((prevTasks) =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, timeSpent: response.data.task.timeSpent } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status.');
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>Add Task</h1>
        <div className={styles.taskForm}>
          <div className={styles.taskRow}>
            <select 
              value={taskProject} 
              onChange={(e) => setTaskProject(e.target.value)} 
              className={styles.projectSelect}
              disabled={loading}
            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className={styles.taskInput}
            />
          </div>

          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className={styles.taskTextarea}
          />
          
          <button 
            onClick={addTask} 
            className={styles.addButton} 
            disabled={createdTasks.some(task => task.isRunning) || loading}
          >
            {loading ? 'Loading...' : 'Add Task'}
          </button>
        </div>

        <div className={styles.createdTasksContainer}>
          {createdTasks.map((task, index) => (
            <div key={index} className={styles.createdTask}>
              <h2>Task: {task.taskName}</h2>
              <p><strong>Project:</strong> {task.projectName}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Timer:</strong> {String(Math.floor(task.timer / 3600)).padStart(2, '0')}:{String(Math.floor((task.timer % 3600) / 60)).padStart(2, '0')}:{String(task.timer % 60).padStart(2, '0')}</p>
              <button onClick={() => toggleTimer(index)} className={styles.timerButton}>
                {task.isRunning ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.viewTasks} onClick={() => navigate('/task-list')}>View Tasks</button>
    </div>
  );
};

export default AddTaskPage;