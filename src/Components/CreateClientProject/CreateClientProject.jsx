// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import styles from './CreateClientProject.module.css';
// // import Auth from '../Services/Auth';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const CreateClientProject = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     status: 'Planning',
// //     progress: '0%',
// //     startDate: '',
// //     endDate: '',
// //     teamSize: 1
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: name === 'teamSize' ? parseInt(value) : value
// //     }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.name.trim()) newErrors.name = 'Project name is required';
// //     if (!formData.description.trim()) newErrors.description = 'Description is required';
    
// //     if (!formData.startDate) newErrors.startDate = 'Start date is required';
// //     if (!formData.endDate) newErrors.endDate = 'End date is required';
    
// //     if (formData.startDate && formData.endDate) {
// //       const start = new Date(formData.startDate);
// //       const end = new Date(formData.endDate);
// //       if (start >= end) newErrors.endDate = 'End date must be after start date';
// //     }

// //     if (!/^\d+%$/.test(formData.progress)) {
// //       newErrors.progress = 'Progress must be percentage (e.g., 30%)';
// //     }

// //     if (formData.teamSize < 1 || formData.teamSize > 20) {
// //       newErrors.teamSize = 'Team size must be between 1-20';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!Auth.isAuthenticated()) {
// //       toast.error('Authentication required. Please login.');
// //       return;
// //     }

// //     if (!validateForm()) return;

// //     setIsSubmitting(true);
// //     const token = Auth.getToken();

// //     try {
// //       const response = await axios.post(
// //         'http://209.74.89.83/erpbackend/create-client-project',
// //         {
// //           ...formData,
// //           progress: formData.progress.endsWith('%') ? formData.progress : `${formData.progress}%`
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         toast.success('Project created successfully!');
// //         setFormData({
// //           name: '',
// //           description: '',
// //           status: 'Planning',
// //           progress: '0%',
// //           startDate: '',
// //           endDate: '',
// //           teamSize: 1
// //         });
// //       }
// //     } catch (error) {
// //       handleApiError(error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleApiError = (error) => {
// //     // ... (keep same error handling as previous example)
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <ToastContainer />
// //       <h1 className={styles.header}>Create New Client Project</h1>

// //       <form onSubmit={handleSubmit} className={styles.form}>
// //         <div className={styles.formSection}>
// //           <div className={styles.formGrid}>
// //             <div className={styles.formGroup}>
// //               <label>Project Name*</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 className={errors.name ? styles.errorInput : ''}
// //               />
// //               {errors.name && <span className={styles.error}>{errors.name}</span>}
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Description*</label>
// //               <textarea
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleChange}
// //                 className={errors.description ? styles.errorInput : ''}
// //                 rows="3"
// //               />
// //               {errors.description && <span className={styles.error}>{errors.description}</span>}
// //             </div>
// //           </div>
// //         </div>

// //         <div className={styles.formSection}>
// //           <div className={styles.formGrid}>
// //             <div className={styles.formGroup}>
// //               <label>Start Date*</label>
// //               <input
// //                 type="date"
// //                 name="startDate"
// //                 value={formData.startDate}
// //                 onChange={handleChange}
// //                 className={errors.startDate ? styles.errorInput : ''}
// //               />
// //               {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>End Date*</label>
// //               <input
// //                 type="date"
// //                 name="endDate"
// //                 value={formData.endDate}
// //                 onChange={handleChange}
// //                 className={errors.endDate ? styles.errorInput : ''}
// //               />
// //               {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
// //             </div>
// //           </div>
// //         </div>

// //         <div className={styles.formSection}>
// //           <div className={styles.formGrid}>
// //             <div className={styles.formGroup}>
// //               <label>Status*</label>
// //               <select
// //                 name="status"
// //                 value={formData.status}
// //                 onChange={handleChange}
// //               >
// //                 <option value="Planning">Planning</option>
// //                 <option value="Ongoing">Ongoing</option>
// //                 <option value="On Hold">On Hold</option>
// //                 <option value="Completed">Completed</option>
// //               </select>
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Progress*</label>
// //               <input
// //                 type="text"
// //                 name="progress"
// //                 value={formData.progress}
// //                 onChange={handleChange}
// //                 className={errors.progress ? styles.errorInput : ''}
// //                 placeholder="e.g., 30%"
// //               />
// //               {errors.progress && <span className={styles.error}>{errors.progress}</span>}
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Team Size*</label>
// //               <input
// //                 type="number"
// //                 name="teamSize"
// //                 value={formData.teamSize}
// //                 onChange={handleChange}
// //                 min="1"
// //                 max="20"
// //                 className={errors.teamSize ? styles.errorInput : ''}
// //               />
// //               {errors.teamSize && <span className={styles.error}>{errors.teamSize}</span>}
// //             </div>
// //           </div>
// //         </div>

// //         <div className={styles.formActions}>
// //           <button
// //             type="submit"
// //             className={styles.submitButton}
// //             disabled={isSubmitting}
// //           >
// //             {isSubmitting ? (
// //               <>
// //                 <span className={styles.spinner}></span> 
// //                 Creating Project...
// //               </>
// //             ) : (
// //               'Create Project'
// //             )}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateClientProject;


// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './CreateClientProject.module.css';
// import Auth from '../Services/Auth';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateClientProject = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     status: 'Planning',
//     progress: '0%',
//     startDate: '',
//     endDate: '',
//     teamSize: 1,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'teamSize' ? parseInt(value, 10) : value, // Parse teamSize as integer
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = 'Project name is required';
//     if (!formData.description.trim()) newErrors.description = 'Description is required';

//     if (!formData.startDate) newErrors.startDate = 'Start date is required';
//     if (!formData.endDate) newErrors.endDate = 'End date is required';

//     if (formData.startDate && formData.endDate) {
//       const start = new Date(formData.startDate);
//       const end = new Date(formData.endDate);
//       if (start >= end) newErrors.endDate = 'End date must be after start date';
//     }

//     if (!/^\d+%?$/.test(formData.progress)) { // Allow optional '%'
//       newErrors.progress = 'Progress must be a percentage (e.g., 30% or 30)';
//     }

//     if (formData.teamSize < 1 || formData.teamSize > 20) {
//       newErrors.teamSize = 'Team size must be between 1-20';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!Auth.isAuthenticated()) {
//       toast.error('Authentication required. Please login.');
//       return;
//     }

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     const token = Auth.getToken();

