// import React, { useState } from "react";
// import styles from "./ApprovedLeave.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { FaCheck, FaTimes, FaRegCalendarAlt } from "react-icons/fa";

// const leaveData = [
//   {
//     _id: "67caa8578570c46d6bdceb89",
//     username: "Rahul Jha",
//     contact: { emailId: "jha6368@gmail.com" },
//     typeOfUser: "User",
//     userLeaves: [
//       {
//         _id: "67cae00d332629f6d2c6161a",
//         from: "2025-05-01",
//         to: "2025-05-05",
//         leaveType: "Sick Leave",
//         reason: "suffering from high fever",
//         state: "Pending",
//       },
//       {
//         _id: "67dbb63b8e2a954c7e258858",
//         from: "2025-03-19",
//         to: "2025-03-20",
//         leaveType: "Casual Leave",
//         reason: "Family function",
//         state: "Pending",
//       },
//     ],
//   },
// ];

// const ApprovedLeave = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [remarks, setRemarks] = useState("");

//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(leaveData[0].userLeaves.length / itemsPerPage);
//   const displayedLeaves = leaveData[0].userLeaves.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleApprove = (id) => {
//     alert(`Leave ID: ${id} Approved!`);
//   };

//   const handleReject = (leave) => {
//     setSelectedLeave(leave);
//     setIsRejectPopupOpen(true);
//   };

//   const handleSubmitReject = () => {
//     if (!remarks.trim()) {
//       alert("Please enter remarks before rejecting");
//       return;
//     }
//     alert(`Leave ID: ${selectedLeave._id} Rejected with Remarks: ${remarks}`);
//     setIsRejectPopupOpen(false);
//     setRemarks("");
//   };

//   const formatDate = (dateString) => {
//     const options = { day: 'numeric', month: 'short', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Pending Leave Requests</h2>
//         <div className={styles.summary}>
//           <span>Total Requests: {leaveData[0].userLeaves.length}</span>
//           <span className={styles.pendingCount}>
//             <FaRegCalendarAlt /> Pending: {leaveData[0].userLeaves.length}
//           </span>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Leave Dates</th>
//               <th>Type</th>
//               <th>Reason</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedLeaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>
//                   <div className={styles.employeeInfo}>
//                     <div className={styles.avatar}>{leaveData[0].username.charAt(0)}</div>
//                     <div>
//                       <div className={styles.name}>{leaveData[0].username}</div>
//                       <div className={styles.email}>{leaveData[0].contact.emailId}</div>
//                       <div className={styles.userType}>{leaveData[0].typeOfUser}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <div className={styles.dates}>
//                     <div>{formatDate(leave.from)}</div>
//                     <div className={styles.to}>to</div>
//                     <div>{formatDate(leave.to)}</div>
//                   </div>
//                 </td>
//                 <td>
//                   <span className={`${styles.leaveType} ${leave.leaveType === 'Sick Leave' ? styles.sickLeave : styles.casualLeave}`}>
//                     {leave.leaveType}
//                   </span>
//                 </td>
//                 <td className={styles.reason}>{leave.reason}</td>
//                 <td>
//                   <span className={`${styles.status} ${leave.state === 'Pending' ? styles.pending : ''}`}>
//                     {leave.state}
//                   </span>
//                 </td>
//                 <td>
//                   <div className={styles.actions}>
//                     <button
//                       className={styles.approveBtn}
//                       onClick={() => handleApprove(leave._id)}
//                       title="Approve"
//                     >
//                       <FaCheck />
//                     </button>
//                     <button
//                       className={styles.rejectBtn}
//                       onClick={() => handleReject(leave)}
//                       title="Reject"
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className={styles.footer}>
//         <div className={styles.pagination}>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             <FiChevronLeft />
//           </button>
//           <div className={styles.pageNumbers}>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 className={currentPage === i + 1 ? styles.activePage : ''}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       </div>

