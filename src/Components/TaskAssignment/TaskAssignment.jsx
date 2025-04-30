







import React, { useState, useRef, useEffect } from 'react';
import styles from './TaskAssignment.module.css';
import axios from 'axios';
import Auth from '../Services/Auth';

const TaskAssignment = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
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
  const [submitStatus, setSubmitStatus] = useState(null);
  const formContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const token = Auth.getToken();
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

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

      setSubmitStatus({
        success: true,
        message: response.data.message || 'Task created successfully!',
        taskId: response.data.taskId || `TSK-${Math.floor(Math.random() * 10000)}`
      });

      // Reset form after successful submission
      setFormData({
        employeeId: '',
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
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        if (error.response.status === 401) {
          Auth.logout();
          errorMessage = 'Session expired. Please login again.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
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

  // Add scroll event listener
  useEffect(() => {
    const container = formContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={styles.appContainer}>
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
          {submitStatus && (
            <div className={`${styles.statusMessage} ${submitStatus.success ? styles.success : styles.error}`}>
              <div className={styles.statusContent}>
                {submitStatus.success ? '✓' : '⚠️'}
                <div>
                  <p>{submitStatus.message}</p>
                  {submitStatus.taskId && (
                    <span className={styles.taskId}>Task ID: {submitStatus.taskId}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <section id="basic-info" className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Basic Information</h2>
              
              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>Employee ID <span>*</span></label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Project Name <span>*</span></label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
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