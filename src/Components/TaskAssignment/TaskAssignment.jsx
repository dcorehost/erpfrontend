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


import React, { useState } from 'react';
import styles from './TaskAssignment.module.css';
import { FiUser, FiCalendar, FiFlag, FiClock, FiSend } from 'react-icons/fi';

const TaskAssignment = () => {
  const users = [
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
    { id: 3, name: "Mike Johnson", role: "Manager" },
    { id: 4, name: "Sarah Williams", role: "QA Tester" },
    { id: 5, name: "David Brown", role: "DevOps" },
    { id: 6, name: "Emily Davis", role: "UX Designer" }
  ];

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    estimatedHours: '',
    status: 'pending',
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title) newErrors.title = 'Title is required';
    if (!taskData.assignedTo) newErrors.assignedTo = 'Assignee is required';
    if (!taskData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const taskWithFile = { ...taskData };
      if (file) {
        taskWithFile.attachments = [...taskData.attachments, file.name];
      }
      console.log('Task assigned:', taskWithFile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Reset form
      setTaskData({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
        estimatedHours: '',
        status: 'pending',
        attachments: []
      });
      setFile(null);
    }
  };

  return (
    <div className={styles.container}>
      {/* Fixed Header */}
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>
          <FiSend className={styles.headerIcon} />
          Assign New Task
        </h2>
        {success && (
          <div className={styles.successMessage}>
            Task assigned successfully!
          </div>
        )}
      </div>

      {/* Scrollable Form Area */}
      <div className={styles.scrollableForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Task Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className={errors.title ? styles.errorInput : ''}
              placeholder="Enter task title"
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Provide detailed task description..."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="assignedTo">
                <FiUser className={styles.inputIcon} />
                Assign To*
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
                className={errors.assignedTo ? styles.errorInput : ''}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
              {errors.assignedTo && <span className={styles.error}>{errors.assignedTo}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priority">
                <FiFlag className={styles.inputIcon} />
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="dueDate">
                <FiCalendar className={styles.inputIcon} />
                Due Date*
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className={errors.dueDate ? styles.errorInput : ''}
              />
              {errors.dueDate && <span className={styles.error}>{errors.dueDate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estimatedHours">
                <FiClock className={styles.inputIcon} />
                Estimated Hours
              </label>
              <input
                type="number"
                id="estimatedHours"
                name="estimatedHours"
                value={taskData.estimatedHours}
                onChange={handleChange}
                min="1"
                placeholder="Hours"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Attachments</label>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            {file && (
              <div className={styles.filePreview}>
                Selected: {file.name}
              </div>
            )}
          </div>

          {/* Additional task options can be added here */}
          <div className={styles.formGroup}>
            <label>Additional Notes</label>
            <textarea
              rows="3"
              placeholder="Any special instructions..."
              className={styles.additionalNotes}
            />
          </div>
        </form>
      </div>

      {/* Fixed Submit Button */}
      <div className={styles.fixedActions}>
        <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default TaskAssignment;