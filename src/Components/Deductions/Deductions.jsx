import React from "react";
import PropTypes from "prop-types";
import styles from "./Deductions.module.css";

const DeductionsOverview = ({ totalSalary }) => {
  // Calculate deductions based on the total salary
  const deductions = [
    { type: "Health Insurance (10%)", amount: (totalSalary * 0.10).toFixed(2), description: "10% of total salary for health insurance" },
    { type: "Provident Fund (6%)", amount: (totalSalary * 0.06).toFixed(2), description: "6% of total salary for provident fund" },
    
  ];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Deductions Overview</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((deduction, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{deduction.type}</td>
              <td>{deduction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types for better validation
DeductionsOverview.propTypes = {
  totalSalary: PropTypes.number.isRequired,
};

export default DeductionsOverview;
