// import React, { useState } from 'react';
// import styles from './TaskAssignment.module.css';
// import { FiUser, FiCalendar, FiFlag, FiClock, FiSend } from 'react-icons/fi';

// const TaskAssignment = () => {
//   // Sample user data
//   const users = [
//     { id: 1, name: "John Doe", role: "Developer" },
//     { id: 2, name: "Jane Smith", role: "Designer" },
//     { id: 3, name: "Mike Johnson", role: "Manager" },
//     { id: 4, name: "Sarah Williams", role: "QA Tester" }
//   ];

//   // State for form data
//   const [taskData, setTaskData] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     priority: 'medium',
//     dueDate: '',
//     estimatedHours: '',
//     status: 'pending'
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!taskData.title) newErrors.title = 'Title is required';
//     if (!taskData.assignedTo) newErrors.assignedTo = 'Assignee is required';
//     if (!taskData.dueDate) newErrors.dueDate = 'Due date is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Task assigned:', taskData);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//       setTaskData({
//         title: '',
//         description: '',
//         assignedTo: '',
//         priority: 'medium',
//         dueDate: '',
//         estimatedHours: '',
//         status: 'pending'
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.header}>
//         <FiSend className={styles.headerIcon} />
//         Assign New Task
//       </h2>

//       {success && (
//         <div className={styles.successMessage}>
//           Task assigned successfully!
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="title">Task Title*</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={taskData.title}
//             onChange={handleChange}
//             className={errors.title ? styles.errorInput : ''}
//             placeholder="Enter task title"
//           />
//           {errors.title && <span className={styles.error}>{errors.title}</span>}
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={taskData.description}
//             onChange={handleChange}
//             rows="4"
//             placeholder="Enter task details"
//           />
//         </div>

//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="assignedTo">
//               <FiUser className={styles.inputIcon} />
//               Assign To*
//             </label>
//             <select
//               id="assignedTo"
//               name="assignedTo"
//               value={taskData.assignedTo}
//               onChange={handleChange}
//               className={errors.assignedTo ? styles.errorInput : ''}
//             >
//               <option value="">Select User</option>
//               {users.map(user => (
//                 <option key={user.id} value={user.id}>
//                   {user.name} ({user.role})
//                 </option>
//               ))}
//             </select>
//             {errors.assignedTo && <span className={styles.error}>{errors.assignedTo}</span>}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="priority">
//               <FiFlag className={styles.inputIcon} />
//               Priority
//             </label>
//             <select
//               id="priority"
//               name="priority"
//               value={taskData.priority}
//               onChange={handleChange}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="dueDate">
//               <FiCalendar className={styles.inputIcon} />
//               Due Date*
//             </label>
//             <input
//               type="date"
//               id="dueDate"
//               name="dueDate"
//               value={taskData.dueDate}
//               onChange={handleChange}
//               className={errors.dueDate ? styles.errorInput : ''}
//             />
//             {errors.dueDate && <span className={styles.error}>{errors.dueDate}</span>}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="estimatedHours">
//               <FiClock className={styles.inputIcon} />
//               Estimated Hours
//             </label>
//             <input
//               type="number"
//               id="estimatedHours"
//               name="estimatedHours"
//               value={taskData.estimatedHours}
//               onChange={handleChange}
//               min="1"
//               placeholder="Hours"
//             />
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           <button type="submit" className={styles.submitButton}>
//             Assign Task
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TaskAssignment;



// import React, { useState } from 'react';
// import styles from './TaskAssignment.module.css';
// import { FiUser, FiCalendar, FiFlag, FiClock, FiSend } from 'react-icons/fi';

// const TaskAssignment = () => {
//   const users = [
//     { id: 1, name: "John Doe", role: "Developer" },
//     { id: 2, name: "Jane Smith", role: "Designer" },
//     { id: 3, name: "Mike Johnson", role: "Manager" },
//     { id: 4, name: "Sarah Williams", role: "QA Tester" },
//     { id: 5, name: "David Brown", role: "DevOps" },
//     { id: 6, name: "Emily Davis", role: "UX Designer" }
//   ];

