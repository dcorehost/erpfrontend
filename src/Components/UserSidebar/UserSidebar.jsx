
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaChalkboardTeacher, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import { LiaBuysellads } from "react-icons/lia";
import styles from "./UserSidebar.module.css";
import Navbar from "../Navbar/Navbar";
import { FaBuildingUser } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCoinStack } from "react-icons/bi";
import { BiSolidMessageSquareDots } from "react-icons/bi";

const UserSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      title: "Dashboard",
      icon: <RiAdminFill />,
      link: "/#",
      submenus: [
        { title: "Myspace", icon: <FaBuildingUser />, link: "##"},
        { title: "Dashboard", icon: <GrTasks />, link: "##" }
      ],
    },
    {
      title: "Task & Project Management",
      icon: <RiTeamFill />,
      link: "/#",
      submenus: [
        { title: "Assigned Task & Project Details",    icon: <FaUser />         , link: "###" },
        { title: "update taks progress & completion status",        icon: <FaBuildingUser /> , link: "##" },
        { title: "upload ducuments & project created files",        icon: <FaBuildingUser /> , link: "##" },
        { title: "Option 3",        icon: <FaBuildingUser /> , link: "##" },
      ],
    },
    {
      title: "Attendence & Leave",
      icon: <RiTeamFill />,
      link: "/#",
      submenus: [
        { title: "Leave Summary",    icon: <FaUser />         , link: "/##" },
        { title: "Leave Balance ",        icon: <FaBuildingUser /> , link: "##" },
        { title: "Leave Requests",        icon: <FaBuildingUser /> , link: "##" },
        { title: "Compensatory Request",        icon: <FaBuildingUser /> , link: "##" },
      ],
    },
    {
      title: "Sales Management",
      icon: <LiaBuysellads />,
      link: "/#",
      submenus: [
        { title: "Generate Sales",   icon: <FcSalesPerformance /> ,         link: "##" },
        { title: "Generate Purchase ", icon: <BiSolidCoinStack /> ,         link: "##" },
        { title: "User Profile",     icon: <FaUser />         ,             link: "##" },
        { title: "Option 3",         icon: <FaBuildingUser /> ,             link: "##" },
      ],
    },
    
    {
      title: "Purchase Managment",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "Generate Purchase ", icon: <FaBuildingUser /> , link: "##" },
        { title: "Option 2",           icon: <FaBuildingUser /> , link: "##" },
        { title: "Option 3",           icon: <FaBuildingUser /> , link: "##" },
      ],
    },
    {
      title: "Employee Management",
      icon: <FaChalkboardTeacher />,
      link: "/#",
      submenus: [
        { title: "User Profile",     icon: <FaUser />         ,           link: "##" },
        { title: "Leave Management",       icon: <FaBuildingUser /> ,             link: "##" },
        { title: "Option 3",       icon: <FaBuildingUser /> ,             link: "##" },
      ],
    },
    {
      title: "Attendance Management",
      icon: <MdPlayLesson />,
      link: "/#",
      submenus: [
        { title: "Option 1",   icon: <FaBuildingUser /> , link: "/option-1" },
        { title: "Option 2",   icon: <FaBuildingUser /> , link: "/option-2" },
        { title: "Option 3",   icon: <FaBuildingUser /> , link: "/option-3" },
      ],
    },
    {
      title: "Master Data",
      icon: <FaChartLine />,
      link: "/#",
      submenus: [
        { title: "Option 1",   icon: <FaBuildingUser /> , link: "/option-1" },
        { title: "Option 2",   icon: <FaBuildingUser /> , link: "/option-2" },
        { title: "Option 3",   icon: <FaBuildingUser /> , link: "/option-3" },
      ],
    },
    // Additional menus here
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) => setActiveMenu(activeMenu === index ? null : index);

  return (
    <div className={`${styles.sidebarWrapper}`}>
      <div className={`${styles.sidebarContainer}`}>
        <button
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <ul className={styles.menu}>
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <li>
                  <div
                    className={styles.menuItem}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <div className={styles.icon}>{menu.icon}</div>
                      <span className={`${styles.title} ${!isOpen ? styles.hidden : ""}`} >
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
              <Link to="/logout" className={`${styles.menuItem} ${styles.logout}`}>
                <FaChartLine />
                <span
                  className={`${styles.title} ${!isOpen ? styles.hidden : ""}`}
                >
                  Logout
                </span>
              </Link>
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





