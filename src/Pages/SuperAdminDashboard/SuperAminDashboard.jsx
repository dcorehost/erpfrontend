
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "./SuperAdminDashboard.module.css";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import Auth from '../../Components/Services/Auth';

// const SuperAdminDashboard = () => {
//   // State for API data
//   const [adminCount, setAdminCount] = useState(35); 
//   const [userCount, setUserCount] = useState(1200);
//   const [adminAttendance, setAdminAttendance] = useState({
//     dailyAttendanceCount: 28, 
//     absentCount: 7, 
//     lateAttendanceCount: 0 
//   });
//   const [userAttendance, setUserAttendance] = useState({
//     presentCount: 0,
//     lateCount: 0,
//     onLeaveCount: 0
//   });
//   const token = Auth.getToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get current date in YYYY-MM-DD format
//         const today = new Date().toISOString().split('T')[0];
        
//         // Fetch all data in parallel
//         const [
//           adminResponse, 
//           userResponse,
//           adminAttendanceResponse,
//           presentResponse,
//           lateResponse,
//           onLeaveResponse
//         ] = await Promise.all([
//           axios.get('http://209.74.89.83/erpbackend/get-all-admins-count', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://209.74.89.83/erpbackend/get-all-users-count', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get(`http://209.74.89.83/erpbackend/get-admin-attendance-status?date=${today}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=present', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=late', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=onLeave', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         setAdminCount(adminResponse.data.admins);
//         setUserCount(userResponse.data.users);
//         setAdminAttendance({
//           dailyAttendanceCount: adminAttendanceResponse.data.dailyAttendanceCount,
//           absentCount: adminAttendanceResponse.data.absentCount,
//           lateAttendanceCount: adminAttendanceResponse.data.lateAttendanceCount
//         });

//         // Set user attendance data from separate API calls
//         setUserAttendance({
//           presentCount: presentResponse.data.count || 0,
//           lateCount: lateResponse.data.count || 0,
//           onLeaveCount: onLeaveResponse.data.count || 0
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Keep the default values if API fails
//       }
//     };

//     fetchData();
//   }, [token]);

//   const userStats = {
//     totalOrganizations: 12,
//     totalAdmins: adminCount, 
//     totalActiveAdmins: adminAttendance.dailyAttendanceCount,
//     totalAdminsOnLeave: adminAttendance.absentCount,
//     totalLateAdmins: adminAttendance.lateAttendanceCount,
//     totalUsers: userCount, 
//     totalActiveUsers: userAttendance.presentCount,
//     totalUsersOnLeave: userAttendance.onLeaveCount,
//     totalLateUsers: userAttendance.lateCount
//   };

//   // Admin statistics
//   const adminStats = [
//     { name: 'Late Arrivals', value: userStats.totalLateAdmins, fill: '#FF7043' },
//     { name: 'Active Admins', value: userStats.totalActiveAdmins, fill: '#34A853' },
//     { name: 'Admins on Leave', value: userStats.totalAdminsOnLeave, fill: '#FBBC05' }
//   ];

//   // User statistics
//   const userStatsChart = [
//     { name: 'Late Arrivals', value: userStats.totalLateUsers, fill: '#FF7043' },
//     { name: 'Active Users', value: userStats.totalActiveUsers, fill: '#34A853' },
//     { name: 'Users on Leave', value: userStats.totalUsersOnLeave, fill: '#FBBC05' }
//   ];

//   return (
//     <div className={styles.dashboardContainer}>
//       <header className={styles.header}>
//         <h1>Super Admin Dashboard</h1>
//       </header>

//       <section className={styles.statsSection}>
//         <div className={styles.statCard}>
//           <h3>Total Admins</h3>
//           <p>{userStats.totalAdmins}</p>
//           <div className={styles.subStats}>
//             <span className={styles.activeStat}>Active: {userStats.totalActiveAdmins}</span>
//             <span className={styles.leaveStat}>On Leave: {userStats.totalAdminsOnLeave}</span>
//             <span className={styles.lateStat}>Late: {userStats.totalLateAdmins}</span>
//           </div>
//         </div>
//         <div className={styles.statCard}>
//           <h3>Total Users</h3>
//           <p>{userStats.totalUsers}</p>
//           <div className={styles.subStats}>
//             <span className={styles.activeStat}>Active: {userStats.totalActiveUsers}</span>
//             <span className={styles.leaveStat}>On Leave: {userStats.totalUsersOnLeave}</span>
//             <span className={styles.lateStat}>Late: {userStats.totalLateUsers}</span>
//           </div>
//         </div>
//       </section>

//       <section className={styles.chartSection}>
//         <div className={styles.chartCard}>
//           <h2>Admin Statistics</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={adminStats}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 innerRadius={60}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               >
//                 {adminStats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => [value, 'Count']} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className={styles.chartCard}>
//           <h2>User Statistics</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={userStatsChart}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 innerRadius={60}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               >
//                 {userStatsChart.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => [value, 'Count']} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       <section className={styles.quickLinks}>
//         <h2>Quick Links</h2>
//         <div className={styles.linksGrid}>
//           <DashboardLink to="/organization-management" title="🏢 Manage Organizations" />
//           <DashboardLink to="/admin-accounts" title="🧑‍💼 Admin Accounts" />
//           <DashboardLink to="/reports" title="📊 Reports" />
//           <DashboardLink to="/global-settings" title="⚙️ Global Settings" />
//         </div>
//       </section>
//     </div>
//   );
// };

// const DashboardLink = ({ to, title }) => (
//   <Link to={to} className={styles.dashboardLink}>
//     {title}
//   </Link>
// );

// export default SuperAdminDashboard;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SuperAdminDashboard.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Auth from '../../Components/Services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperAdminDashboard = () => {
  // State for API data
  const [adminCount, setAdminCount] = useState(0); 
  const [userCount, setUserCount] = useState(0);
  const [adminAttendance, setAdminAttendance] = useState({
    dailyAttendanceCount: 0, 
    absentCount: 0, 
    lateAttendanceCount: 0 
  });
  const [userAttendance, setUserAttendance] = useState({
    presentCount: 0,
    lateCount: 0,
    onLeaveCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Auth.getToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      try {
        // Get current date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch all data in parallel
        const [
          adminResponse, 
          userResponse,
          adminAttendanceResponse,
          presentResponse,
          lateResponse,
          onLeaveResponse
        ] = await Promise.all([
          axios.get('http://209.74.89.83/erpbackend/get-all-admins-count', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching admin count:', err);
            return { data: { admins: 0 } }; // Return default value
          }),
          axios.get('http://209.74.89.83/erpbackend/get-all-users-count', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching user count:', err);
            return { data: { users: 0 } }; // Return default value
          }),
          axios.get(`http://209.74.89.83/erpbackend/get-admin-attendance-status?date=${today}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching admin attendance:', err);
            return { data: { dailyAttendanceCount: 0, absentCount: 0, lateAttendanceCount: 0 } };
          }),
          axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=present', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching present count:', err);
            return { data: { count: 0 } };
          }),
          axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=late', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching late count:', err);
            return { data: { count: 0 } };
          }),
          axios.get('http://209.74.89.83/erpbackend/get-All-attendance-count?type=onLeave', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching onLeave count:', err);
            return { data: { count: 0 } };
          })
        ]);

        // Validate and set data
        setAdminCount(adminResponse.data?.admins || 0);
        setUserCount(userResponse.data?.users || 0);
        
        setAdminAttendance({
          dailyAttendanceCount: adminAttendanceResponse.data?.dailyAttendanceCount || 0,
          absentCount: adminAttendanceResponse.data?.absentCount || 0,
          lateAttendanceCount: adminAttendanceResponse.data?.lateAttendanceCount || 0
        });

        setUserAttendance({
          presentCount: presentResponse.data?.count || 0,
          lateCount: lateResponse.data?.count || 0,
          onLeaveCount: onLeaveResponse.data?.count || 0
        });

      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const userStats = {
    totalOrganizations: 12,
    totalAdmins: adminCount, 
    totalActiveAdmins: adminAttendance.dailyAttendanceCount,
    totalAdminsOnLeave: adminAttendance.absentCount,
    totalLateAdmins: adminAttendance.lateAttendanceCount,
    totalUsers: userCount, 
    totalActiveUsers: userAttendance.presentCount,
    totalUsersOnLeave: userAttendance.onLeaveCount,
    totalLateUsers: userAttendance.lateCount
  };

  // Admin statistics
  const adminStats = [
    { name: 'Late Arrivals', value: userStats.totalLateAdmins, fill: '#FF7043' },
    { name: 'Active Admins', value: userStats.totalActiveAdmins, fill: '#34A853' },
    { name: 'Admins on Leave', value: userStats.totalAdminsOnLeave, fill: '#FBBC05' }
  ];

  // User statistics
  const userStatsChart = [
    { name: 'Late Arrivals', value: userStats.totalLateUsers, fill: '#FF7043' },
    { name: 'Active Users', value: userStats.totalActiveUsers, fill: '#34A853' },
    { name: 'Users on Leave', value: userStats.totalUsersOnLeave, fill: '#FBBC05' }
  ];

  if (loading) {
    return <div className={styles.loading}>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <header className={styles.header}>
        <h1>Super Admin Dashboard</h1>
      </header>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <h3>Total Admins</h3>
          <p>{userStats.totalAdmins}</p>
          <div className={styles.subStats}>
            <span className={styles.activeStat}>Active: {userStats.totalActiveAdmins}</span>
            <span className={styles.leaveStat}>On Leave: {userStats.totalAdminsOnLeave}</span>
            <span className={styles.lateStat}>Late: {userStats.totalLateAdmins}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p>{userStats.totalUsers}</p>
          <div className={styles.subStats}>
            <span className={styles.activeStat}>Active: {userStats.totalActiveUsers}</span>
            <span className={styles.leaveStat}>On Leave: {userStats.totalUsersOnLeave}</span>
            <span className={styles.lateStat}>Late: {userStats.totalLateUsers}</span>
          </div>
        </div>
      </section>

      <section className={styles.chartSection}>
        <div className={styles.chartCard}>
          <h2>Admin Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={adminStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {adminStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h2>User Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userStatsChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {userStatsChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <div className={styles.linksGrid}>
          <DashboardLink to="/organization-management" title="🏢 Manage Organizations" />
          <DashboardLink to="/admin-accounts" title="🧑‍💼 Admin Accounts" />
          <DashboardLink to="/reports" title="📊 Reports" />
          <DashboardLink to="/global-settings" title="⚙️ Global Settings" />
        </div>
      </section>
    </div>
  );
};

const DashboardLink = ({ to, title }) => (
  <Link to={to} className={styles.dashboardLink}>
    {title}
  </Link>
);

export default SuperAdminDashboard;