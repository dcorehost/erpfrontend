import React, { useState, useRef, useEffect } from 'react';
import styles from './TaskAssignment.module.css';
import axios from 'axios';
import Auth from '../Services/Auth';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify'; // Highlight Change 1: Imported ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Highlight Change 2: Imported toastify CSS

const TaskAssignment = () => {
  const [formData, setFormData] = useState({
    employeeIds: [],
    projectName: '',
    taskName: '',
    subTask: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    estimatedTime: '',
    additionalNotes: ''
  });

  const [activeSection, setActiveSection] = useState('basic-info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const formContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = Auth.getToken();
      if (!token) {
        toast.error('Authentication required. Please login again.');
        Auth.logout();
        return;
      }
      console.log("Submitting formData:", formData);

      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-admin-tasks',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      toast.success(
        `Task created successfully! Task ID: ${response.data.taskId || `TSK-${Math.floor(Math.random() * 10000)}`}`,
        { autoClose: 5000 } // Highlight Change 3: Added autoClose for toast duration
      );

      setFormData({
        employeeIds: [],
        projectName: '',
        taskName: '',
        subTask: '',
        description: '',
        deadline: '',
        priority: 'Medium',
        estimatedTime: '',
        additionalNotes: ''
      });

    } catch (error) {
      let errorMessage = 'Failed to create task. Please try again.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
          if (error.response.status === 401) {
            Auth.logout();
            errorMessage = 'Session expired. Please login again.';
          }
        } else if (error.request) {
          errorMessage = 'No response from server. Check your network connection.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { autoClose: 5000 }); // Highlight Change 4: Added autoClose for error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setActiveSection(sectionId);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = () => {
    const sections = ['basic-info', 'task-details', 'timing-priority'];
    const scrollPosition = formContainerRef.current.scrollTop + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      const token = Auth.getToken();
      if (!token) {
        toast.error('Authentication required to load dropdowns. Please login.');
        Auth.logout();
        return;
      }

      const authHeaders = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const [empRes, projectRes] = await Promise.all([
          axios.get('http://209.74.89.83/erpbackend/get-emp-ids', authHeaders),
          axios.get('http://209.74.89.83/erpbackend/get-all-projects-name', authHeaders),
        ]);

        console.log("Raw Employee Data Response:", empRes.data);
        let employeeIdsArray = [];
        if (empRes.data && Array.isArray(empRes.data.employees)) {
          employeeIdsArray = empRes.data.employees;
          console.log("Extracted Employee IDs Array (from 'employees' key):", employeeIdsArray);
        } else {
          console.warn("Expected 'employees' array not found for employee IDs. Check backend response format.");
        }

        if (Array.isArray(employeeIdsArray) && employeeIdsArray.length > 0) {
          setEmployeeOptions(
            employeeIdsArray.map((employeeObj) => ({ value: employeeObj.employeeId, label: employeeObj.employeeId }))
          );
          console.log("Final Employee Options Set:", employeeOptions);
        } else {
          console.error('Employee data is not an array or is empty after extraction. Cannot populate dropdown.');
          toast.error('Failed to load employee IDs: unexpected data format or empty.');
          setEmployeeOptions([]);
        }

        console.log("Raw Project Data Response:", projectRes.data);
        let projectNamesArray = [];
        if (projectRes.data && Array.isArray(projectRes.data.data)) {
          projectNamesArray = projectRes.data.data;
          console.log("Extracted Project Names Array (from 'data' key):", projectNamesArray);
        } else {
          console.warn("Expected 'data' array not found for project names. Check backend response format.");
        }

        if (Array.isArray(projectNamesArray) && projectNamesArray.length > 0) {
          setProjectOptions(
            projectNamesArray.map((projectObj) => ({ value: projectObj.name, label: projectObj.name }))
          );
          console.log("Final Project Options Set:", projectOptions);
        } else {
          console.error('Project data is not an array or is empty after extraction. Cannot populate dropdown.');
          toast.error('Failed to load project names: unexpected data format or empty.');
          setProjectOptions([]);
        }

      } catch (err) {
        console.error('Dropdown fetch error caught:', err);
        let errorMessage = 'Failed to fetch dropdown data due to network or server issues.';
        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage = err.response.data.message || `Server error: ${err.response.status}`;
            if (err.response.status === 401) {
              Auth.logout();
              errorMessage = 'Session expired. Please login again.';
            }
          } else if (err.request) {
            errorMessage = 'No response received from server. Check your network connection.';
          }
        } else {
          errorMessage = `An unexpected error occurred: ${err.message}`;
        }
        toast.error(errorMessage);
        setEmployeeOptions([]);
        setProjectOptions([]);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <div className={styles.appContainer}>
      {/* Highlight Change 5: Added ToastContainer here */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className={styles.formWrapper}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>New Task</h2>
            <p>Fill all required fields</p>
          </div>

          <nav className={styles.sidebarNav}>
            <button
              className={`${styles.navItem} ${activeSection === 'basic-info' ? styles.active : ''}`}
              onClick={() => scrollToSection('basic-info')}
            >
              <span className={styles.navIcon}>👤</span>
              <span>Basic Info</span>
            </button>

            <button
              className={`${styles.navItem} ${activeSection === 'task-details' ? styles.active : ''}`}
              onClick={() => scrollToSection('task-details')}
            >
              <span className={styles.navIcon}>📝</span>
              <span>Task Details</span>
            </button>

            <button
              className={`${styles.navItem} ${activeSection === 'timing-priority' ? styles.active : ''}`}
              onClick={() => scrollToSection('timing-priority')}
            >
              <span className={styles.navIcon}>⏱️</span>
              <span>Timing & Priority</span>
            </button>
          </nav>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${activeSection === 'basic-info' ? '33%' : activeSection === 'task-details' ? '66%' : '100%'}`
                }}
              />
            </div>
            <span className={styles.progressText}>
              {activeSection === 'basic-info' ? 'Step 1 of 3' :
                activeSection === 'task-details' ? 'Step 2 of 3' : 'Step 3 of 3'}
            </span>
          </div>
        </div>

        <div
          className={styles.formContainer}
          ref={formContainerRef}
          onScroll={handleScroll}
        >
          <form onSubmit={handleSubmit}>
            <section id="basic-info" className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Basic Information</h2>

              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>Employee ID <span>*</span></label>
                  <Select
                    isMulti
                    options={employeeOptions}
                    value={employeeOptions.filter(option => formData.employeeIds.includes(option.value))}
                    onChange={(selectedOptions) => {
                      const employeeIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                      setFormData(prev => ({ ...prev, employeeIds: employeeIds }));
                    }}
                    placeholder="Select employee ID(s)"
                    isClearable
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Project Name <span>*</span></label>
                  <Select
                    options={projectOptions}
                    value={projectOptions.find(opt => opt.value === formData.projectName)}
                    onChange={(selected) => setFormData(prev => ({ ...prev, projectName: selected ? selected.value : '' }))}
                    placeholder="Select project name"
                    isClearable
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Task Name <span>*</span></label>
                  <input
                    type="text"
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleChange}
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Sub Task</label>
                  <input
                    type="text"
                    name="subTask"
                    value={formData.subTask}
                    onChange={handleChange}
                    placeholder="Enter sub task (optional)"
                  />
                </div>
              </div>
            </section>

            <section id="task-details" className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Task Details</h2>

              <div className={styles.inputGroup}>
                <label>Description <span>*</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task in detail"
                  rows={5}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Any additional notes or instructions"
                  rows={3}
                />
              </div>
            </section>

            <section id="timing-priority" className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Timing & Priority</h2>

              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>Deadline <span>*</span></label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="Select deadline"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Estimated Time</label>
                  <input
                    type="time"
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleChange}
                    step="300"
                    placeholder="HH:MM"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Priority</label>
                  <div className={styles.priorityOptions}>
                    {['High', 'Medium', 'Low', 'Urgent'].map(level => (
                      <label key={level} className={styles.priorityOption}>
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          checked={formData.priority === level}
                          onChange={handleChange}
                        />
                        <span className={`${styles.priorityLabel} ${styles[level.toLowerCase()]}`}>
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Creating Task...
                  </>
                ) : (
                  'Create Task'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;