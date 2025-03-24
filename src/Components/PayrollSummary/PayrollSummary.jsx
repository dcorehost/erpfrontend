import React from "react";
import styles from "./PayrollSummary.module.css";

const PayrollSummary = () => {
  const payrollData = [
    { month: "January", year: 2025, grossSalary: 5000, deductions: 500, netSalary: 4500 },
    { month: "February", year: 2025, grossSalary: 5000, deductions: 500, netSalary: 4500 },
    { month: "March", year: 2025, grossSalary: 5000, deductions: 500, netSalary: 4500 },
    // Add more data as needed
  ];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Payroll Summary</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Gross Salary</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((record, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{record.month}</td>
              <td>{record.year}</td>
              <td>${record.grossSalary.toFixed(2)}</td>
              <td>${record.deductions.toFixed(2)}</td>
              <td>${record.netSalary.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollSummary;
