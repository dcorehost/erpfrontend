import React, { useState, useEffect } from "react";
import styles from "./ClientTasks.module.css";
import { 
  FaCheck, FaTimes, FaPlus, FaTrash, FaEdit, FaSearch, 
  FaFilter, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle 
} from "react-icons/fa";
import { format, parseISO, isBefore } from "date-fns";

const ClientTasks = () => {
  // Sample data with more realistic task properties
  const sampleTasks = [
    {
      _id: "1",
      title: "Review project contract",
      description: "Please review the attached contract and provide your feedback",
      completed: false,
      priority: "high",
      dueDate: "2023-06-15",
      assignedBy: "Project Manager",
      createdAt: "2023-05-20T10:00:00Z",
      attachments: ["contract.pdf"],
      comments: [
        {
          id: "c1",
          author: "Project Manager",
          text: "Please review by Friday",
          date: "2023-05-20T10:05:00Z"
        }
      ]
    },
    {
      _id: "2",
      title: "Approve design mockups",
      description: "Review and approve the UI/UX designs for the dashboard",
      completed: true,
      priority: "medium",
      dueDate: "2023-05-30",
      assignedBy: "Design Team",
      createdAt: "2023-05-15T14:30:00Z",
      attachments: ["designs.zip"],
      comments: []
    },
    {
      _id: "3",
      title: "Provide content for homepage",
      description: "We need the marketing content for the hero section",
      completed: false,
      priority: "high",
      dueDate: "2023-06-01",
      assignedBy: "Content Team",
      createdAt: "2023-05-18T09:15:00Z",
      attachments: [],
      comments: [
        {
          id: "c2",
          author: "Content Team",
          text: "Deadline is approaching",
          date: "2023-05-25T16:20:00Z"
        }
      ]
    },
    {
      _id: "4",
      title: "Schedule project kickoff meeting",
      description: "Please provide your availability for the kickoff meeting",
      completed: false,
      priority: "low",
      dueDate: "2023-06-10",
      assignedBy: "Project Coordinator",
      createdAt: "2023-05-22T11:45:00Z",
      attachments: ["meeting_agenda.docx"],
      comments: []
    }
  ];

  // State management
  const [tasks, setTasks] = useState(sampleTasks);
  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);
  const [newTask, setNewTask] = useState("");
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
    priority: "medium"
  });

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter === "completed") {
      result = result.filter(task => task.completed);
    } else if (filter === "pending") {
      result = result.filter(task => !task.completed);
    } else if (filter === "overdue") {
      result = result.filter(task => 
        !task.completed && task.dueDate && 
        isBefore(parseISO(task.dueDate), new Date())
      );
    } else if (filter === "highPriority") {
      result = result.filter(task => task.priority === "high");
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
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === "createdAt") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, filter, sortBy]);

  // Task operations
  const handleAddTask = () => {
    if (taskFormData.title.trim()) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const task = {
          _id: Date.now().toString(),
          title: taskFormData.title,
          description: taskFormData.description,
          completed: false,
          priority: taskFormData.priority,
          dueDate: taskFormData.dueDate || null,
          assignedBy: "You", // In a real app, this would be the logged in user
          createdAt: new Date().toISOString(),
          attachments: [],
          comments: []
        };
        setTasks([...tasks, task]);
        setTaskFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "medium"
        });
        setShowTaskForm(false);
        setLoading(false);
      }, 500);
    }
  };

  const handleToggleComplete = (id) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
      setLoading(false);
    }, 300);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setTasks(tasks.filter((task) => task._id !== id));
        if (selectedTask && selectedTask._id === id) {
          setSelectedTask(null);
        }
        setLoading(false);
      }, 300);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedTask) {
      const comment = {
        id: Date.now().toString(),
        author: "You",
        text: newComment,
        date: new Date().toISOString()
      };
      
      const updatedTasks = tasks.map(task => 
        task._id === selectedTask._id 
          ? { ...task, comments: [...task.comments, comment] }
          : task
      );
      
      setTasks(updatedTasks);
      setSelectedTask({
        ...selectedTask,
        comments: [...selectedTask.comments, comment]
      });
      setNewComment("");
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <span className={styles.highPriority}><FaExclamationTriangle /> High</span>;
      case "medium":
        return <span className={styles.mediumPriority}>Medium</span>;
      case "low":
        return <span className={styles.lowPriority}>Low</span>;
      default:
        return <span>Medium</span>;
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    
    const due = parseISO(dueDate);
    const today = new Date();
    
    if (isBefore(due, today)) {
      return <span className={styles.overdue}>Overdue</span>;
    }
    
    return <span className={styles.dueDate}>{format(due, "MMM dd, yyyy")}</span>;
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
            onClick={() => setShowTaskForm(true)}
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
          <h2>{filter === "all" ? "All Tasks" : 
               filter === "completed" ? "Completed Tasks" :
               filter === "pending" ? "Pending Tasks" :
               filter === "overdue" ? "Overdue Tasks" : "High Priority Tasks"} 
               ({filteredTasks.length})</h2>
          
          {filteredTasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks found matching your criteria.</p>
            </div>
          ) : (
            <ul className={styles.taskList}>
              {filteredTasks.map((task) => (
                <li 
                  key={task._id} 
                  className={`${styles.taskItem} ${selectedTask?._id === task._id ? styles.selected : ""}`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className={styles.taskHeader}>
                    <div className={styles.taskStatus}>
                      <button
                        className={`${styles.completeButton} ${task.completed ? styles.completed : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleComplete(task._id);
                        }}
                        disabled={loading}
                        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {task.completed ? <FaCheckCircle /> : <FaCheck />}
                      </button>
                      <span className={`${styles.taskTitle} ${task.completed ? styles.completed : ""}`}>
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
                    {task.description.substring(0, 100)}{task.description.length > 100 ? "..." : ""}
                  </div>
                  <div className={styles.taskFooter}>
                    <span className={styles.assignedBy}>Assigned by: {task.assignedBy}</span>
                    <span className={styles.createdAt}>
                      Created: {format(parseISO(task.createdAt), "MMM dd, yyyy")}
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
                        priority: selectedTask.priority
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
                  {selectedTask.completed ? 
                    <span className={styles.statusCompleted}>Completed</span> : 
                    <span className={styles.statusPending}>Pending</span>}
                </div>
                <div>
                  <strong>Priority:</strong> {getPriorityBadge(selectedTask.priority)}
                </div>
                {selectedTask.dueDate && (
                  <div>
                    <strong>Due Date:</strong> {getDueDateStatus(selectedTask.dueDate)}
                  </div>
                )}
                <div>
                  <strong>Assigned by:</strong> {selectedTask.assignedBy}
                </div>
                <div>
                  <strong>Created:</strong> {format(parseISO(selectedTask.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                </div>
              </div>
              
              <div className={styles.taskDescription}>
                <h3>Description</h3>
                <p>{selectedTask.description || "No description provided."}</p>
              </div>
              
              {selectedTask.attachments.length > 0 && (
                <div className={styles.taskAttachments}>
                  <h3>Attachments</h3>
                  <ul>
                    {selectedTask.attachments.map((file, index) => (
                      <li key={index}>
                        <a href={`#${file}`} onClick={(e) => e.preventDefault()}>
                          {file}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className={styles.taskComments}>
                <h3>Comments ({selectedTask.comments.length})</h3>
                {selectedTask.comments.length > 0 ? (
                  <ul className={styles.commentList}>
                    {selectedTask.comments.map((comment) => (
                      <li key={comment.id} className={styles.comment}>
                        <div className={styles.commentHeader}>
                          <strong>{comment.author}</strong>
                          <span className={styles.commentDate}>
                            {format(parseISO(comment.date), "MMM dd, yyyy 'at' h:mm a")}
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
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noTaskSelected}>
              <h2>Select a task to view details</h2>
              <p>Click on any task from the list to see its details, add comments, or edit the task.</p>
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
                  priority: "medium"
                });
              }}
            >
              &times;
            </button>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}>
              <div className={styles.formGroup}>
                <label>Task Title *</label>
                <input
                  type="text"
                  value={taskFormData.title}
                  onChange={(e) => setTaskFormData({
                    ...taskFormData,
                    title: e.target.value
                  })}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={taskFormData.description}
                  onChange={(e) => setTaskFormData({
                    ...taskFormData,
                    description: e.target.value
                  })}
                  rows={4}
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({
                      ...taskFormData,
                      dueDate: e.target.value
                    })}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select
                    value={taskFormData.priority}
                    onChange={(e) => setTaskFormData({
                      ...taskFormData,
                      priority: e.target.value
                    })}
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
                      priority: "medium"
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