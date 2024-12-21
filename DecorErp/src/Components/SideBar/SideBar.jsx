
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaChalkboardTeacher } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import { LiaBuysellads } from "react-icons/lia";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      title: "Admin",
      icon: <RiAdminFill />,
      link: "/SignIn",
      submenus: [
        { title: "Option", link: "/SignIn" },
       
      ],
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
    { title: "Sales Management", icon: <LiaBuysellads />, link: "/sells managment", submenus: [
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" }, 
    ] },
    { title: "Employee Management", icon: <FaChalkboardTeacher />, link: "/employee managment", submenus: [
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" }, 
    ] },
    { title: "Enquiry Managment", icon: <FaChalkboardTeacher />, link: "/enquiry", submenus: [
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" }, 
    ] },
    { title: "Attendance Managment", icon: <MdPlayLesson />, link: "/#", submenus: [
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" }, 
    ] },
    { title: "Invoice Management", icon: <FaChalkboardTeacher />, link: "/#", submenus: [
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" },  
    ] },
   
    { title: "Master Data", icon: <FaChartLine />, link: "/#", submenus: [ 
      { title: "option 1", link: "/option 1" }, 
      { title: "option 2", link: "/option 2" }, 
      { title: "option 3", link: "/option 3" }, 
    ],},
  ];

  const toggleSubmenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div className={`${styles.sidebarContainer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          {menus.map((menu, index) => (
            <React.Fragment key={index}>
              <li>
                <div
                  onClick={() => toggleSubmenu(index)}
                  className={styles.menuItem}
                >
                  <div className={styles.icon}>{menu.icon}</div>
                  <span
                    className={`${styles.title} ${!isOpen && styles.hidden}`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenus.length > 0 && (
                    <span className={styles.dropdownIcon}>
                      {activeMenu === index ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {activeMenu === index && menu.submenus.length > 0 && (
                  <ul className={styles.submenu}>
                    {menu.submenus.map((submenu, subIndex) => (
                      <li
                        key={subIndex}
                        className={styles.submenuItem}
                      >
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
            <Link to="/#" className={styles.menuItem}>
              <FaChartLine />
              <span className={`${styles.title} ${!isOpen && styles.hidden}`}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
