


import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API calls
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'https://amediagencyonline.com/erp/sign-up',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        // Handle successful sign-up
        setSuccessMessage('Account created successfully!');
        console.log('Sign-up response:', response.data);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        // Handle API error response
        setErrorMessage(response.data.message || 'Sign-up failed!');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error during sign-up:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Sign Up</h2>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Password"
              required
            />
            <span
              className={styles.iconToggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <div className={styles.inputGroup}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Confirm Password"
              required
            />
            <span
              className={styles.iconToggle}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'signg Up...' : 'Sign Up'}
        </button>
        <div className={styles.linksContainer}>                
                <p className={styles.text}>
                  Already have an account?{" "}
                  <a href="/sign" className={styles.link}>
                    Login
                  </a>
                </p>
              </div>
      </form>
    </div>
  );
};

export default Signup;