//   const [taskData, setTaskData] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     priority: 'medium',
//     dueDate: '',
//     estimatedHours: '',
//     status: 'pending',
//     attachments: []
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!taskData.title) newErrors.title = 'Title is required';
//     if (!taskData.assignedTo) newErrors.assignedTo = 'Assignee is required';
//     if (!taskData.dueDate) newErrors.dueDate = 'Due date is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const taskWithFile = { ...taskData };
//       if (file) {
//         taskWithFile.attachments = [...taskData.attachments, file.name];
//       }
//       console.log('Task assigned:', taskWithFile);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//       // Reset form
//       setTaskData({
//         title: '',
//         description: '',
//         assignedTo: '',
//         priority: 'medium',
//         dueDate: '',
//         estimatedHours: '',
//         status: 'pending',
//         attachments: []
//       });
//       setFile(null);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Fixed Header */}
//       <div className={styles.headerContainer}>
//         <h2 className={styles.header}>
//           <FiSend className={styles.headerIcon} />
//           Assign New Task
//         </h2>
//         {success && (
//           <div className={styles.successMessage}>
//             Task assigned successfully!
//           </div>
//         )}
//       </div>

//       {/* Scrollable Form Area */}
//       <div className={styles.scrollableForm}>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="title">Task Title*</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={taskData.title}
//               onChange={handleChange}
//               className={errors.title ? styles.errorInput : ''}
//               placeholder="Enter task title"
//             />
//             {errors.title && <span className={styles.error}>{errors.title}</span>}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={taskData.description}
//               onChange={handleChange}
//               rows="6"
//               placeholder="Provide detailed task description..."
//             />
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="assignedTo">
//                 <FiUser className={styles.inputIcon} />
//                 Assign To*
//               </label>
//               <select
//                 id="assignedTo"
//                 name="assignedTo"
//                 value={taskData.assignedTo}
//                 onChange={handleChange}
//                 className={errors.assignedTo ? styles.errorInput : ''}
//               >
//                 <option value="">Select User</option>
//                 {users.map(user => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} ({user.role})
//                   </option>
//                 ))}
//               </select>
//               {errors.assignedTo && <span className={styles.error}>{errors.assignedTo}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="priority">
//                 <FiFlag className={styles.inputIcon} />
//                 Priority
//               </label>
//               <select
//                 id="priority"
//                 name="priority"
//                 value={taskData.priority}
//                 onChange={handleChange}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//                 <option value="urgent">Urgent</option>
//               </select>
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="dueDate">
//                 <FiCalendar className={styles.inputIcon} />
//                 Due Date*
//               </label>
//               <input
//                 type="date"
//                 id="dueDate"
//                 name="dueDate"
//                 value={taskData.dueDate}
//                 onChange={handleChange}
//                 className={errors.dueDate ? styles.errorInput : ''}
//               />
//               {errors.dueDate && <span className={styles.error}>{errors.dueDate}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="estimatedHours">
//                 <FiClock className={styles.inputIcon} />
//                 Estimated Hours
//               </label>
//               <input
//                 type="number"
//                 id="estimatedHours"
//                 name="estimatedHours"
//                 value={taskData.estimatedHours}
//                 onChange={handleChange}
//                 min="1"
//                 placeholder="Hours"
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label>Attachments</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className={styles.fileInput}
//             />
//             {file && (
//               <div className={styles.filePreview}>
//                 Selected: {file.name}
//               </div>
//             )}
//           </div>

//           {/* Additional task options can be added here */}
//           <div className={styles.formGroup}>
//             <label>Additional Notes</label>
//             <textarea
//               rows="3"
//               placeholder="Any special instructions..."
//               className={styles.additionalNotes}
//             />
//           </div>
//         </form>
//       </div>

//       {/* Fixed Submit Button */}
//       <div className={styles.fixedActions}>
//         <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
//           Assign Task
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskAssignment;


// import React, { useState } from 'react';
// import styles from './TaskAssignment.module.css';
// import { FiUser, FiCalendar, FiFlag, FiClock, FiSend, FiBriefcase } from 'react-icons/fi';
// import axios from 'axios';
// import Auth from '../Services/Auth';

// const TaskAssignment = () => {
//   // Sample users data - you might want to fetch this from your API
//   const users = [
//     { id: "67e3c235b8a8d5052dcbb824", name: "John Doe", employeeId: "dcore9658" },
//     // Add more users as needed
//   ];

//   const projects = ["ERP", "Website", "Mobile App", "Dashboard"];

//   const [taskData, setTaskData] = useState({
//     employeeId: "dcore9658", // Default or fetched from user selection
//     projectName: "",
//     taskName: "",
//     subTask: "",
//     description: "",
//     deadline: "",
//     userId: "",
//     priority: "Medium",
//     estimatedTime: "",
//     additionalNotes: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData(prev => ({ 
//       ...prev, 
//       [name]: value,
//       // When user is selected, update both userId and employeeId
//       ...(name === 'userId' && {
//         employeeId: users.find(u => u.id === value)?.employeeId || ""
//       })
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!taskData.taskName) newErrors.taskName = 'Task name is required';
//     if (!taskData.projectName) newErrors.projectName = 'Project is required';
//     if (!taskData.deadline) newErrors.deadline = 'Deadline is required';
//     if (!taskData.userId) newErrors.userId = 'Assignee is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://209.74.89.83/erpbackend/create-admin-tasks',
//         {
//           ...taskData,
//           priority: taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1)
//         },
//         Auth.getAuthHeader() // Add this to include the auth token
//       );

