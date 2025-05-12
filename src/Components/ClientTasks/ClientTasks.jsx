import React, { useState, useEffect } from "react";
import styles from "./ClientTasks.module.css";
import {
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { format, parseISO, isBefore } from "date-fns";
import Auth from "../Services/Auth";
import axios from "axios";

const ClientTasks = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // API CALL: Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = Auth.getToken();
      const response = await axios.get(
        "http://209.74.89.83/erpbackend/get-client-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Expecting data to be { data: [...] }
      if (Array.isArray(response.data.data)) {
        setTasks(response.data.data);
      } else {
        console.warn("Unexpected response structure:", response.data);
        setTasks([]); // fallback to prevent crashing
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API CALL: Create new task
  // API CALL: Create new task
const handleAddTask = async () => {
  if (taskFormData.title.trim()) {
    setLoading(true);
    try {
      const payload = {
        title: taskFormData.title,
        description: taskFormData.description,
        dueDate: taskFormData.dueDate || undefined,
        priority: taskFormData.priority,
        completed: false,
        assignedBy: "Admin", // ← Must match your backend expected field
        attachments: ["https://example.com/design.jpg"], // ← Optional default
      };

      const response = await fetch(
        "http://209.74.89.83/erpbackend/create-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to create task");

      const result = await response.json();
      setTasks([...tasks, result.data]);

      setTaskFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
      });
      setShowTaskForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
};

  // API CALL: Toggle task completion status
  const handleToggleComplete = async (id) => {
    setLoading(true);
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      if (!taskToUpdate) throw new Error("Task not found");

      const response = await fetch(
        `http://209.74.89.83/erpbackend/update-task-by-taskId?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`,
          },
          body: JSON.stringify({
            ...taskToUpdate,
            completed: !taskToUpdate.completed,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask(updatedTask);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API CALL: Delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://209.74.89.83/erpbackend/delete-task-by-taskId?id=${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete task");

        setTasks(tasks.filter((task) => task._id !== id));
        if (selectedTask && selectedTask._id === id) {
          setSelectedTask(null);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // API CALL: Add comment to task - UPDATED VERSION
// API CALL: Add comment to task - UPDATED VERSION
const handleAddComment = async (e) => {
  e?.preventDefault(); // ✅ Good practice to prevent default form submission

  if (!newComment.trim()) {
    setError("Please enter comment text");
    return;
  }

  // if (!selectedTask?._id) { // ✅ Robust check to ensure a task is selected
  //   setError("No task selected");
  //   return;
  // }

  setLoading(true);
  setError(null);

  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error("Please login to add comments");
    }

    const response = await fetch(
      `http://209.74.89.83/erpbackend/create-comment?id=${selectedTask._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
        // ✅ Double-check if your backend expects 'text'. It might be 'content' or something else.
      }
    );

    if (!response.ok) {
      // ✅ Important: Log the error response from the server for debugging
      const errorData = await response.json().catch(() => ({}));
      console.error("Add comment API error:", response.status, errorData);
      throw new Error(errorData.message || "Failed to add comment");
    }

    const { data: newCommentData } = await response.json();
    
    const updatedTasks = tasks.map(task =>
      task._id === selectedTask._id
        ? {
            ...task,
            comments: [...(task.comments || []), newCommentData]
            
          }
        : task
    );

    setTasks(updatedTasks);
    setSelectedTask(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newCommentData]
      // ✅ Same considerations as above for 'prev.comments'.
    }));

    setNewComment(""); 
  } catch (err) {
    console.error("Comment error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // API CALL: Update task
  const handleUpdateTask = async () => {
    if (taskFormData.title.trim() && selectedTask) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://209.74.89.83/erpbackend/update-task-by-taskId?id=${selectedTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify({
              ...selectedTask,
              title: taskFormData.title,
              description: taskFormData.description,
              dueDate: taskFormData.dueDate || undefined,
              priority: taskFormData.priority,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to update task");

        // Instead of using response.json() which may not return full task
        await fetchTasks(); // 🔁 Re-fetch full task list

        setShowTaskForm(false);
        setSelectedTask(null); // You could optionally find and set updated task
        setTaskFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "medium",
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === "completed") {
      result = result.filter((task) => task.completed);
    } else if (filter === "pending") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "overdue") {
      result = result.filter(
        (task) =>
          !task.completed &&
          task.dueDate &&
          isBefore(parseISO(task.dueDate), new Date())
      );
    } else if (filter === "highPriority") {
      result = result.filter((task) => task.priority === "high");
    }

    // Apply sorting
    if (sortBy === "dueDate") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      result.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (sortBy === "createdAt") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTasks(result);
  }, [tasks, searchTerm, filter, sortBy]);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className={styles.highPriority}>
            <FaExclamationTriangle /> High
          </span>
        );
      case "medium":
        return <span className={styles.mediumPriority}>Medium</span>;
      case "low":
        return <span className={styles.lowPriority}>Low</span>;
      default:
        return <span>Medium</span>;
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return <span className={styles.dueDate}>No due date</span>;

    try {
      const due = parseISO(dueDate);
      const today = new Date();

      if (isBefore(due, today)) {
        return <span className={styles.overdue}>Overdue</span>;
      }

      return (
        <span className={styles.dueDate}>{format(due, "MMM dd, yyyy")}</span>
      );
    } catch (e) {
      return <span className={styles.dueDate}>Invalid date</span>;
    }
  };

  return (
    <div className={styles.tasksDashboard}>
      <header className={styles.header}>
        <h1>My Tasks</h1>
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={styles.newTaskButton}
            onClick={() => {
              setShowTaskForm(true);
              setSelectedTask(null); // Clear selected task so form knows it's new
              setTaskFormData({
                title: "",
                description: "",
                dueDate: "",
                priority: "medium",
              });
            }}
          >
            <FaPlus /> New Task
          </button>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label>
            <FaFilter /> Filter:
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="highPriority">High Priority</option>
            </select>
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="createdAt">Recently Added</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.taskLayout}>
        <div className={styles.taskListContainer}>
          <h2>
            {filter === "all"
              ? "All Tasks"
              : filter === "completed"
              ? "Completed Tasks"
              : filter === "pending"
              ? "Pending Tasks"
              : filter === "overdue"
              ? "Overdue Tasks"
              : "High Priority Tasks"}
            ({filteredTasks.length})
          </h2>

          {filteredTasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks found matching your criteria.</p>
            </div>
          ) : (
            <ul className={styles.taskList}>
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className={`${styles.taskItem} ${
                    selectedTask?._id === task._id ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className={styles.taskHeader}>
                    <div className={styles.taskStatus}>
                      <button
                        className={`${styles.completeButton} ${
                          task.completed ? styles.completed : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleComplete(task._id);
                        }}
                        disabled={loading}
                        aria-label={
                          task.completed ? "Mark incomplete" : "Mark complete"
                        }
                      >
                        {task.completed ? <FaCheckCircle /> : <FaCheck />}
                      </button>
                      <span
                        className={`${styles.taskTitle} ${
                          task.completed ? styles.completed : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className={styles.taskMeta}>
                      {getPriorityBadge(task.priority)}
                      {task.dueDate && (
                        <span className={styles.dueDate}>
                          <FaCalendarAlt /> {getDueDateStatus(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.taskDescription}>
                    {task.description.substring(0, 100)}
                    {task.description.length > 100 ? "..." : ""}
                  </div>
                  <div className={styles.taskFooter}>
                    <span className={styles.assignedBy}>
                      Assigned by: {task.assignedBy}
                    </span>
                    <span className={styles.createdAt}>
                      Created:{" "}
                      {task.createdAt && !isNaN(Date.parse(task.createdAt))
                        ? format(parseISO(task.createdAt), "MMM dd, yyyy")
                        : "N/A"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.taskDetailContainer}>
          {selectedTask ? (
            <div className={styles.taskDetail}>
              <div className={styles.taskDetailHeader}>
                <h2>{selectedTask.title}</h2>
                <div className={styles.taskActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setTaskFormData({
                        title: selectedTask.title,
                        description: selectedTask.description,
                        dueDate: selectedTask.dueDate || "",
                        priority: selectedTask.priority,
                      });
                      setShowTaskForm(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(selectedTask._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              <div className={styles.taskMeta}>
                <div>
                  <strong>Status:</strong>
                  {selectedTask.completed ? (
                    <span className={styles.statusCompleted}>Completed</span>
                  ) : (
                    <span className={styles.statusPending}>Pending</span>
                  )}
                </div>
                <div>
                  <strong>Priority:</strong>{" "}
                  {getPriorityBadge(selectedTask.priority)}
                </div>
                {selectedTask.dueDate && (
                  <div>
                    <strong>Due Date:</strong>{" "}
                    {getDueDateStatus(selectedTask.dueDate)}
                  </div>
                )}
                <div>
                  <strong>Assigned by:</strong> {selectedTask.assignedBy}
                </div>
                <div>
                  <strong>Created:</strong>{" "}
                  {selectedTask.createdAt &&
                  !isNaN(Date.parse(selectedTask.createdAt))
                    ? format(
                        parseISO(selectedTask.createdAt),
                        "MMM dd, yyyy 'at' h:mm a"
                      )
                    : "N/A"}
                </div>
              </div>

              <div className={styles.taskDescription}>
                <h3>Description</h3>
                <p>{selectedTask.description || "No description provided."}</p>
              </div>

              {selectedTask.attachments &&
                selectedTask.attachments.length > 0 && (
                  <div className={styles.taskAttachments}>
                    <h3>Attachments</h3>
                    <ul>
                      {selectedTask.attachments.map((file, index) => (
                        <li key={index}>
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.split("/").pop()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className={styles.taskComments}>
                <h3>
                    Comments ({selectedTask.comments?.length || 0})
                    </h3>
                {selectedTask.comments && selectedTask.comments.length > 0 ? (
                  <ul className={styles.commentList}>
                    {selectedTask.comments.map((comment) => (
                      <li key={comment._id} className={styles.comment}>
                        <div className={styles.commentHeader}>
                          <strong>{comment.author || "Unknown"}</strong>
                          <span className={styles.commentDate}>
                            {comment.createdAt &&
                            !isNaN(Date.parse(comment.createdAt))
                              ? format(
                                  parseISO(comment.createdAt),
                                  "MMM dd, yyyy 'at' h:mm a"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className={styles.commentText}>{comment.text}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments yet.</p>
                )}

                <div className={styles.addComment}>
                <form onSubmit={handleAddComment}> {/* Added form wrapper */}
                  <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <button
                    className={styles.addCommentButton}
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
        {loading ? "Adding..." : "Add Comment"} {/* Added loading state */}
        </button>
        </form>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noTaskSelected}>
              <h2>Select a task to view details</h2>
              <p>
                Click on any task from the list to see its details, add
                comments, or edit the task.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.taskFormModal}>
            <h2>{taskFormData.title ? "Edit Task" : "Create New Task"}</h2>
            <button
              className={styles.closeModal}
              onClick={() => {
                setShowTaskForm(false);
                setTaskFormData({
                  title: "",
                  description: "",
                  dueDate: "",
                  priority: "medium",
                });
              }}
            >
              &times;
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                selectedTask ? handleUpdateTask() : handleAddTask();
              }}
            >
              <div className={styles.formGroup}>
                <label>Task Title *</label>
                <input
                  type="text"
                  value={taskFormData.title}
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={taskFormData.description}
                  onChange={(e) =>
                    setTaskFormData({
                      ...taskFormData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={taskFormData.dueDate}
                    onChange={(e) =>
                      setTaskFormData({
                        ...taskFormData,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select
                    value={taskFormData.priority}
                    onChange={(e) =>
                      setTaskFormData({
                        ...taskFormData,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowTaskForm(false);
                    setTaskFormData({
                      title: "",
                      description: "",
                      dueDate: "",
                      priority: "medium",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={!taskFormData.title.trim()}
                >
                  {taskFormData.title ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      {error && (
        <div className={styles.errorModal}>
          <div className={styles.errorContent}>
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTasks;
