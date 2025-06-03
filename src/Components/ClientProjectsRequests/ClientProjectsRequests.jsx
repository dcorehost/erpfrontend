
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./ClientProjectsRequests.module.css";
// import Auth from "../Services/Auth";
// import { toast } from "react-toastify";
// import { FiX, FiPlus, FiCalendar, FiTag, FiFileText, FiAlertCircle } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const ClientProjectRequest = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "medium",
//     deadline: "",
//     attachments: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [fileUploading, setFileUploading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setFileUploading(true);

//     // Update the state to include file metadata
//     setFormData(prev => ({
//       ...prev,
//       attachments: [...prev.attachments, ...files]
//     }));

//     setFileUploading(false);
//   };

//   const removeAttachment = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index)
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleClose = () => {
//     if (onClose && typeof onClose === 'function') {
//       onClose();
//     } else {
//       console.warn("No onClose handler provided");
//       // Fallback behavior if onClose isn't provided
//       navigate(-1); // Go back in history
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);
//     const token = Auth.getToken();

//     if (!token) {
//       toast.error("Authentication failed: You are not logged in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("priority", formData.priority);
//       formDataToSend.append("deadline", formData.deadline);

//       // Append each attachment file to FormData
//       formData.attachments.forEach(file => {
//         formDataToSend.append("attachments", file);
//       });

//       const response = await fetch("http://209.74.89.83/erpbackend/client-new-request", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });


//       if (!response.ok) {
//         const errorData = await response.json();
//         const errorMessage = errorData.message || "Failed to submit request.";
//         toast.error(`Error: ${errorMessage}`);
//         throw new Error(errorMessage);
//       }
             
