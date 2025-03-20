import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from "./TaskManagement.module.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  const projects = ['Project A', 'Project B', 'Project C']; // Example projects

  // Add a new task
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      dueDate: taskDueDate,
      project: taskProject,
      priority: taskPriority,
    };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus('To Do');
    setTaskDueDate('');
    setTaskProject('');
    setTaskPriority('Low');
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Handle drag-and-drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [removedTask] = updatedTasks.splice(result.source.index, 1);
    removedTask.status = result.destination.droppableId; // Update the task's status
    updatedTasks.splice(result.destination.index, 0, removedTask);
    setTasks(updatedTasks);
  };

  // Filter tasks by their status
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className={styles.app}>
      <h1>Task Management</h1>
      <div className={styles.taskForm}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <select value={taskProject} onChange={(e) => setTaskProject(e.target.value)}>
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Submitted for Review">Submitted for Review</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columns}>
          {['To Do', 'In Progress', 'Submitted for Review', 'Done'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className={styles.column}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{status}</h2>
                  <ul className={styles.taskList}>
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <li
                            className={`${styles.task} ${styles[task.status.toLowerCase().replace(" ", "-")]}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Project: {task.project}</p>
                            <p>Priority: {task.priority}</p>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
    