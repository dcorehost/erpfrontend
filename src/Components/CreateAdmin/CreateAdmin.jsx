



import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateAdmin.module.css';
import Auth from '../Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailId: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Auth.isAuthenticated()) {
      toast.error('Authentication required. Please login.', {
        className: styles.toastError
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const token = Auth.getToken();
    const requestData = { ...formData };

    try {
      const response = await axios.post(
        'http://209.74.89.83/erpbackend/create-admin-acoount',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success('Admin created successfully!', {
          className: styles.toastSuccess
        });

        setFormData({
          username: '',
          emailId: '',
          phone: '',
          password: '',
          confirmPassword: '',
          displayName: '',
          gender: 'male',
          country: 'India',
          state: '',
          pincode: '',
          language: 'English',
          role: ''
        });
      } else {
        toast.error(response.data?.message || 'User creation failed', {
          className: styles.toastError
        });
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error('Invalid request data. Please check your inputs.', {
              className: styles.toastError
            });
            break;
          case 401:
            Auth.logout();
            toast.error('Session expired. Please login again.', {
              className: styles.toastError
            });
            break;
          case 500:
            toast.error('Server error. Please try again later.', {
              className: styles.toastError
            });
            break;
          default:
            toast.error(
              error.response.data?.message || `Request failed with status ${error.response.status}`, {
                className: styles.toastError
              }
            );
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.', {
          className: styles.toastError
        });
      } else {
        toast.error('Request configuration error: ' + error.message, {
          className: styles.toastError
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <h1 className={styles.header}>Create New User</h1>
      
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
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.errorInput : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Role*</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                className={errors.role ? styles.errorInput : ''}
              >
                <option value="">Select Role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="PHP Developer">PHP Developer</option>
                <option value="MERN Stack Developer">MERN Stack Developer</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Personal Assistant">Personal Assistant</option>
                <option value="Wordpress Developer">Wordpress Developer</option>
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
                Creating Admin...
              </>
            ) : (
              'Create Admin'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;