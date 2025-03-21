import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TaskList.module.css';
import Auth from '../Services/Auth';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
    submitted: [],
    completed: [],
  });

  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = Auth.getToken();
      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/get-tasks',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.message === 'task details fetched successfully') {
          const todoTasks = response.data.taskDetails.map((task) => ({
            id: task._id,
            name: task.taskName,
            description: task.description,
            project: task.projectName,
            user: task.userId.username,
          }));

          setTasks((prevTasks) => ({
            ...prevTasks,
            todo: todoTasks,
          }));
        } else {
          toast.error('Failed to fetch tasks.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks.');
      }
    };

    fetchTasks();
  }, []);

  const handleDrop = (e, column) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    if (task) {
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        for (const key in newTasks) {
          newTasks[key] = newTasks[key].filter((t) => t.id !== task.id);
        }
        newTasks[column].push(task);
        return newTasks;
      });
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleCreateTask = () => {
    navigate('/add-task');
  };

  return (
    <div className={styles.board}>
      <button className={styles.createTaskButton} onClick={handleCreateTask}>
        +
      </button>

      {['todo', 'inProgress', 'done', 'submitted', 'completed'].map((column) => (
        <div
          className={styles.column}
          key={column}
          onDrop={(e) => handleDrop(e, column)}
          onDragOver={allowDrop}
        >
          <h3>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
          <div className={styles.scrollableCardList}>
            {tasks[column].map((task) => (
              <div
                className={styles.card}
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              >
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                <p><strong>Project:</strong> {task.project}</p>
                <p><strong>Assigned to:</strong> {task.user}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;