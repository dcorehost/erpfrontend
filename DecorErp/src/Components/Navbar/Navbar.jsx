import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({isOpen}) => {

  return (
    <nav className={`${styles.navbar} ${isOpen? styles.open : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <h1 className={styles.logo}>
          <Link to="/" style={{ color: '#C0C0C0', textDecoration: 'none' }}>Dcore</Link>
        </h1>


        {/* Buttons */}
        <div className={styles.buttons}>
          <Link to="/Signup">
            <button className={styles.signup}>SignUp</button>
          </Link>
          <Link to="/SignIn">
            <button className={styles.login}>Log In</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';

// const Navbar = () => {
//   const [showModulesDropdown, setShowModulesDropdown] = useState(false);
//   const [showReportsDropdown, setShowReportsDropdown] = useState(false);

//   return (
//     <nav className={styles.navbar} style={{ backgroundColor: '#000', color: '#C0C0C0' }}>
//       <div className={styles.container}>
//         {/* Logo */}
// <h1 className={styles.logo}>
//   <Link to="/" style={{ color: '#C0C0C0', textDecoration: 'none' }}>Decore</Link>
// </h1>

//         {/* Navigation Links */}
//         <ul className={styles.navLinks}>
//           <li><Link to="/dashboard" style={{ color: '#C0C0C0' }}>Dashboard</Link></li>

//           {/* Dropdown for Modules */}
//           <li
//             className={styles.dropdown}
//             onMouseEnter={() => setShowModulesDropdown(true)}
//             onMouseLeave={() => setShowModulesDropdown(false)}
//           >
//             <Link to="/modules" style={{ color: '#C0C0C0' }}>Modules</Link>
//             {showModulesDropdown && (
//               <ul className={styles.dropdownMenu} style={{ backgroundColor: '#000', border: '1px solid #C0C0C0' }}>
//                 <li><Link to="/modules/hr" style={{ color: '#C0C0C0' }}>Human Resources</Link></li>
//                 <li><Link to="/modules/finance" style={{ color: '#C0C0C0' }}>Finance</Link></li>
//                 <li><Link to="/modules/inventory" style={{ color: '#C0C0C0' }}>Inventory</Link></li>
//               </ul>
//             )}
//           </li>

//           {/* Dropdown for Reports */}
//           <li
//             className={styles.dropdown}
//             onMouseEnter={() => setShowReportsDropdown(true)}
//             onMouseLeave={() => setShowReportsDropdown(false)}
//           >
//             <Link to="/reports" style={{ color: '#C0C0C0' }}>Reports</Link>
//             {showReportsDropdown && (
//               <ul className={styles.dropdownMenu} style={{ backgroundColor: '#000', border: '1px solid #C0C0C0' }}>
//                 <li><Link to="/reports/sales" style={{ color: '#C0C0C0' }}>Sales Reports</Link></li>
//                 <li><Link to="/reports/employee" style={{ color: '#C0C0C0' }}>Employee Reports</Link></li>
//                 <li><Link to="/reports/inventory" style={{ color: '#C0C0C0' }}>Inventory Reports</Link></li>
//               </ul>
//             )}
//           </li>

//           <li><Link to="/settings" style={{ color: '#C0C0C0' }}>Settings</Link></li>
//           <li><Link to="/support" style={{ color: '#C0C0C0' }}>Support</Link></li>
//         </ul>

//         {/* Buttons */}
//         <div className={styles.buttons}>
//           <Link to="/profile">
//             <button className={styles.profile} style={{ backgroundColor: '#C0C0C0', color: '#000' }}>Profile</button>
//           </Link>
//           <Link to="/logout">
//             <button className={styles.logout} style={{ backgroundColor: '#C0C0C0', color: '#000' }}>Logout</button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
