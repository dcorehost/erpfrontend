

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
//   ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis 
// } from 'recharts';
// import styles from "./AdminDashboard.module.css";
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Sample data for other charts
// const leaveData = [
//   { name: 'Approved', value: 60, fill: '#4CAF50' },
//   { name: 'Pending', value: 25, fill: '#FFC107' },
//   { name: 'Rejected', value: 15, fill: '#F44336' },
// ];

// const attendanceData = [
//   { name: 'Present', value: 850, fill: '#4CAF50' },
//   { name: 'Absent', value: 100, fill: '#F44336' },
//   { name: 'Late', value: 50, fill: '#FFC107' },
// ];

// const recentActivities = [
//   { id: 1, action: 'User Ram updated profile', time: '2 mins ago', icon: '👤' },
//   { id: 2, action: 'New task assigned to Team A', time: '15 mins ago', icon: '📌' },
//   { id: 3, action: 'Leave request from Priya', time: '1 hour ago', icon: '🏖️' },
//   { id: 4, action: 'Attendance marked for 120 users', time: '3 hours ago', icon: '📅' },
//   { id: 5, action: 'System maintenance scheduled', time: '5 hours ago', icon: '⚙️' },
// ];

// const BASE_URL = "http://209.74.89.83/erpbackend";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeToday: 0,
//     onLeave: 0,
//     loading: true,
//     error: null
//   });

//   const [taskStatus, setTaskStatus] = useState({
//     loading: true,
//     error: null,
//     data: []
//   });

//   const token = Auth.getToken();
//   if (!token) {
//     toast.error('User not authenticated.');
//     return null;
//   }

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Get current date in YYYY-MM-DD format
//         const today = new Date().toISOString().split('T')[0];
        
//         // Fetch all dashboard data in parallel
//         const [totalUsersRes, leaveRes, attendanceRes] = await Promise.all([
//           axios.get(`${BASE_URL}/get-all-users-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-on-leaves-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-daily-attendance-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         setStats({
//           totalUsers: totalUsersRes.data.users,
//           activeToday: attendanceRes.data.dailyAttendanceCount,
//           onLeave: leaveRes.data.absentCount,
//           loading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Failed to fetch dashboard data:', error);
//         toast.error('Failed to load dashboard data');
//         setStats(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load dashboard data'
//         }));
//       }
//     };

//     const fetchTaskStatusData = async () => {
//       try {
//         // Fetch all task status data in parallel
//         const [
//           todoRes,
//           inProgressRes,
//           doneRes,
//           submittedRes,
//           completedRes
//         ] = await Promise.all([
//           axios.get(`${BASE_URL}/get-todo-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-InProgress-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-done-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-submit-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-complete-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         // Format the data for the chart
//         const formattedData = [
//           { name: 'To Do', value: todoRes.data.toDoCount, fill: '#FFB74D' },
//           { name: 'In Progress', value: inProgressRes.data.toDoCount, fill: '#64B5F6' },
//           { name: 'Done', value: doneRes.data.toDoCount, fill: '#81C784' },
//           { name: 'Submitted for Review', value: submittedRes.data.toDoCount, fill: '#BA68C8' },
//           { name: 'Completed', value: completedRes.data.toDoCount, fill: '#4CAF50' }
//         ];

//         setTaskStatus({
//           loading: false,
//           error: null,
//           data: formattedData
//         });
//       } catch (error) {
//         console.error('Failed to fetch task status data:', error);
//         toast.error('Failed to load task status data');
//         setTaskStatus(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load task status data'
//         }));
//       }
//     };

//     fetchDashboardData();
//     fetchTaskStatusData();
//   }, [token]);

//   if (stats.loading || taskStatus.loading) {
//     return <div className={styles.loading}>Loading dashboard data...</div>;
//   }

//   if (stats.error || taskStatus.error) {
//     return (
//       <div className={styles.error}>
//         {stats.error || taskStatus.error}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboardContainer}>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />

//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <h1>
//             <span className={styles.logoIcon}>📊</span>
//             <span className={styles.logoText}>ERP</span> Dashboard
//           </h1>
//           <div className={styles.userProfile}>
//             <span className={styles.userInitial}>A</span>
//             <span className={styles.userName}>Admin</span>
//           </div>
//         </div>
//       </header>

//       <div className={styles.contentContainer}>
//         {/* Quick Stats Cards */}
//         <div className={styles.statsRow}>
//           <div className={`${styles.statCard} ${styles.primary}`}>
//             <div className={styles.statIcon}>👥</div>
//             <div className={styles.statContent}>
//               <h3>Total Users</h3>
//               <p>{stats.totalUsers}</p>
//             </div>
//           </div>
          
//           <div className={`${styles.statCard} ${styles.success}`}>
//             <div className={styles.statIcon}>✅</div>
//             <div className={styles.statContent}>
//               <h3>Active Today</h3>
//               <p>{stats.activeToday}</p>
//             </div>
//           </div>
          
//           <div className={`${styles.statCard} ${styles.warning}`}>
//             <div className={styles.statIcon}>🏖️</div>
//             <div className={styles.statContent}>
//               <h3>On Leave</h3>
//               <p>{stats.onLeave}</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className={styles.mainContent}>
//           <div className={styles.fullWidthChart}>
//             <div className={styles.chartCard}>
//               <h2>📌 Task Status (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart 
//                     data={taskStatus.data}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis 
//                       dataKey="name" 
//                       tick={{ fontSize: 12 }}
//                     />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar 
//                       dataKey="value" 
//                       name="Task Count" 
//                       radius={[4, 4, 0, 0]}
//                       barSize={30}
//                     >
//                       {taskStatus.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Parallel Charts Row */}
//           <div className={styles.parallelCharts}>
//             <div className={styles.chartCard}>
//               <h2>🏖️ Leave Status (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RadialBarChart 
//                     innerRadius="20%" 
//                     outerRadius="80%" 
//                     data={leaveData}
//                     startAngle={180}
//                     endAngle={-180}
//                   >
//                     <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
//                     <RadialBar
//                       background
//                       dataKey="value"
//                       cornerRadius={10}
//                     >
//                       {leaveData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </RadialBar>
//                     <Legend />
//                     <Tooltip />
//                   </RadialBarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className={styles.chartCard}>
//               <h2>📅 Attendance (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={attendanceData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       outerRadius={120}
//                       innerRadius={60}
//                       dataKey="value"
//                       label={({ name, value }) => `${name}: ${value}`}
//                     >
//                       {attendanceData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip formatter={(value) => [value, 'Count']} />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className={styles.quickLinks}>
//             <h2>⚡ Quick Actions</h2>
//             <div className={styles.grid}>
//               <DashboardLink to="/user-management" title="👤 User Management" />
//               <DashboardLink to="/task-manager" title="📌 Task Management" />
//               <DashboardLink to="/leave-approvals" title="🏖️ Leave Approvals" />
//               <DashboardLink to="/attendance" title="📅 Attendance" />
//               <DashboardLink to="/generate-report" title="📊 Generate Report" />
//               <DashboardLink to="/notifications" title="🔔 Notifications" />
//               <DashboardLink to="/settings" title="⚙️ System Settings" />
//               <DashboardLink to="/help" title="❓ Help Center" />
//             </div>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className={styles.recentActivities}>
//           <div className={styles.sectionHeader}>
//             <h2>🔄 Recent Activities</h2>
//             <Link to="/activities" className={styles.viewAll}>View All →</Link>
//           </div>
//           <ul className={styles.activityList}>
//             {recentActivities.map(activity => (
//               <li key={activity.id} className={styles.activityItem}>
//                 <span className={styles.activityIcon}>{activity.icon}</span>
//                 <div className={styles.activityContent}>
//                   <p>{activity.action}</p>
//                   <span className={styles.activityTime}>{activity.time}</span>
//                 </div>
//                 <span className={styles.activityBadge}>New</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <footer className={styles.footer}>
//         <div className={styles.footerContent}>
//           <p>© {new Date().getFullYear()} ERP System | v2.4.1</p>
//           <div className={styles.footerLinks}>
//             <Link to="/help" className={styles.footerLink}>Help</Link>
//             <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
//             <Link to="/terms" className={styles.footerLink}>Terms</Link>
//             <Link to="/logout" className={styles.logoutButton}>
//               <span className={styles.logoutIcon}>🔓</span> Logout
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const DashboardLink = ({ to, title }) => (
//   <Link to={to} className={styles.cardLink}>
//     <div className={styles.linkContent}>
//       {title}
//     </div>
//   </Link>
// );

// export default AdminDashboard;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
//   ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis 
// } from 'recharts';
// import styles from "./AdminDashboard.module.css";
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const recentActivities = [
//   { id: 1, action: 'User Ram updated profile', time: '2 mins ago', icon: '👤' },
//   { id: 2, action: 'New task assigned to Team A', time: '15 mins ago', icon: '📌' },
//   { id: 3, action: 'Leave request from Priya', time: '1 hour ago', icon: '🏖️' },
//   { id: 4, action: 'Attendance marked for 120 users', time: '3 hours ago', icon: '📅' },
//   { id: 5, action: 'System maintenance scheduled', time: '5 hours ago', icon: '⚙️' },
// ];

// const BASE_URL = "http://209.74.89.83/erpbackend";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeToday: 0,
//     onLeave: 0,
//     loading: true,
//     error: null
//   });

//   const [taskStatus, setTaskStatus] = useState({
//     loading: true,
//     error: null,
//     data: []
//   });

//   const [leaveStatus, setLeaveStatus] = useState({
//     loading: true,
//     error: null,
//     data: []
//   });

//   const [attendanceStatus, setAttendanceStatus] = useState({
//     loading: true,
//     error: null,
//     data: []
//   });

//   const token = Auth.getToken();
//   if (!token) {
//     toast.error('User not authenticated.');
//     return null;
//   }

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Get current date in YYYY-MM-DD format
//         const today = new Date().toISOString().split('T')[0];
        
//         // Fetch all dashboard data in parallel
//         const [totalUsersRes, leaveRes, attendanceRes] = await Promise.all([
//           axios.get(`${BASE_URL}/get-all-users-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-on-leaves-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-daily-attendance-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         setStats({
//           totalUsers: totalUsersRes.data.users,
//           activeToday: attendanceRes.data.dailyAttendanceCount,
//           onLeave: leaveRes.data.absentCount,
//           loading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Failed to fetch dashboard data:', error);
//         toast.error('Failed to load dashboard data');
//         setStats(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load dashboard data'
//         }));
//       }
//     };

//     const fetchTaskStatusData = async () => {
//       try {
//         // Fetch all task status data in parallel
//         const [
//           todoRes,
//           inProgressRes,
//           doneRes,
//           submittedRes,
//           completedRes
//         ] = await Promise.all([
//           axios.get(`${BASE_URL}/get-todo-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-InProgress-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-done-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-submit-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-complete-task-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         // Format the data for the chart
//         const formattedData = [
//           { name: 'To Do', value: todoRes.data.toDoCount, fill: '#FFB74D' },
//           { name: 'In Progress', value: inProgressRes.data.toDoCount, fill: '#64B5F6' },
//           { name: 'Done', value: doneRes.data.toDoCount, fill: '#81C784' },
//           { name: 'Submitted for Review', value: submittedRes.data.toDoCount, fill: '#BA68C8' },
//           { name: 'Completed', value: completedRes.data.toDoCount, fill: '#4CAF50' }
//         ];

//         setTaskStatus({
//           loading: false,
//           error: null,
//           data: formattedData
//         });
//       } catch (error) {
//         console.error('Failed to fetch task status data:', error);
//         toast.error('Failed to load task status data');
//         setTaskStatus(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load task status data'
//         }));
//       }
//     };

//     const fetchLeaveStatusData = async () => {
//       try {
//         // Fetch all leave status data in parallel
//         const [
//           pendingRes,
//           rejectedRes,
//           completedRes
//         ] = await Promise.all([
//           axios.get(`${BASE_URL}/get-pending-leaves-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-rejected-leaves-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-completed-leaves-count`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         // Format the data for the chart
//         const formattedData = [
//           { name: 'Pending', value: pendingRes.data.leaveCount, fill: '#FFC107' },
//           { name: 'Rejected', value: rejectedRes.data.leaveCount, fill: '#F44336' },
//           { name: 'Completed', value: completedRes.data.leaveCount, fill: '#4CAF50' }
//         ];

//         setLeaveStatus({
//           loading: false,
//           error: null,
//           data: formattedData
//         });
//       } catch (error) {
//         console.error('Failed to fetch leave status data:', error);
//         toast.error('Failed to load leave status data');
//         setLeaveStatus(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load leave status data'
//         }));
//       }
//     };

//     const fetchAttendanceStatusData = async () => {
//       try {
//         const today = new Date().toISOString().split('T')[0];
        
//         // Fetch all attendance data in parallel
//         const [
//           presentRes,
//           lateRes,
//           absentRes
//         ] = await Promise.all([
//           axios.get(`${BASE_URL}/get-daily-attendance-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-late-attendance-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${BASE_URL}/get-on-leaves-count?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         ]);

//         // Format the data for the chart
//         const formattedData = [
//           { name: 'Present', value: presentRes.data.dailyAttendanceCount, fill: '#4CAF50' },
//           { name: 'Late', value: lateRes.data.lateAttendanceCount, fill: '#FFC107' },
//           { name: 'Absent', value: absentRes.data.absentCount, fill: '#F44336' }
//         ];

//         setAttendanceStatus({
//           loading: false,
//           error: null,
//           data: formattedData
//         });
//       } catch (error) {
//         console.error('Failed to fetch attendance data:', error);
//         toast.error('Failed to load attendance data');
//         setAttendanceStatus(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load attendance data'
//         }));
//       }
//     };

//     fetchDashboardData();
//     fetchTaskStatusData();
//     fetchLeaveStatusData();
//     fetchAttendanceStatusData();
//   }, [token]);

//   if (stats.loading || taskStatus.loading || leaveStatus.loading || attendanceStatus.loading) {
//     return <div className={styles.loading}>Loading dashboard data...</div>;
//   }

//   if (stats.error || taskStatus.error || leaveStatus.error || attendanceStatus.error) {
//     return (
//       <div className={styles.error}>
//         {stats.error || taskStatus.error || leaveStatus.error || attendanceStatus.error}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboardContainer}>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />

//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <h1>
//             <span className={styles.logoIcon}>📊</span>
//             <span className={styles.logoText}>ERP</span> Dashboard
//           </h1>
//           <div className={styles.userProfile}>
//             <span className={styles.userInitial}>A</span>
//             <span className={styles.userName}>Admin</span>
//           </div>
//         </div>
//       </header>

//       <div className={styles.contentContainer}>
//         {/* Quick Stats Cards */}
//         <div className={styles.statsRow}>
//           <div className={`${styles.statCard} ${styles.primary}`}>
//             <div className={styles.statIcon}>👥</div>
//             <div className={styles.statContent}>
//               <h3>Total Users</h3>
//               <p>{stats.totalUsers}</p>
//             </div>
//           </div>
          
//           <div className={`${styles.statCard} ${styles.success}`}>
//             <div className={styles.statIcon}>✅</div>
//             <div className={styles.statContent}>
//               <h3>Active Today</h3>
//               <p>{stats.activeToday}</p>
//             </div>
//           </div>
          
//           <div className={`${styles.statCard} ${styles.warning}`}>
//             <div className={styles.statIcon}>🏖️</div>
//             <div className={styles.statContent}>
//               <h3>On Leave</h3>
//               <p>{stats.onLeave}</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className={styles.mainContent}>
//           <div className={styles.fullWidthChart}>
//             <div className={styles.chartCard}>
//               <h2>📌 Task Status (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart 
//                     data={taskStatus.data}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis 
//                       dataKey="name" 
//                       tick={{ fontSize: 12 }}
//                     />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar 
//                       dataKey="value" 
//                       name="Task Count" 
//                       radius={[4, 4, 0, 0]}
//                       barSize={30}
//                     >
//                       {taskStatus.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Parallel Charts Row */}
//           <div className={styles.parallelCharts}>
//             <div className={styles.chartCard}>
//               <h2>🏖️ Leave Status (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RadialBarChart 
//                     innerRadius="20%" 
//                     outerRadius="80%" 
//                     data={leaveStatus.data}
//                     startAngle={180}
//                     endAngle={-180}
//                   >
//                     <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
//                     <RadialBar
//                       background
//                       dataKey="value"
//                       cornerRadius={10}
//                     >
//                       {leaveStatus.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </RadialBar>
//                     <Legend />
//                     <Tooltip />
//                   </RadialBarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className={styles.chartCard}>
//               <h2>📅 Attendance (Count)</h2>
//               <div className={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={attendanceStatus.data}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       outerRadius={120}
//                       innerRadius={60}
//                       dataKey="value"
//                       label={({ name, value }) => `${name}: ${value}`}
//                     >
//                       {attendanceStatus.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip formatter={(value) => [value, 'Count']} />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className={styles.quickLinks}>
//             <h2>⚡ Quick Actions</h2>
//             <div className={styles.grid}>
//               <DashboardLink to="/user-management" title="👤 User Management" />
//               <DashboardLink to="/task-manager" title="📌 Task Management" />
//               <DashboardLink to="/leave-approvals" title="🏖️ Leave Approvals" />
//               <DashboardLink to="/attendance" title="📅 Attendance" />
//               <DashboardLink to="/generate-report" title="📊 Generate Report" />
//               <DashboardLink to="/notifications" title="🔔 Notifications" />
//               <DashboardLink to="/settings" title="⚙️ System Settings" />
//               <DashboardLink to="/help" title="❓ Help Center" />
//             </div>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className={styles.recentActivities}>
//           <div className={styles.sectionHeader}>
//             <h2>🔄 Recent Activities</h2>
//             <Link to="/activities" className={styles.viewAll}>View All →</Link>
//           </div>
//           <ul className={styles.activityList}>
//             {recentActivities.map(activity => (
//               <li key={activity.id} className={styles.activityItem}>
//                 <span className={styles.activityIcon}>{activity.icon}</span>
//                 <div className={styles.activityContent}>
//                   <p>{activity.action}</p>
//                   <span className={styles.activityTime}>{activity.time}</span>
//                 </div>
//                 <span className={styles.activityBadge}>New</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <footer className={styles.footer}>
//         <div className={styles.footerContent}>
//           <p>© {new Date().getFullYear()} ERP System | v2.4.1</p>
//           <div className={styles.footerLinks}>
//             <Link to="/help" className={styles.footerLink}>Help</Link>
//             <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
//             <Link to="/terms" className={styles.footerLink}>Terms</Link>
//             <Link to="/logout" className={styles.logoutButton}>
//               <span className={styles.logoutIcon}>🔓</span> Logout
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const DashboardLink = ({ to, title }) => (
//   <Link to={to} className={styles.cardLink}>
//     <div className={styles.linkContent}>
//       {title}
//     </div>
//   </Link>
// );

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis 
} from 'recharts';
import styles from "./AdminDashboard.module.css";
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const recentActivities = [
  { id: 1, action: 'User Ram updated profile', time: '2 mins ago', icon: '👤' },
  { id: 2, action: 'New task assigned to Team A', time: '15 mins ago', icon: '📌' },
  { id: 3, action: 'Leave request from Priya', time: '1 hour ago', icon: '🏖️' },
  { id: 4, action: 'Attendance marked for 120 users', time: '3 hours ago', icon: '📅' },
  { id: 5, action: 'System maintenance scheduled', time: '5 hours ago', icon: '⚙️' },
];

const BASE_URL = "http://209.74.89.83/erpbackend";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    onLeave: 0,
    loading: true,
    error: null
  });

  const [taskStatus, setTaskStatus] = useState({
    loading: true,
    error: null,
    data: []
  });

  const [leaveStatus, setLeaveStatus] = useState({
    loading: true,
    error: null,
    data: []
  });

  const [attendanceStatus, setAttendanceStatus] = useState({
    loading: true,
    error: null,
    data: []
  });

  const token = Auth.getToken();
  if (!token) {
    toast.error('User not authenticated.');
    return null;
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch all dashboard data in parallel
        const [totalUsersRes, leaveRes, attendanceRes] = await Promise.all([
          axios.get(`${BASE_URL}/get-all-users-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-on-leaves-count?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-daily-attendance-count?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setStats({
          totalUsers: totalUsersRes.data.users,
          activeToday: attendanceRes.data.dailyAttendanceCount,
          onLeave: leaveRes.data.absentCount,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data'
        }));
      }
    };

    const fetchTaskStatusData = async () => {
      try {
        // Fetch all task status data in parallel
        const [
          todoRes,
          inProgressRes,
          doneRes,
          submittedRes,
          completedRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/get-todo-task-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-InProgress-task-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-done-task-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-submit-task-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-complete-task-count`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // Format the data for the chart
        const formattedData = [
          { name: 'To Do', value: todoRes.data.toDoCount, fill: '#FFB74D' },
          { name: 'In Progress', value: inProgressRes.data.toDoCount, fill: '#64B5F6' },
          { name: 'Done', value: doneRes.data.toDoCount, fill: '#81C784' },
          { name: 'Submitted for Review', value: submittedRes.data.toDoCount, fill: '#BA68C8' },
          { name: 'Completed', value: completedRes.data.toDoCount, fill: '#4CAF50' }
        ];

        setTaskStatus({
          loading: false,
          error: null,
          data: formattedData
        });
      } catch (error) {
        console.error('Failed to fetch task status data:', error);
        toast.error('Failed to load task status data');
        setTaskStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load task status data'
        }));
      }
    };

    const fetchLeaveStatusData = async () => {
      try {
        // Fetch all leave status data in parallel
        const [
          pendingRes,
          rejectedRes,
          completedRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/get-pending-leaves-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-rejected-leaves-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-completed-leaves-count`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // Format the data for the chart
        const formattedData = [
          { name: 'Pending', value: pendingRes.data.leaveCount, fill: '#FFC107' },
          { name: 'Rejected', value: rejectedRes.data.leaveCount, fill: '#F44336' },
          { name: 'Completed', value: completedRes.data.leaveCount, fill: '#4CAF50' }
        ];

        setLeaveStatus({
          loading: false,
          error: null,
          data: formattedData
        });
      } catch (error) {
        console.error('Failed to fetch leave status data:', error);
        toast.error('Failed to load leave status data');
        setLeaveStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load leave status data'
        }));
      }
    };

    const fetchAttendanceStatusData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch all attendance data in parallel
        const [
          presentRes,
          lateRes,
          absentRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/get-daily-attendance-count?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-late-attendance-count?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/get-on-leaves-count?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // Format the data for the chart
        const formattedData = [
          { name: 'Present', value: presentRes.data.dailyAttendanceCount, fill: '#4CAF50' },
          { name: 'Late', value: lateRes.data.lateAttendanceCount, fill: '#FFC107' },
          { name: 'Absent', value: absentRes.data.absentCount, fill: '#F44336' }
        ];

        setAttendanceStatus({
          loading: false,
          error: null,
          data: formattedData
        });
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
        toast.error('Failed to load attendance data');
        setAttendanceStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load attendance data'
        }));
      }
    };

    fetchDashboardData();
    fetchTaskStatusData();
    fetchLeaveStatusData();
    fetchAttendanceStatusData();
  }, [token]);

  if (stats.loading || taskStatus.loading || leaveStatus.loading || attendanceStatus.loading) {
    return <div className={styles.loading}>Loading dashboard data...</div>;
  }

  if (stats.error || taskStatus.error || leaveStatus.error || attendanceStatus.error) {
    return (
      <div className={styles.error}>
        {stats.error || taskStatus.error || leaveStatus.error || attendanceStatus.error}
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span className={styles.logoIcon}>📊</span>
            <span className={styles.logoText}>ERP</span> Dashboard
          </h1>
          <div className={styles.userProfile}>
            <span className={styles.userInitial}>A</span>
            <span className={styles.userName}>Admin</span>
          </div>
        </div>
      </header>

      <div className={styles.contentContainer}>
        {/* Quick Stats Cards */}
        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.primary}`}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statContent}>
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3>Active Today</h3>
              <p>{stats.activeToday}</p>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statIcon}>🏖️</div>
            <div className={styles.statContent}>
              <h3>On Leave</h3>
              <p>{stats.onLeave}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          <div className={styles.fullWidthChart}>
            <div className={styles.chartCard}>
              <h2>📌 Task Status (Count)</h2>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={taskStatus.data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Task Count" 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    >
                      {taskStatus.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Parallel Charts Row */}
          <div className={styles.parallelCharts}>
            <div className={styles.chartCard}>
              <h2>🏖️ Leave Status (Count)</h2>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    innerRadius="20%" 
                    outerRadius="80%" 
                    data={leaveStatus.data}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                    >
                      {leaveStatus.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </RadialBar>
                    <Legend />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <h2>📅 Attendance (Count)</h2>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceStatus.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {attendanceStatus.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <h2>⚡ Quick Actions</h2>
            <div className={styles.grid}>
              <DashboardLink to="/create-user" title="👤 User Management" />
              <DashboardLink to="/CreateNewProject" title="📌 Task Management" />
              <DashboardLink to="/Admin/Leave/Pending-Leaves" title="🏖️ Leave Approvals" />
              <DashboardLink to="/attendance" title="📅 Attendance" />
              <DashboardLink to="/generate-report" title="📊 Generate Report" />
              <DashboardLink to="/notifications" title="🔔 Notifications" />
              <DashboardLink to="/Admin-system-setting" title="⚙️ System Settings" />
              <DashboardLink to="/help" title="❓ Help Center" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className={styles.recentActivities}>
          <div className={styles.sectionHeader}>
            <h2>🔄 Recent Activities</h2>
            <Link to="/activities" className={styles.viewAll}>View All →</Link>
          </div>
          <ul className={styles.activityList}>
            {recentActivities.map(activity => (
              <li key={activity.id} className={styles.activityItem}>
                <span className={styles.activityIcon}>{activity.icon}</span>
                <div className={styles.activityContent}>
                  <p>{activity.action}</p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
                <span className={styles.activityBadge}>New</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© {new Date().getFullYear()} ERP System | v2.4.1</p>
          <div className={styles.footerLinks}>
            <Link to="/help" className={styles.footerLink}>Help</Link>
            <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
            <Link to="/terms" className={styles.footerLink}>Terms</Link>
            <Link to="/logout" className={styles.logoutButton}>
              <span className={styles.logoutIcon}>🔓</span> Logout
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const DashboardLink = ({ to, title }) => (
  <Link to={to} className={styles.cardLink}>
    <div className={styles.linkContent}>
      {title}
    </div>
  </Link>
);

export default AdminDashboard;