

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./AddTask.module.css";
import { FaPlay, FaPause } from 'react-icons/fa';
import Auth from '../Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';

const AddTaskPage = () => {
    const [loader, setLoader] = useState(false);  
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [createdTasks, setCreatedTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const intervalsRef = useRef([]);
  const createdTasksContainerRef = useRef(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(createdTasks));
  }, [createdTasks]);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  // Restore running timers on page load
  useEffect(() => {
    createdTasks.forEach((task, index) => {
      if (task.isRunning) {
        startTimer(index, task.timer);
      }
    });
  }, []); // Empty dependency array to run only on mount

  const token = Auth.getToken();
  if (!token) {
    toast.error('User not authenticated.');
    return null;
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setLoader(true)
      
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
        setLoader(false)
      }
      
    };

    fetchProjects();
  }, [token]);

  const startTimer = (index, initialTime = 0) => {
    if (intervalsRef.current[index]) {
      clearInterval(intervalsRef.current[index]);
    }

    const startTime = Date.now() - (initialTime * 1000);

    intervalsRef.current[index] = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

      setCreatedTasks(prevTasks =>
        prevTasks.map((task, idx) =>
          idx === index ? { ...task, timer: elapsedSeconds } : task
        )
      );
    }, 1000);
  };

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
        lastStartTime: null,
      };

      setCreatedTasks(prevTasks => [...prevTasks, newTask]);
      resetForm();
      toast.success(response.data.message || 'Task created successfully');
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
    const task = createdTasks[index];
    const isRunning = !task.isRunning;

    if (isRunning) {
      // Starting the timer
      startTimer(index, task.timer);
    } else {
      // Pausing the timer
      if (intervalsRef.current[index]) {
        clearInterval(intervalsRef.current[index]);
        intervalsRef.current[index] = null;
      }
    }

    setCreatedTasks(prevTasks =>
      prevTasks.map((t, idx) =>
        idx === index ? { ...t, isRunning, lastStartTime: isRunning ? Date.now() : null } : t
      )
    );

    await updateTaskStatus(task._id, isRunning ? 'resume' : 'pause');
  };

  const updateTaskStatus = async (taskId, action) => {
    setLoader(true)
      
    try {
      const response = await axios.put(
        `http://209.74.89.83/erpbackend/update-task-action?_id=${taskId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCreatedTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, timeSpent: response.data.task.timeSpent } : task
        )
      );
      setLoader(false)
      
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status.');
      setLoader(false)
      
    }
  };

  const formatTime = (seconds) => {
    return [
      String(Math.floor(seconds / 3600)).padStart(2, '0'),
      String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'),
      String(seconds % 60).padStart(2, '0')
    ].join(':');
  };
if (loader) {
    return <Loader />;
  }
  return (
    <div className={styles.app}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

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
                <option key={index} value={project}>
                  {project}
                </option>
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

        <div ref={createdTasksContainerRef} className={styles.createdTasksContainer}>
          {createdTasks.map((task, index) => (
            <div key={index} className={styles.createdTask}>
              <h2>Task: {task.taskName}</h2>
              <p><strong>Project:</strong> {task.projectName}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Timer:</strong> {formatTime(task.timer)}</p>
              <button onClick={() => toggleTimer(index)} className={styles.timerButton}>
                {task.isRunning ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
