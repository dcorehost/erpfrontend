


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TimeWaste.module.css';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';

const TimeWaste = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
    submittedForReview: [], 
    completed: [] 
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columnDisplayNames = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    submittedForReview: 'Submitted For Review',  
    completed: 'Completed'
  };

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

  const fetchAllTasks = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const [
        todoResponse,
        inProgressResponse,
        doneResponse
      ] = await Promise.all([
        axios.get('http://209.74.89.83/erpbackend/get-todo-task-details', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://209.74.89.83/erpbackend/get-progress-task-details', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://209.74.89.83/erpbackend/get-done-task-details', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const serverTasks = {
        todo: todoResponse.data?.taskDetails?.map(task => ({
          id: task._id,
          name: task.taskName,
          description: task.description,
          project: task.projectName,
          user: task.userId?.username || 'Unassigned',
          email: task.userId?.contact?.emailId || 'No email',
          state: 'todo',
          timeSpent: formatTimeSpent(task.timeSpent),
          isRunning: task.isRunning,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          startTime: task.startTime
        })) || [],
        
        inProgress: inProgressResponse.data?.taskDetails?.map(task => ({
          id: task._id,
          name: task.taskName,
          description: task.description,
          project: task.projectName,
          user: task.userId?.username || 'Unassigned',
          email: task.userId?.contact?.emailId || 'No email',
          state: 'inProgress',
          timeSpent: formatTimeSpent(task.timeSpent),
          isRunning: task.isRunning,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          startTime: task.startTime
        })) || [],
        
        done: doneResponse.data?.taskDetails?.map(task => ({
          id: task._id,
          name: task.taskName,
          description: task.description,
          project: task.projectName,
          user: task.userId?.username || 'Unassigned',
          email: task.userId?.contact?.emailId || 'No email',
          state: 'done',
          timeSpent: formatTimeSpent(task.timeSpent),
          isRunning: task.isRunning,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          startTime: task.startTime
        })) || [],
        
        // Initialize these as empty arrays
        submittedForReview: [],
        completed: []
      };

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
    fetchAllTasks();
  }, []);

  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateTaskState = async (taskId, newState) => {
    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      navigate('/login');
      return false;
    }

    try {
      const stateName = columnDisplayNames[newState];
      const response = await axios.put(
        `http://209.74.89.83/erpbackend/update-task-state-by-admin?_id=${taskId}&state=${encodeURIComponent(stateName)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.message === 'Task state updated successfully.';
    } catch (error) {
      console.error('Error updating task status:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        Auth.logout();
        navigate('/login');
      } else {
        toast.error('Failed to update task status');
      }
      return false;
    }
  };

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    setIsDragging(false);

    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (!taskId || sourceColumn === targetColumn) return;

    const allowedTransitions = {
      todo: ['inProgress'],
      inProgress: ['todo', 'done'],
      done: ['inProgress', 'submittedForReview'],
      submittedForReview: ['done', 'completed'],
      completed: [] // No transitions from completed
    };

    if (!allowedTransitions[sourceColumn]?.includes(targetColumn)) {
      toast.error(`Cannot move task from ${columnDisplayNames[sourceColumn]} to ${columnDisplayNames[targetColumn]}`);
      return;
    }

    const task = tasks[sourceColumn].find(t => t.id === taskId);
    if (!task) return;

    const originalTasks = { ...tasks };

    try {
      // Optimistic UI update
      setTasks(prev => {
        const newTasks = { ...prev };
        newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== taskId);
        const updatedTask = {
          ...task,
          state: targetColumn
        };
        newTasks[targetColumn] = [...newTasks[targetColumn], updatedTask];
        return newTasks;
      });

      // API call to update status
      const success = await updateTaskState(taskId, targetColumn);
      if (!success) {
        throw new Error('Status update failed');
      } 

      // Refresh tasks after successful update
      await fetchAllTasks();
      toast.success('Task status updated successfully');
    } catch (error) {
      // Rollback on error
      setTasks(originalTasks);
      console.error('Error updating task status:', error);
    }
  };

  const handleCreateTask = () => {
    navigate('/add-task');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={styles.board}>
      <button className={styles.createTaskButton} onClick={handleCreateTask}>
        + Create Task
      </button>

      <div className={styles.columnsContainer}>
        {Object.keys(tasks).map((column) => (
          <div
            key={column}
            className={`${styles.column} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <h3>{columnDisplayNames[column]}</h3>
            <div className={styles.taskList}>
              {tasks[column].map((task) => (
                <div
                  key={task.id}
                  className={styles.taskCard}
                  draggable={column !== 'completed'}
                  onDragStart={column !== 'completed' ? (e) => handleDragStart(e, task.id, column) : undefined}
                  onDragEnd={handleDragEnd}
                >
                  <h4>{task.name}</h4>
                  <p>{task.description}</p>
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
                    <p><strong>Timer Status:</strong> {task.isRunning ? 'Running' : 'Stopped'}</p>
                    <p>The time which i want t waste: is call the time wast </p>
                    <h3>Way of wasting Time </h3>
                    <h4>Their are many way of wasting time </h4>
                    <h4>Such as ..</h4>
                    <p><h2>1</h2> Boss ko chutiya bano.Or mere bale case me tho sala boss he hi chutiya </p>
                    <p>Vote poll</p>
                    <button>My boss is also a chutiya </button> 
                    <button>My Boss I The Best</button>
                    <button>Tarki he madahr jat</button>

                    <p><h2>2</h2>Office me Teame mate ke sath time pass kare  </p>
                    <p><h2>3</h2>Hr Ko pata lo sab se sahi usi ke pass time pass karo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeWaste;