import React, { useState, useEffect } from "react";
import styles from "./CompletedLeaves.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCheck, FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import Auth from "../Services/Auth";
import axios from "axios";

const CompletedLeaves = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [leaveData, setLeaveData] = useState([]); // Changed to an array to hold multiple users' leaves
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

      const response = await axios.get("http://209.74.89.83/erpbackend/get-complete-leave-details", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data.leaveDetails) {
        throw new Error("Failed to fetch leave details");
      }

      setLeaveData(response.data.leaveDetails); // Store all leave details
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

  // const handleApprove = async (id, username) => { // Added username parameter
  //   try {
  //     const token = Auth.getToken();
  //     if (!token) {
  //       throw new Error("Please login to access this page");
  //     }
  
  //     const response = await axios.put(
  //       `http://209.74.89.83/erpbackend/approve-leaves?_id=${id}&action=approve`,
  //       {},
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       alert(`You have successfully approved leave for ${username}`); // Use username passed as parameter
  //       fetchPendingLeaves(); // Refresh leave data
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     if (err.message.includes("login") || err.message.includes("401")) {
  //       Auth.logout();
  //       window.location.href = "/login";
  //     }
  //   }
  // };
  

  // const handleRejectSubmit = async () => {
  //   try {
  //     const token = Auth.getToken();
  //     if (!token) {
  //       throw new Error("Please login to access this page");
  //     }
  
  //     const response = await axios.put(
  //       `http://209.74.89.83/erpbackend/approve-leaves?_id=${selectedLeave._id}&action=reject`,
  //       { remarks },
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       alert(`You have successfully rejected leave for ${selectedLeave.username}`); // Use selectedLeave's username
  //       fetchPendingLeaves(); // Refresh leave data
  //       setIsRejectPopupOpen(false);
  //       setRemarks("");
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     if (err.message.includes("login") || err.message.includes("401")) {
  //       Auth.logout();
  //       window.location.href = "/login";
  //     }
  //   }
  // };
  

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Flatten the leaveData to display all user leaves
  const totalLeaves = leaveData.reduce((total, user) => total + user.userLeaves.length, 0);
  const totalPages = Math.ceil(totalLeaves / itemsPerPage);

  // Create a flattened array of leaves for pagination
  const currentItems = leaveData.flatMap(user => user.userLeaves).slice(
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
        <h2>Completed Leave </h2>
        {/* <div className={styles.summary}>
          <span>Total Requests: {totalLeaves}</span>
          <span className={styles.pendingCount}>
            <FaRegCalendarAlt /> Pending: {totalLeaves}
          </span>
        </div> */}
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
              {/* <th>Remarks</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((leave) => {
              const employee = leaveData.find(user => user.userLeaves.some(l => l._id === leave._id)); // Find employee data
              return (
                <tr key={leave._id}>
                  <td>
                    <div className={styles.employeeInfo}>
                      <div className={styles.avatar}>
                        {employee.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.name}>{employee.username}</div>
                        <div className={styles.email}>{employee.contact?.emailId || 'N/A'}</div>
                        <div className={styles.userType}>{employee.typeOfUser}</div>
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
                    {/* <div className={styles.actions}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleApprove(leave._id, employee.username)} // Pass username
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
                    </div> */}
 
               

                  </td>
                </tr>
              );
            })}
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
                <strong>Employee:</strong> {selectedLeave.username} {/* Correctly reference username */}
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

export default CompletedLeaves;
  