//     try {
//       const response = await axios.post(
//         'http://209.74.89.83/erpbackend/create-client-project',
//         {
//           ...formData,
//           progress: formData.progress.endsWith('%') ? formData.progress : `${formData.progress}%`, // Ensure '%'
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success('Project created successfully!');
//         setFormData({
//           name: '',
//           description: '',
//           status: 'Planning',
//           progress: '0%',
//           startDate: '',
//           endDate: '',
//           teamSize: 1,
//         });
//         setErrors({}); // Clear errors on success
//       } else {
//         toast.error(response.data.message || 'Failed to create project.'); // show message from backend
//       }
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApiError = (error) => {
//     console.error('API Error:', error);
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error('Response Data:', error.response.data);
//       console.error('Response Status:', error.response.status);
//       console.error('Response Headers:', error.response.headers);
//       // You can add specific handling based on the status code
//       if (error.response.status === 401) {
//         // Handle unauthorized error (e.g., redirect to login)
//         console.warn('Unauthorized access. Please log in.');
//         toast.error('Unauthorized access. Please log in.');
//         // Example: window.location.href = '/login';
//       } else if (error.response.status === 404) {
//         // Handle not found error
//         console.warn('Resource not found.');
//         toast.error('Resource not found.');
//         // Example: display a user-friendly "Not Found" message
//       } else if (error.response.status >= 500) {
//         // Handle server errors
//         console.error('Server error occurred. Please try again later.');
//         toast.error('Server error occurred. Please try again later.');
//         // Example: display a generic error message to the user
//       } else {
//         toast.error(`Error: ${error.response.status} - ${error.response.data?.message || 'An error occurred'}`);
//       }
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in Node.js
//       console.error('No response received from the server:', error.request);
//       toast.error('No response received from the server. Please check your network connection.');
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error setting up the request:', error.message);
//       toast.error(`Error: ${error.message || 'An error occurred'}`);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer />
//       <h1 className={styles.header}>Create New Client Project</h1>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formSection}>
//           <div className={styles.formGrid}>
//             <div className={styles.formGroup}>
//               <label>Project Name*</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={errors.name ? styles.errorInput : ''}
//               />
//               {errors.name && <span className={styles.error}>{errors.name}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label>Description*</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className={errors.description ? styles.errorInput : ''}
//                 rows="3"
//               />
//               {errors.description && <span className={styles.error}>{errors.description}</span>}
//             </div>
//           </div>
//         </div>

//         <div className={styles.formSection}>
//           <div className={styles.formGrid}>
//             <div className={styles.formGroup}>
//               <label>Start Date*</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={errors.startDate ? styles.errorInput : ''}
//               />
//               {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label>End Date*</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={errors.endDate ? styles.errorInput : ''}
//               />
//               {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
//             </div>
//           </div>
//         </div>

//         <div className={styles.formSection}>
//           <div className={styles.formGrid}>
//             <div className={styles.formGroup}>
//               <label>Status*</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="Planning">Planning</option>
//                 <option value="Ongoing">Ongoing</option>
//                 <option value="On Hold">On Hold</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label>Progress*</label>
//               <input
//                 type="text"
//                 name="progress"
//                 value={formData.progress}
//                 onChange={handleChange}
//                 className={errors.progress ? styles.errorInput : ''}
//                 placeholder="e.g., 30% or 30"
//               />
//               {errors.progress && <span className={styles.error}>{errors.progress}</span>}
//             </div>

//             <div className={styles.formGroup}>
//               <label>Team Size*</label>
//               <input
//                 type="number"
//                 name="teamSize"
//                 value={formData.teamSize}
//                 onChange={handleChange}
//                 min="1"
//                 max="20"
//                 className={errors.teamSize ? styles.errorInput : ''}
//               />
//               {errors.teamSize && <span className={styles.error}>{errors.teamSize}</span>}
//             </div>
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className={styles.spinner}></span>
//                 Creating Project...
//               </>
//             ) : (
//               'Create Project'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateClientProject;

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
    priority: 'medium'
  });

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get('http://209.74.89.83/erpbackend/get-emp-ids', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      });

      const employees = response.data.employees || [];

      const options = employees.map(emp => ({
        value: emp.employeeId,
        label: emp.employeeId
      }));

      setEmployeeOptions(options);
      console.log("Employee dropdown options loaded:", options);
    } catch (error) {
      console.error("Error fetching employee IDs:", error.message);
      toast.error('Failed to load employee list.');
    }
  };

  useEffect(() => {
    fetchEmployeeIds();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmployeeSelect = (selectedOptions) => {
    setFormData({
      ...formData,
      employeeIds: selectedOptions.map(option => option.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProjectId('');

    try {
      if (formData.employeeIds.length === 0) {
        throw new Error('Please select at least one employee');
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

      if (response.data.message && response.data.projectId) {
        setProjectId(response.data.projectId);
        toast.success('Project created successfully! Redirecting...', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setFormData({
          name: '',
          description: '',
          employeeIds: [],
          deadline: '',
          status: 'pending',
          priority: 'medium'
        });

        setTimeout(() => {
          navigate('/Admin/Leave/pd');
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create project';
      setError(errorMessage);
      console.error("Error creating project:", errorMessage);

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
              <label htmlFor="name" className={styles.label}>
                Project Name <span className={styles.required}>*</span>
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
                placeholder="Enter project name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description <span className={styles.required}>*</span>
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
                placeholder="Describe the project details"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Select Employees <span className={styles.required}>*</span>
              </label>
              <Select
                isMulti
                options={employeeOptions}
                onChange={handleEmployeeSelect}
                classNamePrefix="select"
                placeholder="Choose employee IDs"
                value={employeeOptions.filter(option => formData.employeeIds.includes(option.value))}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="deadline" className={styles.label}>
                Deadline <span className={styles.required}>*</span>
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

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                <label htmlFor="priority" className={styles.label}>
                  Priority <span className={styles.required}>*</span>
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

              <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                <label htmlFor="status" className={styles.label}>
                  Status <span className={styles.required}>*</span>
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
          </div>

          <div className={styles.fixedSection}>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreateProject;
