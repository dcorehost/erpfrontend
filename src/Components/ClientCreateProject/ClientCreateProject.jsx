

// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './ClientCreateProject.module.css';
// import Auth from '../Services/Auth';

// const ClientCreateProject = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     employeeIds: '',
//     deadline: '',
//     status: 'pending',
//     priority: 'medium'
//   });

//   const [message, setMessage] = useState('');
//   const [projectId, setProjectId] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const employeeIds = formData.employeeIds
//         .split(',')
//         .map(id => id.trim())
//         .filter(id => id !== '');

//       if (employeeIds.length === 0) {
//         throw new Error('Please enter at least one valid employee ID');
//       }

//       if (!formData.deadline) {
//         throw new Error('Please select a deadline date');
//       }

//       const response = await axios.post(
//         'http://209.74.89.83/erpbackend/create-project',
//         {
//           name: formData.name.trim(),
//           description: formData.description.trim(),
//           deadline: formData.deadline,
//           status: formData.status,
//           priority: formData.priority
//         },
//         {
//           params: { employeeIds: employeeIds.join(',') },
//           headers: {
//             Authorization: `Bearer ${Auth.getToken()}`
//           }
//         }
//       );

//       if (response.data.message) {
//         setMessage(response.data.message);
//         setProjectId(response.data.projectId);
//         setFormData({ 
//           name: '', 
//           description: '', 
//           employeeIds: '',
//           deadline: '',
//           status: 'pending',
//           priority: 'medium'
//         });
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 
//                          err.message || 
//                          'Failed to create project';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Create New Project</h2>
      
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.scrollableSection}>
//           <div className={styles.formGroup}>
//             <label htmlFor="name" className={styles.label}>
//               Project Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               minLength="3"
//               maxLength="50"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="description" className={styles.label}>
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={styles.textarea}
//               rows="4"
//               required
//               minLength="10"
//               maxLength="500"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="employeeIds" className={styles.label}>
//               Employee IDs (comma-separated) *
//             </label>
//             <input
//               type="text"
//               id="employeeIds"
//               name="employeeIds"
//               value={formData.employeeIds}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               pattern="^[a-zA-Z0-9, ]+$"
//               placeholder="dcore5447, dcore3246"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="deadline" className={styles.label}>
//               Deadline *
//             </label>
//             <input
//               type="date"
//               id="deadline"
//               name="deadline"
//               value={formData.deadline}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               min={new Date().toISOString().split('T')[0]}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="priority" className={styles.label}>
//               Priority *
//             </label>
//             <select
//               id="priority"
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className={styles.select}
//               required
//             >
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//               <option value="low">Low</option>
//               <option value="urgent">Urgent</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="status" className={styles.label}>
//               Status *
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className={styles.select}
//               required
//             >
//               <option value="pending">Pending</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//               <option value="on-hold">On Hold</option>
//               <option value="canceled">Canceled</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.fixedSection}>
//           {error && <div className={styles.error}>{error}</div>}
//           {message && (
//             <div className={styles.success}>
//               {message} - Project ID: {projectId}
//             </div>
//           )}

//           <button
//             type="submit"
//             className={styles.button}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className={styles.spinner}></span>
//             ) : (
//               'Create Project'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ClientCreateProject;


import React, { useState } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ClientCreateProject.module.css';
import Auth from '../Services/Auth';

const ClientCreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Ongoing',
    progress: '0%',
    startDate: '',
    endDate: '',
    teamSize: 1
  });

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

    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Project name is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.startDate) {
        throw new Error('Start date is required');
      }
      if (!formData.endDate) {
        throw new Error('End date is required');
      }
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        throw new Error('End date must be after start date');
      }

      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-client-project',
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          status: formData.status,
          progress: formData.progress,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
          teamSize: parseInt(formData.teamSize)
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`
          }
        }
      );

      NotificationManager.success(
        'Client project created successfully!', 
        'Success', 
        3000
      );
      
      // Reset form
      setFormData({ 
        name: '', 
        description: '', 
        status: 'Ongoing',
        progress: '0%',
        startDate: '',
        endDate: '',
        teamSize: 1
      });

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to create client project';
      NotificationManager.error(
        errorMessage, 
        'Error', 
        5000
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Client Project</h2>
      <NotificationContainer/>
      
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
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="progress" className={styles.label}>
              Progress *
            </label>
            <select
              id="progress"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="0%">0%</option>
              <option value="30%">30%</option>
              <option value="50%">50%</option>
              <option value="70%">70%</option>
              <option value="100%">100%</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate" className={styles.label}>
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endDate" className={styles.label}>
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={styles.input}
              required
              min={formData.startDate}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="teamSize" className={styles.label}>
              Team Size *
            </label>
            <input
              type="number"
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className={styles.input}
              required
              min="1"
              max="50"
            />
          </div>
        </div>

        <div className={styles.fixedSection}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Create Client Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientCreateProject;