
// import React, { useState, useEffect } from "react";
// import styles from "./ProjectAdmin.module.css";
// import { FiChevronLeft, FiChevronRight, FiMapPin, FiCalendar, FiUsers, FiPlus } from "react-icons/fi";
// import Auth from "../Services/Auth";
// import axios from "axios";

// const ProjectAdmin = () => {
//   const [projectsData, setProjectsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   // Fetch project data from API
//   const fetchProjectsData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = Auth.getToken();
//       if (!token) {
//         throw new Error("Please login to access this page");
//       }

//       const response = await axios.get(
//         "http://209.74.89.83/erpbackend/get-projects-for-user?employeeId=dcore5447",
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       if (!response.data || !response.data.projects) {
//         throw new Error("Failed to fetch project details");
//       }

//       // Transform the API data
//       const transformedData = response.data.projects.map(project => ({
//         id: project._id,
//         projectName: project.name,
//         description: project.description,
//         status: project.status || "In Progress",
//         departments: project.departments || (project.userIds && project.userIds.length > 0 ? 
//           project.userIds.map(user => user.department).filter(Boolean) : ["General"]),
//         location: project.location || "Various locations",
//         deadline: project.deadline
//       }));

//       setProjectsData(transformedData);
//     } catch (err) {
//       setError(err.message);
//       if (err.message.includes("login") || err.response?.status === 401) {
//         Auth.logout();
//         window.location.href = "/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjectsData();
//   }, []);

//   // Calculate pagination values
//   const totalPages = Math.ceil(projectsData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = projectsData.slice(indexOfFirstItem, indexOfLastItem);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loadingContainer}>
//           <div className={styles.spinner}></div>
//           <p>Loading project data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.errorContainer}>
//           <div className={styles.errorIcon}>⚠️</div>
//           <h3>Error loading projects</h3>
//           <p>{error}</p>
//           <button onClick={fetchProjectsData} className={styles.retryButton}>
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>DcoreHost</h1>
//         <h2 className={styles.subtitle}>Projects Overview</h2>
        
       
        
//         <div className={styles.projectCategories}>
//           <span className={styles.categoryActive}>All Projects</span>
//           <span className={styles.category}>Resource Management</span>
//           <span className={styles.category}>Scheduling</span>
//           <span className={styles.category}>Planning</span>
//           <span className={styles.category}>Discussion</span>
//         </div>
//       </div>

//       <div className={styles.projectsGrid}>
//         {currentItems.length > 0 ? (
//           currentItems.map((project) => (
//             <div key={project.id} className={styles.projectCard}>
//               <div className={styles.cardHeader}>
//                 <h3 className={styles.projectTitle}>{project.projectName}</h3>
//                 <div className={`${styles.statusBadge} ${styles[project.status.toLowerCase().replace(/\s+/g, '')]}`}>
//                   {project.status}
//                 </div>
//               </div>
              
//               <p className={styles.projectDescription}>{project.description || "No description provided"}</p>
              
//               <div className={styles.projectMeta}>
//                 <div className={styles.metaItem}>
//                   <FiUsers className={styles.metaIcon} />
//                   <span>{project.departments.join(", ") || "Not specified"}</span>
//                 </div>
//                 <div className={styles.metaItem}>
//                   <FiMapPin className={styles.metaIcon} />
//                   <span>{project.location}</span>
//                 </div>
//                 <div className={styles.metaItem}>
//                   <FiCalendar className={styles.metaIcon} />
//                   <span>{formatDate(project.deadline)}</span>
//                 </div>
//               </div>
              
//               <div className={styles.cardFooter}>
//                 <button className={styles.viewButton}>View Details</button>
//                 <div className={styles.progressBar}>
//                   <div 
//                     className={styles.progressFill} 
//                     style={{ width: `${project.status === 'Completed' ? 100 : project.status === 'In Progress' ? 50 : 10}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className={styles.noProjects}>
//             <div className={styles.noProjectsIcon}>📋</div>
//             <h3>No projects found</h3>
//             <p>Create a new project to get started</p>
//             <button className={styles.createButton}>
//               <FiPlus className={styles.buttonIcon} />
//               Create Project
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className={styles.pagination}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={styles.paginationButton}
//           >
//             <FiChevronLeft />
//           </button>
          
//           <div className={styles.pageNumbers}>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={styles.paginationButton}
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAdmin;




import React, { useState, useEffect } from "react";
import styles from "./ProjectAdmin.module.css";
import { FiChevronLeft, FiChevronRight, FiCalendar, FiFlag, FiClock, FiPlus, FiUsers } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";
import { Link } from "react-router-dom";


const ProjectAdmin = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch project data from API
  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("Please login to access this page");
      }

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-projects-for-user?employeeId=dcore5447",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.data || !response.data.projects) {
        throw new Error("Failed to fetch project details");
      }

      // Transform the API data with all required fields
      const transformedData = response.data.projects.map(project => ({
        id: project._id,
        name: project.name,
        description: project.description,
        deadline: project.deadline,
        status: project.status || "Pending",
        priority: project.priority || "Medium",
        createdAt: project.createdAt,
        teamMembers: project.userIds ? project.userIds.map(user => user.username) : []
      }));

      setProjectsData(transformedData);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("login") || err.response?.status === 401) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectsData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error loading projects</h3>
          <p>{error}</p>
          <button onClick={fetchProjectsData} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Dashboard</h1>
        <h2 className={styles.subtitle}>Manage and track your projects</h2>
        
        {/* <div className={styles.actions}>
          <button className={styles.createButton}>
            <FiPlus className={styles.buttonIcon} />
            New Project
          </button>
        </div> */}
        <div className={styles.actions}>
  <Link to="/CreateNewProject" className={styles.createButton}>
    <FiPlus className={styles.buttonIcon} />
    New Project
  </Link>
</div>

        
        <div className={styles.projectCategories}>
          <span className={styles.categoryActive}>All Projects</span>
          <span className={styles.category}>Pending</span>
          <span className={styles.category}>In Progress</span>
          <span className={styles.category}>Completed</span>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {currentItems.length > 0 ? (
          currentItems.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <div 
                  className={styles.priorityBadge}
                  style={{ backgroundColor: getPriorityColor(project.priority) }}
                >
                  {project.priority}
                </div>
              </div>
              
              <p className={styles.projectDescription}>
                {project.description || "No description provided"}
              </p>
              
              <div className={styles.projectMeta}>
                <div className={styles.metaItem}>
                  <FiCalendar className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Deadline:</span>
                    <span>{formatDate(project.deadline)}</span>
                  </div>
                </div>
                
                <div className={styles.metaItem}>
                  <FiClock className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Created:</span>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                </div>
                
                <div className={styles.metaItem}>
                  <FiUsers className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Team:</span>
                    <span>{project.teamMembers.join(", ") || "Not assigned"}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <div className={`${styles.statusBadge} ${styles[project.status.toLowerCase().replace(/\s+/g, '')]}`}>
                  {project.status}
                </div>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noProjects}>
            <div className={styles.noProjectsIcon}>📋</div>
            <h3>No projects found</h3>
            <p>Create a new project to get started</p>
            <button className={styles.createButton}>
              <FiPlus className={styles.buttonIcon} />
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            <FiChevronLeft />
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
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

export default ProjectAdmin;