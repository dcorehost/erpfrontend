// src/components/TaskAndProjectDetails.jsx
import React, { useState } from 'react';
import styles from './TaskAndProjectDetails.module.css';
import { FaChevronDown, FaChevronUp, FaCalendarAlt, FaTag } from 'react-icons/fa';

const TaskAndProjectDetails = () => {
  const [expandedTask, setExpandedTask] = useState(null);

  const project = {
    name: 'Website Redesign Project',
    description: 'Redesign the company website to improve user experience and modernize the design.',
    tasks: [
      {
        id: 1,
        title: 'Create Wireframes',
        description: 'Design wireframes for the homepage and inner pages.',
        status: 'In Progress',
        dueDate: '2023-10-15',
        progress: 60,
        priority: 'High',
      },
      {
        id: 2,
        title: 'Develop Homepage',
        description: 'Implement the homepage design using React and Tailwind CSS.',
        status: 'Not Started',
        dueDate: '2023-10-20',
        progress: 0,
        priority: 'Medium',
      },
      {
        id: 3,
        title: 'Test Responsiveness',
        description: 'Ensure the website is responsive on all devices.',
        status: 'Not Started',
        dueDate: '2023-10-25',
        progress: 0,
        priority: 'Low',
      },
    ],
  };

  const toggleTask = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Assigned Task & Project Details</h1>
      <div className={styles.projectDetails}>
        <h2 className={styles.projectTitle}>{project.name}</h2>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.taskList}>
          {project.tasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskHeader} onClick={() => toggleTask(task.id)}>
                <div className={styles.taskTitleWrapper}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <span className={styles.taskPriority}>
                    <FaTag /> {task.priority}
                  </span>
                </div>
                <div className={styles.taskActions}>
                  {expandedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {expandedTask === task.id && (
                <div className={styles.taskContent}>
                  <p className={styles.taskDescription}>{task.description}</p>
                  <div className={styles.taskMeta}>
                    <span className={styles.taskDueDate}>
                      <FaCalendarAlt /> Due: {task.dueDate}
                    </span>
                    <span className={styles.taskStatus}>Status: {task.status}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskAndProjectDetails;