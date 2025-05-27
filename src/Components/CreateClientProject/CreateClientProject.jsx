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
//     teamSize: 1
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'teamSize' ? parseInt(value) : value
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

//     if (!/^\d+%$/.test(formData.progress)) {
//       newErrors.progress = 'Progress must be percentage (e.g., 30%)';
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
//           progress: formData.progress.endsWith('%') ? formData.progress : `${formData.progress}%`
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
//           teamSize: 1
//         });
//       }
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApiError = (error) => {
//     // ... (keep same error handling as previous example)
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
//                 placeholder="e.g., 30%"
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


import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateClientProject.module.css';
import Auth from '../Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateClientProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    progress: '0%',
    startDate: '',
    endDate: '',
    teamSize: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'teamSize' ? parseInt(value, 10) : value, // Parse teamSize as integer
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start >= end) newErrors.endDate = 'End date must be after start date';
    }

    if (!/^\d+%?$/.test(formData.progress)) { // Allow optional '%'
      newErrors.progress = 'Progress must be a percentage (e.g., 30% or 30)';
    }

    if (formData.teamSize < 1 || formData.teamSize > 20) {
      newErrors.teamSize = 'Team size must be between 1-20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Auth.isAuthenticated()) {
      toast.error('Authentication required. Please login.');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    const token = Auth.getToken();

    try {
      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-client-project',
        {
          ...formData,
          progress: formData.progress.endsWith('%') ? formData.progress : `${formData.progress}%`, // Ensure '%'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        toast.success('Project created successfully!');
        setFormData({
          name: '',
          description: '',
          status: 'Planning',
          progress: '0%',
          startDate: '',
          endDate: '',
          teamSize: 1,
        });
        setErrors({}); // Clear errors on success
      } else {
        toast.error(response.data.message || 'Failed to create project.'); // show message from backend
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiError = (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
      // You can add specific handling based on the status code
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.warn('Unauthorized access. Please log in.');
        toast.error('Unauthorized access. Please log in.');
        // Example: window.location.href = '/login';
      } else if (error.response.status === 404) {
        // Handle not found error
        console.warn('Resource not found.');
        toast.error('Resource not found.');
        // Example: display a user-friendly "Not Found" message
      } else if (error.response.status >= 500) {
        // Handle server errors
        console.error('Server error occurred. Please try again later.');
        toast.error('Server error occurred. Please try again later.');
        // Example: display a generic error message to the user
      } else {
        toast.error(`Error: ${error.response.status} - ${error.response.data?.message || 'An error occurred'}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in Node.js
      console.error('No response received from the server:', error.request);
      toast.error('No response received from the server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
      toast.error(`Error: ${error.message || 'An error occurred'}`);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.header}>Create New Client Project</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Project Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.errorInput : ''}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? styles.errorInput : ''}
                rows="3"
              />
              {errors.description && <span className={styles.error}>{errors.description}</span>}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Start Date*</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? styles.errorInput : ''}
              />
              {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>End Date*</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? styles.errorInput : ''}
              />
              {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="Ongoing">Ongoing</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Progress*</label>
              <input
                type="text"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                className={errors.progress ? styles.errorInput : ''}
                placeholder="e.g., 30% or 30"
              />
              {errors.progress && <span className={styles.error}>{errors.progress}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Team Size*</label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                min="1"
                max="20"
                className={errors.teamSize ? styles.errorInput : ''}
              />
              {errors.teamSize && <span className={styles.error}>{errors.teamSize}</span>}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Creating Project...
              </>
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientProject;
