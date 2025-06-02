
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Auth from '../Services/Auth';
import styles from './ProjectDetailsPage.module.css';
import { FaArrowLeft, FaCalendarAlt, FaUsers, FaTasks, FaClock, FaStickyNote, FaInfoCircle } from 'react-icons/fa';
import { MdPriorityHigh } from 'react-icons/md';

const ProjectDetailsPage = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = Auth.getToken();
        if (!token) throw new Error('Authentication token not found');

        const decodedProjectName = decodeURIComponent(projectName);
        const response = await axios.get(
          `http://209.74.89.83/erpbackend/get-project-by-name?name=${encodeURIComponent(decodedProjectName)}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.projects?.length > 0) {
          setProjectData(response.data);
        } else {
          throw new Error('Project not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectName]);

  const handleBackToProjects = () => {
    navigate(-1);
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  const formatTime = (time) => {
    if (!time) return 'N/A';
    const parts = time.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}h ${parts[1]}m`;
    }
    return time;
  };

  if (loading) return <div className={styles.loading}>Loading project details...</div>;
  if (error) return (
    <div className={styles.errorContainer}>
      <p>{error}</p>
      <button className={styles.errorButton} onClick={handleBackToProjects}>Back to Projects</button>
    </div>
  );

  const project = projectData.projects[0];
  const tasks = project.tasks || [];
  const userCreatedTasks = projectData.userCreatedTasks || [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return styles.statusCompleted;
      case 'pending': return styles.statusPending;
      case 'in progress': return styles.statusInProgress;
      default: return styles.statusDefault;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      case 'low': return styles.priorityLow;
      default: return styles.priorityDefault;
    }
  };

  const getStateColor = (state) => {
    switch (state?.toLowerCase()) {
      case 'completed': return styles.statusCompleted;
      case 'done': return styles.statusCompleted;
      case 'todo': return styles.statusPending;
      case 'in progress': return styles.statusInProgress;
      default: return styles.statusDefault;
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBackToProjects}>
        <FaArrowLeft /> Back to Projects
      </button>

      <div className={styles.header}>
        <h1 className={styles.projectTitle}>{project.name}</h1>
        <div className={styles.metaContainer}>
          <div className={`${styles.metaItem} ${getStatusColor(project.status)}`}>
            {project.status}
          </div>
          <div className={`${styles.metaItem} ${getPriorityColor(project.priority)}`}>
            <MdPriorityHigh /> {project.priority} Priority
          </div>
          <div className={`${styles.metaItem} ${styles.metaDeadline}`}>
            <FaCalendarAlt /> Deadline: {formatDate(project.deadline)}
          </div>
          <div className={`${styles.metaItem} ${styles.metaCreated}`}>
            <FaCalendarAlt /> Created: {formatDate(project.createdAt)}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><FaInfoCircle /> Description</h2>
        <p className={styles.description}>{project.description || "No description provided"}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><FaUsers /> Team Members</h2>
        {project.userIds?.length > 0 ? (
          <ul className={styles.teamList}>
            {project.userIds.map((user, i) => (
              <li key={i} className={styles.teamMember}>
                <strong className={styles.memberName}>{user.username} ({user.employeeId})</strong>
                <div className={styles.memberDetail}>
                  <FaCalendarAlt /> Email: {user.contact?.emailId || 'No Email'}
                </div>
                <div className={styles.memberDetail}>
                  <FaCalendarAlt /> Phone: {user.contact?.phone || 'No Phone'}
                </div>
              </li>
            ))}
          </ul>
        ) : <p className={styles.description}>No team members assigned</p>}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><FaTasks /> Project Tasks ({tasks.length})</h2>
        {tasks.length > 0 ? (
          <div className={styles.taskGrid}>
            {tasks.map(task => (
              <div key={task._id} className={`${styles.taskCard} ${getPriorityColor(task.priority)}`}>
                <h3 className={styles.taskTitle}>{task.taskName}</h3>
                
                <div className={styles.taskDetail}>
                  <FaInfoCircle /> Status: 
                  <div className={`${styles.metaItem} ${getStatusColor(task.status)} ${styles.smallMeta}`}>
                    {task.status}
                  </div>
                </div>
                
                <div className={styles.taskDetail}>
                  <FaCalendarAlt /> Deadline: {formatDate(task.deadline)}
                </div>
                
                <div className={styles.taskDetail}>
                  <MdPriorityHigh /> Priority: 
                  <div className={`${styles.metaItem} ${getPriorityColor(task.priority)} ${styles.smallMeta}`}>
                    {task.priority}
                  </div>
                </div>
                
                <div className={styles.taskDetail}>
                  <FaClock /> Estimated Time: {formatTime(task.estimatedTime)}
                </div>
                
                {task.subTask && (
                  <div className={styles.subTaskList}>
                    <div className={styles.taskDetail}><strong>Sub-tasks:</strong></div>
                    <div className={styles.subTaskItem}>{task.subTask}</div>
                  </div>
                )}
                
                {task.description && (
                  <div className={styles.taskDetail}>
                    <FaInfoCircle /> Description: {task.description}
                  </div>
                )}
                
                {task.additionalNotes && (
                  <div className={styles.notesContainer}>
                    <FaStickyNote /> <strong>Notes:</strong> {task.additionalNotes}
                  </div>
                )}
                
                {task.userIds?.length > 0 && (
                  <div className={styles.assignedTo}>
                    <div className={styles.taskDetail}><strong>Assigned to:</strong></div>
                    {task.userIds.map((user, i) => (
                      <div key={i} className={styles.taskDetail}>
                        {user.username} ({user.employeeId})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : <p className={styles.description}>No tasks found</p>}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><FaTasks /> User Created Tasks ({userCreatedTasks.length})</h2>
        {userCreatedTasks.length > 0 ? (
          <div className={styles.taskGrid}>
            {userCreatedTasks.map(task => (
              <div key={task._id} className={styles.taskCard}>
                <h3 className={styles.taskTitle}>{task.taskName}</h3>
                
                <div className={styles.taskDetail}>
                  <FaInfoCircle /> State: 
                  <div className={`${styles.metaItem} ${getStateColor(task.state)} ${styles.smallMeta}`}>
                    {task.state}
                  </div>
                </div>
                
                <div className={styles.taskDetail}>
                  <FaCalendarAlt /> Created: {formatDate(task.createdAt)}
                </div>
                
                {task.updatedAt && (
                  <div className={styles.taskDetail}>
                    <FaCalendarAlt /> Updated: {formatDate(task.updatedAt)}
                  </div>
                )}
                
                <div className={styles.taskDetail}>
                  <FaClock /> Time Spent: {task.timeSpent} minutes
                </div>
                
                {task.description && (
                  <div className={styles.taskDetail}>
                    <FaInfoCircle /> Description: {task.description}
                  </div>
                )}
                
                {task.userId && (
                  <div className={styles.taskDetail}>
                    <FaUsers /> Assigned To: {task.userId.username} ({task.userId.employeeId})
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : <p className={styles.description}>No user created tasks</p>}
      </section>
    </div>
  );
};

export default ProjectDetailsPage;