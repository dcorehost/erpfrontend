



import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = () => {
  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.heading}>You have been logged out</h1>
      <p className={styles.message}>Thank you for using our platform. Please log in again to continue.</p>
      <Link to="/sign" className={styles.signButton}>
        sign Again
      </Link>
    </div>
  );
};

export default Logout;
