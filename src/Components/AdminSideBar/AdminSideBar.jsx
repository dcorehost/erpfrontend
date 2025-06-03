import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  FaChevronRight,
} from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import styles from "./AdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const AdminSidebar = ({ children }) => {
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const menus = [
    {
      title: "Leave",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        // { title: "Apply Leave", link: "/leave-summary" },
        { title: "User Pending Leaves", link: "/Admin/Leave/Pending-Leaves" },
        { title: "User Completed Leaves", link: "/CompletedLeaves" },
        { title: "User Rejected Leaves", link: "/RejectedLeaves" },
        { title: "Apply Leave", link: "/Admin/Leave/ApplyLeave" },
        // { title: "Admin User", link:"Own-Admin-Profile" },
      ],
    },
    {
      title: "Assignment",
      icon: <GrTasks />,
      link: "/#",
      submenus: [
        {
          title: "Create New Project",
          link: "/CreateNewProject",
          icon: <FaPlus />,
        },
        {
          title: "Project Details",
          link: "/ProjectAdmin",
          icon: <FaListUl />,
        },
        {
          title: "Create Assignment",
          link: "/Admin/Leave/Task-Assignment",
          icon: <FaTasks />,
        },
        {
          title: "Update Task Progress",
          link: "/Admin/Assignment/task-status",
          icon: <FaCheckSquare />,
        },
        {
          title: "Admin Task Summary",
          link: "/Admin-Task-Summary",
          icon: <FaClipboard />,
        },
      ],
    },
    {
      title: "User Creation",
      icon: <FaUsers />,
      link: "/#",
      submenus: [
        {
          title: "Create New User",
          link: "/create-user",
          icon: <FaUserPlus />,
        },
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
          icon: <FaCalendarCheck />,
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
          description:
            "View daily, weekly, and monthly attendance records of User.",
          icon: <FaUsers />,
        },
      ],
    },
    {
      title: "Payroll & PaySlips",
      icon: <FaFileInvoiceDollar />,
      link: "/#",
      submenus: [
        {
          title: "User Payrolls",
          link: "/Create-User-Payrolls",
          icon: <FaUsers />,
        },
        {
          title: "Payroll Summary",
          link: "/Admin-Payroll",
          icon: <FaChartLine />,
        },
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

  useEffect(() => {
    const match = menus.find(
      (item) =>
        pathname === item.link ||
        item.submenus?.some((child) => pathname === child.link)
    );
    if (match) setExpandedItem(match.title);
  }, [pathname]);

  useEffect(() => {
    if (expandedItem && scrollContainerRef.current) {
      const expandedItemEl = scrollContainerRef.current.querySelector(
        `[data-title="${expandedItem}"]`
      );
      if (expandedItemEl) {
        expandedItemEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [expandedItem]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) =>
    setActiveMenu(activeMenu === index ? null : index);
  const toggleExpand = (title) => {
    setExpandedItem((prev) => (prev === title ? null : title));
  };
  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    console.log("Logout clicked! Clearing localStorage...");
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedOut(true);
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar isOpen={isOpen} />
      <div className={`${styles.sidebarWrapper}`}>
        {/* <div className={`${styles.sidebarContainer}`}> */}
        <div
          className={`${styles.sidebar} ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          <button
            className={styles.hamburgerButton}
            style={isOpen ? { left: "210px" } : { left: "10px" }}
            onClick={toggleSidebar}
          >
            {"☰"}
          </button>
          <div className={styles.scrollContainer} ref={scrollContainerRef}>
            <nav className={styles.menu}>
              {menus.map((item, index) => (
                <div
                  key={item?.title}
                  data-title={item?.title}
                  className={styles.menuItem}
                >
                  {item?.submenus ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item?.title)}
                        className={`${styles.menuButton} ${
                          isActive(item.link) ? styles.active : ""
                        }`}
                      >
                        <div className={styles.sidebarItem}>
                          <span
                            className={styles.sidebarIcon}
                            style={{ marginRight: "8px" }}
                          >
                            {item?.icon}
                          </span>
                          <span
                            className={`${styles.sidebarTitle} ${
                              isOpen ? styles.open : ""
                            }`}
                            style={{
                              flexGrow: 1,
                            }} /* Ensure text takes available space */
                          >
                            {item?.title}
                          </span>
                          <FaChevronRight
                            size={12}
                            className={`${styles.chevronIcon} ${
                              isOpen ? styles.open : ""
                            } ${
                              expandedItem === item?.title
                                ? styles.expanded
                                : ""
                            }`}
                            style={{
                              marginLeft: "auto",
                            }} /* Push chevron to the right */
                          />
                        </div>
                      </button>

                      {expandedItem === item?.title && isOpen && (
                        <div className={styles.sidebarChildrenWrapper}>
                          {item?.submenus.map((child) => (
                            <Link
                              key={child?.link}
                              to={child?.link}
                              className={`${styles.sidebarChildLink} ${
                                isActive(child?.link) ? styles.active : ""
                              }`}
                            >
                              <span className={styles.childIcon}>
                                {child?.icon}
                              </span>
                              <span className={styles.childTitle}>
                                {child?.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item?.link}
                      className={`${styles.navLink} ${
                        isActive(item?.link) ? styles.active : ""
                      }`}
                    >
                      <span className={styles.navIcon}>{item?.icon}</span>
                      <span
                        className={`${styles.navTitle} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        {item?.title}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className={styles.logoutContainer}>
            <button className={styles.logoutSidebar} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* </div> */}
        <div
          className={`${styles.contentMenu} ${isOpen ? "" : styles.fullWidth}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
