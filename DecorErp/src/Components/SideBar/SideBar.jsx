

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./SideBar.module.css";

// const SideBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState({
//     projects: false,
//     settings: false, 

//   });

//   const toggleDropdown = (menu) => {
//     setDropdownOpen((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };

//   return (
//     <div className={styles.sidebarContainer}>
//       <button 
//         className={styles.toggleButton} 
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         ☰
//       </button>
//       <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
//         <ul>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <button
//               className={styles.dropdownButton}
//               onClick={() => toggleDropdown("projects")}
//             >
//               Projects ▼
//             </button>
//             {dropdownOpen.projects && (
//               <ul className={styles.dropdown}>
//                 <li><Link to="/projects/overview">Overview</Link></li>
//                 <li><Link to="/projects/create">Create New</Link></li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <button
//               className={styles.dropdownButton}
//               onClick={() => toggleDropdown("TeamManager")}
//             >
//               Team Manager ▼
//             </button>
//             {dropdownOpen.settings && (
//               <ul className={styles.dropdown}>
//                 <li><Link to="/settings/profile">Profile</Link></li>
//                 <li><Link to="/settings/account">Account</Link></li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <button
//               className={styles.dropdownButton}
//               onClick={() => toggleDropdown("SellsManagment")}
//             >
//               Sells Managment ▼
//             </button>
//             {dropdownOpen.settings && (
//               <ul className={styles.dropdown}>
//                 <li><Link to="/settings/profile">Profile</Link></li>
//                 <li><Link to="/settings/account">Account</Link></li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <button
//               className={styles.dropdownButton}
//               onClick={() => toggleDropdown("settings")}
//             >
//               Settings ▼
//             </button>
//             {dropdownOpen.settings && (
//               <ul className={styles.dropdown}>
//                 <li><Link to="/settings/profile">Profile</Link></li>
//                 <li><Link to="/settings/account">Account</Link></li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className={`${styles.sidebarContainer} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          {/* Dashboard */}
          <li>
            <Link to="/dashboard" className={styles.menuItem}>
              Dashboard
            </Link>
          </li>

          {/* Projects */}
          <li>
            <button
              className={`${styles.menuItem} ${styles.dropdownToggle}`}
              onClick={() => toggleDropdown("projects")}
            >
              Projects ▼
            </button>
            {activeDropdown === "projects" && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/projects/overview" className={styles.menuItem}>
                    Overview
                  </Link>
                </li>
                <li>
                  <Link to="/projects/create" className={styles.menuItem}>
                    Create New
                  </Link>
                </li>
                <li>
                  <Link to="/projects/archive" className={styles.menuItem}>
                    Archive
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Teams */}
          <li>
            <button
              className={`${styles.menuItem} ${styles.dropdownToggle}`}
              onClick={() => toggleDropdown("teams")}
            >
              Teams ▼
            </button>
            {activeDropdown === "teams" && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/teams/all" className={styles.menuItem}>
                    All Teams
                  </Link>
                </li>
                <li>
                  <Link to="/teams/manage" className={styles.menuItem}>
                    Manage Teams
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li>
            <Link to="/reports" className={styles.menuItem}>
              Reports
            </Link>
          </li>

          {/* Settings */}
          <li>
            <button
              className={`${styles.menuItem} ${styles.dropdownToggle}`}
              onClick={() => toggleDropdown("settings")}
            >
              Settings ▼
            </button>
            {activeDropdown === "settings" && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/settings/profile" className={styles.menuItem}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings/account" className={styles.menuItem}>
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/settings/preferences" className={styles.menuItem}>
                    Preferences
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Logout */}
          <li>
            <Link to="/logout" className={styles.menuItem}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
