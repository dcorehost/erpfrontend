import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaChevronUp,
  FaChevronDown,
  FaCalendarAlt,
  FaBullhorn,
  FaClipboardList,
} from "react-icons/fa";
import { GrTasks } from "react-icons/gr"; // ✅ Import fixed
import styles from "./AdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      title: "Leave",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "Pending Leaves", link: "/Admin/Leave/Pending-Leaves" },
        { title: "Completed Leaves", link: "/CompletedLeaves" },
        { title: "Rejected Leaves", link: "/RejectedLeaves" },
        { title: "Admin Profile", link: "/Pages/OwnAdminProfile/OwnAdminProfile" },
      ],
    },
    {
      title: "Assignment",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "Create New Project", link: "/CreateNewProject" },
        { title: "Project Details", link: "/ProjectDetails" },
        { title: "Task Assignment", link: "/Admin/Leave/Task-Assignment" },
        { title: "Update Task Progress & Completion Status", link: "/Admin/Assignment/task-status" },
        { title: "Admin Task Summary", link: "/Admin-Task-Summary" },
      ],
    },
    {
      title: "User Creation",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "New User", link: "/create-user" },
        { title: "User Details", link: "/AdminUserTable" },
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
        },
        {
          title: "Attendance Summary",
          link: "/attendance-summary",
          description: "View daily, weekly, and monthly attendance records.",
        },
        {
          title: "User Attendance",
          link: "/Admin-user-attendance",
          description: "View daily, weekly, and monthly attendance records of User.",
        },
        // {
        //   title: "Leave Approval Status",
        //   link: "/leave-status",
        //   description: "Track the status of your leave applications.",
        // },
        // {
        //   title: "Attendance Regularization",
        //   link: "/attendance-regularization",
        //   description: "Request corrections for missing or incorrect attendance records.",
        // },
        // {
        //   title: "Shift Management",
        //   link: "/shift-management",
        //   description: "View and manage your work shifts.",
        // },
        // {
        //   title: "Holiday Calendar",
        //   link: "/holiday-calendar",
        //   description: "View the company's holiday schedule.",
        // },
      ],
    },
    {
      title: "Payroll & PaySlips",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "User Payrolls", link: "/Create-User-Payrolls" },
        { title: "Payroll Summary", link: "/Admin-Payroll" },
        { title: "View TimeWaste Stats", link: "/Admine/payrolls&slips/timechange" },
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

export default AdminSidebar;
