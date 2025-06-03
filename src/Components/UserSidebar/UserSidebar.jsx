import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaChevronUp,
  FaChevronDown,
  FaCalendarAlt,
} from "react-icons/fa";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import styles from "./UserSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { FaTasks, FaChartPie } from "react-icons/fa";
import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaCoins,
  FaReceipt,
  FaChartBar,
  FaChevronRight,
} from "react-icons/fa";

import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack, BiSolidMessageSquareDots } from "react-icons/bi";
import { link } from "framer-motion/client";

const UserSidebar = ({ children }) => {
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
        { title: "Apply Leave", icon: <FaTag />, link: "/leave-summary" },
        {
          title: "Upcoming Leave",
          link: "/ApplyLeaveTable",
          icon: <FaRegCalendarCheck />,
        },
        { title: "Past Leave", link: "/PastLeaveTable", icon: <FaHistory /> },
        {
          title: "Leave Policy",
          link: "/Leave-policy",
          icon: <FaRegFileAlt />,
        },
      ],
    },
    {
      title: "Task & Project Management",
      icon: <GrTasks />,
      link: "/#",
      submenus: [
        { title: "Create Task", link: "/add-task", icon: <FaPlus /> },
        { title: "All Tasks Status", link: "/task-list", icon: <FaListUl /> },
        {
          title: "AssignedTaskList",
          link: "/User-Task-List",
          icon: <RiUserShared2Fill />,
        },
        // {
        //   title: "Update Task Progress & Completion Status",
        //   link: "/UserTaskProgress",
        //   icon: <FaTasks />,
        // },
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
          icon: <FaUserCheck />,
        },
        {
          title: "Attendance Summary",
          link: "/attendance-summary",
          icon: <FaChartPie />,
        },
      ],
    },
    {
      title: "Payroll &  PaySlips",
      icon: <BiSolidCoinStack />,
      link: "/#",
      submenus: [
        {
          title: "Payroll Summary",
          link: "/payroll-summary",
          icon: <FaFileInvoiceDollar />,
        },
        {
          title: "Deductions Overview",
          link: "/deductions",
          description: "View insurance, retirement, and other deductions",
          icon: <FaChartBar />,
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

export default UserSidebar;
