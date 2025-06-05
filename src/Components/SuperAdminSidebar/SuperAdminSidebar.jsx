import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import styles from "./SuperAdminSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser, FaChevronRight } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack, BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaCalendarAlt, FaFileAlt, FaUserClock } from "react-icons/fa";
import { title } from "framer-motion/client";

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
      title: "User",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        {
          title: "User List",
          icon: <FaBuildingUser />,
          link: "/superadmin-userlist",
        },
        {
          title: "User Leaves ",
          icon: <GrTasks />,
          link: "/superadmin-userleave",
        },
        {
          title: "Attendance",
          icon: <GrTasks />,
          link: "/superadmin-leave",
        },
        {
          title: "Announcement",
          icon: <FaBuildingUser />,
          link: "/superadmin-notifications",
        },
      ],
    },
    {
      title: "Holiday Management",
      icon: <FaCalendarAlt />,
      link: "/#",
      submenus: [
        {
          title: "Create Holidays",
          icon: <FaCalendarAlt />,
          link: "/create-holidays",
        },
        {
          title: "Holiday List",
          icon: <FaClipboardList />,
          link: "/holiday-list",
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
        {
          title: "Admin List",
          icon: <FaUser />,
          link: "/superadmin-adminlist",
        },
         {
          title: "Attendance",
          icon: <FaFileAlt />,
          link: "/superadmin-attendance",
        },
        {
          title: "Pending Admin Leave",
          icon: <FaFileAlt />,
          link: "/superadmin-adminleave",
        },
        {
          title: "Admin Leave Summary",
          icon: <FaClipboardList />,
          link: "/superadmin-adminleave-summary",
        },
        {
          title: "Update User Profile",
          icon: <FcSalesPerformance />,
          link: "/superadmin-userupdate",
        },
        // { title: "System Logs", icon: <BiSolidCoinStack />, link: "/system-logs" },
        // { title: "Admin Messages", icon: <BiSolidMessageSquareDots />, link: "/admin-messages" },
        // { title: "Settings", icon: <FaClipboardList />, link: "/admin-settings" },
      ],
    },
    {
      title: "Client Section",
      icon: <FaCalendarAlt />,
      link: "/#",
      submenus: [
        {
          title: "Create Project",
          icon: <FaCalendarAlt />,
          link: "/superadmin-clientsection-createproject",
        },
       
        
        {
          title: "Project Details",
          icon: <FaClipboardList />,
          link: "/SuperAdmin-ProjectDetails",
        },

        {
          title: "New Request",
          icon: <FaClipboardList />,
          link: "/superadmin-clientsection-clientrequest",
        },


        {
          title: "CreateClient",
          icon: <FaClipboardList />,
          link: "/superadmin-clientsection-Createclient",
        },
        // { title: "Thinking", icon: <FaClipboardList />, link: "/" },
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
