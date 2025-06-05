import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../Components/Services/Auth'; // Adjust path if needed
import styles from './ImpersonatedDashboard.module.css'; // Keep existing styles

const ImpersonatedDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure the message is from the same origin and contains the necessary data
      if (
        event.origin === window.location.origin &&
        event.data &&
        event.data.impersonateData
      ) {
        const { token, role, username, employeeId, email } = event.data.impersonateData;

        // Use Auth.startImpersonation to set the impersonated user's data
        // For this scenario, as it's a new tab, we don't save the 'original' admin data here.
        // The 'original' admin data is saved in the parent tab before opening this one.
        // Here, we just need to set the current tab's local storage to the impersonated user.
        Auth.setUserData({
          token: token,
          email: email, // Assuming backend provides email for impersonated user
          username: username,
          typeOfUser: role,
          employeeId: employeeId,
        });

        // Redirect to the appropriate dashboard based on the impersonated user's role
        let redirectTo = '/user-dashboard'; // Default for users
        if (role === 'Admin') {
          redirectTo = '/admin-dashboard';
        } else if (role === 'Client') {
          redirectTo = '/client-dashboard';
        } else if (role === 'superadmin') {
            redirectTo = '/superadmin-dashboard'; // If a superadmin is impersonating another superadmin (less common)
        }

        navigate(redirectTo, { replace: true }); // Use replace to prevent back button issues
        window.removeEventListener('message', handleMessage); // Remove listener after use
      }
    };

    window.addEventListener('message', handleMessage);

    // Inform the opener that this tab is ready to receive the token
    if (window.opener) {
      window.opener.postMessage('ready-for-impersonation-data', window.location.origin);
    } else {
        // If somehow opened directly, redirect to login
        navigate('/login', { replace: true });
    }


    // Cleanup listener on unmount
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loadingText}>Loading User Dashboard...</div>
    </div>
  );
};

export default ImpersonatedDashboard;