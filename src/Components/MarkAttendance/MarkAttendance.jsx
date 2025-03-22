import React, { useState, useEffect } from "react";
import styles from "./MarkAttendance.module.css";

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: null,
    checkOutTime: null,
    location: null, // Location object to store address
    timer: 0, // Timer in seconds
    isTimerRunning: false, // To control the timer
  });

  const [timeSpent, setTimeSpent] = useState("00:00:00"); // Formatted time spent

  // Function to start the timer
  useEffect(() => {
    let interval;
    if (attendanceStatus.isTimerRunning) {
      interval = setInterval(() => {
        setAttendanceStatus((prevState) => ({
          ...prevState,
          timer: prevState.timer + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [attendanceStatus.isTimerRunning]);

  // Format the timer into HH:MM:SS
  useEffect(() => {
    const hours = Math.floor(attendanceStatus.timer / 3600);
    const minutes = Math.floor((attendanceStatus.timer % 3600) / 60);
    const seconds = attendanceStatus.timer % 60;
    setTimeSpent(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }, [attendanceStatus.timer]);

  // Function to fetch human-readable address using reverse geocoding
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use a reverse geocoding API to fetch the address
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            const address = data.results[0].formatted; // Get the formatted address
            setAttendanceStatus((prevState) => ({
              ...prevState,
              location: address,
            }));
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Unable to fetch your location address. Please try again.");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCheckIn = () => {
    getLocation(); // Fetch location before checking in
    const currentTime = new Date().toLocaleTimeString();
    setAttendanceStatus({
      ...attendanceStatus,
      checkedIn: true,
      checkInTime: currentTime,
      isTimerRunning: true, // Start the timer
    });
    alert("You have successfully checked in!");
  };

  const handleCheckOut = () => {
    getLocation(); // Fetch location before checking out
    const currentTime = new Date().toLocaleTimeString();
    setAttendanceStatus({
      ...attendanceStatus,
      checkedOut: true,
      checkOutTime: currentTime,
      isTimerRunning: false, // Stop the timer
    });
    alert("You have successfully checked out!");
  };

  return (
    <div className={styles.wrapper}>
      {/* Heading Outside the Container */}
      <h1 className={styles.title}>Mark Attendance</h1>

      {/* Main Container */}
      <div className={styles.container}>
        {/* Mark Attendance Section */}
        <div className={styles.markAttendanceSection}>
          <div className={styles.buttons}>
            {!attendanceStatus.checkedIn ? (
              <button
                className={`${styles.button} ${styles.checkInButton}`}
                onClick={handleCheckIn}
              >
                Check In
              </button>
            ) : (
              <p className={styles.checkedInMessage}>
                Checked in at: {attendanceStatus.checkInTime}
              </p>
            )}

            {attendanceStatus.checkedIn && !attendanceStatus.checkedOut && (
              <button
                className={`${styles.button} ${styles.checkOutButton}`}
                onClick={handleCheckOut}
              >
                Check Out
              </button>
            )}

            {attendanceStatus.checkedOut && (
              <p className={styles.checkedOutMessage}>
                Checked out at: {attendanceStatus.checkOutTime}
              </p>
            )}
          </div>

          <div className={styles.timer}>
            <p>
              <strong>Time Spent:</strong> {timeSpent}
            </p>
          </div>
        </div>

        {/* Today's Details Section */}
        <div className={styles.bottomSection}>
          <h3>Today's Details</h3>
          <div className={styles.details}>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            {attendanceStatus.location && (
              <p>
                <strong>Location:</strong> {attendanceStatus.location}
              </p>
            )}
            {attendanceStatus.checkedOut && (
              <p>
                <strong>Total Time Spent:</strong> {timeSpent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;