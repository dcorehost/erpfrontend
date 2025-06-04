import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Adjust the path to your PopupUserDashboard where usePopupUserAuth is defined
import { usePopupUserAuth } from '../../Components/PopupUserDashboard/PopupUserDashboard';
import styles from './LoginComponent.module.css'; // Assuming you have a CSS module for login styles

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken, setRole, setEmployeeId } = usePopupUserAuth(); // Destructure context setters

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // NOTE: The API endpoint 'admin-login-as-user' typically implies an admin
      // logging in *as* a regular user. If this is the primary user login,
      // you might have a different main login endpoint (e.g., /user-login).
      // Assuming this is the correct endpoint for your scenario.
      const response = await axios.post('http://209.74.89.83/erpbackend/admin-login-as-user', {
        email,    // Or phone, depending on your login strategy
        password,
      });

      const { token, role, username, employeeId, message } = response.data;

      if (token && role) {
        toast.success(message || 'Login successful!');

        // 1. Store user data in your PopupUserAuthContext
        // Assuming your context expects an object for user data
        setUser({ username, employeeId }); // Store only relevant user info
        setToken(token); // Store the token
        setRole(role); // Store the role
        setEmployeeId(employeeId); // Store employeeId if needed

        // 2. Redirect based on role
        if (role === 'Admin') {
          // If the admin-login-as-user implies an admin dashboard within the popup,
          // adjust the path accordingly. If it's the main admin dashboard,
          // ensure the popup closes and the main window redirects.
          navigate('/admin-dashboard'); // Example admin dashboard route
          // If this popup needs to close after redirecting the parent window:
          // window.opener.location.href = '/admin-dashboard';
          // window.close();
        } else if (role === 'User') {
          // Assuming 'User' refers to the standard employee role
          navigate('/user-dashboard'); // Your existing user dashboard route
        }
        // Add more else if conditions for other roles if necessary
        else {
          toast.info('Unknown user role. Redirecting to default dashboard.');
          navigate('/'); // Fallback to a default home/dashboard
        }
      } else {
        toast.error('Login response incomplete. Please try again.');
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || 'Login failed. Please check your credentials.');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email/Phone:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;