//       {isRejectPopupOpen && (
//         <div className={styles.popupOverlay}>
//           <div className={styles.popup}>
//             <h3>Reject Leave Request</h3>
//             <div className={styles.leaveDetails}>
//               <div>
//                 <strong>Employee:</strong> {leaveData[0].username}
//               </div>
//               <div>
//                 <strong>Leave Type:</strong> {selectedLeave.leaveType}
//               </div>
//               <div>
//                 <strong>Dates:</strong> {formatDate(selectedLeave.from)} to {formatDate(selectedLeave.to)}
//               </div>
//               <div>
//                 <strong>Reason:</strong> {selectedLeave.reason}
//               </div>
//             </div>
//             <div className={styles.remarksContainer}>
//               <label htmlFor="remarks">Remarks (required):</label>
//               <textarea
//                 id="remarks"
//                 placeholder="Enter rejection remarks..."
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//                 className={styles.remarksTextarea}
//                 rows={4}
//               />
//             </div>
//             <div className={styles.popupActions}>
//               <button
//                 onClick={handleSubmitReject}
//                 className={styles.submitBtn}
//                 disabled={!remarks.trim()}
//               >
//                 Confirm Rejection
//               </button>
//               <button
//                 onClick={() => setIsRejectPopupOpen(false)}
//                 className={styles.cancelBtn}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovedLeave;

import React, { useState, useEffect } from "react";
import styles from "./ApprovedLeave.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCheck, FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import auth from "../Services/Auth";

const ApprovedLeave = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;
  const API_BASE_URL = "http://209.74.89.83/erpbackend";

  // Fetch pending leaves from API
  const fetchPendingLeaves = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await fetch(`${API_BASE_URL}/get-pending-leave-details`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      // Check if response is HTML error page
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        if (text.startsWith("<!DOCTYPE html") || text.startsWith("<")) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error("Invalid response from server");
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leave requests");
      }

      setLeaveData(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("login") || err.message.includes("401")) {
        auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  // Approve leave
  const handleApprove = async (id) => {
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Session expired. Please login again.");
      }

      const response = await fetch(`${"http://209.74.89.83/erpbackend"}/approve-leave/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Approval failed");
      }

      alert("Leave approved successfully!");
      fetchPendingLeaves();
    } catch (error) {
      alert(`Error: ${error.message}`);
      if (error.message.includes("login")) {
        auth.logout();
        window.location.href = "/login";
      }
    }
  };

  // Reject leave
  const handleRejectSubmit = async () => {
    if (!remarks.trim()) {
      alert("Please enter rejection remarks");
      return;
    }
    
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Session expired. Please login again.");
      }

      const response = await fetch(`${API_BASE_URL}/reject-leave/${selectedLeave._id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ remarks })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Rejection failed");
      }

      alert("Leave rejected successfully!");
      setIsRejectPopupOpen(false);
      setRemarks("");
      fetchPendingLeaves();
    } catch (error) {
      alert(`Error: ${error.message}`);
      if (error.message.includes("login")) {
        auth.logout();
        window.location.href = "/login";
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Pagination calculations
  const totalLeaves = leaveData[0]?.userLeaves?.length || 0;
  const totalPages = Math.ceil(totalLeaves / itemsPerPage);
  const currentItems = leaveData[0]?.userLeaves?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

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

//   if (!leaveData.length || !leaveData[0]?.userLeaves?.length) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.noData}>No pending leave requests found</div>
//       </div>
//     );
//   }

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
                      {leaveData[0].username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.name}>{leaveData[0].username}</div>
                      <div className={styles.email}>{leaveData[0].contact?.emailId || 'N/A'}</div>
                      <div className={styles.userType}>{leaveData[0].typeOfUser}</div>
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
                    styles.otherLeave
                  }`}>
                    {leave.leaveType}
                  </span>
                </td>
                <td className={styles.reason}>{leave.reason || '-'}</td>
                <td>
                  <span className={`${styles.status} ${
                    leave.state === 'Pending' ? styles.pending :
                    leave.state === 'Approved' ? styles.approved :
                    styles.rejected
                  }`}>
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
          >
            <FiChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
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
                <strong>Employee:</strong> {leaveData[0].username}
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