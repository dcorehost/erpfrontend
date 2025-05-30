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
  // ✅ Added these missing icons:
  FaTachometerAlt,
  FaProjectDiagram,
  FaFileAlt,
  FaFolder,
  FaComments,
  FaEnvelope,
  FaFileInvoice,
  FaMoneyBillWave,
  FaChevronRight,
} from "react-icons/fa"; // ✅ Fixed

import { GrTasks } from "react-icons/gr";
import styles from "./ClientSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const CLientSidebar = ({ children }) => {
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      link: "/client-dashboard",
    },
    {
      title: "Projects",
      link: "/client-projects",
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
    // {
    //   title: "Documents",
    //   icon: <FaFolder />,
    //   link: "/client-documents",
    // },
    {
      title: "Communication",
      icon: <FaComments />,
      link: "/#",
      notificationCount: 3,
      submenus: [
        // {
        //   title: "Messages",
        //   link: "/client-messages",
        //   icon: <FaEnvelope />,
        //   notificationCount: 3,
        // },
        // {
        //   title: "Announcements",
        //   link: "/client-announcements",
        //   icon: <FaBullhorn />,
        // },
        // {
        //   title: "Meetings",
        //   link: "/client-meetings",
        //   icon: <FaCalendarAlt />,
        // },
      ],
    },
    {
      title: "Financial",
      icon: <FaMoneyBillWave />,
      link: "/#",
      submenus: [
        // {
        //   title: "Invoices",
        //   link: "/client-invoices",
        //   icon: <FaFileInvoice />,
        // },
        // {
        //   title: "Payments",
        //   link: "/client-payments",
        //   icon: <FaMoneyBillWave />,
        // },
        // {
        //   title: "Receipts",
        //   link: "/client-receipts",
        //   icon: <FaFileAlt />,
        // },
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
            style={isOpen ? { left: "190px" } : { left: "10px" }}
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

export default CLientSidebar;
