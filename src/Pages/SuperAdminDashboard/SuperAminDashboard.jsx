
import React from "react";
import { Link } from "react-router-dom";
import styles from "./SuperAdminDashboard.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SuperAdminDashboard = () => {
  // Static data for the dashboard
  const userStats = {
    totalOrganizations: 12,
    totalAdmins: 35,
    totalUsers: 1200,
  };

  const taskStats = [
    { name: 'To Do', value: 120, fill: '#FFB74D' },
    { name: 'In Progress', value: 90, fill: '#64B5F6' },
    { name: 'Done', value: 150, fill: '#81C784' },
    { name: 'Submitted', value: 60, fill: '#BA68C8' },
    { name: 'Completed', value: 180, fill: '#4CAF50' }
  ];

  const leaveStats = [
    { name: 'Pending', value: 25, fill: '#FFC107' },
    { name: 'Rejected', value: 10, fill: '#F44336' },
    { name: 'Completed', value: 70, fill: '#4CAF50' }
  ];

  const attendanceStats = [
    { name: 'Present', value: 950, fill: '#4CAF50' },
    { name: 'Late', value: 120, fill: '#FFC107' },
    { name: 'Absent', value: 130, fill: '#F44336' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Super Admin Dashboard</h1>
      </header>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <h3>Total Organizations</h3>
          <p>{userStats.totalOrganizations}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Admins</h3>
          <p>{userStats.totalAdmins}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p>{userStats.totalUsers}</p>
        </div>
      </section>

      <section className={styles.chartSection}>
        <div className={styles.chartCard}>
          <h2>Task Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {taskStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h2>Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {attendanceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
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

