
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaChevronUp, FaChevronDown , FaCalendarAlt} from "react-icons/fa";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import styles from "./UserSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa"; // Note the 'Reg' for regular style
import { FaPlus } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";

import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack, BiSolidMessageSquareDots } from "react-icons/bi";
import { link } from "framer-motion/client";

const UserSidebar = ({ children }) => {
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
        { title: "Apply Leave",  icon: <FaTag  />, link: "/leave-summary" },
        { title: "Upcoming Leave", link: "/ApplyLeaveTable", icon: <FaRegCalendarCheck /> },
        { title: "Past Leave", link: "/PastLeaveTable", icon: <FaHistory /> },
        { title: "Leave Policy", link: "/Leave-policy", icon: <FaRegFileAlt /> },
        { title:"User Profile" , link:"/Own-User-Profile"},
       
      ],
    },
    {
      title:"Task & Project Management",
      icon:<FaChartLine />,
      link:"/#",
      submenus:[
        { title: "Add Task", link: "/add-task", icon: <FaPlus /> }, 
        { title: "All Tasks Status", link: "/task-list", icon: <FaListUl /> },
        { title: "AssignedTaskList", link: "/User-Task-List", icon: <RiUserShared2Fill /> },
        // { title: "Assigned Task & Project Details", link: "/AssignedTask" }, 
        { title: "UserTask", link: "/UserTask", icon: <FaUserCheck /> },
        { title: "Update Task Progress & Completion Status", link: "/UserTaskProgress", icon: <FaTasks /> },
        // { title: "Upload Documents & Project Related Files", link: "/upload-docs" },
        // { title: "View Deadlines Set By Admin", link: "/admin-deadlines" }
        

      ]

    },
    {
      title: "Attendance",
      icon: <FaCalendarAlt />, 
      link: "/attendance",
      submenus: [
        {
          title: "Mark Attendance",
          link: "/mark-attendance",
         
        },
        {
          title: "Attendance Summary",
          link: "/attendance-summary",
          description: "View daily, weekly, and monthly attendance records.",
        },
        // {
        //   title: "Apply for Leave",
        //   link: "/apply-leave",
        //   description: "Apply for Sick, Annual, Casual, or other types of leave.",
        // },
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
      title:"Payroll &  PaySlips",
      icon:<BiSolidCoinStack />,
      link:"/#",
      submenus:[
        { 
          title: "Payroll Summary", 
          link: "/payroll-summary",
          description: "View current pay breakdown and YTD totals" 
        },
        { 
          title: "Deductions Overview", 
          link: "/deductions",
          description: "View insurance, retirement, and other deductions" 
        },
        // { 
        //   title: "Payment Methods", 
        //   link: "/payment-methods",
        //   description: "Manage bank account details and payment preferences" 
        // }
      ]

    }
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

export default UserSidebar;



