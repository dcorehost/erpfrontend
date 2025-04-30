import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../Components/Services/Auth';
import styles from './ApplyLeaveAdmin.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyLeaveAdmin = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    leaveType: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = Auth.getToken();
  const navigate = useNavigate();

  const leaveTypes = [
    'Casual Leave',
    'Sick Leave',
    // 'Earned Leave',
    // 'Maternity Leave',
    // 'Paternity Leave',
    // 'Compensatory Leave'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.from) newErrors.from = 'From date is required';
    if (!formData.to) newErrors.to = 'To date is required';
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    
    // Validate date range
    if (formData.from && formData.to) {
      const fromDate = new Date(formData.from);
      const toDate = new Date(formData.to);
      
      if (fromDate > toDate) {
        newErrors.to = 'To date must be after From date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        'http://209.74.89.83/erpbackend/apply-leave',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.success('Leave application submitted successfully!');
      setTimeout(() => {
        navigate('/leave-applications');
      }, 1500);
    } catch (error) {
      console.error('Error submitting leave application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit leave application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className={styles.header}>
        <h1>Apply for Leave</h1>
        <p>Fill out the form below to submit your leave request</p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="from">From Date*</label>
          <input
            type="date"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className={errors.from ? styles.errorInput : ''}
          />
          {errors.from && <span className={styles.error}>{errors.from}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="to">To Date*</label>
          <input
            type="date"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className={errors.to ? styles.errorInput : ''}
            min={formData.from}
          />
          {errors.to && <span className={styles.error}>{errors.to}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="leaveType">Leave Type*</label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className={errors.leaveType ? styles.errorInput : ''}
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          {errors.leaveType && <span className={styles.error}>{errors.leaveType}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="reason">Reason*</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className={errors.reason ? styles.errorInput : ''}
            placeholder="Enter reason for leave..."
          />
          {errors.reason && <span className={styles.error}>{errors.reason}</span>}
        </div>
        
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeaveAdmin;