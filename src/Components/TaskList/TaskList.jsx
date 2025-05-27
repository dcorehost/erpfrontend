

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TaskList.module.css';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
    submitted: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [movingTask, setMovingTask] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Define column order and display names
  const columnOrder = ['todo', 'inProgress', 'done', 'submitted', 'completed'];
  const columnDisplayNames = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    submitted: 'Submitted For Review',
    completed: 'Completed'
  };

  // Map backend states to our column keys
  const stateToColumnMap = {
    'todo': 'todo',
    'inprogress': 'inProgress',
    'inProgress': 'inProgress',
    'done': 'done',
    'submitted': 'submitted',
    'completed': 'completed',
    'review': 'submitted'
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = Auth.getToken();
      if (!token) {
        toast.error('User not authenticated.');
        setLoading(false);
        return;
      }

      setLoader(true)
      try {
        // Fetch all task types in parallel
        const [tasksResponse, submittedResponse, completedResponse] = await Promise.all([
          axios.get('http://209.74.89.83/erpbackend/get-tasks', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('http://209.74.89.83/erpbackend/get-submittedTasks-forUser', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('http://209.74.89.83/erpbackend/get-completedTasks-forUser', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        const serverTasks = {
          todo: [],
          inProgress: [],
          done: [],
          submitted: [],
          completed: [],
        };

        // Process regular tasks
        if (tasksResponse.data?.message === 'task details fetched successfully') {
          tasksResponse.data.taskDetails.forEach((task) => {
            const taskObj = {
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: task.state || 'todo',
              timeSpent: task.timeSpent || '0h 0m 0s',
              isRunning: task.isRunning || false,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            };

            // Normalize the state and map to our columns
            const normalizedState = String(taskObj.state).toLowerCase().replace(/\s+/g, '');
            const column = stateToColumnMap[normalizedState] || 'todo';
            
            if (serverTasks[column]) {
              serverTasks[column].push(taskObj);
            } else {
              serverTasks.todo.push(taskObj);
            }
          });
        }

        // Process submitted tasks
        if (submittedResponse.data?.message === 'task details fetched successfully') {
          submittedResponse.data.taskDetails.forEach((task) => {
            serverTasks.submitted.push({
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: 'submitted',
              timeSpent: task.timeSpent || '0h 0m 0s',
              isRunning: task.isRunning || false,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            });
          });
        }

        // Process completed tasks
        if (completedResponse.data?.message === 'task details fetched successfully') {
          completedResponse.data.taskDetails.forEach((task) => {
            serverTasks.completed.push({
              id: task._id,
              name: task.taskName,
              description: task.description,
              project: task.projectName,
              user: task.userId?.username || 'Unassigned',
              email: task.userId?.contact?.emailId || 'No email',
              state: 'completed',
              timeSpent: task.timeSpent || '0h 0m 0s',
              isRunning: task.isRunning || false,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              startTime: task.startTime
            });
          });
        }

        setTasks(serverTasks);
        setLoading(false);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks.');
        setLoading(false);
        setLoader(false);
      }
    };

    fetchTasks();
  }, []);

  const moveTaskToNextColumn = async (taskId, currentColumn) => {
    const currentIndex = columnOrder.indexOf(currentColumn);
    if (currentIndex === -1 || currentIndex === columnOrder.length - 1) {
      return; // Already in the last column or invalid column
    }

    const nextColumn = columnOrder[currentIndex + 1];
    const task = tasks[currentColumn].find(t => t.id === taskId);
    if (!task) return;

    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    setMovingTask(taskId);

    try {
      // First update the backend

      const response = await axios.put(
        `http://209.74.89.83/erpbackend/update-task-state?_id=${taskId}&state=${encodeURIComponent(columnDisplayNames[nextColumn])}`,
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

      // Only update UI after successful backend update
      setTasks(prev => {
        const newTasks = {...prev};
        newTasks[currentColumn] = newTasks[currentColumn].filter(t => t.id !== taskId);
        const updatedTask = {
          ...task,
          state: nextColumn
        };
        newTasks[nextColumn] = [...newTasks[nextColumn], updatedTask];
        return newTasks;
      });

      toast.success(`Task moved to ${columnDisplayNames[nextColumn]}`);
    } catch (error) {
      console.error('Error moving task:', error);
      toast.error('Failed to move task');
    } finally {
      setMovingTask(null);
    }
  };

  const handleCreateTask = () => {
    navigate('/add-task');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  if (loader) {
        return <Loader />;

  }

  return (
    <div className={styles.board}>
      <button className={styles.createTaskButton} onClick={handleCreateTask}>
        + Create Task
      </button>

      <div className={styles.columnsContainer}>
        {columnOrder.map((column) => (
          <div key={column} className={styles.column}>
            <h3>{columnDisplayNames[column]} ({tasks[column].length})</h3>
            <div className={styles.taskList}>
              {tasks[column].length > 0 ? (
                tasks[column].map((task) => (
                  <div key={task.id} className={styles.taskCard}>
                    <h4>{task.name}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>
                    <div className={styles.taskDetails}>
                      <p><strong>Project:</strong> {task.project}</p>
                      <p><strong>Assigned to:</strong> {task.user}</p>
                      <p><strong>Email:</strong> {task.email}</p>
                      <p><strong>Time Spent:</strong> {task.timeSpent}</p>
                      <p><strong>Status:</strong> {columnDisplayNames[column]}</p>
                      <p><strong>Created:</strong> {formatDate(task.createdAt)}</p>
                      <p><strong>Updated:</strong> {formatDate(task.updatedAt)}</p>
                      {task.startTime && <p><strong>Started:</strong> {formatDate(task.startTime)}</p>}
                      <p><strong>Timer:</strong> {task.isRunning ? 'Running' : 'Stopped'}</p>
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

export default TaskList;