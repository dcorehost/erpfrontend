import React, { useState, useEffect } from "react";
import styles from "./TaskManager.module.css";

const TaskManager = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", userId: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users and tasks
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("/api/users"); // Replace with your API URL
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const tasksResponse = await fetch("/api/tasks"); // Replace with your API URL
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load users or tasks.");
      }
    };

    fetchData();
  }, []);

  const handleAssignTask = async () => {
    if (!newTask.name || !newTask.userId) {
      setError("Please provide a task name and select a user.");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Failed to assign task.");
      const task = await response.json();
      setTasks((prev) => [...prev, task]);
      setNewTask({ name: "", userId: "" });
    } catch (error) {
      console.error("Error assigning task:", error);
      setError("Failed to assign task.");
    }
  };

  return (
    <div className={styles.taskManagerContainer}>
      <h1 className={styles.heading}>Task Manager</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className={styles.input}
        />
        <select
          value={newTask.userId}
          onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
          className={styles.select}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={handleAssignTask} className={styles.assignButton}>
          Assign Task
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.taskList}>
        <h2>All Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} - Assigned to: {task.userName} - Status: {task.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./TaskManager.module.css";

// const TaskManager = () => {
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ name: "", userId: "" });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch users and tasks
//     const fetchData = async () => {
//       try {
//         const usersResponse = await axios.get("/api/users"); // Replace with your API URL
//         setUsers(usersResponse.data);

//         const tasksResponse = await axios.get("/api/tasks"); // Replace with your API URL
//         setTasks(tasksResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load users or tasks.");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAssignTask = async () => {
//     if (!newTask.name || !newTask.userId) {
//       setError("Please provide a task name and select a user.");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/tasks", newTask); // Replace with your API URL
//       const task = response.data;
//       setTasks((prev) => [...prev, task]);

//       // Update the user's profile to reflect the new task assignment
//       await axios.put(`/api/users/${newTask.userId}`, { taskId: task.id }); // Update user's task list

//       setNewTask({ name: "", userId: "" });
//     } catch (error) {
//       console.error("Error assigning task:", error);
//       setError("Failed to assign task.");
//     }
//   };

//   return (
//     <div className={styles.taskManagerContainer}>
//       <h1 className={styles.heading}>Task Manager</h1>
//       <div className={styles.form}>
//         <input
//           type="text"
//           placeholder="Task Name"
//           value={newTask.name}
//           onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
//           className={styles.input}
//         />
//         <select
//           value={newTask.userId}
//           onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
//           className={styles.select}
//         >
//           <option value="">Select User</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAssignTask} className={styles.assignButton}>
//           Assign Task
//         </button>
//       </div>
//       {error && <p className={styles.error}>{error}</p>}

//       <div className={styles.taskList}>
//         <h2>All Tasks</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id}>
//               {task.name} - Assigned to: {task.userName} - Status: {task.status}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TaskManager;
