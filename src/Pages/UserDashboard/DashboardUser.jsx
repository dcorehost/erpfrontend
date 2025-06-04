// import React, { useEffect, useState } from "react";
// import styles from "./DashboardUser.module.css";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Auth from "../../Components/Services/Auth";

// const getDateString = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const isSameDate = (d1, d2) => {
//   const date1 = new Date(d1);
//   const date2 = new Date(d2);

//   // Set time to midnight for both dates to only compare the date portion
//   date1.setHours(0, 0, 0, 0);
//   date2.setHours(0, 0, 0, 0);

//   return date1.getTime() === date2.getTime();
// };

// const UserDashboard = () => {
//   const [attendance, setAttendance] = useState(null);
//   const [tasks, setTasks] = useState([]); // State for tasks
//   const [leaves, setLeaves] = useState(null);
//   const [payroll, setPayroll] = useState(null); // ✅ New state

//   useEffect(() => {
//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User not authenticated.");
//       return;
//     }

//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     // Fetch attendance data
//     axios
//       .get("http://209.74.89.83/erpbackend/get-daily-report", { headers })
//       .then((res) => {
//         if (res.data?.report?.length > 0) {
//           setAttendance(res.data.report[0]);
//         }
//       })
//       .catch((err) => {
//         console.error("Attendance Error:", err);
//         toast.error("Failed to fetch attendance data.");
//       });

//     // Fetch leave summary data
//     axios
//       .get("http://209.74.89.83/erpbackend/get-user-leaves", { headers })
//       .then((res) => {
//         setLeaves(res.data.users?.leaveBalance);
//       })
//       .catch((err) => {
//         console.error("Leave Summary Error:", err);
//         toast.error("Failed to fetch leave summary.");
//       });

//     //fetch payroll
//     axios
//       .get("http://209.74.89.83/erpbackend/get-user-previous-payroll", {
//         headers,
//       })
//       .then((res) => {
//         if (res.data?.user?.payroll) {
//           setPayroll(res.data.user.payroll);
//         }
//       })
//       .catch((err) => {
//         console.error("Payroll Error:", err);
//         toast.error("Failed to fetch payroll data.");
//       });

//     axios
//       .get("http://209.74.89.83/erpbackend/get-dailyTask-createdBy-admin", {
//         headers,
//       })
//       .then((res) => {
//         const user = res.data?.users?.[0];
//         if (user?.adminTasks?.length > 0) {
//           setTasks(user.adminTasks);
//         }
//       })
//       .catch((err) => {
//         console.error("Tasks Error:", err);
//         toast.error("Failed to fetch tasks.");
//       });
//   }, []);

//   const formatTime = (timeStr) => {
//     return timeStr
//       ? new Date(timeStr).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       : "—";
//   };
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     const dateObj = new Date(dateStr);
//     const date = dateObj.toLocaleDateString();
//     const time = dateObj.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//     return `${date} ${time}`;
//   };

//   const today = new Date();
//   const todayStr = getDateString(today);

//   const todayTasks = tasks.filter((task) =>
//     isSameDate(new Date(task.createdAt), today)
//   );

//   const previousPendingTasks = tasks.filter(
//     (task) => !isSameDate(new Date(task.createdAt), today)
//   );

//   // Group previous tasks by date
//   const groupedPreviousTasks = previousPendingTasks.reduce((acc, task) => {
//     const date = new Date(task.deadline).toLocaleDateString();
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(task);
//     return acc;
//   }, {});

//   return (
//     <div className={styles.dashboardContainer}>
//       <motion.h1
//         className={styles.heading}
//         animate={{ x: [-100, 0, 100, 0] }} // moves left → center → right → center
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         Welcome, {attendance?.displayName || "John Doe"} 👋
//       </motion.h1>

//       <div className={styles.gridContainer}>
//         {/* Attendance */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Today’s Attendance</h2>
//           <div className={styles.infoRow}>
//             <span>Status:</span>
//             <span
//               className={`${styles.status} ${
//                 attendance?.status === "Present" ? styles.present : ""
//               }`}
//             >
//               {attendance?.status || "—"}
//             </span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Check-in:</span>
//             <span>
//               {attendance?.checkInStatus
//                 ? formatDate(attendance?.checkInStatus) // Only format the full date with time
//                 : "—"}
//             </span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Check-out:</span>
//             <span>
//               {attendance?.checkOutStatus
//                 ? formatDate(attendance?.checkOutStatus) // Only format the full date with time
//                 : "—"}
//             </span>
//           </div>
//           <a href="/mark-attendance" className={styles.linkButton}>
//             Mark Attendance
//           </a>
//         </motion.div>

//         {/* Tasks */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h3 style={{ fontSize: "1rem" }}>Today's Tasks</h3>
//           <ul className={styles.taskList}>
//             {todayTasks.length > 0 ? (
//               todayTasks.map((task, index) => (
//                 <li key={index}>• {task.taskName}</li>
//               ))
//             ) : (
//               <li style={{ marginBottom: "10px" }}>No tasks due today</li>
//             )}
//           </ul>

//           <h3 style={{ marginTop: "1rem", fontSize: "1rem" }}>
//             Previous Pending Tasks
//           </h3>
//           {Object.keys(groupedPreviousTasks).length > 0 ? (
//             Object.entries(groupedPreviousTasks).map(
//               ([date, tasksForDate], idx) => (
//                 <div key={idx}>
//                   <strong>{date}</strong>
//                   <ul className={styles.taskList}>
//                     {tasksForDate.map((task, index) => (
//                       <li key={index}>• {task.taskName}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )
//             )
//           ) : (
//             <p>No pending tasks from previous days.</p>
//           )}

//           <p className={styles.subtext}>
//             {todayTasks.length} task{todayTasks.length === 1 ? "" : "s"} due
//             today
//           </p>
//           <a href="/task-list" className={styles.linkButton}>
//             View All Tasks
//           </a>
//         </motion.div>

//         {/* Leave Summary */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Leave Summary</h2>
//           <div className={styles.infoRow}>
//             <span>Casual Available:</span>
//             <span>{leaves?.casualLeaves?.available ?? "—"} Days</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Casual Used:</span>
//             <span>{leaves?.casualLeaves?.booked ?? "—"} Days</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Sick Available:</span>
//             <span>{leaves?.sickLeaves?.available ?? "—"} Days</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Sick Used:</span>
//             <span>{leaves?.sickLeaves?.booked ?? "—"} Days</span>
//           </div>
//           <a href="/leave-summary" className={styles.linkButton}>
//             Request Leave
//           </a>
//         </motion.div>

//         {/* Payroll Info */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Payroll Info</h2>
//           <div className={styles.infoRow}>
//             <span>Month:</span>
//             <span>
//               {payroll?.month ?? "—"} {payroll?.year ?? ""}
//             </span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Gross Salary:</span>
//             <span>₹{payroll?.grossSalary?.toLocaleString() ?? "—"}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Deductions:</span>
//             <span>₹{payroll?.deductions?.toLocaleString() ?? "—"}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Net Salary:</span>
//             <span className={styles.credited}>
//               ₹{payroll?.netSalary?.toLocaleString() ?? "—"}
//             </span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Credited On:</span>
//             <span>{formatDate(payroll?.createdAt)}</span>
//           </div>
//           <a href="#" className={styles.linkButton}>
//             View Payslip
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import styles from "./DashboardUser.module.css";
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
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.getTime() === date2.getTime();
};

const UserDashboard = () => {
  const [attendance, setAttendance] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState(null);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const [attendanceRes, leavesRes, payrollRes, tasksRes] = await Promise.all([
          axios.get("http://209.74.89.83/erpbackend/get-daily-report", { headers }),
          axios.get("http://209.74.89.83/erpbackend/get-user-leaves", { headers }),
          axios.get("http://209.74.89.83/erpbackend/get-user-previous-payroll", { headers }),
          axios.get("http://209.74.89.83/erpbackend/get-dailyTask-createdBy-admin", { headers })
        ]);

        if (attendanceRes.data?.report?.length > 0) {
          setAttendance(attendanceRes.data.report[0]);
        }
        
        setLeaves(leavesRes.data.users?.leaveBalance);
        
        if (payrollRes.data?.user?.payroll) {
          setPayroll(payrollRes.data.user.payroll);
        }
        
        const user = tasksRes.data?.users?.[0];
        if (user?.adminTasks?.length > 0) {
          setTasks(user.adminTasks);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        toast.error("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const groupedPreviousTasks = previousPendingTasks.reduce((acc, task) => {
    const date = new Date(task.deadline).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={styles.loader}
        />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className={styles.heading}
          animate={{ x: [-20, 0, 20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Welcome, {attendance?.displayName || "User"} 👋
        </motion.h1>
        <p className={styles.subtitle}>Here's your daily overview</p>
      </motion.div>

      <div className={styles.gridContainer}>
        {/* Attendance Card */}
        <motion.div 
          className={`${styles.card} ${styles.attendanceCard}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className={styles.cardHeader}>
            <h2>Today's Attendance</h2>
            <div className={`${styles.statusBadge} ${
              attendance?.status === "Present" ? styles.present : styles.absent
            }`}>
              {attendance?.status || "—"}
            </div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Check-in:</span>
              <span className={styles.infoValue}>
                {attendance?.checkInStatus
                  ? formatDate(attendance?.checkInStatus)
                  : "—"}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Check-out:</span>
              <span className={styles.infoValue}>
                {attendance?.checkOutStatus
                  ? formatDate(attendance?.checkOutStatus)
                  : "—"}
              </span>
            </div>
          </div>
          
          <motion.a 
            href="/mark-attendance" 
            className={styles.linkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mark Attendance
          </motion.a>
        </motion.div>

        {/* Tasks Card */}
        <motion.div 
          className={`${styles.card} ${styles.tasksCard}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className={styles.cardHeader}>
            <h2>Tasks Overview</h2>
            <div className={styles.taskCount}>
              {todayTasks.length} today
            </div>
          </div>
          
          <div className={styles.cardContent}>
            <h3 className={styles.sectionTitle}>Today's Tasks</h3>
            <ul className={styles.taskList}>
              {todayTasks.length > 0 ? (
                todayTasks.map((task, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className={styles.taskBullet}>•</span>
                    <span className={styles.taskName}>{task.taskName}</span>
                  </motion.li>
                ))
              ) : (
                <li className={styles.noTasks}>No tasks due today</li>
              )}
            </ul>

            <h3 className={styles.sectionTitle}>Pending Tasks</h3>
            {Object.keys(groupedPreviousTasks).length > 0 ? (
              Object.entries(groupedPreviousTasks).map(
                ([date, tasksForDate], idx) => (
                  <div key={idx} className={styles.taskGroup}>
                    <strong className={styles.taskDate}>{date}</strong>
                    <ul className={styles.taskList}>
                      {tasksForDate.map((task, index) => (
                        <li key={index}>
                          <span className={styles.taskBullet}>•</span>
                          <span className={styles.taskName}>{task.taskName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )
            ) : (
              <p className={styles.noTasks}>No pending tasks from previous days.</p>
            )}
          </div>
          
          <motion.a 
            href="/task-list" 
            className={styles.linkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Tasks
          </motion.a>
        </motion.div>

        {/* Leave Summary Card */}
        <motion.div 
          className={`${styles.card} ${styles.leaveCard}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className={styles.cardHeader}>
            <h2>Leave Summary</h2>
            <div className={styles.leaveTotal}>
              {(leaves?.casualLeaves?.available || 0) + (leaves?.sickLeaves?.available || 0)} days left
            </div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.leaveType}>
              <h3>Casual Leave</h3>
              <div className={styles.leaveProgress}>
                <div 
                  className={styles.leaveProgressBar}
                  style={{
                    width: `${((leaves?.casualLeaves?.booked || 0) / 
                            ((leaves?.casualLeaves?.available || 0) + (leaves?.casualLeaves?.booked || 0))) * 100}%`
                  }}
                ></div>
              </div>
              <div className={styles.leaveStats}>
                <span>Available: {leaves?.casualLeaves?.available ?? "—"} days</span>
                <span>Used: {leaves?.casualLeaves?.booked ?? "—"} days</span>
              </div>
            </div>
            
            <div className={styles.leaveType}>
              <h3>Sick Leave</h3>
              <div className={styles.leaveProgress}>
                <div 
                  className={styles.leaveProgressBar}
                  style={{
                    width: `${((leaves?.sickLeaves?.booked || 0) / 
                            ((leaves?.sickLeaves?.available || 0) + (leaves?.sickLeaves?.booked || 0))) * 100}%`
                  }}
                ></div>
              </div>
              <div className={styles.leaveStats}>
                <span>Available: {leaves?.sickLeaves?.available ?? "—"} days</span>
                <span>Used: {leaves?.sickLeaves?.booked ?? "—"} days</span>
              </div>
            </div>
          </div>
          
          <motion.a 
            href="/leave-summary" 
            className={styles.linkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Leave
          </motion.a>
        </motion.div>

        {/* Payroll Card */}
        <motion.div 
          className={`${styles.card} ${styles.payrollCard}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className={styles.cardHeader}>
            <h2>Payroll Info</h2>
            <div className={styles.salaryAmount}>
              ₹{payroll?.netSalary?.toLocaleString() ?? "—"}
            </div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Month:</span>
              <span className={styles.infoValue}>
                {payroll?.month ?? "—"} {payroll?.year ?? ""}
              </span>
            </div>
            
            <div className={styles.salaryBreakdown}>
              <div className={styles.salaryItem}>
                <span>Gross Salary</span>
                <span>₹{payroll?.grossSalary?.toLocaleString() ?? "—"}</span>
              </div>
              <div className={styles.salaryItem}>
                <span>Deductions</span>
                <span className={styles.deduction}>-₹{payroll?.deductions?.toLocaleString() ?? "—"}</span>
              </div>
              <div className={styles.salaryItem}>
                <span>Net Salary</span>
                <span className={styles.netSalary}>₹{payroll?.netSalary?.toLocaleString() ?? "—"}</span>
              </div>
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Credited On:</span>
              <span className={styles.infoValue}>{formatDate(payroll?.createdAt)}</span>
            </div>
          </div>
          
          <motion.a 
            href="#" 
            className={styles.linkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Payslip
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;