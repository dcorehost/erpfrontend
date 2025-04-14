


import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateUser.module.css';
import Auth from '../Services/Auth';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailId: '',
    phone: '',
    password: '',
    confirmPassword : '',
    displayName: '',
    gender: 'male',
    country: 'India',
    state: '',
    pincode: '',
    language: 'English',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    console.log('Starting form submission...');
    

    if (!Auth.isAuthenticated()) {
      const authError = 'Authentication required. Please login.';
      console.error(authError);
      setErrorMessage(authError);
      return;
    }

    if (!validateForm()) {
      console.log('Form validation failed', errors);
      return;
    }

    setIsSubmitting(true);
  
    const token = Auth.getToken();
    const requestData = { ...formData };

    console.log('Prepared body data:', requestData);

    try {
      console.log('Making API request to create-user-account...');
      
      const response = await axios.post('http://209.74.89.83/erpbackend/create-user-acoount', requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('API response:',response)

      if (response.data && response.data.success) {
        console.log('User creation successful');
        setSuccessMessage('User created successfully!');
        
        // Reset form
        setFormData({
          username: '',
          emailId: '',
          phone: '',
          password: '',
          confirmPassword:'',
          displayName: '',
          gender: 'male',
          country: 'India',
          state: '',
          pincode: '',
          language: 'English',
          role:''
        });
      } else {
        console.error('API returned unsuccessful response:', response.data);
        setErrorMessage(response.data?.message || 'Unknown API error');
      }
    } catch (error) {
      console.error('API call failed:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response
      });

      if (error.response) {
        // Handle HTTP error responses
        switch (error.response.status) {
          case 400:
            setErrorMessage('Invalid request data. Please check your inputs.');
            break;
          case 401:
            Auth.logout();
            setErrorMessage('Session expired. Please login again.');
            break;
          case 500:
            setErrorMessage('Server error. Please try again later.');
            break;
          default:
            setErrorMessage(
              error.response.data?.message || 
              `Request failed with status ${error.response.status}`
            );
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setErrorMessage('Request configuration error: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
      // Clear messages after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create New User</h1>
      
      {successMessage && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✓</span> 
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠</span> 
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3>Account Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? styles.errorInput : ''}
                placeholder="Enter username"
              />
              {errors.username && (
                <span className={styles.error}>{errors.username}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Display Name*</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className={errors.displayName ? styles.errorInput : ''}
                placeholder="Enter display name"
              />
              {errors.displayName && (
                <span className={styles.error}>{errors.displayName}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.errorInput : ''}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Confirm Password*</label>
              <input
                type="confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.errorInput : ''}
                placeholder="At least 6 characters"
              />
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>


            <div className={styles.formGroup}>
          <label>Role*</label>
          <select name="role" value={formData.role} onChange={handleChange} className={errors.role ? styles.errorInput : ''}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.role && <span className={styles.error}>{errors.role}</span>}
        </div>
            
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Contact Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Email*</label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className={errors.emailId ? styles.errorInput : ''}
                placeholder="example@domain.com"
              />
              {errors.emailId && (
                <span className={styles.error}>{errors.emailId}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.errorInput : ''}
                placeholder="10 digit phone number"
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Personal Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Address Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Country*</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? styles.errorInput : ''}
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              {errors.country && (
                <span className={styles.error}>{errors.country}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>State*</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? styles.errorInput : ''}
                placeholder="Enter state"
              />
              {errors.state && (
                <span className={styles.error}>{errors.state}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Pincode*</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={errors.pincode ? styles.errorInput : ''}
                placeholder="Enter pincode"
              />
              {errors.pincode && (
                <span className={styles.error}>{errors.pincode}</span>
              )}
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
                Creating User...
              </>
            ) : (
              'Create User'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;