//   import React, { useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import styles from "./ClientProjectsRequests.module.css";
//   import Auth from "../Services/Auth";
//   import { toast } from "react-toastify";
//   import { FiX, FiPlus, FiCalendar, FiTag, FiFileText, FiAlertCircle } from "react-icons/fi";
//   import { motion, AnimatePresence } from "framer-motion";

//   const ClientProjectRequest = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//       title: "",
//       description: "",
//       priority: "medium",
//       deadline: "",
//       attachments: []
//     });
//     const [loading, setLoading] = useState(false);
//     const [fileUploading, setFileUploading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     };

//     const handleFileUpload = (e) => {
//       const files = Array.from(e.target.files);
//       if (files.length === 0) return;

//       setFileUploading(true);

//       // Update the state to include file metadata
//       setFormData(prev => ({
//         ...prev,
//         attachments: [...prev.attachments, ...files]
//       }));

//       setFileUploading(false);
//     };

//     const removeAttachment = (index) => {
//       setFormData(prev => ({
//         ...prev,
//         attachments: prev.attachments.filter((_, i) => i !== index)
//       }));
//     };

//     const validateForm = () => {
//       const newErrors = {};
//       if (!formData.title.trim()) newErrors.title = "Title is required";
//       if (!formData.description.trim()) newErrors.description = "Description is required";
//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (event) => {
//       event.preventDefault();

//       if (!validateForm()) return;

//       setLoading(true);
//       const token = Auth.getToken();

//       if (!token) {
//         toast.error("Authentication failed: You are not logged in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const formDataToSend = new FormData();
//         formDataToSend.append("title", formData.title);
//         formDataToSend.append("description", formData.description);
//         formDataToSend.append("priority", formData.priority);
//         formDataToSend.append("deadline", formData.deadline);

//         // Append each attachment file to FormData
//         formData.attachments.forEach(file => {
//           formDataToSend.append("attachments", file);
//         });

//         const response = await fetch("http://209.74.89.83/erpbackend/client-new-request", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//           body: formDataToSend,
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           const errorMessage = errorData.message || "Failed to submit request.";
//           toast.error(`Error: ${errorMessage}`);
//           throw new Error(errorMessage);
//         }

//         const successData = await response.json();
//         toast.success(successData.message || "Request submitted successfully!");
//         setFormData({
//           title: "",
//           description: "",
//           priority: "medium",
//           deadline: "",
//           attachments: []
//         });
//         alert("Request submitted successfully!");
//         navigate("/projects"); // Example redirection
//         if (onClose) onClose();
//       } catch (error) {
//         console.error("Error submitting request:", error);
//         toast.error(`Failed to submit request: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return (
//       <motion.div
//         className={styles.modalOverlay}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className={styles.requestFormContainer}
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//         >
//           <div className={styles.formHeader}>
//             <h2>New Project Request</h2>
//             <button
//   onClick={() => {
//     console.log("Close button clicked");
//     if (onClose) onClose();
//     else console.warn("onClose prop is undefined");
//   }}
//   className={styles.closeButton}
// >
//   <FiX size={20} />
// </button>            
//           </div>

//           <form onSubmit={handleSubmit} className={styles.requestForm}>
//             <div className={`${styles.formGroup} ${errors.title ? styles.error : ''}`}>
//               <label htmlFor="title">
//                 <FiTag className={styles.inputIcon} />
//                 Project Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="e.g. Website Redesign"
//                 className={styles.inputField}
//               />
//               {errors.title && (
//                 <span className={styles.errorMessage}>
//                   <FiAlertCircle /> {errors.title}
//                 </span>
//               )}
//             </div>

//             <div className={`${styles.formGroup} ${errors.description ? styles.error : ''}`}>
//               <label htmlFor="description">
//                 <FiFileText className={styles.inputIcon} />
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Describe your project in detail..."
//                 className={styles.textareaField}
//               />
//               {errors.description && (
//                 <span className={styles.errorMessage}>
//                   <FiAlertCircle /> {errors.description}
//                 </span>
//               )}
//             </div>

//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="priority">
//                   <FiAlertCircle className={styles.inputIcon} />
//                   Priority
//                 </label>
//                 <select
//                   id="priority"
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                   className={styles.selectField}
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="deadline">
//                   <FiCalendar className={styles.inputIcon} />
//                   Deadline (Optional)
//                 </label>
//                 <input
//                   type="date"
//                   id="deadline"
//                   name="deadline"
//                   value={formData.deadline}
//                   onChange={handleChange}
//                   className={styles.inputField}
//                 />
//               </div>
//             </div>

//             <div className={styles.formGroup}>
//               <label>
//                 <FiFileText className={styles.inputIcon} />
//                 Attachments (Optional)
//               </label>
//               <div className={styles.fileUploadContainer}>
//                 <label htmlFor="file-upload" className={styles.fileUploadButton}>
//                   <FiPlus /> Add Files
//                   <input
//                     id="file-upload"
//                     type="file"
//                     multiple
//                     onChange={handleFileUpload}
//                     style={{ display: 'none' }}
//                   />
//                 </label>
//                 {fileUploading && (
//                   <span className={styles.uploadStatus}>Uploading...</span>
//                 )}
//               </div>

//               <AnimatePresence>
//                 {formData.attachments.length > 0 && (
//                   <motion.div
//                     className={styles.attachmentsList}
//                     initial={{ height: 0 }}
//                     animate={{ height: 'auto' }}
//                     exit={{ height: 0 }}
//                   >
//                     {formData.attachments.map((file, index) => (
//                       <motion.div
//                         key={index}
//                         className={styles.attachmentItem}
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                       >
//                         <span>{file.name}</span>
//                         <button
//                           type="button"
//                           onClick={() => removeAttachment(index)}
//                           className={styles.removeAttachment}
//                         >
//                           <FiX size={14} />
//                         </button>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className={styles.formActions}>
//             <button
//   type="button"
//   onClick={() => {
//     console.log("Cancel button clicked");
//     if (onClose) onClose();
//     else console.warn("onClose prop is undefined");
//   }}
//   className={styles.cancelButton}
// >
//   Cancel
// </button>
//               <button type="submit" className={styles.submitButton} disabled={loading}>
//                 {loading ? "Submitting..." : "Submit Request"}
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   export default ClientProjectRequest;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ClientProjectsRequests.module.css";
import Auth from "../Services/Auth";
import { toast } from "react-toastify";
import { FiX, FiPlus, FiCalendar, FiTag, FiFileText, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ClientProjectRequest = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    attachments: []
  });
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setFileUploading(true);

    // Update the state to include file metadata
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));

    setFileUploading(false);
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    } else {
      console.warn("No onClose handler provided");
      // Fallback behavior if onClose isn't provided
      navigate(-1); // Go back in history
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const token = Auth.getToken();

    if (!token) {
      toast.error("Authentication failed: You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("deadline", formData.deadline);

      // Append each attachment file to FormData
      formData.attachments.forEach(file => {
        formDataToSend.append("attachments", file);
      });

      const response = await fetch("http://209.74.89.83/erpbackend/client-new-request", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to submit request.";
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const successData = await response.json();
      toast.success(successData.message || "Request submitted successfully!");
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
        attachments: []
      });
      alert("Request submitted successfully!");
      navigate("/projects"); // Example redirection
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error(`Failed to submit request: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose} // Close when clicking on overlay
    >
      <motion.div
        className={styles.requestFormContainer}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
      >
        <div className={styles.formHeader}>
          <h2>New Project Request</h2>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <FiX size={20} />
          </button>            
        </div>

        <form onSubmit={handleSubmit} className={styles.requestForm}>
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

          <div className={styles.formRow}>
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

          <div className={styles.formGroup}>
            <label>
              <FiFileText className={styles.inputIcon} />
              Attachments (Optional)
            </label>
            <div className={styles.fileUploadContainer}>
              <label htmlFor="file-upload" className={styles.fileUploadButton}>
                <FiPlus /> Add Files
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {fileUploading && (
                <span className={styles.uploadStatus}>Uploading...</span>
              )}
            </div>

            <AnimatePresence>
              {formData.attachments.length > 0 && (
                <motion.div
                  className={styles.attachmentsList}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {formData.attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      className={styles.attachmentItem}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className={styles.removeAttachment}
                      >
                        <FiX size={14} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ClientProjectRequest;