//       console.log('Task created:', response.data);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
      
//       // Reset form
//       setTaskData({
//         employeeId: "dcore9658",
//         projectName: "",
//         taskName: "",
//         subTask: "",
//         description: "",
//         deadline: "",
//         userId: "",
//         priority: "Medium",
//         estimatedTime: "",
//         additionalNotes: ""
//       });
//     } catch (error) {
//       console.error('Error creating task:', error);
//       alert('Failed to create task. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Fixed Header */}
//       <div className={styles.headerContainer}>
//         <h2 className={styles.header}>
//           <FiSend className={styles.headerIcon} />
//           Create New Task
//         </h2>
//         {success && (
//           <div className={styles.successMessage}>
//             Task created successfully!
//           </div>
//         )}
//       </div>

//       {/* Scrollable Form Area */}
//       <div className={styles.scrollableForm}>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="projectName">
//                 <FiBriefcase className={styles.inputIcon} />
//                 Project Name*
//               </label>
//               <select
//                 id="projectName"
//                 name="projectName"
//                 value={taskData.projectName}
//                 onChange={handleChange}
//                 className={errors.projectName ? styles.errorInput : ''}
//               >
//                 <option value="">Select Project</option>
//                 {projects.map(project => (
//                   <option key={project} value={project}>
//                     {project}
//                   </option>
//                 ))}
//               </select>
//               {errors.projectName && <span className={styles.error}>{errors.projectName}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="taskName">Task Name*</label>
//               <input
//                 type="text"
//                 id="taskName"
//                 name="taskName"
//                 value={taskData.taskName}
//                 onChange={handleChange}
//                 className={errors.taskName ? styles.errorInput : ''}
//                 placeholder="Enter task name"
//               />
//               {errors.taskName && <span className={styles.error}>{errors.taskName}</span>}
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="subTask">Sub Task</label>
//             <input
//               type="text"
//               id="subTask"
//               name="subTask"
//               value={taskData.subTask}
//               onChange={handleChange}
//               placeholder="Enter sub task (optional)"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={taskData.description}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Task description..."
//             />
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="userId">
//                 <FiUser className={styles.inputIcon} />
//                 Assign To*
//               </label>
//               <select
//                 id="userId"
//                 name="userId"
//                 value={taskData.userId}
//                 onChange={handleChange}
//                 className={errors.userId ? styles.errorInput : ''}
//               >
//                 <option value="">Select User</option>
//                 {users.map(user => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} ({user.employeeId})
//                   </option>
//                 ))}
//               </select>
//               {errors.userId && <span className={styles.error}>{errors.userId}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="priority">
//                 <FiFlag className={styles.inputIcon} />
//                 Priority
//               </label>
//               <select
//                 id="priority"
//                 name="priority"
//                 value={taskData.priority}
//                 onChange={handleChange}
//               >
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="deadline">
//                 <FiCalendar className={styles.inputIcon} />
//                 Deadline*
//               </label>
//               <input
//                 type="datetime-local"
//                 id="deadline"
//                 name="deadline"
//                 value={taskData.deadline}
//                 onChange={handleChange}
//                 className={errors.deadline ? styles.errorInput : ''}
//               />
//               {errors.deadline && <span className={styles.error}>{errors.deadline}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="estimatedTime">
//                 <FiClock className={styles.inputIcon} />
//                 Estimated Time
//               </label>
//               <input
//                 type="time"
//                 id="estimatedTime"
//                 name="estimatedTime"
//                 value={taskData.estimatedTime}
//                 onChange={handleChange}
//                 step="300" // 5 minute increments
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="additionalNotes">Additional Notes</label>
//             <textarea
//               id="additionalNotes"
//               name="additionalNotes"
//               value={taskData.additionalNotes}
//               onChange={handleChange}
//               rows="3"
//               placeholder="Any special instructions..."
//             />
//           </div>
//         </form>
//       </div>

//       {/* Fixed Submit Button */}
//       <div className={styles.fixedActions}>
//         <button 
//           type="submit" 
//           onClick={handleSubmit} 
//           className={styles.submitButton}
//           disabled={loading}
//         >
//           {loading ? 'Creating Task...' : 'Create Task'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskAssignment;

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
                    {['High', 'Medium', 'Low','Urgent'].map(level => (
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