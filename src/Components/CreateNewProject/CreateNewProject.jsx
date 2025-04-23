

import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateNewProject.module.css';
import Auth from '../Services/Auth';

const CreateNewProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    employeeIds: '',
    deadline: '',
    status: 'pending',
    priority: 'medium'
  });

  const [message, setMessage] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const employeeIds = formData.employeeIds
        .split(',')
        .map(id => id.trim())
        .filter(id => id !== '');

      if (employeeIds.length === 0) {
        throw new Error('Please enter at least one valid employee ID');
      }

      if (!formData.deadline) {
        throw new Error('Please select a deadline date');
      }

      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-project',
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          deadline: formData.deadline,
          status: formData.status,
          priority: formData.priority
        },
        {
          params: { employeeIds: employeeIds.join(',') },
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`
          }
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
        setProjectId(response.data.projectId);
        setFormData({ 
          name: '', 
          description: '', 
          employeeIds: '',
          deadline: '',
          status: 'pending',
          priority: 'medium'
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to create project';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Project</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.scrollableSection}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
              minLength="3"
              maxLength="50"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              required
              minLength="10"
              maxLength="500"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="employeeIds" className={styles.label}>
              Employee IDs (comma-separated) *
            </label>
            <input
              type="text"
              id="employeeIds"
              name="employeeIds"
              value={formData.employeeIds}
              onChange={handleChange}
              className={styles.input}
              required
              pattern="^[a-zA-Z0-9, ]+$"
              placeholder="dcore5447, dcore3246"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="deadline" className={styles.label}>
              Deadline *
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={styles.input}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority" className={styles.label}>
              Priority *
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className={styles.fixedSection}>
          {error && <div className={styles.error}>{error}</div>}
          {message && (
            <div className={styles.success}>
              {message} - Project ID: {projectId}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProject;