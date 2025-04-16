

import React, { useState, useEffect } from "react";
import styles from "./PastLeaveTable.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import Auth from "../Services/Auth";
import axios from "axios";

const PastLeaveTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  const fetchPastLeaves = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get("http://209.74.89.83/erpbackend/get-past-leave", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data.leaveDetails) {
        throw new Error("Failed to fetch leave details");
      }

      // Filter only completed leaves if needed
      const pastLeaves = response.data.leaveDetails.filter(
        (leave) => leave.state === "Completed" || leave.state === "Rejected"
      );
      setLeaveData(pastLeaves);
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
    fetchPastLeaves();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const totalLeaves = leaveData.length || 0;
  const totalPages = Math.ceil(totalLeaves / itemsPerPage);
  const currentItems = leaveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading past leave records...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchPastLeaves} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Past Leave Records</h2>
        <div className={styles.summary}>
          <span>Total Records: {totalLeaves}</span>
          {/* <span className={styles.pendingCount}>
            <FaRegCalendarAlt /> Completed: {totalLeaves}
          </span> */}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Dates</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Created AT</th>
              <th>Updated AT</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((leave) => (
              <tr key={leave._id}>
                <td>
                  <div className={styles.employeeInfo}>
                    <div className={styles.avatar}>
                      {leave.userId?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className={styles.name}>{leave.userId?.username || 'N/A'}</div>
                      <div className={styles.email}>{leave.userId?.contact?.emailId || 'N/A'}</div>
                      <div className={styles.userType}>{leave.userId?.typeOfUser || 'N/A'}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.dates}>
                    <div>{formatDate(leave.from)}</div>
                    <div className={styles.to}>to</div>
                    <div>{formatDate(leave.to)}</div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.leaveType} ${
                    leave.leaveType === 'Sick Leave' ? styles.sickLeave : 
                    leave.leaveType === 'Casual Leave' ? styles.casualLeave : 
                    styles.otherLeave}`}>
                    {leave.leaveType}
                  </span>
                </td>
                <td className={styles.reason}>{leave.reason || '-'}</td>
                <td>
                  <span className={`${styles.status} ${
                    leave.state === 'Completed' ? styles.completed : 
                    leave.state === 'Approved' ? styles.approved : 
                    styles.rejected}`}>
                    {leave.state}
                  </span>
                </td>
                <td>{leave.createdAt}</td>
                <td>{leave.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            <FiChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default PastLeaveTable;