import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ClientProjects.module.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import Auth from "../Services/Auth";
import { toast } from "react-toastify";
import ProjectDetailsModal from "../ClientProjectDetails/ClientProjectDetails";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = Auth.getToken();

      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      try {
        const response = await fetch(
          "http://209.74.89.83/erpbackend/get-client-projects",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();
        const fetchedProjects = result.data || [];

        const formattedProjects = fetchedProjects.map((project, index) => ({
          id: project._id || index,
          name: project.name || "Unnamed Project",
          status: project.status || "Planning",
          priority: project.priority || "normal",
          description: project.description || "No description available",
          progress: parseInt(project.progress) || 0,
          teamSize: project.teamSize || 0,
          startDate: project.startDate
            ? new Date(project.startDate).toISOString().split("T")[0]
            : "N/A",
          endDate: project.endDate
            ? new Date(project.endDate).toISOString().split("T")[0]
            : "N/A",
          lastUpdated: project.updatedAt
            ? new Date(project.updatedAt).toISOString().split("T")[0]
            : "N/A",
          deadline: project.deadline
            ? new Date(project.deadline).toLocaleDateString("en-CA")
            : "N/A",
          userIds: project.userIds || [],
        }));

        setProjects(formattedProjects);
        setFilteredProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects.");
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const results = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.header}>
        <h1>My Projects</h1>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <Link to="/client-project-requests" className={styles.addProjectButton}>
            <FaPlus /> New Request
          </Link>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className={styles.noProjects}>No projects found.</p>
      ) : (
        <ul className={styles.projectList}>
          {filteredProjects.map((project) => (
            <li key={project.id} className={styles.projectItem}>
              <div className={styles.projectLink}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectName} title={project.name}>
                    {project.name}
                  </h3>

                  <span
                    className={`${styles.status} ${
                      styles[project.status.toLowerCase().replace(/\s/g, "")]
                    }`}
                    data-status={project.status.toLowerCase()}
                  >
                    {project.status}
                  </span>

                  <span
                    className={`${styles.priority} ${
                      styles[project.priority.toLowerCase()]
                    }`}
                    title={`Priority: ${project.priority}`}
                  >
                    {project.priority}
                  </span>
                </div>

                <p className={styles.projectDescription}>
                  {project.description.length > 100
                    ? project.description.slice(0, 100) + "..."
                    : project.description}
                </p>

                <div className={styles.projectInfo}>
                  <span>
                    <strong>Deadline:</strong>{" "}
                    <span
                      className={
                        project.deadline !== "N/A" && new Date(project.deadline) < new Date()
                          ? styles.overdue
                          : styles.deadline
                      }
                    >
                      {project.deadline}
                    </span>
                  </span>

                  <span>
                    <strong>Team Size:</strong> {project.teamSize}
                  </span>
                </div>

                <div className={styles.overlay} onClick={() => handleViewDetails(project)}>
                  <p className={styles.overlayText}>View Details</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Projects;
