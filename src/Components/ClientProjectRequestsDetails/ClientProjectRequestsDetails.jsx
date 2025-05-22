import React, { useState, useEffect } from "react";
import styles from "./ClientProjectRequestsDetails.module.css"; // Update CSS module import
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";

const ClientProjectRequestsDetails = () => { // Rename the component
  const [currentPage, setCurrentPage] = useState(1);
  const [projectRequests, setProjectRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  const fetchProjectRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get("http://209.74.89.83/erpbackend/client-get-requests", { // Replace with the actual endpoint
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.data.requests) {
        throw new Error("Failed to fetch project requests");
      }

      setProjectRequests(response.data.requests);
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
    fetchProjectRequests();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const totalRequests = projectRequests.length;
  const totalPages = Math.ceil(totalRequests / itemsPerPage);
  const currentRequests = projectRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading project requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchProjectRequests} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Project Requests</h2>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Created At</th>
              <th>Attachments</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr key={request.createdAt}>
                <td>{request.title}</td>
                <td className={styles.description}>{request.description}</td>
                <td className={styles[`priority-${request.priority ? request.priority.toLowerCase() : 'medium'}`]}>{request.priority}</td>
                <td>{request.deadline ? formatDate(request.deadline) : 'N/A'}</td>
                <td>{request.createdAt ? new Date(request.createdAt).toLocaleString() : 'N/A'}</td>
                <td>
                  {request.attachments && request.attachments.map((attachment, index) => (
                    <div key={index}>
                      <a href={attachment} target="_blank" rel="noopener noreferrer">
                        Attachment {index + 1}
                      </a>
                    </div>
                  ))}
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
    </div>
  );
};

export default ClientProjectRequestsDetails; 