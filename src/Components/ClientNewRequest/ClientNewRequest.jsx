

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ClientNewRequest.module.css';
import Auth from '../Services/Auth';

const ClientNewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          'http://209.74.89.83/erpbackend/client-get-requests',
          {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`
            }
          }
        );
        setRequests(response.data.requests);
      } catch (err) {
        NotificationManager.error(
          err.response?.data?.message || 'Failed to fetch requests',
          'Error',
          5000
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffbb33';
      case 'low': return '#00C851';
      default: return '#33b5e5';
    }
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
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.titleCell}>{request.title}</td>
                  <td className={styles.descriptionCell}>{request.description}</td>
                  <td>
                    <span 
                      className={styles.priorityBadge}
                      style={{ backgroundColor: getPriorityColor(request.priority) }}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{formatDate(request.deadline)}</td>
                  <td className={styles.dateCell}>{formatDate(request.createdAt)}</td>
                  <td className={styles.attachmentsCell}>
                    {request.attachments.length > 0 ? (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientNewRequest;