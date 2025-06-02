import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import Auth from "../Services/Auth";
import styles from "./UserTaskList.module.css";

const UserTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const token = Auth.getToken();

      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-task-createdBy-admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page,
            limit: itemsPerPage,
          },
        }
      );

      if (!response.data?.users) {
        throw new Error("Invalid response format");
      }

      // Transform the data to flatten adminTasks
      const allTasks = response.data.users.flatMap(
        (user) =>
          user.adminTasks?.map((task) => ({
            ...task,
            employeeId: user.employeeId,
          })) || []
      );

      // Calculate total pages based on total count from API
      const totalCount = response.data.totalCount || allTasks.length;
      const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);

      setTasks(allTasks);
      setTotalPages(calculatedTotalPages);
      setCurrentPage(page);

      if (allTasks.length === 0) {
        setError("No tasks found");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch tasks"
      );
      if (err.response?.status === 401) {
        Auth.logout();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchTasks(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`${styles.pageButton} ${
            1 === currentPage ? styles.activePage : ""
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    // Show visible pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${
            i === currentPage ? styles.activePage : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`${styles.pageButton} ${
            totalPages === currentPage ? styles.activePage : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
          aria-label="Previous page"
        >
          <FiChevronLeft />
        </button>

        <div className={styles.pageNumbers}>{pageNumbers}</div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
          aria-label="Next page"
        >
          <FiChevronRight />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            {error === "No tasks found" ? (
              <>
                <p>No tasks have been created yet.</p>
                <p>When admin creates tasks, they will appear here.</p>
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
          <button
            onClick={() => fetchTasks(currentPage)}
            className={styles.retryButton}
          >
            <FiRefreshCw className={styles.refreshIcon} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Assigned Tasks List</h2>
        <div className={styles.controls}>
          <span className={styles.taskCount}>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, tasks.length)} of{" "}
            {totalPages * itemsPerPage} tasks
          </span>
          <button
            onClick={() => fetchTasks(currentPage)}
            className={styles.refreshButton}
            title="Refresh tasks"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Project</th>
              <th>Task</th>
              <th>Sub Task</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Est. Time</th>
              <th>Notes</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={`${task.employeeId}-${index}`}>
                <td>{task.employeeId || "N/A"}</td>
                <td>{task.projectName || "N/A"}</td>
                <td>{task.taskName || "N/A"}</td>
                <td>{task.subTask || "N/A"}</td>
                <td className={styles.descriptionCell}>
                  {task.description || "N/A"}
                </td>
                <td>
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`${
                      styles.priority
                    } ${task.priority?.toLowerCase()}`}
                  >
                    {task.priority || "Medium"}
                  </span>
                </td>
                <td>{task.estimatedTime || "N/A"}</td>
                <td className={styles.notesCell}>
                  {task.additionalNotes || "N/A"}
                </td>
                <td>{new Date(task.createdAt).toLocaleString()}</td>
                <td>{new Date(task.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default UserTaskList;
