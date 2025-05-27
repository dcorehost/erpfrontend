import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 50, color = '#3498db' }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
