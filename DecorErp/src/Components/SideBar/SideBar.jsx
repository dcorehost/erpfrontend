import React, { useState } from "react";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sidebarContainer}>
      <button 
        className={styles.toggleButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
