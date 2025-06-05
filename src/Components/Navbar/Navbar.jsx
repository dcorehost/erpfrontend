// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FaBell, FaUserCircle } from "react-icons/fa";
// import axios from "axios";
// import styles from "./Navbar.module.css";
// import logo from "../../assets/logo.jpeg";
// import Auth from "../Services/Auth";

// const Navbar = ({ isOpen }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const bellRef = useRef(null);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = Auth.getUserDetails();
//         if (data) {
//           setUserData(data);
//         }

//         if (Auth.isAuthenticated()) {
//           const response = await axios.get(
//             "http://209.74.89.83/erpbackend/get-notifications",
//             {
//               headers: {
//                 Authorization: `Bearer ${Auth.getToken()}`,
//               },
//             }
//           );
//           setNotifications(
//             Array.isArray(response.data) ? response.data.slice(0, 5) : []
//           );
//         }
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfileDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getNotificationRoute = () => {
//     if (!userData) return "/";
//     switch (userData.typeOfUser) {
//       case "Admin":
//         return "/admin-notifications";
//       case "superadmin":
//         return "/superadmin-notifications-history";
//       default:
//         return "/user-notifications";
//     }
//   };

//   const handleLogout = () => {
//     Auth.logout();
//     window.location.href = "/";
//   };

//   return (
//     <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logoLink}>
//           <img src={logo} alt="Company Logo" className={styles.logo} />
//         </Link>

//         {userData && (
//           <div className={styles.welcomeMessage}>
//             Welcome back, <span className={styles.username}>{userData.username}</span>!
//           </div>
//         )}

//         <div className={styles.rightSection}>
//           <div className={styles.bellContainer} ref={bellRef}>
//             <FaBell
//               className={styles.bellIcon}
//               onClick={() => setShowDropdown((prev) => !prev)}
//             />
//             {notifications.length > 0 && (
//               <span className={styles.badge}>{notifications.length}</span>
//             )}
//             {showDropdown && (
//               <div className={styles.dropdown}>
//                 <h4>Notifications</h4>
//                 {notifications.length === 0 ? (
//                   <p className={styles.noNotifications}>No new notifications</p>
//                 ) : (
//                   <ul>
//                     {notifications.map((notification) => (
//                       <li key={notification._id} className={styles.notificationItem}>
//                         <strong>{notification.title}</strong>
//                         <p>{notification.message}</p>
//                         <small>
//                           {new Date(notification.createdAt).toLocaleString()}
//                         </small>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 <Link to={getNotificationRoute()} className={styles.viewAll}>
//                   View All Notifications
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className={styles.profileContainer} ref={profileRef}>
//             <div
//               className={styles.profile}
//               onClick={() => setShowProfileDropdown((prev) => !prev)}
//             >
//               <FaUserCircle className={styles.profileIcon} />
//               <span className={styles.profileName}>
//                 {userData?.username || "Profile"}
//               </span>
//             </div>
//             {showProfileDropdown && (
//               <div className={styles.profileDropdown}>
//                 <div className={styles.profileHeader}>
//                   <FaUserCircle className={styles.profileLargeIcon} />
//                   <div>
//                     <h4>{userData?.username}</h4>
//                     <p className={styles.userRole}>
//                       {userData?.typeOfUser || "User"}
//                     </p>
//                     <p className={styles.userEmail}>{userData?.emailId}</p>
//                   </div>
//                 </div>
//                 <div className={styles.profileMenu}>
//                   <Link to="/my-profile" className={styles.profileMenuItem}>
//                     My Profile
//                   </Link>
//                   <Link to="/Own-User-Profile" className={styles.profileMenuItem}>
//                     Settings
//                   </Link>

//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.jpeg";
import Auth from "../Services/Auth";

const Navbar = ({ isOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);
  const bellRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data and notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = Auth.getUserDetails();
        if (data) {
          setUserData(data);
        }

        if (Auth.isAuthenticated()) {
          const response = await axios.get(
            "http://209.74.89.83/erpbackend/get-notifications",
            {
              headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
              },
            }
          );
          setNotifications(
            Array.isArray(response.data) ? response.data.slice(0, 5) : []
          );
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  // Handle click outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationRoute = () => {
    if (!userData) return "/";
    switch (userData.typeOfUser) {
      case "Admin":
        return "/admin-notifications";
      case "superadmin":
        return "/superadmin-notifications-history";
      default:
        return "/user-notifications";
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked! Clearing localStorage...");
    localStorage.clear();
    sessionStorage.clear();
    Auth.logout(); 
    navigate("/login", { replace: true }); 
    window.location.reload(); 
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Company Logo" className={styles.logo} />
        </Link>

        {userData && (
          <div className={styles.welcomeMessage}>
            Welcome back,{" "}
            <span className={styles.username}>{userData.username}</span>!
          </div>
        )}

        <div className={styles.rightSection}>
          <div className={styles.bellContainer} ref={bellRef}>
            <FaBell
              className={styles.bellIcon}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {notifications.length > 0 && (
              <span className={styles.badge}>{notifications.length}</span>
            )}
            {showDropdown && (
              <div className={styles.dropdown}>
                <h4>Notifications</h4>
                {notifications.length === 0 ? (
                  <p className={styles.noNotifications}>No new Announcement</p>
                ) : (
                  <ul>
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className={styles.notificationItem}
                      >
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                      </li>
                    ))}
                  </ul>
                )}
                <Link to={getNotificationRoute()} className={styles.viewAll}>
                  View All Announcement
                </Link>
              </div>
            )}
          </div>

          <div className={styles.profileContainer} ref={profileRef}>
            <div
              className={styles.profile}
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            >
              <FaUserCircle className={styles.profileIcon} />
              <span className={styles.profileName}>
                {userData?.username || "Profile"}
              </span>
            </div>
            {showProfileDropdown && ( 
              <div className={styles.profileDropdown}>
                <div className={styles.profileHeader}>
                  <FaUserCircle className={styles.profileLargeIcon} />
                  <div>
                    <h4>{userData?.username}</h4>
                    <p className={styles.userRole}>{userData?.typeOfUser || "User"}</p>
                    <p className={styles.userEmail}>{userData?.email}</p>
                  </div>
                </div>
                <div className={styles.profileMenu}>
                  <Link to="/my-profile" className={styles.profileMenuItem}>
                    My Profile
                  </Link>
                  <Link
                    to="/Own-User-Profile"
                    className={styles.profileMenuItem}
                  >
                    Update Profile
                  </Link>
                  <div className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

