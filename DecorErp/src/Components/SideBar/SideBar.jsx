import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaChalkboardTeacher } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import { LiaBuysellads } from "react-icons/lia";
import styles from "./Sidebar.module.css";
import Navbar from "../Navbar/Navbar";

const SideBar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      title: "Admin",
      icon: <RiAdminFill />,
      link: "/SignIn",
      submenus: [{ title: "Option", link: "/SignIn" }],
    },
    {
      title: "Team Leads",
      icon: <RiTeamFill />,
      link: "/user",
      submenus: [
        { title: "Option", link: "/option" },
        { title: "Option 1", link: "/option-1" },
        { title: "Option 2", link: "/option-2" },
        { title: "Option 3", link: "/option-3" },
      ],
    },
    {
      title: "Sales Management",
      icon: <LiaBuysellads />,
      link: "/sales-management",
      submenus: [
        { title: "Option 1", link: "/option-1" },
        { title: "Option 2", link: "/option-2" },
        { title: "Option 3", link: "/option-3" },
      ],
    },
    {
      title: "Employee Management",
      icon: <FaChalkboardTeacher />,
      link: "/employee-management",
      submenus: [
        { title: "Option 1", link: "/option-1" },
        { title: "Option 2", link: "/option-2" },
        { title: "Option 3", link: "/option-3" },
      ],
    },
    {
      title: "Attendance Management",
      icon: <MdPlayLesson />,
      link: "/attendance",
      submenus: [
        { title: "Option 1", link: "/option-1" },
        { title: "Option 2", link: "/option-2" },
        { title: "Option 3", link: "/option-3" },
      ],
    },
    {
      title: "Master Data",
      icon: <FaChartLine />,
      link: "/master-data",
      submenus: [
        { title: "Option 1", link: "/option-1" },
        { title: "Option 2", link: "/option-2" },
        { title: "Option 3", link: "/option-3" },
      ],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index) =>
    setActiveMenu(activeMenu === index ? null : index);

  return (
    <div className={`${styles.sidebarWrapper}`}>
      <div
        className={`${styles.sidebarContainer} `}
      >
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
                    <span
                      className={`${styles.title} ${
                        !isOpen ? styles.hidden : ""
                      }`}
                    >
                      {menu.title}
                    </span>
                    {menu.submenus.length > 0 && (
                      <span className={styles.dropdownIcon}>
                        {activeMenu === index ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                  {activeMenu === index && (
                    <ul className={styles.submenu}>
                      {menu.submenus.map((submenu, subIndex) => (
                        <li key={subIndex} className={styles.submenuItem}>
                          <Link to={submenu.link}>{submenu.title}</Link>
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

export default SideBar;
