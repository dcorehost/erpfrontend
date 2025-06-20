

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ownUserProfile.module.css";


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
  const [overTime, setOverTime] = useState(0); 
  const [overTimeRunning, setOverTimeRunning] = useState(false); 
  const [currentOverTime, setCurrentOverTime] = useState(0); 
  const [overtimeIntervalId, setOvertimeIntervalId] = useState(null); 
  const [lunchBreaks, setLunchBreaks] = useState([]); 
  const [remainingLunchTime, setRemainingLunchTime] = useState(1800); 
  const [lunchTimerRunning, setLunchTimerRunning] = useState(false); 
  const [currentLunchTime, setCurrentLunchTime] = useState(0); 
  const [intervalId, setIntervalId] = useState(null); 
  const [lastAttendanceDate, setLastAttendanceDate] = useState(null);
  const [salary, setSalary] = useState(0); 

  const officeEndTime = 18; 
  const dailySalary = 1000; 

  useEffect(() => {
    // Fetch attendance data from the backend
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance"); 
        const data = await response.json();
        setAttendance(data);

        // Get the last attendance date
        if (data.length > 0) {
          setLastAttendanceDate(data[data.length - 1].date); 
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Function to handle starting the overtime
  const handleOverTimeStart = () => {
    if (lunchTimerRunning) {
      setError("Lunch break is already running.");
      return;
    }

    setOverTimeRunning(true);
    setError(null); 
    const newOverTimeIntervalId = setInterval(() => {
      setCurrentOverTime((prevTime) => prevTime + 1); 
    }, 1000); 

    setOvertimeIntervalId(newOverTimeIntervalId); 
  };

  // Function to handle stopping the overtime
  const handleOverTimeStop = () => {
    if (!overTimeRunning) {
      setError("Overtime is not running.");
      return;
    }

    setOverTimeRunning(false);
    clearInterval(overtimeIntervalId); 
    setOverTime((prevTime) => prevTime + currentOverTime); 

    // Update overtime in the attendance table
    const updatedAttendance = attendance.map((entry) => {
      if (entry.date === lastAttendanceDate) {
        return {
          ...entry,
          overTime: convertToHHMMSS(currentOverTime),
        };
      }
      return entry;
    });

    setAttendance(updatedAttendance); 
    setCurrentOverTime(0); 
  };

  // Function to handle starting the lunch break
  const handleLunchStart = () => {
    if (remainingLunchTime <= 0) {
      setError("You have already started overtime.");
      return;
    }

    setLunchTimerRunning(true); 
    setError(null); // Clear error
    const newIntervalId = setInterval(() => {
      setCurrentLunchTime((prevTime) => {
        if (prevTime >= 1800) {
          clearInterval(newIntervalId);
          setLunchTimerRunning(false);
          return prevTime;
        }
        return prevTime + 1;
      });
    }, 1000); 

    setIntervalId(newIntervalId); 
  };

  // Function to handle stopping the lunch break and updating the remaining lunch time
  const handleLunchStop = () => {
    if (!lunchTimerRunning) {
      setError("No lunch break is currently running.");
      return;
    }

    setLunchTimerRunning(false); 
    clearInterval(intervalId); 

    // Add the current lunch time (in seconds) to the total lunch breaks
    setLunchBreaks((prevLunchBreaks) => [
      ...prevLunchBreaks,
      currentLunchTime,
    ]);

    // Calculate the total lunch time taken so far
    const totalLunchTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0) + currentLunchTime;
    const newRemainingLunchTime = Math.max(1800 - totalLunchTaken, 0); 
    setRemainingLunchTime(newRemainingLunchTime);

    // Update the lunch break data in the attendance table
    const updatedAttendance = attendance.map((entry) => {
      if (entry.date === lastAttendanceDate) {
        return {
          ...entry,
          remainingLunchTime: convertToHHMMSS(newRemainingLunchTime),
        };
      }
      return entry;
    });

    setAttendance(updatedAttendance); 

    setCurrentLunchTime(0); 
  };

  // Function to mark attendance
  const markAttendance = async () => {
    const currentDate = new Date().toLocaleDateString(); 

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
        const currentTimeStr = currentTime.toLocaleTimeString(); 
        const currentDateStr = currentTime.toLocaleDateString(); 

        const workStartTime = new Date();
        workStartTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0); 

        // Calculate the total work hours until 6 PM (end of office time)
        const workEndTime = new Date();
        workEndTime.setHours(officeEndTime, 0, 0, 0); 

        let workedSeconds = (workEndTime - workStartTime) / 1000; 

        // Subtract lunch duration if lunch break is taken
        const totalLunchTimeTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0);
        workedSeconds -= totalLunchTimeTaken; 

        // Calculate due work hours
        let dueSeconds = 0;
        if (workedSeconds < 28800) { 
          dueSeconds = 28800 - workedSeconds;
        }

        const newAttendance = {
          date: currentDateStr,
          time: currentTimeStr,
          status: "Present",
          location: `Lat: ${latitude}, Long: ${longitude}`,
          workedHours: convertToHHMMSS(workedSeconds), 
          dueWorkHours: convertToHHMMSS(dueSeconds), 
          totalLunchTimeUsed: convertToHHMMSS(totalLunchTimeTaken), 
          remainingLunchTime: convertToHHMMSS(remainingLunchTime), 
          overTime: "00:00:00", 
        };

        setAttendance((prev) => [...prev, newAttendance]);
        setLastAttendanceDate(currentDateStr); 
        setError(null);

        // Calculate the total salary by counting the present days
        const presentDays = attendance.filter((entry) => entry.status === "Present").length + 1;
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
              <th>Remaining Lunch Time</th>
              <th>Over Time</th>
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
                  <td>{entry.remainingLunchTime}</td>
                  <td>{entry.overTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No attendance data available.</td>
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
      </div>

      <div className={styles.overtimeSection}>
        <h2 className={styles.subHeading}>Overtime</h2>
        <button
          className={styles.overtimeButton}
          onClick={handleOverTimeStart}
          disabled={overTimeRunning}
        >
          Start Overtime
        </button>
        <button
          className={styles.overtimeStopButton}
          onClick={handleOverTimeStop}
          disabled={!overTimeRunning}
        >
          Stop Overtime
        </button>
        {overTimeRunning && (
          <p className={styles.overtimeTimer}>
            Overtime Running: {convertToHHMMSS(currentOverTime)}
          </p>
        )}
      </div>

      <div className={styles.salarySection}>
        <h2 className={styles.subHeading}>Salary</h2>
        <p className={styles.salaryInfo}>
          Salary based on attendance: 
          <span className={styles.amount}> ₹{salary} </span>
          (for {attendance.filter((entry) => entry.status === "Present").length} days present)
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







      
// import React, { useState, useEffect, useRef } from "react"; // Import useRef
// import { Link } from "react-router-dom";
// import styles from "./ownUserProfile.module.css";

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
//   const [overTime, setOverTime] = useState(0);
//   const [overTimeRunning, setOverTimeRunning] = useState(false);
//   const [currentOverTime, setCurrentOverTime] = useState(0);
//   const [overtimeIntervalId, setOvertimeIntervalId] = useState(null);
//   const [lunchBreaks, setLunchBreaks] = useState([]);
//   const [remainingLunchTime, setRemainingLunchTime] = useState(1800);
//   const [lunchTimerRunning, setLunchTimerRunning] = useState(false);
//   const [currentLunchTime, setCurrentLunchTime] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);
//   const [lastAttendanceDate, setLastAttendanceDate] = useState(null);
//   const [salary, setSalary] = useState(0);

//   // New state for profile image URL
//   const [profileImageUrl, setProfileImageUrl] = useState("https://via.placeholder.com/150"); // Default placeholder

//   const fileInputRef = useRef(null); // Ref for the hidden file input

//   const officeEndTime = 18;
//   const dailySalary = 1000;

//   useEffect(() => {
//     // Fetch attendance data from the backend
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch("/api/attendance");
//         const data = await response.json();
//         setAttendance(data);

//         // Get the last attendance date
//         if (data.length > 0) {
//           setLastAttendanceDate(data[data.length - 1].date);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       }
//     };

//     fetchAttendance();

//     // In a real application, you would also fetch the user's profile image URL here
//     // Example:
//     // const fetchUserProfile = async () => {
//     //   try {
//     //     const response = await fetch("/api/user/profile"); // Your API endpoint
//     //     const userData = await response.json();
//     //     if (userData.profilePhoto) {
//     //       setProfileImageUrl(userData.profilePhoto);
//     //     }
//     //   } catch (err) {
//     //     console.error("Error fetching user profile:", err);
//     //   }
//     // };
//     // fetchUserProfile();
//   }, []);

//   // Function to handle starting the overtime
//   const handleOverTimeStart = () => {
//     if (lunchTimerRunning) {
//       setError("Lunch break is already running.");
//       return;
//     }

//     setOverTimeRunning(true);
//     setError(null);
//     const newOverTimeIntervalId = setInterval(() => {
//       setCurrentOverTime((prevTime) => prevTime + 1);
//     }, 1000);

//     setOvertimeIntervalId(newOverTimeIntervalId);
//   };

//   // Function to handle stopping the overtime
//   const handleOverTimeStop = () => {
//     if (!overTimeRunning) {
//       setError("Overtime is not running.");
//       return;
//     }

//     setOverTimeRunning(false);
//     clearInterval(overtimeIntervalId);
//     setOverTime((prevTime) => prevTime + currentOverTime);

//     // Update overtime in the attendance table
//     const updatedAttendance = attendance.map((entry) => {
//       if (entry.date === lastAttendanceDate) {
//         return {
//           ...entry,
//           overTime: convertToHHMMSS(currentOverTime),
//         };
//       }
//       return entry;
//     });

//     setAttendance(updatedAttendance);
//     setCurrentOverTime(0);
//   };

//   // Function to handle starting the lunch break
//   const handleLunchStart = () => {
//     if (remainingLunchTime <= 0) {
//       setError("You have already started overtime.");
//       return;
//     }

//     setLunchTimerRunning(true);
//     setError(null); // Clear error
//     const newIntervalId = setInterval(() => {
//       setCurrentLunchTime((prevTime) => {
//         if (prevTime >= 1800) {
//           clearInterval(newIntervalId);
//           setLunchTimerRunning(false);
//           return prevTime;
//         }
//         return prevTime + 1;
//       });
//     }, 1000);

//     setIntervalId(newIntervalId);
//   };

//   // Function to handle stopping the lunch break and updating the remaining lunch time
//   const handleLunchStop = () => {
//     if (!lunchTimerRunning) {
//       setError("No lunch break is currently running.");
//       return;
//     }

//     setLunchTimerRunning(false);
//     clearInterval(intervalId);

//     // Add the current lunch time (in seconds) to the total lunch breaks
//     setLunchBreaks((prevLunchBreaks) => [
//       ...prevLunchBreaks,
//       currentLunchTime,
//     ]);

//     // Calculate the total lunch time taken so far
//     const totalLunchTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0) + currentLunchTime;
//     const newRemainingLunchTime = Math.max(1800 - totalLunchTaken, 0);
//     setRemainingLunchTime(newRemainingLunchTime);

//     // Update the lunch break data in the attendance table
//     const updatedAttendance = attendance.map((entry) => {
//       if (entry.date === lastAttendanceDate) {
//         return {
//           ...entry,
//           remainingLunchTime: convertToHHMMSS(newRemainingLunchTime),
//         };
//       }
//       return entry;
//     });

//     setAttendance(updatedAttendance);

//     setCurrentLunchTime(0);
//   };

//   // Function to mark attendance
//   const markAttendance = async () => {
//     const currentDate = new Date().toLocaleDateString();

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
//         const currentTimeStr = currentTime.toLocaleTimeString();
//         const currentDateStr = currentTime.toLocaleDateString();

//         const workStartTime = new Date();
//         workStartTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);

//         // Calculate the total work hours until 6 PM (end of office time)
//         const workEndTime = new Date();
//         workEndTime.setHours(officeEndTime, 0, 0, 0);

//         let workedSeconds = (workEndTime - workStartTime) / 1000;

//         // Subtract lunch duration if lunch break is taken
//         const totalLunchTimeTaken = lunchBreaks.reduce((total, breakTime) => total + breakTime, 0);
//         workedSeconds -= totalLunchTimeTaken;

//         // Calculate due work hours
//         let dueSeconds = 0;
//         if (workedSeconds < 28800) {
//           dueSeconds = 28800 - workedSeconds;
//         }

//         const newAttendance = {
//           date: currentDateStr,
//           time: currentTimeStr,
//           status: "Present",
//           location: `Lat: ${latitude}, Long: ${longitude}`,
//           workedHours: convertToHHMMSS(workedSeconds),
//           dueWorkHours: convertToHHMMSS(dueSeconds),
//           totalLunchTimeUsed: convertToHHMMSS(totalLunchTimeTaken),
//           remainingLunchTime: convertToHHMMSS(remainingLunchTime),
//           overTime: "00:00:00",
//         };

//         setAttendance((prev) => [...prev, newAttendance]);
//         setLastAttendanceDate(currentDateStr);
//         setError(null);

//         // Calculate the total salary by counting the present days
//         const presentDays = attendance.filter((entry) => entry.status === "Present").length + 1;
//         setSalary(presentDays * dailySalary);
//       },
//       (err) => {
//         setError("Unable to retrieve your location. Please try again.");
//       }
//     );
//   };

//   // Function to handle actual image file selection
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // In a real application, you would send this file to your backend
//       // Example using FormData and fetch/axios:
//       // const formData = new FormData();
//       // formData.append('profilePhoto', file);
//       // try {
//       //   const response = await fetch('/api/upload-profile-photo', {
//       //     method: 'POST',
//       //     body: formData,
//       //     headers: {
//       //       'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
//       //     },
//       //   });
//       //   const data = await response.json();
//       //   if (data.success && data.profilePhotoUrl) {
//       //     setProfileImageUrl(data.profilePhotoUrl);
//       //     // Potentially show a success message
//       //   } else {
//       //     // Handle error
//       //     console.error('Profile photo upload failed:', data.message);
//       //   }
//       // } catch (uploadError) {
//       //   console.error('Error uploading profile photo:', uploadError);
//       //   // Show user an error message
//       // }

//       // For demonstration: instantly update the image in the UI using FileReader
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImageUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to trigger the hidden file input
//   const handleEditProfilePhotoClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className={styles.userProfileContainer}>
//       <div className={styles.profileImageContainer}>
//         <img
//           src={profileImageUrl} 
//           alt="User Profile"
//           className={styles.profileImage}
//         />
//         {/* Hidden file input */}
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           accept="image/*" 
//         />
//         {/* Button to trigger the file input */}
//         <button
//           className={styles.editProfilePhotoButton} // Add a new style for this button
//           onClick={handleEditProfilePhotoClick}
//         >
//           <i className="fas fa-camera"></i> Change Photo
//         </button>
//       </div>
//       <h1 className={styles.heading}>User Profile</h1>

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
//       </div>

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
//               <th>Over Time</th>
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
//                   <td>{entry.remainingLunchTime}</td>
//                   <td>{entry.overTime}</td>
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

//       <div className={styles.overtimeSection}>
//         <h2 className={styles.subHeading}>Overtime</h2>
//         <button
//           className={styles.overtimeButton}
//           onClick={handleOverTimeStart}
//           disabled={overTimeRunning}
//         >
//           Start Overtime
//         </button>
//         <button
//           className={styles.overtimeStopButton}
//           onClick={handleOverTimeStop}
//           disabled={!overTimeRunning}
//         >
//           Stop Overtime
//         </button>
//         {overTimeRunning && (
//           <p className={styles.overtimeTimer}>
//             Overtime Running: {convertToHHMMSS(currentOverTime)}
//           </p>
//         )}
//       </div>

//       <div className={styles.salarySection}>
//         <h2 className={styles.subHeading}>Salary</h2>
//         <p className={styles.salaryInfo}>
//           Salary based on attendance:
//           <span className={styles.amount}> ₹{salary} </span>
//           (for {attendance.filter((entry) => entry.status === "Present").length} days present)
//         </p>
//       </div>

//       {/* The existing Edit Profile button will likely navigate to a dedicated edit page/modal */}
//       <Link to="/edit-profile" className={styles.editButton}>Edit Profile</Link>
//       <Link to="/logout" className={styles.logoutLink}>
//         Logout
//       </Link>
//     </div>
//   );
// };

// export default UserProfile;
