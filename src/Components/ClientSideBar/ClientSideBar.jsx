import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaChevronUp,
  FaChevronDown,
  FaCalendarAlt,
  FaBullhorn,
  FaClipboardList,
  FaUser,
  FaCheckSquare,
  FaTimesCircle,
  FaUserCog,
  FaTasks,
  FaPlus,
  FaListUl,
  FaFileInvoiceDollar,
  FaUsers,
  FaCalendarCheck,
  FaUserClock,
  FaUserPlus, 
  FaClipboard,
  FaChartBar, 
  FaSignOutAlt,
  // ✅ Added these missing icons:
  FaTachometerAlt,
  FaProjectDiagram,
  FaFileAlt,
  FaFolder,
  FaComments,
  FaEnvelope,
  FaFileInvoice,
  FaMoneyBillWave
} from "react-icons/fa"; // ✅ Fixed
import { GrTasks } from "react-icons/gr";
import styles from "./ClientSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const CLientSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      link: "/client-dashboard",
    },
    {
      title: "Projects",
      link: "/projects",
      icon: <FaProjectDiagram />, 
    },
    {
      title: "Tasks",
      icon: <FaTasks />, 
      link: "/client-tasks",
    },
    {
      title: "New Request",
      icon: <FaFileAlt />,
      link: "/client-project-requests",
      },
    {
      title: "Documents",
      icon: <FaFolder />, 
      link: "/client-documents",
    },
    {
      title: "Communication",
      icon: <FaComments />,
      link: "/#",
      notificationCount: 3,
      submenus: [
        { 
          title: "Messages", 
          link: "/client-messages",
          icon: <FaEnvelope />,
          notificationCount: 3
        },
        { 
          title: "Announcements", 
          link: "/client-announcements",
          icon: <FaBullhorn />
        },
        { 
          title: "Meetings", 
          link: "/client-meetings",
          icon: <FaCalendarAlt />
        }
      ]
    },
    {
      title: "Financial",
      icon: <FaMoneyBillWave />,
      link: "/#",
      submenus: [
        { 
          title: "Invoices", 
          link: "/client-invoices",
          icon: <FaFileInvoice />
        },
        { 
          title: "Payments", 
          link: "/client-payments",
          icon: <FaMoneyBillWave />
        },
        { 
          title: "Receipts", 
          link: "/client-receipts",
          icon: <FaFileAlt />
        }
      ]
    }
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) => setActiveMenu(activeMenu === index ? null : index);

  const handleLogout = () => {
    // Clear all authentication-related storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login page
    navigate("/", { replace: true });
    
    // Optional: Force a full page reload to ensure all state is cleared
    window.location.reload();
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarContainer}>
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
                    {menu.submenus && menu.submenus.length > 0 && (
                      <span className={styles.dropdownIcon}>
                        {activeMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    )}
                  </div>
                  {activeMenu === index && menu.submenus && (
                    <ul className={styles.submenu}>
                      {menu.submenus.map((submenu, subIndex) => (
                        <li key={subIndex} className={styles.submenuItem}>
                          <Link to={submenu.link} className={styles.submenuLink}>
                            {submenu.icon && <span className={styles.icon}>{submenu.icon}</span>}
                            {submenu.title}
                          </Link>
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
                <FaSignOutAlt className={styles.icon} />
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

export default CLientSidebar;