import React, { useState, useEffect } from "react";
import styles from "./PendingLeaves.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCheck, FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import Auth from "../Services/Auth";
import axios from "axios";

const ApprovedLeave = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [leaveData, setLeaveData] = useState({ userLeaves: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  const fetchPendingLeaves = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get("http://209.74.89.83/erpbackend/get-pending-leave-details", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data.leaveDetails) {
        throw new Error("Failed to fetch leave details");
      }

      setLeaveData(response.data.leaveDetails[0]);
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
    fetchPendingLeaves();
  }, []);

  const handleApprove = async (id) => {
    // Approve leave logic (remains unchanged)
  };

  const handleRejectSubmit = async () => {
    // Reject leave logic (remains unchanged)
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const totalLeaves = leaveData.userLeaves.length || 0;
  const totalPages = Math.ceil(totalLeaves / itemsPerPage);
  const currentItems = leaveData.userLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading leave requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchPendingLeaves} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Pending Leave Requests</h2>
        <div className={styles.summary}>
          <span>Total Requests: {totalLeaves}</span>
          <span className={styles.pendingCount}>
            <FaRegCalendarAlt /> Pending: {totalLeaves}
          </span>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((leave) => (
              <tr key={leave._id}>
                <td>
                  <div className={styles.employeeInfo}>
                    <div className={styles.avatar}>
                      {leaveData.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.name}>{leaveData.username}</div>
                      <div className={styles.email}>{leaveData.contact?.emailId || 'N/A'}</div>
                      <div className={styles.userType}>{leaveData.typeOfUser}</div>
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
                  <span className={`${styles.leaveType} ${leave.leaveType === 'Sick Leave' ? styles.sickLeave : leave.leaveType === 'Casual Leave' ? styles.casualLeave : styles.otherLeave}`}>
                    {leave.leaveType}
                  </span>
                </td>
                <td className={styles.reason}>{leave.reason || '-'}</td>
                <td>
                  <span className={`${styles.status} ${leave.state === 'Pending' ? styles.pending : leave.state === 'Approved' ? styles.approved : styles.rejected}`}>
                    {leave.state}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApprove(leave._id)}
                      title="Approve"
                      disabled={leave.state !== 'Pending'}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => {
                        setSelectedLeave(leave);
                        setIsRejectPopupOpen(true);
                      }}
                      title="Reject"
                      disabled={leave.state !== 'Pending'}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
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

      {isRejectPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Reject Leave Request</h3>
            <div className={styles.leaveDetails}>
              <div>
                <strong>Employee:</strong> {leaveData.username}
              </div>
              <div>
                <strong>Leave Type:</strong> {selectedLeave.leaveType}
              </div>
              <div>
                <strong>Dates:</strong> {formatDate(selectedLeave.from)} to {formatDate(selectedLeave.to)}
              </div>
              <div>
                <strong>Reason:</strong> {selectedLeave.reason || '-'}
              </div>
            </div>
            <div className={styles.remarksContainer}>
              <label htmlFor="remarks">Remarks (required):</label>
              <textarea
                id="remarks"
                placeholder="Enter rejection remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className={styles.remarksTextarea}
                rows={4}
                required
              />
            </div>
            <div className={styles.popupActions}>
              <button
                onClick={handleRejectSubmit}
                className={styles.submitBtn}
                disabled={!remarks.trim()}
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setIsRejectPopupOpen(false);
                  setRemarks("");
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedLeave;
