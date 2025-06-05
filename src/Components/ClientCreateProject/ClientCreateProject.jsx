import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ClientCreateProject.module.css';
import Auth from '../Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

const ClientCreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    employeeIds: [],
    deadline: '',
    status: 'pending',
    priority: 'Medium'
  });

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch employees
  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get('http://209.74.89.83/erpbackend/get-emp-ids', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      });

      console.log("Employee fetch response:", response.data);
      const employees = response.data.employees || [];

      const options = employees.map(emp => ({
        value: emp.employeeId,
        label: emp.employeeId
      }));

      setEmployeeOptions(options);
      console.log("Dropdown employee options set:", options);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error('Failed to load employee list');
    }
  };

  useEffect(() => {
    fetchEmployeeIds();
  }, []);

  // Input field changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Select field for employee IDs
  const handleEmployeeSelect = (selected) => {
    const selectedIds = selected.map(opt => opt.value);
    setFormData(prev => ({
      ...prev,
      employeeIds: selectedIds
    }));
    console.log("Selected employee IDs:", selectedIds);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log("Submitting project with data:", formData);

    // Validate before submission
    if (!formData.name || formData.name.trim().length < 3) {
      setError("Project name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (!formData.description || formData.description.trim().length < 10) {
      setError("Project description must be at least 10 characters.");
      setLoading(false);
      return;
    }

    if (!formData.deadline) {
      setError("Please provide a project deadline.");
      setLoading(false);
      return;
    }

    if (!formData.employeeIds.length) {
      setError("Select at least one employee.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-project',
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          deadline: formData.deadline,
          priority: formData.priority,
          employeeIds: formData.employeeIds
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("API Response:", response.data);

      if (response.data?.projectId) {
        toast.success("Project created successfully!", { position: "top-center" });
        setTimeout(() => {
          navigate('/Admin/Leave/pd');
        }, 2000);
      } else {
        throw new Error(response.data.message || "Unexpected response from server.");
      }

    } catch (err) {
      console.error("Create project error:", err);
      const errMsg = err.response?.data?.message || err.message || "Server error";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.card}>
        <h2 className={styles.title}>Create New Project</h2>
        <div className={styles.divider}></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.scrollableSection}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter project name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows="4"
                required
                placeholder="Project details"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Select Employees *</label>
              <Select
                isMulti
                options={employeeOptions}
                onChange={handleEmployeeSelect}
                value={employeeOptions.filter(opt => formData.employeeIds.includes(opt.value))}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Deadline *</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={styles.input}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                <label className={styles.label}>Priority *</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                <label className={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.fixedSection}>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreateProject;
