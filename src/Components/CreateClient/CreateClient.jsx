
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CreateClient.module.css';

const CreateClient = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    phone: '',
    displayName: '',
    gender: 'female',
    country: 'India',
    state: '',
    pincode: '',
    language: 'english'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.emailId.trim()) newErrors.emailId = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) newErrors.emailId = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 5) newErrors.password = 'Password must be at least 5 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        username: formData.username.trim(),
        emailId: formData.emailId.trim(),
        password: formData.password.trim(), 
        phone: formData.phone.toString(),
        displayName: formData.displayName.trim(),
        gender: formData.gender,
        country: formData.country,
        state: formData.state.trim(),
        pincode: formData.pincode.toString(),
        language: formData.language,
        confirmPassword: formData.confirmPassword.trim() 
      };

      console.log('Submitting payload:', payload);

      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-client',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(response.data.message || 'Client created successfully!');
      
      // Reset form
      setFormData({
        username: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        phone: '',
        displayName: '',
        gender: 'female',
        country: 'India',
        state: '',
        pincode: '',
        language: 'english'
      });

    } catch (error) {
      console.error('Full error:', error);
      
      let errorMessage = 'Failed to create client';
      if (error.response) {
        console.log('Server response:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
        
        // Handle specific password mismatch case
        if (error.response.data.message.includes('Passwords do not match')) {
          setErrors(prev => ({
            ...prev,
            password: 'Server validation: Passwords do not match',
            confirmPassword: 'Server validation: Passwords do not match'
          }));
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={5000} />
      <h1>Create New Client</h1>

      
      <form onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
          {/* Username */}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${errors.username ? styles.errorInput : ''}`}
              required
            />
            {errors.username && <span className={styles.errorText}>{errors.username}</span>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="emailId" className={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className={`${styles.input} ${errors.emailId ? styles.errorInput : ''}`}
              required
            />
            {errors.emailId && <span className={styles.errorText}>{errors.emailId}</span>}
          </div>
         
         <div className={styles.formGroup}>
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        {/* Confirm Password Field */}
        <div className={styles.formGroup}>
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>


          {/* Phone */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${errors.phone ? styles.errorInput : ''}`}
              required
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>

          {/* Display Name */}
          <div className={styles.formGroup}>
            <label htmlFor="displayName" className={styles.label}>
              Display Name *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={`${styles.input} ${errors.displayName ? styles.errorInput : ''}`}
              required
            />
            {errors.displayName && <span className={styles.errorText}>{errors.displayName}</span>}
          </div>

          {/* Gender */}
          <div className={styles.formGroup}>
            <label htmlFor="gender" className={styles.label}>
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Country */}
          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.label}>
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {/* State */}
          <div className={styles.formGroup}>
            <label htmlFor="state" className={styles.label}>
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`${styles.input} ${errors.state ? styles.errorInput : ''}`}
              required
            />
            {errors.state && <span className={styles.errorText}>{errors.state}</span>}
          </div>

          {/* Pincode */}
          <div className={styles.formGroup}>
            <label htmlFor="pincode" className={styles.label}>
              Pincode *
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`${styles.input} ${errors.pincode ? styles.errorInput : ''}`}
              required
            />
            {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
          </div>

          {/* Language */}
          <div className={styles.formGroup}>
            <label htmlFor="language" className={styles.label}>
              Language *
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>
        </div>

        
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Client'}
        </button>
      </form>
    </div>
  );
};

export default CreateClient;