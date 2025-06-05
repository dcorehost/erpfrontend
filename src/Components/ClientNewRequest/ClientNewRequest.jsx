

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { NotificationContainer, NotificationManager } from 'react-notifications';
// // import 'react-notifications/lib/notifications.css';
// // import styles from './ClientNewRequest.module.css';
// // import Auth from '../Services/Auth';

// // const ClientNewRequest = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [priorityFilter, setPriorityFilter] = useState("all");

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://209.74.89.83/erpbackend/client-get-requests",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${Auth.getToken()}`,
// //             },
// //           }
// //         );
// //         setRequests(response.data.requests || []);
// //       } catch (err) {
// //         NotificationManager.error(
// //           err.response?.data?.message || "Failed to fetch requests",
// //           "Error",
// //           5000
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRequests();
// //   }, []);

// //   const filteredRequests = requests.filter(request => {
// //     const title = request.title || '';
// //     const description = request.description || '';
// //     const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
// //                           description.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
// //     return matchesSearch && matchesPriority;
// //   });

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
// //     return new Date(dateString).toLocaleDateString(undefined, options);
// //   };

// //   const getPriorityColor = (priority) => {
// //     switch (priority) {
// //       case "high":
// //         return "#ff4444";
// //       case "medium":
// //         return "#ffbb33";
// //       case "low":
// //         return "#00C851";
// //       default:
// //         return "#33b5e5";
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className={styles.loadingContainer}>
// //         <div className={styles.spinner}></div>
// //         <p>Loading requests...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <NotificationContainer />
// //       <div className={styles.header}>
// //         <h1>Client Requests</h1>
// //         <div className={styles.controls}>
// //           <div className={styles.searchContainer}>
// //             <input
// //               type="text"
// //               placeholder="Search requests..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className={styles.searchInput}
// //             />
// //             <span className={styles.searchIcon}>🔍</span>
// //           </div>
// //           <select
// //             value={priorityFilter}
// //             onChange={(e) => setPriorityFilter(e.target.value)}
// //             className={styles.filterSelect}
// //           >
// //             <option value="all">All Priorities</option>
// //             <option value="high">High</option>
// //             <option value="medium">Medium</option>
// //             <option value="low">Low</option>
// //           </select>
// //         </div>
// //       </div>

// //       {filteredRequests.length === 0 ? (
// //         <div className={styles.noResults}>
// //           <p>No requests found matching your criteria</p>
// //         </div>
// //       ) : (
// //         <div className={styles.tableContainer}>
// //           <table className={styles.requestTable}>
// //             <thead>
// //               <tr>
// //                 <th>Title</th>
// //                 <th>Description</th>
// //                 <th>Priority</th>
// //                 <th>Deadline</th>
// //                 <th>Created</th>
// //                 <th>Attachments</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredRequests.map((request, index) => (
// //                 <tr key={index} className={styles.tableRow}>
// //                   <td className={styles.titleCell}>{request.title || 'Untitled'}</td>
// //                   <td className={styles.descriptionCell}>{request.description || 'No description'}</td>
// //                   <td>
// //                     <span
// //                       className={styles.priorityBadge}
// //                       style={{
// //                         backgroundColor: getPriorityColor(request.priority),
// //                       }}
// //                     >
// //                       {request.priority || 'N/A'}
// //                     </span>
// //                   </td>
// //                   <td className={styles.dateCell}>
// //                     {formatDate(request.deadline)}
// //                   </td>
// //                   <td className={styles.dateCell}>
// //                     {formatDate(request.createdAt)}
// //                   </td>
// //                   <td className={styles.attachmentsCell}>
// //                     {Array.isArray(request.attachments) && request.attachments.length > 0 ? (
// //                       <div className={styles.attachmentsList}>
// //                         {request.attachments.map((attachment, idx) => (
// //                           <a
// //                             key={idx}
// //                             href={attachment}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className={styles.attachmentLink}
// //                           >
// //                             File {idx + 1}
// //                           </a>
// //                         ))}
// //                       </div>
// //                     ) : (
// //                       <span className={styles.noAttachments}>None</span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ClientNewRequest;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import styles from './ClientNewRequest.module.css';
// import Auth from '../Services/Auth';
// import { useNavigate } from 'react-router-dom';

