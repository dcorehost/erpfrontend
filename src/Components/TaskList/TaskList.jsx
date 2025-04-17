

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TaskList.module.css';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';

const TaskList = () => {
  // Load tasks from localStorage if available, otherwise initialize empty
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : {
      todo: [],
      inProgress: [],
      done: [],
      submitted: [],
      completed: [],
    };
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const columnDisplayNames = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    submitted: 'Submitted For Review',
    completed: 'Completed'
  };

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Fetch tasks from the backend and merge with localStorage
  useEffect(() => {
    const fetchTasks = async () => {
      const token = Auth.getToken();
      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      try {
        // Fetch regular tasks
        const tasksResponse = await axios.get(
          'http://209.74.89.83/erpbackend/get-tasks',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Fetch submitted tasks
        const submittedResponse = await axios.get(
          'http://209.74.89.83/erpbackend/get-submittedTasks-forUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Fetch completed tasks
        const completedResponse = await axios.get(
          'http://209.74.89.83/erpbackend/get-completedTasks-forUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const serverTasks = {
          todo: [],
          inProgress: [],
          done: [],
          submitted: [],
          completed: [],
        };

        // Process regular tasks
        if (tasksResponse.data.message === 'task details fetched successfully') {
          tasksResponse.data.taskDetails.forEach((task) => {
            const taskObj = {
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: task.state || 'todo',
              timeSpent: task.timeSpent,
              isRunning: task.isRunning,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            };

            const column = task.state ? 
              task.state.toLowerCase().replace(/\s+/g, '') : 'todo';
            
            if (serverTasks[column]) {
              serverTasks[column].push(taskObj);
            } else {
              serverTasks.todo.push(taskObj);
            }
          });
        }

        // Process submitted tasks
        if (submittedResponse.data.message === 'task details fetched successfully') {
          submittedResponse.data.taskDetails.forEach((task) => {
            const taskObj = {
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: 'submitted',
              timeSpent: task.timeSpent,
              isRunning: task.isRunning,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            };

            serverTasks.submitted.push(taskObj);
          });
        }

        // Process completed tasks
        if (completedResponse.data.message === 'task details fetched successfully') {
          completedResponse.data.taskDetails.forEach((task) => {
            const taskObj = {
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: 'completed',
              timeSpent: task.timeSpent,
              isRunning: task.isRunning,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            };

            serverTasks.completed.push(taskObj);
          });
        }

        // Merge with locally stored tasks (preserving any local changes)
        setTasks(prev => {
          const mergedTasks = {...serverTasks};
          
          // Preserve the order and status of tasks that exist in both
          Object.keys(prev).forEach(column => {
            prev[column].forEach(localTask => {
              const existsInServer = Object.values(serverTasks)
                .flat()
                .some(serverTask => serverTask.id === localTask.id);
              
              if (!existsInServer) {
                mergedTasks[localTask.state] = [
                  ...(mergedTasks[localTask.state] || []),
                  localTask
                ];
              }
            });
          });
          
          return mergedTasks;
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks.');
      }
    };

    fetchTasks();
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

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    setIsDragging(false);

    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (!taskId || sourceColumn === targetColumn) return;

    const task = tasks[sourceColumn].find(t => t.id === taskId);
    if (!task) return;

    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    // Save original tasks for potential rollback
    const originalTasks = {...tasks};

    try {
      // Optimistic UI update
      setTasks(prev => {
        const newTasks = {...prev};
        newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== taskId);
        const updatedTask = {
          ...task,
          state: targetColumn
        };
        newTasks[targetColumn] = [...newTasks[targetColumn], updatedTask];
        return newTasks;
      });

      // API call to update status
      const response = await axios.put(
        `http://209.74.89.83/erpbackend/update-task-state?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[targetColumn])}`,
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

      toast.success('Task status updated successfully');
    } catch (error) {
      // Rollback on error
      setTasks(originalTasks);
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
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
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column)}
                  onDragEnd={handleDragEnd}
                >
                  <h4>{task.name}</h4>
                  <p>{task.description}</p>
                  <div className={styles.taskDetails}>
                    <p><strong>Project:</strong> {task.project}</p>
                    <p><strong>Assigned to:</strong> {task.user}</p>
                    <p><strong>Email:</strong> {task.email}</p>
                    <p><strong>Time Spent:</strong> {task.timeSpent || '0h 0m 0s'}</p>
                    <p><strong>Status:</strong> {columnDisplayNames[column]}</p>
                    <p><strong>Created:</strong> {formatDate(task.createdAt)}</p>
                    <p><strong>Updated:</strong> {formatDate(task.updatedAt)}</p>
                    {task.startTime && <p><strong>Started:</strong> {formatDate(task.startTime)}</p>}
                    <p><strong>Timer:</strong> {task.isRunning ? 'Running' : 'Stopped'}</p>
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

export default TaskList;