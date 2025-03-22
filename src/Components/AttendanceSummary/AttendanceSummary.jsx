import React, { useState, useEffect } from "react";
import styles from "./AttendanceSummary.module.css";

const AttendanceSummary = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filter, setFilter] = useState("daily"); // daily, weekly, monthly

  // Fetch attendance records from the backend
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(`/api/attendance?filter=${filter}`);
        const data = await response.json();
        if (response.ok) {
          setAttendanceRecords(data);
        } else {
          console.error("Error fetching attendance records:", data.message);
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, [filter]);

  // Format time spent from seconds to HH:MM:SS
  const formatTimeSpent = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className={styles.wrapper}>
    <h1 className={styles.title}>Attendance Summary</h1>

    <div className={styles.container}>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${filter === "daily" ? styles.active : ""}`}
          onClick={() => setFilter("daily")}
        >
          Daily
        </button>
        <button
          className={`${styles.filterButton} ${filter === "weekly" ? styles.active : ""}`}
          onClick={() => setFilter("weekly")}
        >
          Weekly
        </button>
        <button
          className={`${styles.filterButton} ${filter === "monthly" ? styles.active : ""}`}
          onClick={() => setFilter("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* Attendance Records Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Time Spent</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.checkInStatus).toLocaleDateString()}</td>
                <td>{new Date(record.checkInStatus).toLocaleTimeString()}</td>
                <td>
                  {record.checkOutStatus
                    ? new Date(record.checkOutStatus).toLocaleTimeString()
                    : "N/A"}
                </td>
                <td>{formatTimeSpent(record.timeSpent || 0)}</td>
                <td>{record.location || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AttendanceSummary;