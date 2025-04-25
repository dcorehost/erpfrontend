// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';
// import axios from 'axios';
// import styles from './Navbar.module.css';
// import logo from '../../assets/logo.jpeg';
// import Auth from '../Services/Auth';

// const Navbar = ({ isOpen }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [userType, setUserType] = useState('User');
//   const bellRef = useRef(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = Auth.getToken();
//         if (!token) return;

//         const type = Auth.getUserType();
//         setUserType(type);

//         const response = await axios.get('http://209.74.89.83/erpbackend/get-notifications', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // No need to filter manually if backend already filters by Bearer token
//         setNotifications(Array.isArray(response.data) ? response.data.slice(0, 5) : []);
//       } catch (err) {
//         console.error("Failed to fetch notifications", err);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Dynamic link based on user type
//   const getNotificationRoute = () => {
//     switch (userType) {
//       case 'Admin':
//         return '/admin-notifications';
//       case 'superadmin':
//         return '/superadmin-notifications-history';
//       default:
//         return '/user-notifications';
//     }
//   };

//   return (
//     <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
//       <div className={styles.container}>
//         <Link to="/">
//           <img src={logo} alt="Dcore Logo" className={styles.logo} />
//         </Link>

//         <div className={styles.rightSection}>
//           <div className={styles.bellContainer} ref={bellRef}>
//             <FaBell
//               className={styles.bellIcon}
//               onClick={() => setShowDropdown(prev => !prev)}
//             />
//             {notifications.length > 0 && (
//               <span className={styles.badge}>{notifications.length}</span>
//             )}
//             {showDropdown && (
//               <div className={styles.dropdown}>
//                 <h4>Notifications</h4>
//                 {notifications.length === 0 ? (
//                   <p className={styles.noNotifications}>No notifications</p>
//                 ) : (
//                   <ul>
//                     {notifications.map((n) => (
//                       <li key={n._id}>
//                         <strong>{n.title}</strong>
//                         <p>{n.message}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 <Link to={getNotificationRoute()} className={styles.viewAll}>
//                   View All
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

 
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.jpeg';
import Auth from '../Services/Auth';

const Navbar = ({ isOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userType, setUserType] = useState('User');
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Auth.getToken();
        if (!token) return;

        const type = Auth.getUserType();
        setUserType(type);

        const response = await axios.get('http://209.74.89.83/erpbackend/get-notifications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setNotifications(Array.isArray(response.data) ? response.data.slice(0, 5) : []);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationRoute = () => {
    switch (userType) {
      case 'Admin':
        return '/admin-notifications';
      case 'superadmin':
        return '/superadmin-notifications-history';
      default:
        return '/user-notifications';
    }
  };

  const handleLogout = () => {
    Auth.logout();
    window.location.href = '/';
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logo} alt="Dcore Logo" className={styles.logo} />
        </Link>

        <div className={styles.rightSection}>
          <div className={styles.bellContainer} ref={bellRef}>
            <FaBell
              className={styles.bellIcon}
              onClick={() => setShowDropdown(prev => !prev)}
            />
            {notifications.length > 0 && (
              <span className={styles.badge}>{notifications.length}</span>
            )}
            {showDropdown && (
              <div className={styles.dropdown}>
                <h4>Notifications</h4>
                {notifications.length === 0 ? (
                  <p className={styles.noNotifications}>No notifications</p>
                ) : (
                  <ul>
                    {notifications.map((n) => (
                      <li key={n._id}>
                        <strong>{n.title}</strong>
                        <p>{n.message}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <Link to={getNotificationRoute()} className={styles.viewAll}>
                  View All
                </Link>
              </div>
            )}
          </div>

          <div className={styles.profileContainer} ref={profileRef}>
            <FaUserCircle
              className={styles.profileIcon}
              onClick={() => setShowProfileDropdown(prev => !prev)}
            />
            {showProfileDropdown && (
              <div className={styles.profileDropdown}>
                <ul>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/setting">setting</Link></li>
                  <li></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







