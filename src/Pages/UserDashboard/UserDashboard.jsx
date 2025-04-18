import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Auth from "../../Components/Services/Auth";

const getDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isSameDate = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  // Set time to midnight for both dates to only compare the date portion
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  return date1.getTime() === date2.getTime();
};

const UserDashboard = () => {
  const [attendance, setAttendance] = useState(null);
  const [tasks, setTasks] = useState([]); // State for tasks
  const [leaves, setLeaves] = useState(null);
  const [payroll, setPayroll] = useState(null); // ✅ New state

  useEffect(() => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch attendance data
    axios
      .get("http://209.74.89.83/erpbackend/get-daily-report", { headers })
      .then((res) => {
        if (res.data?.report?.length > 0) {
          setAttendance(res.data.report[0]);
        }
      })
      .catch((err) => {
        console.error("Attendance Error:", err);
        toast.error("Failed to fetch attendance data.");
      });

    // Fetch leave summary data
    axios
      .get("http://209.74.89.83/erpbackend/get-user-leaves", { headers })
      .then((res) => {
        setLeaves(res.data.users?.leaveBalance);
      })
      .catch((err) => {
        console.error("Leave Summary Error:", err);
        toast.error("Failed to fetch leave summary.");
      });

    //fetch payroll
    axios
      .get("http://209.74.89.83/erpbackend/get-user-previous-payroll", {
        headers,
      })
      .then((res) => {
        if (res.data?.user?.payroll) {
          setPayroll(res.data.user.payroll);
        }
      })
      .catch((err) => {
        console.error("Payroll Error:", err);
        toast.error("Failed to fetch payroll data.");
      });

    axios
      .get("http://209.74.89.83/erpbackend/get-dailyTask-createdBy-admin", {
        headers,
      })
      .then((res) => {
        const user = res.data?.users?.[0];
        if (user?.adminTasks?.length > 0) {
          setTasks(user.adminTasks);
        }
      })
      .catch((err) => {
        console.error("Tasks Error:", err);
        toast.error("Failed to fetch tasks.");
      });
  }, []);

  const formatTime = (timeStr) => {
    return timeStr
      ? new Date(timeStr).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const dateObj = new Date(dateStr);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date} ${time}`;
  };

  const today = new Date();
  const todayStr = getDateString(today);

  const todayTasks = tasks.filter((task) =>
    isSameDate(new Date(task.createdAt), today)
  );

  const previousPendingTasks = tasks.filter(
    (task) => !isSameDate(new Date(task.createdAt), today)
  );

  // Group previous tasks by date
  const groupedPreviousTasks = previousPendingTasks.reduce((acc, task) => {
    const date = new Date(task.deadline).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  return (
    <div className={styles.dashboardContainer}>
      <motion.h1
        className={styles.heading}
        animate={{ x: [-100, 0, 100, 0] }} // moves left → center → right → center
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        Welcome, {attendance?.displayName || "John Doe"} 👋
      </motion.h1>

      <div className={styles.gridContainer}>
        {/* Attendance */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Today’s Attendance</h2>
          <div className={styles.infoRow}>
            <span>Status:</span>
            <span
              className={`${styles.status} ${
                attendance?.status === "Present" ? styles.present : ""
              }`}
            >
              {attendance?.status || "—"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Check-in:</span>
            <span>
              {attendance?.checkInStatus
                ? formatDate(attendance?.checkInStatus) // Only format the full date with time
                : "—"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Check-out:</span>
            <span>
              {attendance?.checkOutStatus
                ? formatDate(attendance?.checkOutStatus) // Only format the full date with time
                : "—"}
            </span>
          </div>
          <a href="/mark-attendance" className={styles.linkButton}>
            Mark Attendance
          </a>
        </motion.div>

        {/* Tasks */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
        <h3 style={{fontSize:"1rem" }}>Today's Tasks</h3>
          <ul className={styles.taskList}>
            {todayTasks.length > 0 ? (
              todayTasks.map((task, index) => (
                <li key={index}>• {task.taskName}</li>
              ))
            ) : (
              <li style={{ marginBottom: "10px" }}>No tasks due today</li>
            )}
          </ul>

          <h3 style={{ marginTop: "1rem",fontSize:"1rem" }}>Previous Pending Tasks</h3>
          {Object.keys(groupedPreviousTasks).length > 0 ? (
            Object.entries(groupedPreviousTasks).map(
              ([date, tasksForDate], idx) => (
                <div key={idx}>
                  <strong>{date}</strong>
                  <ul className={styles.taskList}>
                    {tasksForDate.map((task, index) => (
                      <li key={index}>• {task.taskName}</li>
                    ))}
                  </ul>
                </div>
              )
            )
          ) : (
            <p>No pending tasks from previous days.</p>
          )}

          <p className={styles.subtext}>
            {todayTasks.length} task{todayTasks.length === 1 ? "" : "s"} due
            today
          </p>
          <a href="/task-list" className={styles.linkButton}>
            View All Tasks
          </a>
        </motion.div>

        {/* Leave Summary */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Leave Summary</h2>
          <div className={styles.infoRow}>
            <span>Casual Available:</span>
            <span>{leaves?.casualLeaves?.available ?? "—"} Days</span>
          </div>
          <div className={styles.infoRow}>
            <span>Casual Used:</span>
            <span>{leaves?.casualLeaves?.booked ?? "—"} Days</span>
          </div>
          <div className={styles.infoRow}>
            <span>Sick Available:</span>
            <span>{leaves?.sickLeaves?.available ?? "—"} Days</span>
          </div>
          <div className={styles.infoRow}>
            <span>Sick Used:</span>
            <span>{leaves?.sickLeaves?.booked ?? "—"} Days</span>
          </div>
          <a href="/leave-summary" className={styles.linkButton}>
            Request Leave
          </a>
        </motion.div>

        {/* Payroll Info */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Payroll Info</h2>
          <div className={styles.infoRow}>
            <span>Month:</span>
            <span>
              {payroll?.month ?? "—"} {payroll?.year ?? ""}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Gross Salary:</span>
            <span>₹{payroll?.grossSalary?.toLocaleString() ?? "—"}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Deductions:</span>
            <span>₹{payroll?.deductions?.toLocaleString() ?? "—"}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Net Salary:</span>
            <span className={styles.credited}>
              ₹{payroll?.netSalary?.toLocaleString() ?? "—"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Credited On:</span>
            <span>{formatDate(payroll?.createdAt)}</span>
          </div>
          <a href="#" className={styles.linkButton}>
            View Payslip
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
