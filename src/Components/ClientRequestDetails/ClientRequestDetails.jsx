import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ClientRequestDetails.module.css';
import Auth from '../Services/Auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiDownload, FiCalendar, FiClock, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ClientNewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://209.74.89.83/erpbackend/client-get-requests",
          {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`,
            },
          }
        );
        setRequests(response.data.requests || []);
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredRequests = sortedRequests.filter(request => {
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

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
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

  const toggleExpandRequest = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
  };

  if (loading) {
    return (
      <motion.div 
        className={styles.loadingContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
        <p>Loading requests...</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NotificationContainer />
      <div className={styles.header}>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Client Requests
        </motion.h1>
        <div className={styles.controls}>
          <motion.div 
            className={styles.searchContainer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <FiSearch className={styles.searchIcon} />
          </motion.div>
          <motion.div
            className={styles.filterWrapper}
            whileHover={{ scale: 1.02 }}
          >
            <FiFilter className={styles.filterIcon} />
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
          </motion.div>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <motion.div 
          className={styles.noResults}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FiInfo size={24} />
          <p>No requests found matching your criteria</p>
        </motion.div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.requestTable}>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')}>
                  <div className={styles.sortableHeader}>
                    Title {getSortIcon('title')}
                  </div>
                </th>
                <th>Description</th>
                <th onClick={() => handleSort('priority')}>
                  <div className={styles.sortableHeader}>
                    Priority {getSortIcon('priority')}
                  </div>
                </th>
                <th onClick={() => handleSort('deadline')}>
                  <div className={styles.sortableHeader}>
                    Deadline {getSortIcon('deadline')}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  <div className={styles.sortableHeader}>
                    Created {getSortIcon('createdAt')}
                  </div>
                </th>
                <th onClick={() => handleSort('state')}>
  <div className={styles.sortableHeader}>
    State {getSortIcon('state')}
  </div>
</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredRequests.map((request, index) => (
                  <React.Fragment key={request._id || index}>
                    <motion.tr 
                      className={styles.tableRow}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                    >
                      <td className={styles.titleCell}>
                        <div className={styles.titleWrapper}>
                          {request.priority === 'high' && (
                            <FiAlertCircle 
                              className={styles.highPriorityIcon} 
                              color="#ff4444"
                            />
                          )}
                          {request.title || 'Untitled'}
                        </div>
                      </td>
                      <td className={styles.descriptionCell}>
                        {request.description 
                          ? `${request.description.substring(0, 50)}${request.description.length > 50 ? '...' : ''}`
                          : 'No description'}
                      </td>
                      <td>
                        <motion.span
                          className={styles.priorityBadge}
                          style={{
                            backgroundColor: getPriorityColor(request.priority),
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {request.priority || 'N/A'}
                        </motion.span>
                      </td>
                      <td className={styles.dateCell}>
                        <div className={styles.dateWrapper}>
                          <FiCalendar size={14} />
                          {formatDate(request.deadline)}
                        </div>
                      </td>
                      <td className={styles.dateCell}>
                        <div className={styles.dateWrapper}>
                          <FiClock size={14} />
                          {formatDate(request.createdAt)}
                        </div>
                      </td>
                     <td>
  <span className={`${styles.stateBadge} ${styles[request.state?.toLowerCase() || 'default']}`}>
    {request.state || 'Unknown'}
  </span>
</td>



                      <td className={styles.actionsCell}>
                        <motion.button
                          className={styles.expandButton}
                          onClick={() => toggleExpandRequest(request._id || index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {expandedRequest === (request._id || index) ? 'Hide Details' : 'View Details'}
                        </motion.button>
                      </td>
                    </motion.tr>
                    
                    <AnimatePresence>
                      {expandedRequest === (request._id || index) && (
                        <motion.tr 
                          className={styles.expandedRow}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="6">
                            <motion.div 
                              className={styles.expandedContent}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className={styles.detailsSection}>
                                <h3>Request Details</h3>
                                <div className={styles.detailItem}>
                                  <strong>Created:</strong> {formatDateTime(request.createdAt)}
                                </div>
                                <div className={styles.detailItem}>
                                  <strong>Last Updated:</strong> {formatDateTime(request.updatedAt || request.createdAt)}
                                </div>
                                <div className={styles.detailItem}>
                                  <strong>Status:</strong> 
                                  <span className={styles.statusBadge}>
                                    {request.state || 'Unknown'}
                                  </span>
                                </div>
                                {request.deadline && (
                                  <div className={styles.detailItem}>
                                    <strong>Deadline:</strong> {formatDateTime(request.deadline)}
                                  </div>
                                )}
                              </div>
                              
                              <div className={styles.descriptionSection}>
                                <h3>Full Description</h3>
                                <p>{request.description || 'No description provided'}</p>
                              </div>
                              
                              {Array.isArray(request.attachments) && request.attachments.length > 0 && (
                                <div className={styles.attachmentsSection}>
                                  <h3>Attachments</h3>
                                  <div className={styles.attachmentsList}>
                                    {request.attachments.map((attachment, idx) => (
                                      <motion.a
                                        key={idx}
                                        href={attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.attachmentLink}
                                        whileHover={{ x: 5 }}
                                      >
                                        <FiDownload />
                                        Download File {idx + 1}
                                      </motion.a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ClientNewRequest;