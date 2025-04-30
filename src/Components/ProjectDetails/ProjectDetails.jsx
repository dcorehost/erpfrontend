

import React, { useState, useEffect } from "react";
import styles from "./ProjectDetails.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Auth from "../Services/Auth";
import axios from "axios";




const ProjectDetails = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

      // Transform the API data
      const transformedData = response.data.projects.map(project => ({
        id: project._id,
        projectName: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        teamMembers: project.userIds.map(user => ({
          username: user.username,
          email: user.contact.emailId,
          phone: user.contact.phone,
          employeeId: user.employeeId
        })),
        createdAt: project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A',
        deadline: project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading project data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchProjectsData} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Project Management</h2>
        <div className={styles.summary}>
          <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, projectsData.length)} of {projectsData.length} projects</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Team Members</th>
              <th>Created Date</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((project, index) => (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td className={styles.descriptionCell}>{project.description}</td>
                  <td>
                    <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.priority} ${styles[project.priority.toLowerCase()]}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className={styles.teamMembersCell}>
                    {project.teamMembers.map((member, idx) => (
                      <div key={idx} className={styles.memberInfo}>
                        <div className={styles.memberName}>{member.username}</div>
                        <div className={styles.memberDetails}>
                          {member.employeeId} | {member.email} | {member.phone}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{project.createdAt}</td>
                  <td>{project.deadline}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default ProjectDetails;