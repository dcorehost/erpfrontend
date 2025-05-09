
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UpdateUserProfile.module.css';
import Auth from '../../Components/Services/Auth';

const UpdateUserProfile = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [action, setAction] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedRequest, setExpandedRequest] = useState(null);

  const API_BASE_URL = 'http://209.74.89.83/erpbackend/';

  const getAxiosInstance = () => {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    fetchProfileUpdateRequests();
  }, []);

  const fetchProfileUpdateRequests = async () => {
    try {
      setLoading(true);
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('get-user-profile-update-request');
      setRequests(response.data.requests);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile update requests:', err);
      setError('Failed to load profile update requests');
      setLoading(false);
    }
  };

  const handleProcessRequest = async () => {
    if (!selectedRequest || !action) {
      alert('Please select an action');
      return;
    }

    if (action === 'reject' && !remarks.trim()) {
      alert('Please provide remarks for rejection');
      return;
    }

    try {
      const axiosInstance = getAxiosInstance();
      
      const payload = {
        action: action
      };

      if (action === 'reject') {
        payload.remarks = remarks;  
      }

      const response = await axiosInstance.put(
        `process-profile-update-request?id=${selectedRequest._id}`,
        payload
      );

      setSuccessMessage(response.data.message || `Request ${action}ed successfully`);
      fetchProfileUpdateRequests();
      setSelectedRequest(null);
      setRemarks('');
      setAction('');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      console.error('Error processing request:', err);
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to process request';
      alert(`Error: ${errorMessage}`);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return styles.badgeSuccess;
      case 'Rejected':
        return styles.badgeDanger;
      case 'Pending':
        return styles.badgeWarning;
      default:
        return styles.badgeSecondary;
    }
  };

  const renderRequestDetails = (request) => {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.detailSection}>
          <h4>User Information</h4>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>User ID:</span>
            <span>{request.userId._id}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Username:</span>
            <span>{request.userId.username}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Display Name:</span>
            <span>{request.userId.displayName}</span>
          </div>
        </div>

        <div className={styles.detailSection}>
          <h4>Request Information</h4>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Requested At:</span>
            <span>{formatDate(request.requestedAt)}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Status:</span>
            <span className={`${styles.statusBadge} ${getStatusBadgeClass(request.status)}`}>
              {request.status}
            </span>
          </div>
          {request.processedAt && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Processed At:</span>
              <span>{formatDate(request.processedAt)}</span>
            </div>
          )}
          {request.processedBy && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Processed By:</span>
              <span>{request.processedBy.displayName} ({request.processedBy.username})</span>
            </div>
          )}
        </div>

        <div className={styles.detailSection}>
          <h4>Requested Changes</h4>
          {Object.entries(request.updates).map(([field, value]) => (
            <div key={field} className={styles.detailRow}>
              <span className={styles.detailLabel}>{field}:</span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>

        {request.remarks && (
          <div className={styles.detailSection}>
            <h4>Admin Remarks</h4>
            <div className={styles.remarksText}>{request.remarks}</div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading profile update requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>!</div>
        <p>{error}</p>
        <button onClick={fetchProfileUpdateRequests} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <i className="fas fa-user-cog"></i> Profile Update Requests
          </h1>
          <p>Review and manage user profile update requests</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={fetchProfileUpdateRequests} className={styles.refreshButton}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      <div className={styles.content}>
        {requests.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-inbox"></i>
            <h3>No profile update requests</h3>
            <p>There are currently no pending profile update requests.</p>
          </div>
        ) : (
          <div className={styles.requestsGrid}>
            <div className={styles.requestsList}>
              {requests.map((request) => (
                <div
                  key={request._id}
                  className={`${styles.requestCard} ${
                    selectedRequest?._id === request._id ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {request.userId.displayName.charAt(0)}
                      </div>
                      <div>
                        <h4>{request.userId.displayName}</h4>
                        <p>@{request.userId.username}</p>
                      </div>
                    </div>
                    <div className={styles.cardStatus}>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={styles.date}>{formatDate(request.requestedAt)}</span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.changesPreview}>
                      {Object.entries(request.updates).slice(0, 2).map(([field, value]) => (
                        <div key={field} className={styles.changeItem}>
                          <span className={styles.changeField}>{field}:</span>
                          <span className={styles.changeValue}>{String(value)}</span>
                        </div>
                      ))}
                      {Object.keys(request.updates).length > 2 && (
                        <div className={styles.moreChanges}>
                          +{Object.keys(request.updates).length - 2} more changes
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      className={styles.toggleDetailsButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpandRequest(request._id);
                      }}
                    >
                      {expandedRequest === request._id ? (
                        <>
                          <i className="fas fa-chevron-up"></i> Hide Details
                        </>
                      ) : (
                        <>
                          <i className="fas fa-chevron-down"></i> View Details
                        </>
                      )}
                    </button>
                  </div>

                  {expandedRequest === request._id && (
                    <div className={styles.expandedDetails}>
                      {renderRequestDetails(request)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.actionPanel}>
              {selectedRequest ? (
                <>
                  <div className={styles.panelHeader}>
                    <h3>Process Request</h3>
                    <button
                      className={styles.closePanel}
                      onClick={() => setSelectedRequest(null)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div className={styles.requestSummary}>
                    <div className={styles.summaryUser}>
                      <div className={styles.avatarLarge}>
                        {selectedRequest.userId.displayName.charAt(0)}
                      </div>
                      <div>
                        <h4>{selectedRequest.userId.displayName}</h4>
                        <p>@{selectedRequest.userId.username}</p>
                      </div>
                    </div>
                    <div className={styles.summaryMeta}>
                      <div>
                        <span className={styles.metaLabel}>Requested:</span>
                        <span>{formatDate(selectedRequest.requestedAt)}</span>
                      </div>
                      <div>
                        <span className={styles.metaLabel}>Status:</span>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(selectedRequest.status)}`}>
                          {selectedRequest.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.changesList}>
                    <h4>Requested Changes</h4>
                    <ul>
                      {Object.entries(selectedRequest.updates).map(([field, value]) => (
                        <li key={field}>
                          <span className={styles.changeField}>{field}:</span>
                          <span className={styles.changeValue}>{String(value)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedRequest.status === 'Pending' && (
                    <div className={styles.actionForm}>
                      <div className={styles.actionButtons}>
                        <label className={`${styles.actionButton} ${action === 'approve' ? styles.active : ''}`}>
                          <input
                            type="radio"
                            name="action"
                            value="approve"
                            checked={action === 'approve'}
                            onChange={() => setAction('approve')}
                          />
                          <i className="fas fa-check"></i> Approve
                        </label>
                        <label className={`${styles.actionButton} ${action === 'reject' ? styles.active : ''}`}>
                          <input
                            type="radio"
                            name="action"
                            value="reject"
                            checked={action === 'reject'}
                            onChange={() => setAction('reject')}
                          />
                          <i className="fas fa-times"></i> Reject
                        </label>
                      </div>

                      {action === 'reject' && (
                        <div className={styles.remarksField}>
                          <label>Rejection Remarks *</label>
                          <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Please provide the reason for rejection..."
                            rows="3"
                          />
                        </div>
                      )}

                      <div className={styles.submitActions}>
                        <button
                          onClick={() => {
                            setSelectedRequest(null);
                            setAction('');
                            setRemarks('');
                          }}
                          className={styles.cancelAction}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProcessRequest}
                          className={styles.submitAction}
                          disabled={!action || (action === 'reject' && !remarks.trim())}
                        >
                          Confirm {action === 'approve' ? 'Approval' : 'Rejection'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.noSelection}>
                  <i className="fas fa-hand-pointer"></i>
                  <p>Select a request to view details and take action</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUserProfile;  
