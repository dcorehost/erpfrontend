
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import styles from './MyProfile.module.css';

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [expandedProjects, setExpandedProjects] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Auth.getToken();
        const response = await axios.get('http://209.74.89.83/erpbackend/get-user-detail', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.users);
        
        // Initialize expanded state for projects
        if (response.data.users?.userTasks) {
          const projects = [...new Set(response.data.users.userTasks.map(task => task.projectName))];
          const initialExpanded = {};
          projects.forEach(project => {
            initialExpanded[`user-${project}`] = false;
          });
          setExpandedProjects(initialExpanded);
        }

        if (response.data.users?.adminTasks) {
          const adminProjects = [...new Set(response.data.users.adminTasks.map(task => task.projectName))];
          const adminExpanded = {};
          adminProjects.forEach(project => {
            adminExpanded[`admin-${project}`] = false;
          });
          setExpandedProjects(prev => ({ ...prev, ...adminExpanded }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleProject = (projectName) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectName]: !prev[projectName]
    }));
  };

  const formatTimeSpent = (seconds) => {
    if (!seconds) return "0h 0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const groupTasksByProject = (tasks) => {
    if (!tasks) return {};
    
    return tasks.reduce((acc, task) => {
      if (!acc[task.projectName]) {
        acc[task.projectName] = [];
      }
      acc[task.projectName].push(task);
      return acc;
    }, {});
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Error Loading Profile</h2>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
     
case 'personal':
  return (
    <div className={styles.tabContent}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h2>Personal Details</h2>
          <div className={styles.profileAvatar}>
            {userData.profilePhoto ? (
              <img src={userData.profilePhoto} alt="Profile" className={styles.profileImage} />
            ) : (
              <div className={styles.profileInitial}>
                {userData.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Full Name</span>
            <span className={styles.detailValue}>{userData.displayName || userData.username}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Role</span>
            <span className={styles.detailValue}>
              {userData.role || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Gender</span>
            <span className={styles.detailValue}>{userData.gender || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>{userData.contact?.emailId || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Phone</span>
            <span className={styles.detailValue}>{userData.contact?.phone || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Employee ID</span>
            <span className={styles.detailValue}>{userData.employeeId || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Address</span>
            <span className={styles.detailValue}>
              {userData.address?.country || 'N/A'}, {userData.address?.state || ''} {userData.address?.pincode || ''}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Language</span>
            <span className={styles.detailValue}>
              {userData.language?.join(', ') || 'N/A'}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Member Since</span>
            <span className={styles.detailValue}>
              {new Date(userData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
      case 'leave':
        return (
          <div className={styles.tabContent}>
            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <h3>Casual Leaves</h3>
                <div className={styles.leaveProgress}>
                  <div 
                    className={styles.leaveProgressBar}
                    style={{
                      width: `${(userData.leaveBalance?.casualLeaves.booked / 
                              (userData.leaveBalance?.casualLeaves.available + 
                               userData.leaveBalance?.casualLeaves.booked)) * 100 || 0}%`
                    }}
                  ></div>
                </div>
                <div className={styles.leaveStats}>
                  <span>{userData.leaveBalance?.casualLeaves.available || 0} available</span>
                  <span>{userData.leaveBalance?.casualLeaves.booked || 0} booked</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Sick Leaves</h3>
                <div className={styles.leaveProgress}>
                  <div 
                    className={styles.leaveProgressBar}
                    style={{
                      width: `${(userData.leaveBalance?.sickLeaves.booked / 
                              (userData.leaveBalance?.sickLeaves.available + 
                               userData.leaveBalance?.sickLeaves.booked)) * 100 || 0}%`
                    }}
                  ></div>
                </div>
                <div className={styles.leaveStats}>
                  <span>{userData.leaveBalance?.sickLeaves.available || 0} available</span>
                  <span>{userData.leaveBalance?.sickLeaves.booked || 0} booked</span>
                </div>
              </div>
            </div>
            
            <h3 className={styles.sectionTitle}>Leave History</h3>
            <div className={styles.leaveHistory}>
              {userData.userLeaves?.length > 0 ? (
                userData.userLeaves.map((leave, index) => (
                  <div key={index} className={styles.leaveCard}>
                    <div className={styles.leaveHeader}>
                      <span className={`${styles.leaveStatus} ${styles[leave.state.toLowerCase()]}`} >
                        {leave.state}
                      </span>
                      <span className={styles.leaveType}>{leave.leaveType}</span>
                    </div>
                    <div className={styles.leaveDates}>
                      {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                    </div>
                    <div className={styles.leaveReason}>{leave.reason}</div>
                    {leave.remarks && (
                      <div className={styles.leaveRemarks}>
                        <strong>Remarks:</strong> {leave.remarks}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noData}>No leave history found</div>
              )}
            </div>
          </div>
        );
      case 'tasks':
        const userTasksByProject = groupTasksByProject(userData.userTasks);
        const adminTasksByProject = groupTasksByProject(userData.adminTasks);
        const userProjectCount = Object.keys(userTasksByProject).length;
        const adminProjectCount = Object.keys(adminTasksByProject).length;

        return (
          <div className={styles.tabContent}>
            <h3 className={styles.sectionTitle}>
              My Tasks ({userData.userTasks?.length || 0} tasks across {userProjectCount} projects)
            </h3>
            
            {userProjectCount > 0 ? (
              Object.entries(userTasksByProject).map(([projectName, tasks]) => (
                <div key={`user-${projectName}`} className={styles.projectCard}>
                  
                  <div 
                    className={styles.projectHeader}
                    onClick={() => toggleProject(`user-${projectName}`)}
                  >
                    <h4>{projectName}</h4>
                    <div className={styles.projectStats}>
                      <span>{tasks.length} tasks</span>
                      <span className={styles.toggleIcon}>
                        {expandedProjects[`user-${projectName}`] ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                  
                  {expandedProjects[`user-${projectName}`] && (
                    <div className={styles.taskList}>
                      {tasks.map((task, index) => (
                        <div key={index} className={styles.taskCard}>
                          <div className={styles.taskHeader}>
                            <h5>{task.taskName}</h5>
                            <span className={`${styles.taskStatus} ${styles[task.state.toLowerCase().replace(/\s+/g, '')]}`}>
                              {task.state}
                            </span>
                          </div>
                          <div className={styles.taskDescription}>{task.description}</div>
                          <div className={styles.taskMeta}>
                            <div>
                              <strong>Time Spent:</strong> {formatTimeSpent(task.timeSpent)}
                            </div>
                            <div>
                              <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                            {task.isRunning && <span className={styles.runningBadge}>Running</span>}
                          </div>
                          {task.startTime && (
                            <div className={styles.taskMeta}>
                              <strong>Started:</strong> {new Date(task.startTime).toLocaleString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No tasks assigned</div>
            )}

            <h3 className={styles.sectionTitle}>
              Admin Tasks ({userData.adminTasks?.length || 0} tasks across {adminProjectCount} projects)
            </h3>
            
            {adminProjectCount > 0 ? (
              Object.entries(adminTasksByProject).map(([projectName, tasks]) => (
                <div key={`admin-${projectName}`} className={styles.projectCard}>
                  <div 
                    className={styles.projectHeader}
                    onClick={() => toggleProject(`admin-${projectName}`)}
                  >
                    <h4>{projectName}</h4>
                    <div className={styles.projectStats}>
                      <span>{tasks.length} tasks</span>
                      <span className={styles.toggleIcon}>
                        {expandedProjects[`admin-${projectName}`] ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                  
                  {expandedProjects[`admin-${projectName}`] && (
                    <div className={styles.taskList}>
                      {tasks.map((task, index) => (
                        <div key={index} className={styles.taskCard}>
                          <div className={styles.taskHeader}>
                            <h5>{task.taskName}</h5>
                            <span className={`${styles.taskPriority} ${styles[task.priority.toLowerCase()]}`}>
                              {task.priority}
                            </span>
                          </div>
                          {task.subTask && (
                            <div className={styles.taskSubTask}>
                              <strong>Subtask:</strong> {task.subTask}
                            </div>
                          )}
                          <div className={styles.taskDescription}>{task.description}</div>
                          <div className={styles.taskMeta}>
                            <div>
                              <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                            </div>
                            <div>
                              <strong>Est. Time:</strong> {task.estimatedTime}
                            </div>
                          </div>
                          {task.additionalNotes && (
                            <div className={styles.taskNotes}>
                              <strong>Notes:</strong> {task.additionalNotes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No admin tasks assigned</div>
            )}
          </div>
        );
      case 'attendance':
        return (
          <div className={styles.tabContent}>
            <h3 className={styles.sectionTitle}>Attendance Records</h3>
            <div className={styles.attendanceList}>
              {userData.attendance?.length > 0 ? (
                userData.attendance.map((attendance, index) => (
                  <div key={index} className={styles.attendanceCard}>
                    <div className={styles.attendanceDate}>
                      {new Date(attendance.checkInStatus).toLocaleDateString()}
                    </div>
                    <div className={styles.attendanceStatus}>
                      <span className={`${styles.statusBadge} ${styles[attendance.status.toLowerCase()]}`}>
                        {attendance.status}
                      </span>
                    </div>
                    <div className={styles.attendanceTimes}>
                      <div>
                        <span>Check-in:</span> 
                        {new Date(attendance.checkInStatus).toLocaleTimeString()}
                      </div>
                      <div>
                        <span>Check-out:</span> 
                        {attendance.checkOutStatus ? 
                          new Date(attendance.checkOutStatus).toLocaleTimeString() : 'N/A'}
                      </div>
                    </div>
                    <div className={styles.attendanceDuration}>
                      Time Spent: {formatTimeSpent(attendance.timeSpent)}
                    </div>
                    {attendance.location && (
                      <div className={styles.attendanceLocation}>
                        <span>Location: </span>
                        <a 
                          href={`https://www.google.com/maps?q=${attendance.location.latitude},${attendance.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Map
                        </a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noData}>No attendance records found</div>
              )}
            </div>
          </div>
        );
      case 'payroll':
        return (
          <div className={styles.tabContent}>
            <div className={styles.payrollContainer}>
              {userData.payroll?.length > 0 ? (
                <div className={styles.payrollTable}>
                  <div className={styles.tableHeader}>
                    <div>Month</div>
                    <div>Basic Salary</div>
                    <div>Allowances</div>
                    <div>Deductions</div>
                    <div>Net Salary</div>
                    <div>Status</div>
                  </div>
                  {userData.payroll.map((item, index) => (
                    <div key={index} className={styles.tableRow}>
                      <div>{item.month}</div>
                      <div>{item.basicSalary}</div>
                      <div>{item.allowances}</div>
                      <div>{item.deductions}</div>
                      <div>{item.netSalary}</div>
                      <div className={`${styles.payrollStatus} ${styles[item.status.toLowerCase()]}`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noData}>
                  <p>No payroll records available</p>
                  {userData.deductionType?.length > 0 && (
                    <div className={styles.deductionInfo}>
                      <h4>Deduction Types:</h4>
                      <ul>
                        {userData.deductionType.map((type, index) => (
                          <li key={index}>{type}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.profileImageContainer}>
            {userData.profilePhoto ? (
              <img src={userData.profilePhoto} alt="Profile" className={styles.profileImageLarge} />
            ) : (
              <div className={styles.profileInitialLarge}>
                {userData.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className={styles.profileText}>
            <h1>
              <span className={styles.username}>{userData.displayName || userData.username}</span>
            </h1>
            <div className={styles.employeeId}>Employee ID: {userData.employeeId}</div>
            <div className={styles.memberSince}>
              Member since: {new Date(userData.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'leave' ? styles.active : ''}`}
          onClick={() => setActiveTab('leave')}
        >
          Leave
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'tasks' ? styles.active : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'attendance' ? styles.active : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'payroll' ? styles.active : ''}`}
          onClick={() => setActiveTab('payroll')}
        >
          Payroll
        </button>
      </div>
      
      <div className={styles.scrollableContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MyProfile;