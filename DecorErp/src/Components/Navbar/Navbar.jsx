import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Navbar.module.css';

const Navbar = () => {
  const [showDietDropdown, setShowDietDropdown] = useState(false);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <h1 className={styles.logo}>
          <Link to="/">Decore</Link>
        </h1>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link to="/features">Features</Link></li>

          {/* Dropdown for Diet Plan */}
          <li
            className={styles.dropdown}
            onMouseEnter={() => setShowDietDropdown(true)}
            onMouseLeave={() => setShowDietDropdown(false)}
          >
            <Link to="/diet-plan">Diet Plan</Link>
            {showDietDropdown && (
              <ul className={styles.dropdownMenu}>
                <li><Link to="/diet-plan/keto">Keto</Link></li>
                <li><Link to="/diet-plan/vegan">Vegan</Link></li>
                <li><Link to="/diet-plan/paleo">Paleo</Link></li>
              </ul>
            )}
          </li>

          {/* Dropdown for Workout Plans */}
          <li
            className={styles.dropdown}
            onMouseEnter={() => setShowWorkoutDropdown(true)}
            onMouseLeave={() => setShowWorkoutDropdown(false)}
          >
            <Link to="/workout-plans">Workout Plans</Link>
            {showWorkoutDropdown && (
              <ul className={styles.dropdownMenu}>
                <li><Link to="/workout-plans/beginner">Beginner</Link></li>
                <li><Link to="/workout-plans/intermediate">Intermediate</Link></li>
                <li><Link to="/workout-plans/advanced">Advanced</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        {/* Buttons */}
        <div className={styles.buttons}>
          <Link to="/get-started">
            <button className={styles.getStarted}>Get Started</button>
          </Link>
          <Link to="/login">
            <button className={styles.login}>Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;