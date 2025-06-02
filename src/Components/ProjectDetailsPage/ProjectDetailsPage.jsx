// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './ProjectDetailsPage.module.css';

// const ProjectDetailsPage = ({ projectName }) => {
//   const [projectData, setProjectData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const response = await axios.get(
//           `http://209.74.89.83/erpbackend/get-project-by-name?name=${projectName}`
//         );
//         setProjectData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProjectData();
//   }, [projectName]);

//   if (loading) {
//     return <div className={styles.loading}>Loading project details...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   if (!projectData || !projectData.projects || projectData.projects.length === 0) {
//     return <div className={styles.error}>Project not found</div>;
//   }

//   const project = projectData.projects[0];
//   const tasks = project.tasks || [];
//   const userCreatedTasks = projectData.userCreatedTasks || [];

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <h1>{project.name}</h1>
//         <div className={styles.projectMeta}>
//           <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
//             {project.status}
//           </span>
//           <span className={`${styles.priority} ${styles[project.priority.toLowerCase()]}`}>
//             {project.priority} Priority
//           </span>
//           <span className={styles.deadline}>
//             Deadline: {formatDate(project.deadline)}
//           </span>
//         </div>
//       </header>

//       <section className={styles.section}>
//         <h2>Description</h2>
//         <p>{project.description}</p>
//       </section>

//       <section className={styles.section}>
//         <h2>Team Members</h2>
//         <div className={styles.teamGrid}>
//           {project.userIds.map((user, index) => (
//             <div key={index} className={styles.teamMember}>
//               <h3>{user.username}</h3>
//               <p>Employee ID: {user.employeeId}</p>
//               <p>Email: {user.contact.emailId}</p>
//               <p>Phone: {user.contact.phone}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className={styles.section}>
//         <h2>Project Tasks ({tasks.length})</h2>
//         <div className={styles.taskList}>
//           {tasks.map((task) => (
//             <div key={task._id} className={styles.taskCard}>
//               <div className={styles.taskHeader}>
//                 <h3>{task.taskName}</h3>
//                 <span className={`${styles.taskStatus} ${styles[task.status.toLowerCase()]}`}>
//                   {task.status}
//                 </span>
//               </div>
//               <p className={styles.taskDescription}>{task.description}</p>
//               <div className={styles.taskDetails}>
//                 <div>
//                   <strong>Subtask:</strong> {task.subTask}
//                 </div>
//                 <div>
//                   <strong>Deadline:</strong> {formatDate(task.deadline)}
//                 </div>
//                 <div>
//                   <strong>Estimated Time:</strong> {task.estimatedTime}
//                 </div>
//                 <div>
//                   <strong>Priority:</strong> 
//                   <span className={`${styles.taskPriority} ${styles[task.priority.toLowerCase()]}`}>
//                     {task.priority}
//                   </span>
//                 </div>
//               </div>
//               {task.additionalNotes && (
//                 <div className={styles.notes}>
//                   <strong>Notes:</strong> {task.additionalNotes}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className={styles.section}>
//         <h2>User Created Tasks ({userCreatedTasks.length})</h2>
//         <div className={styles.taskList}>
//           {userCreatedTasks.map((task) => (
//             <div key={task._id} className={styles.taskCard}>
//               <div className={styles.taskHeader}>
//                 <h3>{task.taskName}</h3>
//                 <span className={`${styles.taskStatus} ${styles[task.state.toLowerCase()]}`}>
//                   {task.state}
//                 </span>
//               </div>
//               <p className={styles.taskDescription}>{task.description}</p>
//               <div className={styles.taskDetails}>
//                 <div>
//                   <strong>Assigned to:</strong> {task.userId.username}
//                 </div>
//                 <div>
//                   <strong>Time Spent:</strong> {task.timeSpent} minutes
//                 </div>
//                 <div>
//                   <strong>Created:</strong> {formatDate(task.createdAt)}
//                 </div>
//                 {task.updatedAt && (
//                   <div>
//                     <strong>Last Updated:</strong> {formatDate(task.updatedAt)}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProjectDetailsPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../Services/Auth'; 
// import styles from './ProjectDetailsPage.module.css';

// const ProjectDetailsPage = ({ projectName }) => {
//   const [projectData, setProjectData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const token = Auth.getToken();
//         if (!token) {
//           throw new Error('Authentication token not found');
//         }

//         const response = await axios.get(
//           `http://209.74.89.83/erpbackend/get-project-by-name?name=${encodeURIComponent(projectName)}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
        
//         if (response.data && response.data.projects && response.data.projects.length > 0) {
//           setProjectData(response.data);
//         } else {
//           throw new Error('Project not found');
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'Failed to fetch project data');
//         setLoading(false);
//       }
//     };

//     fetchProjectData();
//   }, [projectName]);

//   if (loading) {
//     return <div className={styles.loading}>Loading project details...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   if (!projectData) {
//     return <div className={styles.error}>No project data available</div>;
//   }

//   const project = projectData.projects[0];
//   const tasks = project.tasks || [];
//   const userCreatedTasks = projectData.userCreatedTasks || [];

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <h1>{project.name}</h1>
//         <div className={styles.projectMeta}>
//           <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
//             {project.status}
//           </span>
//           <span className={`${styles.priority} ${styles[project.priority.toLowerCase()]}`}>
//             {project.priority} Priority
//           </span>
//           <span className={styles.deadline}>
//             Deadline: {formatDate(project.deadline)}
//           </span>
//         </div>
//       </header>

//       <section className={styles.section}>
//         <h2>Description</h2>
//         <p>{project.description || 'No description provided'}</p>
//       </section>

//       <section className={styles.section}>
//         <h2>Team Members</h2>
//         {project.userIds && project.userIds.length > 0 ? (
//           <div className={styles.teamGrid}>
//             {project.userIds.map((user, index) => (
//               <div key={index} className={styles.teamMember}>
//                 <h3>{user.username}</h3>
//                 <p>Employee ID: {user.employeeId}</p>
//                 <p>Email: {user.contact?.emailId || 'N/A'}</p>
//                 <p>Phone: {user.contact?.phone || 'N/A'}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No team members assigned</p>
//         )}
//       </section>

//       <section className={styles.section}>
//         <h2>Project Tasks ({tasks.length})</h2>
//         {tasks.length > 0 ? (
//           <div className={styles.taskList}>
//             {tasks.map((task) => (
//               <div key={task._id} className={styles.taskCard}>
//                 <div className={styles.taskHeader}>
//                   <h3>{task.taskName}</h3>
//                   <span className={`${styles.taskStatus} ${styles[task.status.toLowerCase()]}`}>
//                     {task.status}
//                   </span>
//                 </div>
//                 <p className={styles.taskDescription}>{task.description || 'No description'}</p>
//                 <div className={styles.taskDetails}>
//                   <div>
//                     <strong>Subtask:</strong> {task.subTask || 'N/A'}
//                   </div>
//                   <div>
//                     <strong>Deadline:</strong> {formatDate(task.deadline)}
//                   </div>
//                   <div>
//                     <strong>Estimated Time:</strong> {task.estimatedTime || 'N/A'}
//                   </div>
//                   <div>
//                     <strong>Priority:</strong> 
//                     <span className={`${styles.taskPriority} ${styles[task.priority.toLowerCase()]}`}>
//                       {task.priority}
//                     </span>
//                   </div>
//                 </div>
//                 {task.additionalNotes && (
//                   <div className={styles.notes}>
//                     <strong>Notes:</strong> {task.additionalNotes}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No tasks found for this project</p>
//         )}
//       </section>

//       <section className={styles.section}>
//         <h2>User Created Tasks ({userCreatedTasks.length})</h2>
//         {userCreatedTasks.length > 0 ? (
//           <div className={styles.taskList}>
//             {userCreatedTasks.map((task) => (
//               <div key={task._id} className={styles.taskCard}>
//                 <div className={styles.taskHeader}>
//                   <h3>{task.taskName}</h3>
//                   <span className={`${styles.taskStatus} ${styles[task.state.toLowerCase()]}`}>
//                     {task.state}
//                   </span>
//                 </div>
//                 <p className={styles.taskDescription}>{task.description || 'No description'}</p>
//                 <div className={styles.taskDetails}>
//                   <div>
//                     <strong>Assigned to:</strong> {task.userId?.username || 'N/A'}
//                   </div>
//                   <div>
//                     <strong>Time Spent:</strong> {task.timeSpent || 0} minutes
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {formatDate(task.createdAt)}
//                   </div>
//                   {task.updatedAt && (
//                     <div>
//                       <strong>Last Updated:</strong> {formatDate(task.updatedAt)}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No user created tasks found</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProjectDetailsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Auth from '../Services/Auth';
import styles from './ProjectDetailsPage.module.css';

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
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(
          `http://209.74.89.83/erpbackend/get-project-by-name?name=${encodeURIComponent(projectName)}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data && response.data.projects && response.data.projects.length > 0) {
          setProjectData(response.data);
        } else {
          throw new Error('Project not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch project data');
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectName]);

  const handleBackToProjects = () => {
    navigate('/projects');
  };

  if (loading) {
    return <div className={styles.loading}>Loading project details...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>Error: {error}</div>
        <button onClick={handleBackToProjects} className={styles.backButton}>
          Back to Projects
        </button>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>No project data available</div>
        <button onClick={handleBackToProjects} className={styles.backButton}>
          Back to Projects
        </button>
      </div>
    );
  }

  const project = projectData.projects[0];
  const tasks = project.tasks || [];
  const userCreatedTasks = projectData.userCreatedTasks || [];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBackToProjects} className={styles.backButton}>
        ← Back to Projects
      </button>

      <header className={styles.header}>
        <h1>{project.name}</h1>
        <div className={styles.projectMeta}>
          <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
            {project.status}
          </span>
          <span className={`${styles.priority} ${styles[project.priority.toLowerCase()]}`}>
            {project.priority} Priority
          </span>
          <span className={styles.deadline}>
            Deadline: {formatDate(project.deadline)}
          </span>
        </div>
      </header>

      {/* Rest of the ProjectDetailsPage component remains the same */}
      {/* ... */}
    </div>
  );
};

export default ProjectDetailsPage;