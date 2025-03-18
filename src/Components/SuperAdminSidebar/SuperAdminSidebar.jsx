
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaChartLine, FaChalkboardTeacher, FaChevronUp, FaChevronDown } from "react-icons/fa";
// import { MdPlayLesson } from "react-icons/md";
// import { RiAdminFill, RiTeamFill } from "react-icons/ri";
// import { LiaBuysellads } from "react-icons/lia";
// import styles from "./SuperAdminSidebar.module.css";
// import Navbar from "../Navbar/Navbar";
// import { FaBuildingUser } from "react-icons/fa6";
// import { GrTasks } from "react-icons/gr";
// import { FaUser } from "react-icons/fa";
// import { FcSalesPerformance } from "react-icons/fc";
// import { BiSolidCoinStack } from "react-icons/bi";
// import { BiSolidMessageSquareDots } from "react-icons/bi";

// const SuperAdminSidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const menus = [
//     {
//       title: "Dashboard",
//       icon: <RiAdminFill />,
//       link: "/#",
//       submenus: [
//         { title: "User Management", icon: <FaBuildingUser />, link: "/user-management" },
//         { title: "Task Manager", icon: <GrTasks />, link: "/task-manager" },
//         { title: "Enquiry Table", icon: <BiSolidMessageSquareDots />, link: "/enquiries-details" },
//         { title: "User Profile", icon: <FaUser />, link: "/userProfile" },
//         { title: "Sales Report", icon: <FcSalesPerformance />, link: "/sales-report" },
//         { title: "Purchase Report", icon: <BiSolidCoinStack />, link: "/purchase-report" },
//         { title: "Option", icon: <FaBuildingUser />, link: "/sign" },
//       ],
//     },
//     {
//       title: "Admin Management",
//       icon: <RiTeamFill />,
//       link: "/#",
//       submenus: [
//         { title: "User Profile",    icon: <FaUser />         , link: "/userProfile" },
//         { title: "Option 1",        icon: <FaBuildingUser /> , link: "/option-1" },
//         { title: "Option 2",        icon: <FaBuildingUser /> , link: "/option-2" },
//         { title: "Option 3",        icon: <FaBuildingUser /> , link: "/option-3" },
//       ],
//     },
//     {
//       title: "Role & Permission",
//       icon: <LiaBuysellads />,
//       link: "/#",
//       submenus: [
//         { title: "Generate Sales",   icon: <FcSalesPerformance /> ,         link: "/sales-management" },
//         { title: "Generate Purchase ", icon: <BiSolidCoinStack /> ,         link: "/purchase-management" },
//         { title: "User Profile",     icon: <FaUser />         ,             link: "/userProfile" },
//         { title: "Option 3",         icon: <FaBuildingUser /> ,             link: "/option-3" },
//       ],
//     },
    
//     {
//       title: "System Setting",
//       icon: <FaChartLine />,
//       link: "/#",
//       submenus: [
//         { title: "Generate Purchase ", icon: <FaBuildingUser /> , link: "/purchase-management" },
//         { title: "Option 2",           icon: <FaBuildingUser /> , link: "/option-2" },
//         { title: "Option 3",           icon: <FaBuildingUser /> , link: "/option-3" },
//       ],
//     },
//     {
//       title: "Security & packing",
//       icon: <FaChalkboardTeacher />,
//       link: "/#",
//       submenus: [
//         { title: "User Profile",     icon: <FaUser />         ,           link: "/userProfile" },
//         { title: "Leave Management",       icon: <FaBuildingUser /> ,             link: "/leave-management" },
//         { title: "Option 3",       icon: <FaBuildingUser /> ,             link: "/option-3" },
//       ],
//     },
//     {
//       title: "Subscription  & Billing",
//       icon: <MdPlayLesson />,
//       link: "/#",
//       submenus: [
//         { title: "Option 1",   icon: <FaBuildingUser /> , link: "/option-1" },
//         { title: "Option 2",   icon: <FaBuildingUser /> , link: "/option-2" },
//         { title: "Option 3",   icon: <FaBuildingUser /> , link: "/option-3" },
//       ],
//     },
//     {
//       title: "Reports & Analytics",
//       icon: <FaChartLine />,
//       link: "/#",
//       submenus: [
//         { title: "Option 1",   icon: <FaBuildingUser /> , link: "/option-1" },
//         { title: "Option 2",   icon: <FaBuildingUser /> , link: "/option-2" },
//         { title: "Option 3",   icon: <FaBuildingUser /> , link: "/option-3" },
//       ],
//     },
//     // Additional menus here
//   ];

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const toggleSubmenu = (index) => setActiveMenu(activeMenu === index ? null : index);

