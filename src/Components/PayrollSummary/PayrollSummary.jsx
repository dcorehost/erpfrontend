

import React, { useState, useEffect } from "react";
import styles from "./PayrollSummary.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";

const PayrollSummary = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Auth.getToken();

      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-user-payroll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.users?.payroll) {
        throw new Error("Failed to fetch payroll details");
      }

      const transformedData = response.data.users.payroll.map((item) => ({
        employeeId: response.data.users.employeeId || "N/A",
        month: item.month || "N/A",
        year: item.year || "N/A",
        grossSalary: `₹${item.grossSalary?.toLocaleString("en-IN") || "0"}`,
        deductions: `₹${item.deductions?.toLocaleString("en-IN") || "0"}`,
        netSalary: `₹${item.netSalary?.toLocaleString("en-IN") || "0"}`,
        pfAmount: `₹${item.pfAmount?.toLocaleString("en-IN") || "0"}`,
        healthInsuranceAmount: `₹${item.healthInsuranceAmount?.toLocaleString("en-IN") || "0"}`,
        leaveAmount: `₹${item.leaveAmount?.toLocaleString("en-IN") || "0"}`,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
        updatedAt: new Date(item.updatedAt).toLocaleDateString()
      }));

      setPayrollData(transformedData);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("login") || err.message.includes("401")) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payrollData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading payroll data...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchPayrollData} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Payroll Summary</h2>
        <span>
          Showing {indexOfFirstItem + 1}–
          {Math.min(indexOfLastItem, payrollData.length)} of {payrollData.length}
        </span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Gross Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>PF Amount</th>
              <th>Health Insurance</th>
              <th>Leave Amount</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, idx) => (
              <tr key={idx}>
                <td>{employee.employeeId}</td>
                <td>{employee.month}</td>
                <td>{employee.year}</td>
                <td>{employee.grossSalary}</td>
                <td>{employee.deductions}</td>
                <td>{employee.netSalary}</td>
                <td>{employee.pfAmount}</td>
                <td>{employee.healthInsuranceAmount}</td>
                <td>{employee.leaveAmount}</td>
                {/* <td>{employee.createdAt}</td>
                <td>{employee.updatedAt}</td> */}
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
                <td>{new Date(employee.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            <FiChevronLeft />
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.pageButton} ${
                  currentPage === i + 1 ? styles.active : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PayrollSummary;
