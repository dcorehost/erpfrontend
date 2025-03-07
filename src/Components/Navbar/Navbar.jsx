import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.jpeg'

const Navbar = ({isOpen}) => {

  return (
    <nav className={`${styles.navbar} ${isOpen? styles.open : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Dcore Logo" className={styles.logo} />
        </Link>        


        {/* Buttons */}
        {/* <div className={styles.buttons}> */}
          {/* <Link to="/Signup">
            <button className={styles.signup}>SignUp</button>
          </Link> */}
          {/* <Link to="/sign">
            <button className={styles.button }>Log In</button>
          </Link> */}
          
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Navbar;


