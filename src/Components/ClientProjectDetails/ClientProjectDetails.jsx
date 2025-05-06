import React, { useEffect, useRef, useState } from "react";
import styles from "./ClientProjectDetails.module.css";
import { FaTimesCircle, FaUsers, FaCalendarAlt, FaSync, FaChartLine, FaTasks } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetailsModal = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setIsVisible(true);
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!project) return null;

  // Progress bar animation
  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${project.progress}%`, transition: { duration: 1 } }
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return '#007bff';
      case 'completed': return '#28a745';
      case 'on hold': return '#dc3545';
      case 'planning': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className={styles.modalContent}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button 
              className={styles.closeButton} 
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimesCircle />
            </button>

            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {project.name}
            </motion.h2>

            <div className={styles.detailsGrid}>
              <DetailItem 
                icon={<FaTasks />}
                label="Status"
                value={project.status}
                color={getStatusColor(project.status)}
                delay={0.2}
              />
              
              <DetailItem 
                icon={<FaChartLine />}
                label="Progress"
                value={
                  <div className={styles.progressContainer}>
                    <motion.div
                      className={styles.progressBar}
                      variants={progressBarVariants}
                      initial="initial"
                      animate="animate"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    />
                    <span className={styles.progressText}>{project.progress}%</span>
                  </div>
                }
                delay={0.3}
              />
              
              <DetailItem 
                icon={<FaUsers />}
                label="Team Size"
                value={project.teamSize}
                delay={0.4}
              />
              
              <DetailItem 
                icon={<FaCalendarAlt />}
                label="Start Date"
                value={project.startDate}
                delay={0.5}
              />
              
              <DetailItem 
                icon={<FaCalendarAlt />}
                label="End Date"
                value={project.endDate}
                delay={0.6}
              />
              
              <DetailItem 
                icon={<FaSync />}
                label="Last Updated"
                value={project.lastUpdated}
                delay={0.7}
              />
            </div>

            {project.description && (
              <motion.div
                className={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3>Project Description</h3>
                <p>{project.description}</p>
              </motion.div>
            )}

            <motion.div 
              className={styles.buttonGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <button className={styles.secondaryButton}>View Documents</button>
              <button className={styles.primaryButton}>Contact Team</button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DetailItem = ({ icon, label, value, color, delay }) => (
  <motion.div 
    className={styles.detailItem}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className={styles.detailIcon} style={{ color }}>
      {icon}
    </div>
    <div className={styles.detailContent}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue} style={{ color }}>
        {value}
      </span>
    </div>
  </motion.div>
);

export default ProjectDetailsModal;