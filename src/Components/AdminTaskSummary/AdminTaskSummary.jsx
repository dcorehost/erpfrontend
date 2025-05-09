
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminTaskSummary.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../Services/Auth';
import { FiChevronDown, FiChevronUp, FiUser, FiPhone, FiMail, FiClock, FiCalendar } from 'react-icons/fi';
import { FaTasks, FaRegStickyNote, FaUsers } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTaskSummary = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const token = Auth.getToken();

  useEffect(() => {
    if (!token) {
      toast.error('User not authenticated.');
      setIsLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://209.74.89.83/erpbackend/get-admin-tasks-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.projects) {
          const usersMap = new Map();
          
          Object.entries(response.data.projects).forEach(([projectName, tasks]) => {
            tasks.forEach(task => {
              task.userIds.forEach(user => {
                if (!usersMap.has(user.employeeId)) {
                  usersMap.set(user.employeeId, {
                    ...user,
                    projects: {}
                  });
                }
                
                const userData = usersMap.get(user.employeeId);
                if (!userData.projects[projectName]) {
                  userData.projects[projectName] = [];
                }
                
                userData.projects[projectName].push({
                  ...task,
                  projectName: projectName
                });
              });
            });
          });

          setUsers(Array.from(usersMap.values()));
        } else {
          toast.info('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const toggleUser = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
    setExpandedProject(null);
  };

  const toggleProject = (projectName, userId) => {
    if (expandedProject === projectName && expandedUser === userId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
      setExpandedUser(userId);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#ff4757';
      case 'medium':
        return '#ffa502';
      case 'low':
        return '#2ed573';
      default:
        return '#57606f';
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTasks = users.reduce((acc, user) => acc + Object.values(user.projects).flat().length, 0);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <FaTasks className={styles.headerIcon} />
            <h1>Team Tasks Dashboard</h1>
          </div>
          
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>
              <FiUser />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardValue}>{users.length}</span>
              <span className={styles.cardLabel}>Team Members</span>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>
              <FaTasks />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardValue}>{totalTasks}</span>
              <span className={styles.cardLabel}>Total Tasks</span>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.cardIcon}>
              <FaUsers />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardValue}>
                {users.reduce((acc, user) => acc + Object.keys(user.projects).length, 0)}
              </span>
              <span className={styles.cardLabel}>Active Projects</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className={styles.usersContainer}>
        {filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <img src="/empty-tasks.svg" alt="No tasks" className={styles.emptyImage} />
            <h3>No matching users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.employeeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.userCard}
              >
                <div className={styles.userHeader} onClick={() => toggleUser(user.employeeId)}>
                  <div className={styles.userAvatar}>
                    <div className={styles.avatarInitial}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className={styles.userInfo}>
                    <h3>{user.username}</h3>
                    <div className={styles.userMeta}>
                      <span className={styles.employeeId}>{user.employeeId}</span>
                      <span className={styles.userContact}>
                        <FiMail className={styles.contactIcon} /> {user.contact.emailId}
                      </span>
                      <span className={styles.userContact}>
                        <FiPhone className={styles.contactIcon} /> {user.contact.phone}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.userStats}>
                    <span className={styles.statBadge}>
                      {Object.keys(user.projects).length} Projects
                    </span>
                    <span className={styles.statBadge}>
                      {Object.values(user.projects).flat().length} Tasks
                    </span>
                  </div>
                  
                  <div className={styles.toggleIcon}>
                    {expandedUser === user.employeeId ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedUser === user.employeeId && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.userDetails}
                    >
                      {Object.entries(user.projects).map(([projectName, tasks]) => (
                        <div key={projectName} className={styles.projectSection}>
                          <div 
                            className={styles.projectHeader}
                            onClick={() => toggleProject(projectName, user.employeeId)}
                          >
                            <div className={styles.projectInfo}>
                              <h4 className={styles.projectName}>
                                <span className={styles.projectBadge}>{projectName}</span>
                                <span className={styles.taskCount}>{tasks.length} tasks</span>
                              </h4>
                              <div className={styles.projectStats}>
                                <span className={styles.statItem}>
                                  <FiClock /> {tasks.reduce((acc, task) => acc + parseInt(task.estimatedTime.split(':')[0]), 0)}h
                                </span>
                                <span className={`${styles.statItem} ${tasks.filter(t => new Date(t.deadline) < new Date()).length > 0 ? styles.overdueStat : ''}`}>
                                  {tasks.filter(t => new Date(t.deadline) < new Date()).length} overdue
                                </span>
                              </div>
                            </div>
                            <div className={styles.toggleIcon}>
                              {expandedProject === projectName ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedProject === projectName && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={styles.tasksContainer}
                              >
                                {tasks.map((task, index) => {
                                  const isOverdue = new Date(task.deadline) < new Date();
                                  return (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className={`${styles.taskCard} ${isOverdue ? styles.overdue : ''}`}
                                    >
                                      <div className={styles.taskHeader}>
                                        <div className={styles.taskTitle}>
                                          <h5>{task.taskName}</h5>
                                          <span className={styles.taskSubtitle}>{task.subTask}</span>
                                        </div>
                                        <div className={styles.taskPriority}>
                                          <span 
                                            className={styles.priorityBadge}
                                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                                          >
                                            {task.priority}
                                          </span>
                                        </div>
                                      </div>
                                      
                                      <div className={styles.taskMeta}>
                                        <div className={styles.metaItem}>
                                          <FiClock className={styles.metaIcon} />
                                          <span>Estimated: {task.estimatedTime}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                          <FiCalendar className={styles.metaIcon} />
                                          <span>Deadline: {formatDate(task.deadline)}</span>
                                          {isOverdue && <span className={styles.overdueLabel}>OVERDUE</span>}
                                        </div>
                                      </div>
                                      
                                      {task.description && (
                                        <div className={styles.taskDescription}>
                                          <p>{task.description}</p>
                                        </div>
                                      )}
                                      
                                      <div className={styles.taskFooter}>
                                        <div className={styles.taskDates}>
                                          <span>Created: {formatDate(task.createdAt)}</span>
                                          <span>Updated: {formatDate(task.updatedAt)}</span>
                                        </div>
                                        
                                        {task.additionalNotes && (
                                          <div className={styles.notes}>
                                            <div className={styles.notesHeader}>
                                              <FaRegStickyNote className={styles.notesIcon} />
                                              <span>Notes</span>
                                            </div>
                                            <p>{task.additionalNotes}</p>
                                          </div>
                                        )}
                                        
                                        {task.userIds.length > 1 && (
                                          <div className={styles.collaborators}>
                                            <div className={styles.collaboratorsHeader}>
                                              <span>Collaborators:</span>
                                            </div>
                                            <div className={styles.collaboratorList}>
                                              {task.userIds
                                                .filter(u => u.employeeId !== user.employeeId)
                                                .map((collaborator, i) => (
                                                  <div key={i} className={styles.collaborator}>
                                                    <div className={styles.collaboratorAvatar}>
                                                      {collaborator.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className={styles.collaboratorInfo}>
                                                      <span>{collaborator.username}</span>
                                                      <span className={styles.collaboratorId}>{collaborator.employeeId}</span>
                                                    </div>
                                                  </div>
                                                ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default AdminTaskSummary;