
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";

// Utility function to convert seconds to HH:MM:SS format
const convertToHHMMSS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const UserProfile = () => {
  const [attendance, setAttendance] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lunchBreaks, setLunchBreaks] = useState([]); // Track lunch breaks in seconds
  const [remainingLunchTime, setRemainingLunchTime] = useState(1800); // 30 minutes = 1800 seconds
  const [lunchTimerRunning, setLunchTimerRunning] = useState(false); // Track if lunch timer is running
  const [currentLunchTime, setCurrentLunchTime] = useState(0); // Current lunch break time in seconds
  const [intervalId, setIntervalId] = useState(null); // To hold interval ID for stopping the timer
  const [lastAttendanceDate, setLastAttendanceDate] = useState(null); // Track the last marked attendance date
  const [salary, setSalary] = useState(0); // To track total salary

  // const [tasks, setTasks] = useState([]); // State for user tasks

  const officeEndTime = 18; // 6 PM in 24-hour format
  const dailySalary = 1000; // For example, assume the daily salary is 1000

  useEffect(() => {
    
    
    // Fetch attendance data from the backend
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance"); // Replace with your API URL
        const data = await response.json();
        setAttendance(data);

        // Get the last attendance date
        if (data.length > 0) {
          setLastAttendanceDate(data[data.length - 1].date); // Set the last attendance date
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Function to handle starting the lunch break
  const handleLunchStart = () => {
    if (remainingLunchTime <= 0) {
      setError("You have already used up your 30 minutes of lunch time.");
      return;
    }

    if (lunchTimerRunning) {
      setError("Lunch break is already running.");
      return;
    }

    setLunchTimerRunning(true); // Start the lunch break timer
    setError(null); // Clear error
    const newIntervalId = setInterval(() => {
      setCurrentLunchTime((prevTime) => {
        if (prevTime >= 1800) {
          clearInterval(newIntervalId);
          setLunchTimerRunning(false);
          return prevTime;
        }
        return prevTime + 1; // Increment time by 1 second
      });
    }, 1000); // Update every second

    setIntervalId(newIntervalId); // Save interval ID for clearing
  };

  // Function to handle stopping the lunch break
  const handleLunchStop = () => {
    if (!lunchTimerRunning) {
      setError("No lunch break is currently running.");
      return;
    }

    setLunchTimerRunning(false); // Stop the lunch break timer
    clearInterval(intervalId); // Clear the timer

    // Add the current lunch time (in seconds) to the total lunch breaks
    setLunchBreaks((prevLunchBreaks) => [
      ...prevLunchBreaks,
      currentLunchTime,
    ]);

    // Update remaining lunch time
    const totalLunchTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0) + currentLunchTime;
    const newRemainingLunchTime = Math.max(1800 - totalLunchTaken, 0); // Calculate remaining lunch time
    setRemainingLunchTime(newRemainingLunchTime);

    setCurrentLunchTime(0); // Reset the current lunch time after stopping
  };

  // Function to mark attendance
  const markAttendance = async () => {
    const currentDate = new Date().toLocaleDateString(); // Get the current date as a string

    // Check if the current date is different from the last attendance date
    if (currentDate === lastAttendanceDate) {
      setError("You have already marked attendance for today.");
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const currentTime = new Date();
        const currentTimeStr = currentTime.toLocaleTimeString(); // Get the current time
        const currentDateStr = currentTime.toLocaleDateString(); // Get current date

        const workStartTime = new Date();
        workStartTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0); // Set work start time

        // Calculate the total work hours until 6 PM (end of office time)
        const workEndTime = new Date();
        workEndTime.setHours(officeEndTime, 0, 0, 0); // Set office end time to 6 PM

        let workedSeconds = (workEndTime - workStartTime) / 1000; // Convert milliseconds to seconds

        // Subtract lunch duration if lunch break is taken
        const totalLunchTimeTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0);
        workedSeconds -= totalLunchTimeTaken; // Subtract lunch time from worked seconds

        // Calculate due work hours
        let dueSeconds = 0;
        if (workedSeconds < 28800) { // 8 hours = 28800 seconds
          dueSeconds = 28800 - workedSeconds;
        }

        const newAttendance = {
          date: currentDateStr,
          time: currentTimeStr,
          status: "Present",
          location: `Lat: ${latitude}, Long: ${longitude}`,
          workedHours: convertToHHMMSS(workedSeconds), // Display in HH:MM:SS format
          dueWorkHours: convertToHHMMSS(dueSeconds), // Display in HH:MM:SS format
          totalLunchTimeUsed: convertToHHMMSS(totalLunchTimeTaken), // Display lunch time in HH:MM:SS format
          remainingLunchTime: convertToHHMMSS(remainingLunchTime), // Display remaining lunch time in HH:MM:SS format
        };

        setAttendance((prev) => [...prev, newAttendance]);
        setLastAttendanceDate(currentDateStr); // Update the last attendance date
        setError(null);

        // Calculate the total salary by counting the present days
        const presentDays = attendance.filter((entry) => entry.status === "Present").length + 1; // +1 for the current day
        setSalary(presentDays * dailySalary);
      },
      (err) => {
        setError("Unable to retrieve your location. Please try again.");
      }
    );
  };

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.profileImageContainer}>
        <img
          src="https://via.placeholder.com/150"
          alt="User Profile"
          className={styles.profileImage}
        />
      </div>
      <h1 className={styles.heading}>User Profile</h1>

      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <label className={styles.label}>Name:</label>
          <span className={styles.value}>ABCDE </span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Email:</label>
          <span className={styles.value}>abc@example.com</span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Role:</label>
          <span className={styles.value}>Administrator</span>
        </div>
        <div className={styles.detailRow}>
          <label className={styles.label}>Designation:</label>
          <span className={styles.value}>Software Developer</span>
        </div>
      </div>

      <div className={styles.attendanceSheet}>
        <h2 className={styles.subHeading}>Attendance Sheet</h2>
        <button className={styles.markButton} onClick={markAttendance} disabled={error}>
          Mark Attendance
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Location</th>
              <th>Worked Hours</th>
              <th>Due Work Hours</th>
              {/* <th>Total Lunch Time Used</th> */}
              <th>Remaining Lunch Time</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.status}</td>
                  <td>{entry.location || "N/A"}</td>
                  <td>{entry.workedHours}</td>
                  <td>{entry.dueWorkHours}</td>
                  {/* <td>{convertToHHMMSS(currentLunchTime)}</td> */}
                  <td>{convertToHHMMSS(remainingLunchTime)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.lunchBreakSection}>
        <h2 className={styles.subHeading}>Lunch Break</h2>
        <button
          className={styles.lunchButton}
          onClick={handleLunchStart}
          disabled={lunchTimerRunning || remainingLunchTime <= 0}
        >
          Start Lunch Break
        </button>
        <button
          className={styles.stopButton}
          onClick={handleLunchStop}
          disabled={!lunchTimerRunning}
        >
          Stop Lunch Break
        </button>
        {lunchTimerRunning && (
        <p className={styles.lunchTimer}>
          Lunch Break Running: {convertToHHMMSS(currentLunchTime)} 
        </p>
          )}
        <p className={styles.lunchInfo}>
          {/* Remaining Lunch Time: {convertToHHMMSS(remainingLunchTime)}  */}
        </p>
      </div>

      <div className={styles.salarySection}>
        <h2 className={styles.subHeading}>Salary</h2>
        <p className={styles.salaryInfo}>
          Salary based on attendance: ₹{salary} (for {attendance.filter((entry) => entry.status === "Present").length} days present)
        </p>
      </div>

      <button className={styles.editButton}>Edit Profile</button>
      <Link to="/logout" className={styles.logoutLink}>
        Logout
      </Link>
    </div>
  );
};

export default UserProfile;



      

// //task management used
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "./UserProfile.module.css";

// // Utility function to convert seconds to HH:MM:SS format
// const convertToHHMMSS = (seconds) => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// };

// const UserProfile = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const [lunchBreaks, setLunchBreaks] = useState([]); // Track lunch breaks in seconds
//   const [remainingLunchTime, setRemainingLunchTime] = useState(1800); // 30 minutes = 1800 seconds
//   const [lunchTimerRunning, setLunchTimerRunning] = useState(false); // Track if lunch timer is running
//   const [currentLunchTime, setCurrentLunchTime] = useState(0); // Current lunch break time in seconds
//   const [intervalId, setIntervalId] = useState(null); // To hold interval ID for stopping the timer
//   const [lastAttendanceDate, setLastAttendanceDate] = useState(null); // Track the last marked attendance date
//   const [salary, setSalary] = useState(0); // To track total salary
//   const [user, setUser] = useState(null); // Store logged-in user details
//   const [tasks, setTasks] = useState([]); // Store tasks assigned to the user

//   // const [tasks, setTasks] = useState([]); // State for user tasks

//   const officeEndTime = 18; // 6 PM in 24-hour format
//   const dailySalary = 1000; // For example, assume the daily salary is 1000

//   useEffect(() => {
//     // Fetch logged-in user details
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("/api/user"); // Replace with your API URL
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Failed to load user data.");
//       }
//     };
  
//     // Fetch tasks assigned to the logged-in user
//     const fetchTasks = async () => {
//       if (!user?.id) return; // Only fetch tasks when user is available
  
//       try {
//         const response = await fetch("/api/tasks"); // Replace with your API URL
//         const tasksData = await response.json();
//         const userTasks = tasksData.filter((task) => task.userId === user.id);
//         setTasks(userTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError("Failed to load tasks.");
//       }
//     };
  
//     fetchUser();
//   }, []); // Fetch user details only once when component is mounted
  
//   useEffect(() => {
//     if (user?.id) {
//       fetchTasks(); // Refetch tasks when user is set
//     }
//   }, [user?.id]); // Dependency array will trigger fetchTasks when user ID changes
  
//   // Function to fetch attendance data
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch("/api/attendance"); // Replace with your API URL
//         const data = await response.json();
//         setAttendance(data);
  
//         if (data.length > 0) {
//           setLastAttendanceDate(data[data.length - 1].date); // Set the last attendance date
//         }
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       }
//     };
  
//     fetchAttendance();
//   }, []); // Fetch attendance data once when the component mounts
  
  

//   // Function to handle starting the lunch break
//   const handleLunchStart = () => {
//     if (remainingLunchTime <= 0) {
//       setError("You have already used up your 30 minutes of lunch time.");
//       return;
//     }

//     if (lunchTimerRunning) {
//       setError("Lunch break is already running.");
//       return;
//     }

//     setLunchTimerRunning(true); // Start the lunch break timer
//     setError(null); // Clear error
//     const newIntervalId = setInterval(() => {
//       setCurrentLunchTime((prevTime) => {
//         if (prevTime >= 1800) {
//           clearInterval(newIntervalId);
//           setLunchTimerRunning(false);
//           return prevTime;
//         }
//         return prevTime + 1; // Increment time by 1 second
//       });
//     }, 1000); // Update every second

//     setIntervalId(newIntervalId); // Save interval ID for clearing
//   };

//   // Function to handle stopping the lunch break
//   const handleLunchStop = () => {
//     if (!lunchTimerRunning) {
//       setError("No lunch break is currently running.");
//       return;
//     }

//     setLunchTimerRunning(false); // Stop the lunch break timer
//     clearInterval(intervalId); // Clear the timer

//     // Add the current lunch time (in seconds) to the total lunch breaks
//     setLunchBreaks((prevLunchBreaks) => [
//       ...prevLunchBreaks,
//       currentLunchTime,
//     ]);

//     // Update remaining lunch time
//     const totalLunchTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0) + currentLunchTime;
//     const newRemainingLunchTime = Math.max(1800 - totalLunchTaken, 0); // Calculate remaining lunch time
//     setRemainingLunchTime(newRemainingLunchTime);

//     setCurrentLunchTime(0); // Reset the current lunch time after stopping
//   };

//   // Function to mark attendance
//   const markAttendance = async () => {
//     const currentDate = new Date().toLocaleDateString(); // Get the current date as a string

//     // Check if the current date is different from the last attendance date
//     if (currentDate === lastAttendanceDate) {
//       setError("You have already marked attendance for today.");
//       return;
//     }

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         const currentTime = new Date();
//         const currentTimeStr = currentTime.toLocaleTimeString(); // Get the current time
//         const currentDateStr = currentTime.toLocaleDateString(); // Get current date

//         const workStartTime = new Date();
//         workStartTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0); // Set work start time

//         // Calculate the total work hours until 6 PM (end of office time)
//         const workEndTime = new Date();
//         workEndTime.setHours(officeEndTime, 0, 0, 0); // Set office end time to 6 PM

//         let workedSeconds = (workEndTime - workStartTime) / 1000; // Convert milliseconds to seconds

//         // Subtract lunch duration if lunch break is taken
//         const totalLunchTimeTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0);
//         workedSeconds -= totalLunchTimeTaken; // Subtract lunch time from worked seconds

//         // Calculate due work hours
//         let dueSeconds = 0;
//         if (workedSeconds < 28800) { // 8 hours = 28800 seconds
//           dueSeconds = 28800 - workedSeconds;
//         }

//         const newAttendance = {
//           date: currentDateStr,
//           time: currentTimeStr,
//           status: "Present",
//           location: `Lat: ${latitude}, Long: ${longitude}`,
//           workedHours: convertToHHMMSS(workedSeconds), // Display in HH:MM:SS format
//           dueWorkHours: convertToHHMMSS(dueSeconds), // Display in HH:MM:SS format
//           totalLunchTimeUsed: convertToHHMMSS(totalLunchTimeTaken), // Display lunch time in HH:MM:SS format
//           remainingLunchTime: convertToHHMMSS(remainingLunchTime), // Display remaining lunch time in HH:MM:SS format
//         };

//         setAttendance((prev) => [...prev, newAttendance]);
//         setLastAttendanceDate(currentDateStr); // Update the last attendance date
//         setError(null);

//         // Calculate the total salary by counting the present days
//         const presentDays = attendance.filter((entry) => entry.status === "Present").length + 1; // +1 for the current day
//         setSalary(presentDays * dailySalary);
//       },
//       (err) => {
//         setError("Unable to retrieve your location. Please try again.");
//       }
//     );
//   };

//   return (
//     <div className={styles.userProfileContainer}>
//       <div className={styles.profileImageContainer}>
//         <img
//           src={user?.image || "https://via.placeholder.com/150"}  // Fallback to placeholder if no image
//           alt="User Profile"
//           className={styles.profileImage}
//         />
//       </div>
//       {/* <div className={styles.profileImageContainer}>
//         <img
//           src="https://via.placeholder.com/150"
//           alt="User Profile"
//           className={styles.profileImage}
//         />
//       </div> */}
//       {/* <h1 className={styles.heading}>User Profile</h1>

//       <div className={styles.profileDetails}>
//         <div className={styles.detailRow}>
//           <label className={styles.label}>Name:</label>
//           <span className={styles.value}>ABCDE </span>
//         </div>
//         <div className={styles.detailRow}>
//           <label className={styles.label}>Email:</label>
//           <span className={styles.value}>abc@example.com</span>
//         </div>
//         <div className={styles.detailRow}>
//           <label className={styles.label}>Role:</label>
//           <span className={styles.value}>Administrator</span>
//         </div>
//         <div className={styles.detailRow}>
//           <label className={styles.label}>Designation:</label>
//           <span className={styles.value}>Software Developer</span>
//         </div>
//       </div> */}
//        {/* Profile Details Section */}
//        {user ? (
//         <div className={styles.profileDetails}>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Name:</label>
//             <span className={styles.value}>{user.name}</span>
//           </div>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Email:</label>
//             <span className={styles.value}>{user.email}</span>
//           </div>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Role:</label>
//             <span className={styles.value}>{user.role}</span>
//           </div>
//           <div className={styles.detailRow}>
//           <label className={styles.label}>Designation:</label>
//           <span className={styles.value}>{user.designation}</span>
//         </div>
//         </div>
//       ) : (
//         <p>Loading user details...</p>
//       )}

//       <div className={styles.attendanceSheet}>
//         <h2 className={styles.subHeading}>Attendance Sheet</h2>
//         <button className={styles.markButton} onClick={markAttendance} disabled={error}>
//           Mark Attendance
//         </button>
//         {error && <p className={styles.error}>{error}</p>}
//         <table className={styles.attendanceTable}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Location</th>
//               <th>Worked Hours</th>
//               <th>Due Work Hours</th>
//               {/* <th>Total Lunch Time Used</th> */}
//               <th>Remaining Lunch Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.length > 0 ? (
//               attendance.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.date}</td>
//                   <td>{entry.time}</td>
//                   <td>{entry.status}</td>
//                   <td>{entry.location || "N/A"}</td>
//                   <td>{entry.workedHours}</td>
//                   <td>{entry.dueWorkHours}</td>
//                   {/* <td>{convertToHHMMSS(currentLunchTime)}</td> */}
//                   <td>{convertToHHMMSS(remainingLunchTime)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8">No attendance data available.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className={styles.lunchBreakSection}>
//         <h2 className={styles.subHeading}>Lunch Break</h2>
//         <button
//           className={styles.lunchButton}
//           onClick={handleLunchStart}
//           disabled={lunchTimerRunning || remainingLunchTime <= 0}
//         >
//           Start Lunch Break
//         </button>
//         <button
//           className={styles.stopButton}
//           onClick={handleLunchStop}
//           disabled={!lunchTimerRunning}
//         >
//           Stop Lunch Break
//         </button>
//         {lunchTimerRunning && (
//         <p className={styles.lunchTimer}>
//           Lunch Break Running: {convertToHHMMSS(currentLunchTime)} 
//         </p>
//           )}
//         <p className={styles.lunchInfo}>
//           {/* Remaining Lunch Time: {convertToHHMMSS(remainingLunchTime)}  */}
//         </p>
//       </div>

//       <div className={styles.salarySection}>
//         <h2 className={styles.subHeading}>Salary</h2>
//         <p className={styles.salaryInfo}>
//           Salary based on attendance: ₹{salary} (for {attendance.filter((entry) => entry.status === "Present").length} days present)
//         </p>
//       </div>
//       {/* Tasks Section */}
//       <div className={styles.taskSection}>
//         <h2 className={styles.subHeading}>Assigned Tasks</h2>
//         {tasks.length > 0 ? (
//           <ul>
//             {tasks.map((task) => (
//               <li key={task.id}>
//                 <strong>{task.name}</strong> - Status: {task.status || "Pending"}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No tasks assigned.</p>
//         )}
//       </div>

//       {error && <p className={styles.error}>{error}</p>}

//       <button className={styles.editButton}>Edit Profile</button>
//       <Link to="/logout" className={styles.logoutLink}>
//         Logout
//       </Link>
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"; // Import Axios
// import styles from "./UserProfile.module.css";

// // Utility function to convert seconds to HH:MM:SS format
// const convertToHHMMSS = (seconds) => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// };

// const UserProfile = () => {
//   const [attendance, setAttendance] = useState([]); // Ensure it's an array
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const [lunchBreaks, setLunchBreaks] = useState([]); // Track lunch breaks in seconds
//   const [remainingLunchTime, setRemainingLunchTime] = useState(1800); // 30 minutes = 1800 seconds
//   const [lunchTimerRunning, setLunchTimerRunning] = useState(false); // Track if lunch timer is running
//   const [currentLunchTime, setCurrentLunchTime] = useState(0); // Current lunch break time in seconds
//   const [intervalId, setIntervalId] = useState(null); // To hold interval ID for stopping the timer
//   const [lastAttendanceDate, setLastAttendanceDate] = useState(null); // Track the last marked attendance date
//   const [salary, setSalary] = useState(0); // To track total salary
//   const [user, setUser] = useState(null); // Store logged-in user details
//   const [tasks, setTasks] = useState([]); // Store tasks assigned to the user

//   const officeEndTime = 18; // 6 PM in 24-hour format
//   const dailySalary = 1000; // For example, assume the daily salary is 1000

//   // Fetch user details using Axios
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("/api/user"); // Replace with your API URL
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Failed to load user data.");
//       }
//     };

//     // Fetch tasks assigned to the logged-in user using Axios
//     const fetchTasks = async () => {
//       if (!user?.id) return; // Only fetch tasks when user is available

//       try {
//         const response = await axios.get("/api/tasks"); // Replace with your API URL
//         const userTasks = response.data.filter((task) => task.userId === user.id);
//         setTasks(userTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError("Failed to load tasks.");
//       }
//     };

//     fetchUser();
//   }, []); // Fetch user details only once when component is mounted
  
//   useEffect(() => {
//     if (user?.id) {
//       fetchTasks(); // Refetch tasks when user is set
//     }
//   }, [user?.id]); // Dependency array will trigger fetchTasks when user ID changes

//   // Fetch attendance data using Axios
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get("/api/attendance"); // Replace with your API URL
//         console.log("Attendance data fetched:", response.data); // Log fetched data
//         if (Array.isArray(response.data)) {
//           setAttendance(response.data); // Only set if it's an array
//         } else {
//           console.error("Attendance data is not an array:", response.data);
//           setAttendance([]); // Default to an empty array if it's not an array
//         }

//         if (response.data && response.data.length > 0) {
//           setLastAttendanceDate(response.data[response.data.length - 1].date); // Set the last attendance date
//         }
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//         setAttendance([]); // Default to an empty array if there's an error
//       }
//     };

//     fetchAttendance();
//   }, []); // Fetch attendance data once when the component mounts

//   // Function to mark attendance
//   const markAttendance = async () => {
//     const currentDate = new Date().toLocaleDateString(); // Get the current date as a string

//     // Check if the current date is different from the last attendance date
//     if (currentDate === lastAttendanceDate) {
//       setError("You have already marked attendance for today.");
//       return;
//     }

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         const currentTime = new Date();
//         const currentTimeStr = currentTime.toLocaleTimeString(); // Get the current time
//         const currentDateStr = currentTime.toLocaleDateString(); // Get current date

//         const workStartTime = new Date();
//         workStartTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0); // Set work start time

//         // Calculate the total work hours until 6 PM (end of office time)
//         const workEndTime = new Date();
//         workEndTime.setHours(officeEndTime, 0, 0, 0); // Set office end time to 6 PM

//         let workedSeconds = (workEndTime - workStartTime) / 1000; // Convert milliseconds to seconds

//         // Subtract lunch duration if lunch break is taken
//         const totalLunchTimeTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0);
//         workedSeconds -= totalLunchTimeTaken; // Subtract lunch time from worked seconds

//         // Calculate due work hours
//         let dueSeconds = 0;
//         if (workedSeconds < 28800) { // 8 hours = 28800 seconds
//           dueSeconds = 28800 - workedSeconds;
//         }

//         const newAttendance = {
//           date: currentDateStr,
//           time: currentTimeStr,
//           status: "Present",
//           location: `Lat: ${latitude}, Long: ${longitude}`,
//           workedHours: convertToHHMMSS(workedSeconds), // Display in HH:MM:SS format
//           dueWorkHours: convertToHHMMSS(dueSeconds), // Display in HH:MM:SS format
//           totalLunchTimeUsed: convertToHHMMSS(totalLunchTimeTaken), // Display lunch time in HH:MM:SS format
//           remainingLunchTime: convertToHHMMSS(remainingLunchTime), // Display remaining lunch time in HH:MM:SS format
//         };

//         // Using functional setState to make sure we're using the latest attendance data
//         setAttendance((prevAttendance) => {
//           const updatedAttendance = [...prevAttendance, newAttendance];
//           const presentDays = updatedAttendance.filter((entry) => entry.status === "Present").length;
//           setSalary(presentDays * dailySalary);
//           return updatedAttendance;
//         });

//         setLastAttendanceDate(currentDateStr); // Update the last attendance date
//         setError(null);
//       },
//       (err) => {
//         setError("Unable to retrieve your location. Please try again.");
//       }
//     );
//   };

//   // Start lunch timer
//   const handleLunchStart = () => {
//     if (lunchTimerRunning || remainingLunchTime <= 0) return; // Prevent starting if timer is already running or lunch time is over

//     setLunchTimerRunning(true);

//     const interval = setInterval(() => {
//       setCurrentLunchTime((prev) => {
//         if (prev + 1 >= 1800) { // Stop when 30 minutes is reached
//           clearInterval(interval);
//           setLunchTimerRunning(false);
//           return 1800; // Ensure it doesn't exceed 1800 seconds
//         }
//         return prev + 1;
//       });
//     }, 1000); // Update every second

//     setIntervalId(interval); // Save the interval ID to clear it later
//   };

//   // Stop lunch timer
//   const handleLunchStop = () => {
//     if (!lunchTimerRunning) return; // If no timer is running, do nothing

//     clearInterval(intervalId); // Clear the interval
//     setLunchTimerRunning(false);
//     setRemainingLunchTime((prev) => Math.max(0, prev - currentLunchTime)); // Deduct the lunch time used
//     setCurrentLunchTime(0); // Reset lunch timer
//   };

//   return (
//     <div className={styles.userProfileContainer}>
//       <div className={styles.profileImageContainer}>
//         <img
//           src={user?.image || "https://via.placeholder.com/150"}  // Fallback to placeholder if no image
//           alt="User Profile"
//           className={styles.profileImage}
//         />
//       </div>
      
//       {/* Profile Details Section */}
//       {user ? (
//         <div className={styles.profileDetails}>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Name:</label>
//             <span className={styles.value}>{user.name}</span>
//           </div>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Email:</label>
//             <span className={styles.value}>{user.email}</span>
//           </div>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Role:</label>
//             <span className={styles.value}>{user.role}</span>
//           </div>
//           <div className={styles.detailRow}>
//             <label className={styles.label}>Designation:</label>
//             <span className={styles.value}>{user.designation}</span>
//           </div>
//         </div>
//       ) : (
//         <p>Loading user details...</p>
//       )}

//       {/* Attendance Sheet */}
//       <div className={styles.attendanceSheet}>
//         <h2 className={styles.subHeading}>Attendance Sheet</h2>
//         <button className={styles.markButton} onClick={markAttendance} disabled={error}>
//           Mark Attendance
//         </button>
//         {error && <p className={styles.error}>{error}</p>}
//         <table className={styles.attendanceTable}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Location</th>
//               <th>Worked Hours</th>
//               <th>Due Work Hours</th>
//               <th>Remaining Lunch Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Ensure attendance is an array before filtering */}
//             {Array.isArray(attendance) && attendance.length > 0 ? (
//               attendance.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.date}</td>
//                   <td>{entry.time}</td>
//                   <td>{entry.status}</td>
//                   <td>{entry.location || "N/A"}</td>
//                   <td>{entry.workedHours}</td>
//                   <td>{entry.dueWorkHours}</td>
//                   <td>{convertToHHMMSS(remainingLunchTime)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No attendance data available.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Lunch Break Section */}
//       <div className={styles.lunchBreakSection}>
//         <h2 className={styles.subHeading}>Lunch Break</h2>
//         <button
//           className={styles.lunchButton}
//           onClick={handleLunchStart}
//           disabled={lunchTimerRunning || remainingLunchTime <= 0}
//         >
//           Start Lunch Break
//         </button>
//         <button
//           className={styles.stopButton}
//           onClick={handleLunchStop}
//           disabled={!lunchTimerRunning}
//         >
//           Stop Lunch Break
//         </button>

//         {lunchTimerRunning && (
//           <p className={styles.lunchTimer}>
//             Lunch Break Running: {convertToHHMMSS(currentLunchTime)} 
//           </p>
//         )}
//       </div>

//       {/* Salary Section */}
//       <div className={styles.salarySection}>
//         <h2 className={styles.subHeading}>Salary</h2>
//         <p className={styles.salaryInfo}>
//           Salary based on attendance: ₹{salary} (for {attendance.filter((entry) => entry.status === "Present").length} days)
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;