//       const successData = await response.json();
//       toast.success(successData.message || "Request submitted successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         priority: "medium",
//         deadline: "",
//         attachments: []
//       });
//       alert("Request submitted successfully!");
//       navigate("/projects"); // Example redirection
//       if (onClose) onClose();
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       toast.error(`Failed to submit request: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className={styles.modalOverlay}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={handleClose} // Close when clicking on overlay
//     >
//       <motion.div
//         className={styles.requestFormContainer}
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
//       >
//         <div className={styles.formHeader}>
//           <h2>New Project Request</h2>
//           <button
//             onClick={handleClose}
//             className={styles.closeButton}
//             aria-label="Close"
//           >
//             <FiX size={20} />
//           </button>            
//         </div>

//         <form onSubmit={handleSubmit} className={styles.requestForm}>
//           <div className={`${styles.formGroup} ${errors.title ? styles.error : ''}`}>
//             <label htmlFor="title">
//               <FiTag className={styles.inputIcon} />
//               Project Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="e.g. Website Redesign"
//               className={styles.inputField}
//             />
//             {errors.title && (
//               <span className={styles.errorMessage}>
//                 <FiAlertCircle /> {errors.title}
//               </span>
//             )}
//           </div>

//           <div className={`${styles.formGroup} ${errors.description ? styles.error : ''}`}>
//             <label htmlFor="description">
//               <FiFileText className={styles.inputIcon} />
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Describe your project in detail..."
//               className={styles.textareaField}
//             />
//             {errors.description && (
//               <span className={styles.errorMessage}>
//                 <FiAlertCircle /> {errors.description}
//               </span>
//             )}
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="priority">
//                 <FiAlertCircle className={styles.inputIcon} />
//                 Priority
//               </label>
//               <select
//                 id="priority"
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 className={styles.selectField}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="deadline">
//                 <FiCalendar className={styles.inputIcon} />
//                 Deadline (Optional)
//               </label>
//               <input
//                 type="date"
//                 id="deadline"
//                 name="deadline"
//                 value={formData.deadline}
//                 onChange={handleChange}
//                 className={styles.inputField}
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label>
//               <FiFileText className={styles.inputIcon} />
//               Attachments (Optional)
//             </label>
//             <div className={styles.fileUploadContainer}>
//               <label htmlFor="file-upload" className={styles.fileUploadButton}>
//                 <FiPlus /> Add Files
//                 <input
//                   id="file-upload"
//                   type="file"
//                   multiple
//                   onChange={handleFileUpload}
//                   style={{ display: 'none' }}
//                 />
//               </label>
//               {fileUploading && (
//                 <span className={styles.uploadStatus}>Uploading...</span>
//               )}
//             </div>

//             <AnimatePresence>
//               {formData.attachments.length > 0 && (
//                 <motion.div
//                   className={styles.attachmentsList}
//                   initial={{ height: 0 }}
//                   animate={{ height: 'auto' }}
//                   exit={{ height: 0 }}
//                 >
//                   {formData.attachments.map((file, index) => (
//                     <motion.div
//                       key={index}
//                       className={styles.attachmentItem}
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <span>{file.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeAttachment(index)}
//                         className={styles.removeAttachment}
//                       >
//                         <FiX size={14} />
//                       </button>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <div className={styles.formActions}>
//             <div
//               type="button"
//               onClick={handleClose}
//               className={styles.cancelButton}
//             >
//               Cancel
//             </div>
//             <div type="submit" className={styles.submitButton} disabled={loading}>
//               {loading ? "Submitting..." : "Submit Request"}
//             </div>
//           </div>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ClientProjectRequest;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ClientProjectsRequests.module.css";
import Auth from "../Services/Auth"; // Ensure this path is correct for your Auth service
import { toast } from "react-toastify"; // Ensure react-toastify is installed and configured in your app
import { FiX, FiPlus, FiCalendar, FiTag, FiFileText, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ClientProjectRequest = ({ onClose }) => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    attachments: [] // Stores File objects
  });
  // State for loading indicator during form submission
  const [loading, setLoading] = useState(false);
  // State for file upload process (visual feedback, not actual upload to backend here)
  const [fileUploading, setFileUploading] = useState(false);
  // State to manage validation errors
  const [errors, setErrors] = useState({});
  // Hook for navigation
  const navigate = useNavigate();

  // Handles changes to text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles file selection from the input
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setFileUploading(true); // Indicate file selection/processing is in progress

    // Add new files to the existing attachments array in state
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));

    setFileUploading(false); // Reset upload status after adding to state
  };

  // Removes an attachment from the state by its index
  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Validates form fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Project Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors were found
  };

  // Handles closing the modal/form
  const handleClose = () => {
    // Check if an onClose function was provided as a prop
    if (onClose && typeof onClose === 'function') {
      onClose(); // Call the provided onClose handler
    } else {
      console.warn("No onClose handler provided. Navigating back.");
      navigate(-1); // Fallback: go back in browser history if no specific close handler
    }
  };

  // Handles the form submission logic
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission (page reload)

    // Validate the form before proceeding
    if (!validateForm()) {
      console.log("Form validation failed. Not submitting.");
      return; // Stop submission if validation fails
    }

    setLoading(true); // Set loading state to true to disable button and show feedback
    const token = Auth.getToken(); // Retrieve authentication token using your Auth service

    // Check if token is available
    if (!token) {
      toast.error("Authentication failed: You are not logged in. Please log in again.");
      setLoading(false);
      console.error("Authentication token is missing.");
      return;
    }

    try {
      // Create a FormData object to send multipart/form-data, essential for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("deadline", formData.deadline);

      // Append each selected file to FormData under the 'attachments' field
      // The backend expects files under this key
      formData.attachments.forEach(file => {
        formDataToSend.append("attachments", file);
      });

      // --- Debugging Logs Start ---
      console.log("--- Form Submission Attempt ---");
      console.log("FormData for sending (check Network tab for files):");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("Auth Token present:", !!token); // Log if token exists
      // --- Debugging Logs End ---

      // Send POST request to the API endpoint
      const response = await fetch("http://209.74.89.83/erpbackend/client-new-request", {
        method: "POST",
        headers: {
          // Do NOT set 'Content-Type': 'multipart/form-data' explicitly here.
          // The browser sets it automatically with the correct boundary when using FormData.
          "Authorization": `Bearer ${token}`, // Include authorization token
        },
        body: formDataToSend, // Send FormData as the request body
      });

      // --- Debugging Logs Start ---
      console.log("API Response Status:", response.status);
      console.log("API Response OK:", response.ok); // True if status is 2xx
      // --- Debugging Logs End ---

      // Check if the response was successful (HTTP status code 200-299)
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response body
        console.error("API Error Response Data:", errorData); // Log the full error response
        const errorMessage = errorData.message || "Failed to submit request. Please try again.";
        toast.error(`Error: ${errorMessage}`); // Display error toast message
        throw new Error(errorMessage); // Throw error to be caught by the catch block
      }
              
      // If the response is successful (response.ok is true)
      const successData = await response.json(); // Parse success response body
      console.log("API Success Response Data:", successData); // Log the full success response

      // Display success toast message. Uses backend message if available, otherwise a default one.
      toast.success(successData.message || "Project request submitted successfully!");
      
      // Reset form fields after successful submission
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
        attachments: []
      });
      
      // Navigate to the projects page (example redirection)
      navigate("/projects"); 
      // Close the modal if an onClose handler was provided
      if (onClose) onClose();

    } catch (error) {
      // Catch any errors that occurred during the fetch or JSON parsing
      console.error("Caught an error during project request submission:", error);
      // Display a generic error message if specific error wasn't available
      toast.error(`Failed to submit request: ${error.message || "An unexpected error occurred."}`);
    } finally {
      setLoading(false); // Always reset loading state, regardless of success or failure
      console.log("--- Form Submission Process Finished ---");
    }
  };

  return (
    // Modal overlay for background, handles closing the modal
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose} // Close modal when clicking on the overlay
    >
      {/* Form container, prevents closing when clicking inside the form */}
      <motion.div
        className={styles.requestFormContainer}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to the overlay
      >
        <div className={styles.formHeader}>
          <h2>New Project Request</h2>
          {/* Close button for the modal */}
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <FiX size={20} />
          </button>          
        </div>

        {/* The main form element. onSubmit will trigger handleSubmit. */}
        <form onSubmit={handleSubmit} className={styles.requestForm}>
          {/* Project Title Field */}
          <div className={`${styles.formGroup} ${errors.title ? styles.error : ''}`}>
            <label htmlFor="title">
              <FiTag className={styles.inputIcon} />
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Website Redesign"
              className={styles.inputField}
            />
            {errors.title && (
              <span className={styles.errorMessage}>
                <FiAlertCircle /> {errors.title}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className={`${styles.formGroup} ${errors.description ? styles.error : ''}`}>
            <label htmlFor="description">
              <FiFileText className={styles.inputIcon} />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your project in detail..."
              className={styles.textareaField}
            />
            {errors.description && (
              <span className={styles.errorMessage}>
                <FiAlertCircle /> {errors.description}
              </span>
            )}
          </div>

          {/* Priority and Deadline Fields in a row */}
          <div className={styles.formRow}>
            {/* Priority Select */}
            <div className={styles.formGroup}>
              <label htmlFor="priority">
                <FiAlertCircle className={styles.inputIcon} />
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Deadline Input */}
            <div className={styles.formGroup}>
              <label htmlFor="deadline">
                <FiCalendar className={styles.inputIcon} />
                Deadline (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Attachments Field */}
          <div className={styles.formGroup}>
            <label>
              <FiFileText className={styles.inputIcon} />
              Attachments (Optional)
            </label>
            <div className={styles.fileUploadContainer}>
              {/* Custom styled file input label */}
              <label htmlFor="file-upload" className={styles.fileUploadButton}>
                <FiPlus /> Add Files
                <input
                  id="file-upload"
                  type="file"
                  multiple // Allows selecting multiple files
                  onChange={handleFileUpload}
                  style={{ display: 'none' }} // Hide the native file input element
                />
              </label>
              {fileUploading && (
                <span className={styles.uploadStatus}>Processing files...</span>
              )}
            </div>

            {/* Display list of attached files with animation */}
            <AnimatePresence>
              {formData.attachments.length > 0 && (
                <motion.div
                  className={styles.attachmentsList}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {formData.attachments.map((file, index) => (
                    <motion.div
                      key={index} // Using index as key is generally discouraged but okay here if order doesn't change and items aren't re-rendered individually
                      className={styles.attachmentItem}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{file.name}</span>
                      <button
                        type="button" // Important: prevents this button from submitting the form
                        onClick={() => removeAttachment(index)}
                        className={styles.removeAttachment}
                        aria-label={`Remove attachment ${file.name}`}
                      >
                        <FiX size={14} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form action buttons */}
          <div className={styles.formActions}>
            {/* Cancel Button */}
            <button 
              type="button" // Important: prevents this button from submitting the form
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            {/* Submit Button */}
            <button 
              type="submit" // This button will trigger the form's onSubmit event
              className={styles.submitButton}
              disabled={loading} // Disable button when submitting
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ClientProjectRequest;