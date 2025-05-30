import React, { useState, useEffect } from "react";
import styles from "./AdminPayroll.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";
import Loader from "../Loader/Loader";

const AdminPayroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch payroll data from API
  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-payroll-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.users) {
        throw new Error("Failed to fetch payroll details");
      }

      // Transform the API data to match our table structure
      const transformedData = response.data.users.flatMap((user) => {
        // If user has no payroll data, create one entry with default values
        if (!user.payroll || user.payroll.length === 0) {
          return [
            {
              username: user.username || "N/A",
              email: user.contact?.emailId || "N/A",
              phone: user.contact?.phone || "N/A",
              employeeId: user.employeeId || "N/A",
              month: "N/A",
              year: "N/A",
              grossSalary: "₹0",
              deductions: "₹0",
              netSalary: "₹0",
              pfAmount: "₹0",
              healthInsuranceAmount: "₹0",
              leaveAmount: "₹0",
            },
          ];
        }

        // Map each payroll entry for the user
        return user.payroll.map((payroll) => ({
          username: user.username || "N/A",
          email: user.contact?.emailId || "N/A",
          phone: user.contact?.phone || "N/A",
          employeeId: user.employeeId || "N/A",
          month: payroll.month || "N/A",
          year: payroll.year || "N/A",
          grossSalary: `₹${
            payroll.grossSalary?.toLocaleString("en-IN") || "0"
          }`,
          deductions: `₹${payroll.deductions?.toLocaleString("en-IN") || "0"}`,
          netSalary: `₹${payroll.netSalary?.toLocaleString("en-IN") || "0"}`,
          pfAmount: `₹${
            payroll.pfAmount?.toLocaleString("en-IN") ||
            (payroll.deductions * 0.4)?.toLocaleString("en-IN") ||
            "0"
          }`,
          healthInsuranceAmount: `₹${
            payroll.healthInsuranceAmount?.toLocaleString("en-IN") ||
            (payroll.deductions * 0.3)?.toLocaleString("en-IN") ||
            "0"
          }`,
          leaveAmount: `₹${
            payroll.leaveAmount?.toLocaleString("en-IN") ||
            (payroll.deductions * 0.2)?.toLocaleString("en-IN") ||
            "0"
          }`,
        }));
      });

      setPayrollData(transformedData.flat());
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

  // Calculate pagination values
  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payrollData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <Loader />;
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
        <div className={styles.summary}>
          <span>
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, payrollData.length)} of{" "}
            {payrollData.length} records
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Employee ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Gross Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>PF Amount</th>
              <th>Health Insurance</th>
              <th>Leave Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={index}>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.month}</td>
                <td>{employee.year}</td>
                <td>{employee.grossSalary}</td>
                <td>{employee.deductions}</td>
                <td>{employee.netSalary}</td>
                <td>{employee.pfAmount}</td>
                <td>{employee.healthInsuranceAmount}</td>
                <td>{employee.leaveAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
                key={i + 1}
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

export default AdminPayroll;
