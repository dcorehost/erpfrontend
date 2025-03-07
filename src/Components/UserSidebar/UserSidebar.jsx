import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiAdminFill, RiTeamFill } from "react-icons/ri";
import styles from "./UserSidebar.module.css";
import Navbar from "../Navbar/Navbar";

const UserSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menus = [
    {
      title: "Dashboard",
      icon: <RiAdminFill />,
      link: "/#",
      submenus: [
        { title: "My Space", link: "##", hasNested: true },
        { title: "Organization", link: "##", hasNested: true },
      ],
    },
    {
      title: "Task & Project Managemen",
      icon: <RiTeamFill />,
      link: "/#",
      submenus: [
        { title: "My Data", link: "###" },
        { title: "Team", link: "##" },
        { title: "Holidays", link: "##" },
       
      ],
    },
  ];

  const mySpaceSubmenus = [
    { title: "Overview", link: "/Leave-Tracker" },
    { title: "Dashboard", link: "#" },
  ];

  const organizationSubmenus = [
    { title: "Overview", link: "#" },
    { title: "Announcements", link: "#" },
    { title: "Policies", link: "#" },
    { title: "Employee Tree", link: "#" },
    { title: "Birthday Folks", link: "#" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
    setActiveSubmenu(null);
  };

  const handleSubmenuClick = (subIndex, submenuTitle) => {
    setActiveSubmenu(subIndex);
  };

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
                          <button
                            className={styles.submenuButton}
                            onClick={() => handleSubmenuClick(subIndex, submenu.title)}
                          >
                            {submenu.title}
                          </button>

                          {/* Show "My Space" Submenu */}
                          {activeSubmenu === subIndex && submenu.title === "My Space" && (
                            <div className={styles.nestedSubmenuContainer}>
                              {mySpaceSubmenus.map((item, idx) => (
                                <button key={idx} className={styles.submenuButton}>
                                  {item.title}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Show "Organization" Submenu */}
                          {activeSubmenu === subIndex && submenu.title === "Organization" && (
                            <div className={styles.nestedSubmenuContainer}>
                              {organizationSubmenus.map((item, idx) => (
                                <button key={idx} className={styles.submenuButton}>
                                  {item.title}
                                </button>
                              ))}
                            </div>
                          )}
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
                <span className={`${styles.title} ${!isOpen ? styles.hidden : ""}`}>
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
