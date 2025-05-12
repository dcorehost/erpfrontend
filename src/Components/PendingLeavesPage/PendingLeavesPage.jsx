
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Httpservices from '../Services/Httpservices';
import Auth from '../Services/Auth';
import styles from './PendingLeavesPage.module.css';

const PendingLeavesPage = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [actionInProgress, setActionInProgress] = useState({});

  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        if (!Auth.isAuthenticated()) {
          setError('Please login to view pending leaves');
          setLoading(false);
          return;
        }

        const response = await Httpservices.get('get-adminpending-leave-details');
        if (response.data?.leaveDetails?.length) {
          setPendingLeaves(response.data.leaveDetails);
        } else {
          setPendingLeaves([]);
          setError('No pending leaves found');
        }
      } catch (err) {
        console.error('Error fetching pending leaves:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch pending leaves');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLeaves();
  }, []);

  const handleApproveReject = async (leaveId, action) => {
    if (action === 'reject' && !remarks.trim()) {
      setError('Please enter remarks for rejection');
      toast.error('Remarks are required for rejection');
      return;
    }

    setActionInProgress(prev => ({ ...prev, [leaveId]: action }));
    setError(null);

    try {
      const url = `approve-admin-leaves?_id=${leaveId}&action=${action}`;

      if (action === 'reject') {
        await Httpservices.put(url, { remarks });
        toast.error('Leave rejected successfully');
      } else {
        await Httpservices.put(url);
        toast.success('Leave approved successfully');
      }

      const updatedLeaves = pendingLeaves
        .map(user => ({
          ...user,
          userLeaves: user.userLeaves.filter(leave => leave._id !== leaveId),
        }))
        .filter(user => user.userLeaves.length > 0);

      setPendingLeaves(updatedLeaves);
      setRemarks('');
      setSelectedLeaveId(null);
    } catch (err) {
      console.error('Error processing leave:', err);
      setError(err.response?.data?.message || err.message || 'Failed to process leave');
      toast.error('Error processing leave');
    } finally {
      setActionInProgress(prev => ({ ...prev, [leaveId]: null }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateLeaveDays = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading pending leaves...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        {!Auth.isAuthenticated() && (
          <button
            className={styles.loginButton}
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>
        <h1>Pending Leave Approvals</h1>
        
      </div>

      {pendingLeaves.length === 0 ? (
        <div className={styles.noData}>No pending leave requests found</div>
      ) : (
        <div className={styles.leavesContainer}>
          {pendingLeaves.map(user => (
            <div key={user._id} className={styles.userSection}>
              <div className={styles.userHeader}>
                <h2>
                  {user.username}
                  <span className={styles.userType}>{user.typeOfUser}</span>
                </h2>
                <div className={styles.userContact}>
                  <span>{user.contact?.emailId}</span>
                </div>
              </div>

              <div className={styles.leavesList}>
                {user.userLeaves.map(leave => (
                  <div key={leave._id} className={styles.leaveCard}>
                    <div className={styles.leaveInfo}>
                      <div className={styles.leaveType}>{leave.leaveType}</div>
                      <div className={styles.leaveDates}>
                        {formatDate(leave.from)} to {formatDate(leave.to)}
                        <span> ({calculateLeaveDays(leave.from, leave.to)} days)</span>
                      </div>
                      <div className={styles.leaveReason}>
                        <strong>Reason:</strong> {leave.reason}
                      </div>
                    </div>

                    <div className={styles.leaveActions}>
                      {selectedLeaveId === leave._id ? (
                        <div className={styles.remarksSection}>
                          <textarea
                            placeholder="Enter remarks (required for rejection)"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className={styles.remarksInput}
                          />
                          <div className={styles.actionButtons}>
                            <button
                              onClick={() => handleApproveReject(leave._id, 'approve')}
                              disabled={actionInProgress[leave._id] === 'approve'}
                              className={styles.approveButton}
                            >
                              {actionInProgress[leave._id] === 'approve' ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleApproveReject(leave._id, 'reject')}
                              disabled={actionInProgress[leave._id] === 'reject' || !remarks.trim()}
                              className={styles.rejectButton}
                            >
                              {actionInProgress[leave._id] === 'reject' ? 'Processing...' : 'Reject'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedLeaveId(leave._id);
                            setRemarks('');
                          }}
                          className={styles.takeActionButton}
                        >
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingLeavesPage;