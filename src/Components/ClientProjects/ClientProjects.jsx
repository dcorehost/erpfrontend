import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ClientProjects.module.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import Auth from "../Services/Auth";
import { toast } from "react-toastify"; // ✅ make sure toast is configured in your app
import ProjectDetailsModal from "../ClientProjectDetails/ClientProjectDetails"; // ✅ Import the modal component

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // ✅ State to hold the selected project

  // ✅ Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      const token = Auth.getToken();

      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      try {
        const response = await fetch("http://209.74.89.83/erpbackend/get-client-projects", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();
        const fetchedProjects = result.data || [];

        // Map fetched data to required format (add id if not present)
        const formattedProjects = fetchedProjects.map((project, index) => ({
            id: project._id || index,
            name: project.name,
            status: project.status,
            progress: parseInt(project.progress) || 0,
            teamSize: project.teamSize,
            startDate: project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "N/A",
            endDate: project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "N/A",
            lastUpdated: project.updatedAt ? new Date(project.updatedAt).toISOString().split("T")[0] : "N/A"
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
    const results = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project); // ✅ Set the selected project to open the modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // ✅ Clear the selected project to close the modal
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
        <p className={styles.noProjects}>No projects found matching your search.</p>
      ) : (
        <ul className={styles.projectList}>
          {filteredProjects.map(project => (
            <li key={project.id} className={styles.projectItem}>
              <div className={styles.projectLink}> {/* ✅ Changed Link to div */}
                <div className={styles.projectName}>{project.name}</div>
                <div className={styles.projectDetails}>
                  <span className={styles.status} data-status={project.status.toLowerCase()}>
                    {project.status}
                  </span>
                  <div className={styles.progressBarContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${project.progress}%` }}
                    >
                      {project.progress}%
                    </div>
                  </div>
                  <span>Team Size: {project.teamSize}</span>
                  <span className={styles.lastUpdated}>Updated: {project.lastUpdated}</span>
                </div>
                <div className={styles.overlay} onClick={() => handleViewDetails(project)}> {/* ✅ Added onClick to the overlay */}
                  <p className={styles.overlayText}>View Details</p>
                </div>
                {/* Optional: Add a separate Link for navigating to a dedicated details page if needed */}
                {/* <Link to={`/client-project-details/${project.id}`} className={styles.viewDetailsPageLink}>
                  View Full Details
                </Link> */}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Render the modal if a project is selected */}
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Projects;
