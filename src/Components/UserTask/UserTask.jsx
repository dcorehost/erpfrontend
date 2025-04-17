
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
        const response = await axios.get('http://209.74.89.83/erpbackend/get-all-Tasks-forUser', {
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
              <th>Project Name</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Username</th>
              <th>Email</th>
              <th>State</th>
              <th>Time Spent</th>
              <th>Start Time</th>
              <th>Is Running</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(taskDetails => (
              <tr key={taskDetails._id}>
                <td>{taskDetails.projectName}</td>
                <td>{taskDetails.taskName}</td>
                <td>{taskDetails.description}</td>
                <td>{taskDetails.userId?.username || 'N/A'}</td>
                <td>{taskDetails.userId?.contact?.emailId || 'N/A'}</td>
                <td>{taskDetails.state || 'N/A'}</td>
                <td>{taskDetails.timeSpent || '0s'}</td>
                <td>
                  {taskDetails.startTime
                    ? new Date(taskDetails.startTime).toLocaleString()
                    : 'Null'}
                </td>
                <td>{taskDetails.isRunning ? 'True' : 'False'}</td>
                <td>{new Date(taskDetails.createdAt).toLocaleString()}</td>
                <td>{new Date(taskDetails.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTask;
