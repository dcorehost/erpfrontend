
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserTask.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../Services/Auth';

const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const token = Auth.getToken();

  useEffect(() => {
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://209.74.89.83/erpbackend/get-tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.taskDetails) {
          setTasks(response.data.taskDetails);
        } else {
          toast.info('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.heading}>All Tasks</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Task</th>
              <th>Description</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>State</th>
              <th>Time Spent</th>
              <th>Start Time</th>
              <th>Is Running</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.projectName}</td>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.userId?.username || 'N/A'}</td>
                <td>{task.userId?.contact?.emailId || 'N/A'}</td>
                <td>{new Date(task.createdAt).toLocaleString()}</td>
                <td>{task.state || 'N/A'}</td>
                <td>{task.timeSpent || '0s'}</td>
                <td>
                  {task.startTime
                    ? new Date(task.startTime).toLocaleString()
                    : 'Null'}
                </td>
                <td>{task.isRunning ? 'True' : 'False'}</td>
                <td>{new Date(task.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTask;
