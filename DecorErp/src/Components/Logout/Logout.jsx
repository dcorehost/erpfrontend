import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logout.module.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call backend API to handle logout (if needed)
        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include',
        });

        // Clear user data from local storage or context
        localStorage.clear();

        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.message}>Logging out...</h1>
    </div>
  );
};

export default Logout;
