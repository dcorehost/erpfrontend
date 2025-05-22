




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import styles from "./SuperAdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack, BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBullhorn } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { FaCalendarAlt, FaFileAlt, FaUserClock } from 'react-icons/fa';

const SuperAdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      title: "User",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "User List", icon: <FaBuildingUser />, link: "/superadmin-userlist" },
        { title: "User Leaves ", icon: <GrTasks />, link: "/superadmin-userleave" },
      ],
    },
    {
      title: "Holiday Management",
      icon: <FaCalendarAlt />,
      link: "/#",
      submenus: [
        { title: "Create Holidays", icon: <FaCalendarAlt />, link: "/create-holidays" },
        { title: "Holiday List", icon: <FaClipboardList />, link: "/holiday-list" },
      ],
    },
   
    {
      title: "Announcements",
      icon: <FaBullhorn />,
      link: "/#",
      submenus: [
        {
          title: "New Announcements",
          icon: <FaClipboardList />,
          link: "/superadmin-notifications",
        },
        {
          title: "Announcements History",
          icon: <GrTasks />,
          link: "/superadmin-notifications-history",
        },
      ],
    },
    {
      title: "Admin Section",
      icon: <RiAdminFill />,
      link: "/#",
      submenus: [

        { title: "Admin List", icon: <FaUser />, link: "/superadmin-adminlist" },
        { title: "Pending Admin Leave", icon: <FaFileAlt />, link: "/superadmin-adminleave" },
        { title: "Admin Leave Summary", icon: <FaClipboardList />, link: "/superadmin-adminleave-summary" },
        // { title: "Manage Roles", icon: <FcSalesPerformance />, link: "/manage-roles" },
        // { title: "System Logs", icon: <BiSolidCoinStack />, link: "/system-logs" },
        // { title: "Admin Messages", icon: <BiSolidMessageSquareDots />, link: "/admin-messages" },
        // { title: "Settings", icon: <FaClipboardList />, link: "/admin-settings" },
      ],
    },
    {
      title: "Client Section",
      icon: <RiAdminFill />,
      link: "/#",
      submenus: [

        { title: "Client Projects", icon: <FaUser />, link: "/CreateClientProject" },
        { title: "Client Request", icon: <FaFileAlt />, link: "/ClientProjectRequestsDetails" },
        // { title: "Admin Leave Summary", icon: <FaClipboardList />, link: "/##" },
        // { title: "Manage Roles", icon: <FcSalesPerformance />, link: "/manage-roles" },
        // { title: "System Logs", icon: <BiSolidCoinStack />, link: "/system-logs" },
        // { title: "Admin Messages", icon: <BiSolidMessageSquareDots />, link: "/admin-messages" },
        // { title: "Settings", icon: <FaClipboardList />, link: "/admin-settings" },
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
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <button className={styles.hamburgerButton} onClick={toggleSidebar}>
            {isOpen ? "✖" : "☰"}
          </button>
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