//   return (
//     <div className={`${styles.sidebarWrapper}`}>
//       <div className={`${styles.sidebarContainer}`}>
//         <button
//           className={styles.hamburgerButton}
//           onClick={toggleSidebar}
//           aria-expanded={isOpen}
//           aria-label="Toggle sidebar"
//         >
//           ☰
//         </button>

//         <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
//           <ul className={styles.menu}>
//             {menus.map((menu, index) => (
//               <React.Fragment key={index}>
//                 <li>
//                   <div
//                     className={styles.menuItem}
//                     onClick={() => toggleSubmenu(index)}
//                   >
//                     <div className={styles.icon}>{menu.icon}</div>
//                       <span className={`${styles.title} ${!isOpen ? styles.hidden : ""}`} >
//                         {menu.title}
//                      </span>
//                     {menu.submenus.length > 0 && (
//                       <span className={styles.dropdownIcon}>
//                         {activeMenu === index ? <FaChevronUp /> : <FaChevronDown />}
//                       </span>
//                     )}
//                   </div>
//                   {activeMenu === index && (
//                     <ul className={styles.submenu}>
//                       {menu.submenus.map((submenu, subIndex) => (
//                         <li key={subIndex} className={styles.submenuItem}>
//                           <div className={styles.submenuItemWrapper}>
//                             <span className={styles.icon}>{submenu.icon}</span>
//                             <Link to={submenu.link} className={styles.submenuLink}>
//                               {submenu.title}
//                             </Link>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//                 <hr className={styles.menuDivider} />
//               </React.Fragment>
//             ))}
//             <li>
//               <Link to="/logout" className={`${styles.menuItem} ${styles.logout}`}>
//                 <FaChartLine />
//                 <span
//                   className={`${styles.title} ${!isOpen ? styles.hidden : ""}`}
//                 >
//                   Logout
//                 </span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className={styles.contentMenu}>
//         <Navbar isOpen={isOpen} />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default SuperAdminSidebar;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import styles from "./SuperAdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack, BiSolidMessageSquareDots } from "react-icons/bi";

const SuperAdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: <FaChartLine />, 
      link: "/#",
      submenus: [
        { title: "User Management", icon: <FaBuildingUser />, link: "/user-management" },
        { title: "Task Manager", icon: <GrTasks />, link: "/task-manager" },
      ],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) => setActiveMenu(activeMenu === index ? null : index);

  const handleLogout = () => {
    console.log("Logout clicked! Clearing localStorage...");
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedOut(true);
    window.location.href = "/";
  };

  if (isLoggedOut) {
    navigate("/");
  }

  return (
    <div className={`${styles.sidebarWrapper}`}>
      <div className={`${styles.sidebarContainer}`}>
        {/* <button className={styles.hamburgerButton} onClick={toggleSidebar}>
          ☰
        </button> */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          {/* ☰ (Open) / ✖ (Close) Button */}
          <button className={styles.hamburgerButton} onClick={toggleSidebar}>
            {isOpen ? "✖" : "☰"}
          </button>
        {/* <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}> */}
          <ul className={styles.menu}>
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <li>
                  <div className={styles.menuItem} onClick={() => toggleSubmenu(index)}>
                    <div className={styles.icon}>{menu.icon}</div>
                    <span className={`${styles.title} ${!isOpen ? styles.hidden : ""}`}>
                      {menu.title}
                    </span>
                    {menu.submenus.length > 0 && (
                      <span className={styles.dropdownIcon}>
                        {activeMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    )}
                  </div>
                  {activeMenu === index && (
                    <ul className={styles.submenu}>
                      {menu.submenus.map((submenu, subIndex) => (
                        <li key={subIndex} className={styles.submenuItem}>
                          <div className={styles.submenuItemWrapper}>
                            <span className={styles.icon}>{submenu.icon}</span>
                            <Link to={submenu.link} className={styles.submenuLink}>
                              {submenu.title}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <hr className={styles.menuDivider} />
              </React.Fragment>
            ))}
            <li>
              <button onClick={handleLogout} className={`${styles.menuItem} ${styles.logout}`}>
                <FaChartLine />
                <span className={`${styles.title} ${!isOpen ? styles.hidden : ""}`}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.contentMenu}>
        <Navbar isOpen={isOpen} />
        {children}
      </div>
    </div>
  );
};

export default SuperAdminSidebar;



