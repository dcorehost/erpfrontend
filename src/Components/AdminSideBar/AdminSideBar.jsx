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
  FaUserClock, // For pending leaves
  FaUserPlus, // For create new user
  FaClipboard, // For admin task summary
  FaChartBar, // For time waste stats
} from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import styles from "./AdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      title: " User Leave",
      icon: <FaCalendarCheck />, // More relevant icon for leave
      link: "/#",
      submenus: [
        { title: "Pending Leaves", link: "/Admin/Leave/Pending-Leaves", icon: <FaUserClock /> },
        { title: "Completed Leaves", link: "/CompletedLeaves", icon: <FaCheckSquare /> },
        { title: "Rejected Leaves", link: "/RejectedLeaves", icon: <FaTimesCircle /> },
        { title: "Admin Profile", link: "/Pages/OwnAdminProfile/OwnAdminProfile", icon: <FaUserCog /> },
      ],
    },
    {
      title: "Assignment",
      icon: <GrTasks />, // More relevant icon for assignments
      link: "/#",
      submenus: [
        { title: "Create New Project", link: "/CreateNewProject", icon: <FaPlus /> },
        { title: "Project Details", link: "/ProjectDetails", icon: <FaListUl /> },
        { title: "Task Assignment", link: "/Admin/Leave/Task-Assignment", icon: <FaTasks /> },
        { title: "Update Task Progress", link: "/Admin/Assignment/task-status", icon: <FaCheckSquare /> }, // Shortened title
        { title: "Admin Task Summary", link: "/Admin-Task-Summary", icon: <FaClipboard /> },
      ],
    },
    {
      title: "User Creation",
      icon: <FaUsers />, // Icon for multiple users
      link: "/#",
      submenus: [
        { title: "Create New User", link: "/create-user", icon: <FaUserPlus /> },
        { title: "User Details", link: "/AdminUserTable", icon: <FaListUl /> },
      ],
    },
    {
      title: "Attendance",
      icon: <FaCalendarAlt />,
      link: "/attendance",
      submenus: [
        {
          title: "Mark Attendance",
          link: "/mark-attendance",
          description: "Check-in and Check-out for daily attendance tracking.",
          icon: <FaCalendarCheck />, // Clearer icon for marking attendance
        },
        {
          title: "My Attendance Summary",
          link: "/attendance-summary",
          description: "View daily, weekly, and monthly attendance records.",
          icon: <FaChartLine />,
        },
        {
          title: "User Attendance",
          link: "/Admin-user-attendance",
          description: "View daily, weekly, and monthly attendance records of User.",
          icon: <FaUsers />,
        },
        // {
        //   title: "Leave Approval Status",
        //   link: "/leave-status",
        //   description: "Track the status of your leave applications.",
        //   icon: <FaCheckSquare />, // Example icon
        // },
        // {
        //   title: "Attendance Regularization",
        //   link: "/attendance-regularization",
        //   description: "Request corrections for missing or incorrect attendance records.",
        //   icon: <FaPencilAlt />, // Need to import FaPencilAlt
        // },
        // {
        //   title: "Shift Management",
        //   link: "/shift-management",
        //   description: "View and manage your work shifts.",
        //   icon: <FaClock />, // Need to import FaClock
        // },
        // {
        //   title: "Holiday Calendar",
        //   link: "/holiday-calendar",
        //   description: "View the company's holiday schedule.",
        //   icon: <FaCalendar />, // Need to import FaCalendar
        // },
      ],
    },
    {
      title: "Payroll & PaySlips",
      icon: <FaFileInvoiceDollar />, // More relevant icon for payroll
      link: "/#",
      submenus: [
        { title: "User Payrolls", link: "/Create-User-Payrolls", icon: <FaUsers /> }, // Icon for managing user payrolls
        { title: "Payroll Summary", link: "/Admin-Payroll", icon: <FaChartLine /> },
        { title: "Time Waste Stats", link: "/Admine/payrolls&slips/timechange", icon: <FaChartBar /> }, // Using chart bar for stats
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
          link: "/admin-notifications",
        },
        {
          title: "Announcements History",
          icon: <GrTasks />,
          link: "/admin-notifications-history",
        },
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
    navigate("/"); // Immediate redirect after clear
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
                <FaChartLine /> {/* You might want a different icon for logout */}
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

export default AdminSidebar;