// const ClientNewRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [showRejectPopup, setShowRejectPopup] = useState(false);
//   const [currentRequestId, setCurrentRequestId] = useState(null);
//   const [rejectRemarks, setRejectRemarks] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(
//           "http://209.74.89.83/erpbackend/client-get-requests",
//           {
//             headers: {
//               Authorization: `Bearer ${Auth.getToken()}`,
//             },
//           }
//         );
//         const requestsWithState = (response.data.requests || []).map(req => ({
//           ...req,
//           state: req.state || 'Pending',
//           remarks: req.remarks || '' // Ensure remarks field is always present
//         }));
//         setRequests(requestsWithState);
//       } catch (err) {
//         NotificationManager.error(
//           err.response?.data?.message || "Failed to fetch requests",
//           "Error",
//           5000
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const filteredRequests = requests.filter(request => {
//     const title = request.title || '';
//     const description = request.description || '';
//     const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
//     return matchesSearch && matchesPriority;
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "high":
//         return "#ff4444";
//       case "medium":
//         return "#ffbb33";
//       case "low":
//         return "#00C851";
//       default:
//         return "#33b5e5";
//     }
//   };

//   const handleApprove = (request) => {
//     // In a real application, send an API call here to update the request status
//     NotificationManager.success(`Request "${request.title}" approved!`, "Success");

//     // When approving, it often makes sense to clear previous rejection remarks
//     setRequests(prevRequests =>
//       prevRequests.map(req =>
//         req.id === request.id ? { ...req, state: 'Approved', remarks: '' } : req
//       )
//     );

//     navigate('/superadmin-clientsection-createproject', { state: { approvedRequest: request } });
//   };

//   const handleRejectClick = (requestId) => {
//     setCurrentRequestId(requestId);
//     // Optionally pre-fill remarks if they exist for the current request
//     const currentRequest = requests.find(req => req.id === requestId);
//     setRejectRemarks(currentRequest ? currentRequest.remarks : "");
//     setShowRejectPopup(true);
//   };

//   const handleRejectSubmit = async () => {
//     if (!rejectRemarks.trim()) {
//       NotificationManager.error("Remarks cannot be empty.", "Error");
//       return;
//     }

//     try {
//       // *** IMPORTANT: UNCOMMENT AND CONFIGURE YOUR BACKEND API CALL HERE ***
//       // This sends the rejection remarks to your backend to update the request status and store remarks.
//       await axios.post(`http://209.74.89.83/erpbackend/client-reject-request/${currentRequestId}`,
//          { remarks: rejectRemarks },
//          { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
//       );
//       NotificationManager.info(`Request rejected with remarks: "${rejectRemarks}"`, "Rejected");

//       setRequests(prevRequests =>
//         prevRequests.map(req =>
//           req.id === currentRequestId ? { ...req, state: 'Rejected', remarks: rejectRemarks } : req
//         )
//       );

//       setShowRejectPopup(false);
//       setRejectRemarks("");
//       setCurrentRequestId(null);
//     } catch (err) {
//       NotificationManager.error(
//         err.response?.data?.message || "Failed to reject request",
//         "Error",
//         5000
//       );
//     }
//   };

//   const handleCloseRejectPopup = () => {
//     setShowRejectPopup(false);
//     setRejectRemarks("");
//     setCurrentRequestId(null);
//   };

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading requests...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <NotificationContainer />

//       <div className={styles.header}>
//         <h1>Client Requests</h1>
//         <div className={styles.controls}>
//           <div className={styles.searchContainer}>
//             <input
//               type="text"
//               placeholder="Search requests..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={styles.searchInput}
//             />
//             <span className={styles.searchIcon}>🔍</span>
//           </div>
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             className={styles.filterSelect}
//           >
//             <option value="all">All Priorities</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>
//       </div>

//       {filteredRequests.length === 0 ? (
//         <div className={styles.noResults}>
//           <p>No requests found matching your criteria</p>
//         </div>
//       ) : (
//         <div className={styles.tableContainer}>
//           <table className={styles.requestTable}>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Priority</th>
//                 <th>Deadline</th>
//                 <th>Created</th>
//                 <th>Attachments</th>
//                 <th>State</th>
//                 <th>Remarks</th> {/* New Remarks Header */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.map((request, index) => (
//                 <tr key={request.id || index} className={styles.tableRow}>
//                   <td className={styles.titleCell}>{request.title || 'Untitled'}</td>
//                   <td className={styles.descriptionCell}>{request.description || 'No description'}</td>
//                   <td>
//                     <span
//                       className={styles.priorityBadge}
//                       style={{
//                         backgroundColor: getPriorityColor(request.priority),
//                       }}
//                     >
//                       {request.priority || 'N/A'}
//                     </span>
//                   </td>
//                   <td className={styles.dateCell}>
//                     {formatDate(request.deadline)}
//                   </td>
//                   <td className={styles.dateCell}>
//                     {formatDate(request.createdAt)}
//                   </td>
//                   <td className={styles.attachmentsCell}>
//                     {Array.isArray(request.attachments) && request.attachments.length > 0 ? (
//                       <div className={styles.attachmentsList}>
//                         {request.attachments.map((attachment, idx) => (
//                           <a
//                             key={idx}
//                             href={attachment}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={styles.attachmentLink}
//                           >
//                             File {idx + 1}
//                           </a>
//                         ))}
//                       </div>
//                     ) : (
//                       <span className={styles.noAttachments}>None</span>
//                     )}
//                   </td>
//                   <td className={styles.stateCell}>
//                     {request.state || 'Pending'}
//                   </td>
//                   <td className={styles.remarksCell}> {/* New Remarks Data Cell */}
//                     {request.remarks || 'N/A'}
//                   </td>
//                   <td className={styles.actionsCell}>
//                     <button
//                       className={styles.approveButton}
//                       onClick={() => handleApprove(request)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className={styles.rejectButton}
//                       onClick={() => handleRejectClick(request.id)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showRejectPopup && (
//         <div className={styles.popupOverlay}>
//           <div className={styles.popupContent}>
//             <h2>Reject Request</h2>
//             <textarea
//               placeholder="Enter remarks for rejection..."
//               value={rejectRemarks}
//               onChange={(e) => setRejectRemarks(e.target.value)}
//               className={styles.remarksTextarea}
//               rows="4"
//             ></textarea>
//             <div className={styles.popupActions}>
//               <button onClick={handleRejectSubmit} className={styles.submitRejectButton}>Submit</button>
//               <button onClick={handleCloseRejectPopup} className={styles.cancelRejectButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientNewRequest;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ClientNewRequest.module.css';
import Auth from '../Services/Auth';
import { useNavigate } from 'react-router-dom';

const ClientNewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [rejectRemarks, setRejectRemarks] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://209.74.89.83/erpbackend/client-get-requests", // Assuming this API still fetches the list
          {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`,
            },
          }
        );
        const requestsWithState = (response.data.requests || []).map(req => ({
          ...req,
          state: req.state || 'Pending',
          remarks: req.remarks || ''
        }));
        setRequests(requestsWithState);
      } catch (err) {
        NotificationManager.error(
          err.response?.data?.message || "Failed to fetch requests",
          "Error",
          5000
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const title = request.title || '';
    const description = request.description || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4444";
      case "medium":
        return "#ffbb33";
      case "low":
        return "#00C851";
      default:
        return "#33b5e5";
    }
  };

  // --- API Calls for Approve/Reject using the new 'update-requests' endpoint ---

  const handleApprove = async (request) => {
    try {
      // Use the 'update-requests' endpoint with query parameters
      const response = await axios.patch( // Assuming PATCH is the correct method for this endpoint
        `http://209.74.89.83/erpbackend/update-requests?_id=${request.id}&action=approve`,
        {}, // Empty body for approve, as per typical use of 'action' query param
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );
      console.log('Approve response:', response.data);

      NotificationManager.success(`Request "${request.title}" approved!`, "Success");

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === request.id ? { ...req, state: 'Approved', remarks: '' } : req
        )
      );

      navigate('/superadmin-clientsection-createproject', { state: { approvedRequest: request } });

    } catch (err) {
      console.error("Error approving request:", err.response?.data || err.message);
      NotificationManager.error(
        err.response?.data?.message || "Failed to approve request",
        "Error",
        5000
      );
    }
  };

  const handleRejectClick = (requestId) => {
    setCurrentRequestId(requestId);
    const currentRequest = requests.find(req => req.id === requestId);
    setRejectRemarks(currentRequest ? currentRequest.remarks : "");
    setShowRejectPopup(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectRemarks.trim()) {
      NotificationManager.error("Remarks cannot be empty.", "Error");
      return;
    }

    try {
      // Use the 'update-requests' endpoint with query parameters and remarks in the body
      const response = await axios.patch( // Assuming PATCH is the correct method for this endpoint
        `http://209.74.89.83/erpbackend/update-requests?_id=${currentRequestId}&action=reject`,
        { remarks: rejectRemarks }, // Send remarks in the request body
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );
      console.log('Reject response:', response.data);

      NotificationManager.info(`Request rejected with remarks: "${rejectRemarks}"`, "rejected");

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === currentRequestId ? { ...req, state: 'rejected', remarks: rejectRemarks } : req
        )
      );

      setShowRejectPopup(false);
      setRejectRemarks("");
      setCurrentRequestId(null);
    } catch (err) {
      console.error("Error rejecting request:", err.response?.data || err.message);
      NotificationManager.error(
        err.response?.data?.message || "Failed to reject request",
        "Error",
        5000
      );
    }
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false);
    setRejectRemarks("");
    setCurrentRequestId(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NotificationContainer />

      <div className={styles.header}>
        <h1>Client Requests</h1>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className={styles.noResults}>
          <p>No requests found matching your criteria</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.requestTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Created</th>
                <th>Attachments</th>
                <th>State</th>
                <th>Remarks</th>
                <th>Actions</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request.id || index} className={styles.tableRow}>
                  <td className={styles.titleCell}>{request.title || 'Untitled'}</td>
                  <td className={styles.descriptionCell}>{request.description || 'No description'}</td>
                  <td>
                    <span
                      className={styles.priorityBadge}
                      style={{
                        backgroundColor: getPriorityColor(request.priority),
                      }}
                    >
                      {request.priority || 'N/A'}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {formatDate(request.deadline)}
                  </td>
                  <td className={styles.dateCell}>
                    {formatDate(request.createdAt)}
                  </td>
                  <td className={styles.attachmentsCell}>
                    {Array.isArray(request.attachments) && request.attachments.length > 0 ? (
                      <div className={styles.attachmentsList}>
                        {request.attachments.map((attachment, idx) => (
                          <a
                            key={idx}
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.attachmentLink}
                          >
                            File {idx + 1}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.noAttachments}>None</span>
                    )}
                  </td>
                  <td className={styles.stateCell}>
                    {request.state || 'Pending'}
                  </td>
                  <td className={styles.remarksCell}>
                    {request.remarks || 'N/A'}
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      className={styles.approveButton}
                      onClick={() => handleApprove(request)}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.rejectButton}
                      onClick={() => handleRejectClick(request.id)}
                    >
                      Reject
                    </button>
                  </td>

                  <td className={styles.state}>
  <span
    className={`${styles.stateBadge} ${styles[request.state ? request.state.toLowerCase() : 'pending']}`}
  >
    {request.state || 'Pending'}
  </span>
</td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showRejectPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Reject Request</h2>
            <textarea
              placeholder="Enter remarks for rejection..."
              value={rejectRemarks}
              onChange={(e) => setRejectRemarks(e.target.value)}
              className={styles.remarksTextarea}
              rows="4"
            ></textarea>
            <div className={styles.popupActions}>
              <button onClick={handleRejectSubmit} className={styles.submitRejectButton}>Submit</button>
              <button onClick={handleCloseRejectPopup} className={styles.cancelRejectButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientNewRequest;