
import React, { useState, useEffect } from "react";
import styles from "./ProjectAdmin.module.css";
import { FiCalendar, FiClock, FiPlus, FiUsers } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProjectAdmin = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Auth.getToken();
      if (!token) throw new Error("Please login to access this page");

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-projects-for-user?employeeId=dcore5447",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.data || !response.data.projects)
        throw new Error("Failed to fetch project details");

      const transformedData = response.data.projects.map((project) => ({
        id: project._id,
        name: project.name,
        description: project.description,
        deadline: project.deadline,
        status: project.status || "Pending",
        priority: project.priority || "Medium",
        createdAt: project.createdAt,
        teamMembers: project.userIds
          ? project.userIds.map((user) => user.username)
          : [],
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

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const handleViewDetails = (projectName) => {
    navigate(`/Projectdetail/${encodeURIComponent(projectName)}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading project data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Error: {error}</p>
        <button onClick={fetchProjectsData}>Retry</button>
      </div>
    );
  }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Project Dashboard</h1>
//         <Link to="/CreateNewProject" className={styles.createButton}>
//           <FiPlus /> New Project
//         </Link>
//       </div>

//       <div className={styles.projectsGrid}>
//         {projectsData.map((project) => (
//           <div key={project.id} className={styles.projectCard}>
//             <div className={styles.cardHeader}>
//               <h3>{project.name}</h3>
//               <div
//                 className={styles.priorityBadge}
//                 style={{ backgroundColor: getPriorityColor(project.priority) }}
//               >
//                 {project.priority}
//               </div>
//             </div>
//             <p>{project.description || "No description provided"}</p>

//             <div className={styles.projectMeta}>
//               <div>
//                 <FiCalendar /> Deadline: {formatDate(project.deadline)}
//               </div>
//               <div>
//                 <FiClock /> Created: {formatDate(project.createdAt)}
//               </div>
//               <div>
//                 <FiUsers /> Team: {project.teamMembers.join(", ") || "N/A"}
//               </div>
//             </div>

//             <div className={styles.cardFooter}>
//               <span
//                 className={`${styles.statusBadge} ${
//                   styles[project.status.toLowerCase().replace(/\s+/g, "")]
//                 }`}
//               >
//                 {project.status}
//               </span>
//               <div
//                 className={styles.viewButton}
//                 onClick={() => handleViewDetails(project.name)}
//               >
//                 View Details
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Dashboard</h1>
        <Link to="/CreateNewProject" className={styles.createButton}>
          <FiPlus /> New Project
        </Link>
      </div>

      <div className={styles.projectsGrid}>
        {projectsData.map((project) => (
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
              <div className={styles.dueDate}>
                <FiCalendar className={`${styles.metaIcon} ${styles.calendar}`} /> 
                Deadline: {formatDate(project.deadline)}
              </div>
              <div className={styles.createdAt}>
                <FiClock className={`${styles.metaIcon} ${styles.clock}`} /> 
                Created: {formatDate(project.createdAt)}
              </div>
              <div className={styles.team}>
                <FiUsers className={`${styles.metaIcon} ${styles.users}`} /> 
                Team: {project.teamMembers.join(", ") || "N/A"}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span
                className={`${styles.statusBadge} ${
                  styles[project.status.toLowerCase().replace(/\s+/g, "")]
                }`}
              >
                {project.status}
              </span>
              <button
                className={styles.viewButton}
                onClick={() => handleViewDetails(project.name)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProjectAdmin;
