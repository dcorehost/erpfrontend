import React, { useEffect, useRef, useState } from "react";
import styles from "./ClientProjectDetails.module.css"; // ✅ Reused same CSS
import { FaTimesCircle, FaUserCheck, FaFlag, FaClock, FaInfoCircle, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Renamed project to task
const TaskDetailsModal = ({ task, onClose }) => {
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
    setTimeout(onClose, 300);
  };

  if (!task) return null;

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${task.progress}%`, transition: { duration: 1 } },
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "#007bff";
      case "completed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "overdue":
        return "#dc3545";
      default:
        return "#6c757d";
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
              {task.title} {/* ✅ Changed from project.name */}
            </motion.h2>

            <div className={styles.detailsGrid}>
              <DetailItem
                icon={<FaUserCheck />}
                label="Assigned To"
                value={task.assignedTo}
                delay={0.2}
              />

              <DetailItem
                icon={<FaFlag />}
                label="Priority"
                value={task.priority}
                delay={0.3}
              />

              <DetailItem
                icon={<FaClock />}
                label="Deadline"
                value={task.deadline}
                delay={0.4}
              />

              <DetailItem
                icon={<FaInfoCircle />}
                label="Status"
                value={task.status}
                color={getStatusColor(task.status)}
                delay={0.5}
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
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    />
                    <span className={styles.progressText}>{task.progress}%</span>
                  </div>
                }
                delay={0.6}
              />
            </div>

            {task.description && (
              <motion.div
                className={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3>Task Description</h3>
                <p>{task.description}</p>
              </motion.div>
            )}

            <motion.div
              className={styles.buttonGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button className={styles.secondaryButton}>Add Comments</button>
              <button className={styles.primaryButton}>Mark as Done</button>
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
      <span className={styles.detailValue} style={{ color }}>{value}</span>
    </div>
  </motion.div>
);

export default TaskDetailsModal;
