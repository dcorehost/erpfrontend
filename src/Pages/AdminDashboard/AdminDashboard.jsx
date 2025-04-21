
import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis 
} from 'recharts';
import styles from "./AdminDashboard.module.css";

// Sample data for charts
const taskData = [
  { name: 'To Do', value: 25, fill: '#FFB74D' },
  { name: 'In Progress', value: 30, fill: '#64B5F6' },
  { name: 'Done', value: 10, fill: '#81C784' },
  { name: 'Submitted for Review', value: 15, fill: '#BA68C8' },
  { name: 'Completed', value: 20, fill: '#4CAF50' }
];

const leaveData = [
  { name: 'Approved', value: 60, fill: '#4CAF50' },
  { name: 'Pending', value: 25, fill: '#FFC107' },
  { name: 'Rejected', value: 15, fill: '#F44336' },
];

const attendanceData = [
  { name: 'Present', value: 850, fill: '#4CAF50' },
  { name: 'Absent', value: 100, fill: '#F44336' },
  { name: 'Late', value: 50, fill: '#FFC107' },
];

const todayStats = {
  active: 920,
  onLeave: 30,
  totalUsers: 1000
};

const recentActivities = [
  { id: 1, action: 'User Ram updated profile', time: '2 mins ago', icon: '👤' },
  { id: 2, action: 'New task assigned to Team A', time: '15 mins ago', icon: '📌' },
  { id: 3, action: 'Leave request from Priya', time: '1 hour ago', icon: '🏖️' },
  { id: 4, action: 'Attendance marked for 120 users', time: '3 hours ago', icon: '📅' },
  { id: 5, action: 'System maintenance scheduled', time: '5 hours ago', icon: '⚙️' },
];

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>
            <span className={styles.logoIcon}>📊</span>
            <span className={styles.logoText}>ERP</span> Dashboard
          </h1>
          <div className={styles.userProfile}>
            <span className={styles.userInitial}>A</span>
            <span className={styles.userName}>Admin</span>
            {/* <span className={styles.userBadge}>Admin</span> */}
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
              <p>{todayStats.totalUsers}</p>
              {/* <span className={styles.statTrend}>↑ 12 this month</span> */}
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3>Active Today</h3>
              <p>{todayStats.active}</p>
              {/* <span className={styles.statTrend}>↑ 8 from yesterday</span> */}
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statIcon}>🏖️</div>
            <div className={styles.statContent}>
              <h3>On Leave</h3>
              <p>{todayStats.onLeave}</p>
              {/* <span className={styles.statTrend}>↓ 3 this week</span> */}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Task Status Bar Chart */}
          {/* <div className={styles.fullWidthChart}>
            <div className={styles.chartCard}>
              <h2>📌 Task Status (Count)</h2>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Tasks" radius={[4, 4, 0, 0]}>
                      {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}


<div className={styles.fullWidthChart}>
  <div className={styles.chartCard}>
    <h2>📌 Task Status (Count)</h2>
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={taskData}
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
            {taskData.map((entry, index) => (
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
                    data={leaveData}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                    >
                      {leaveData.map((entry, index) => (
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
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {attendanceData.map((entry, index) => (
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
              <DashboardLink to="/user-management" title="👤 User Management" />
              <DashboardLink to="/task-manager" title="📌 Task Management" />
              <DashboardLink to="/leave-approvals" title="🏖️ Leave Approvals" />
              <DashboardLink to="/attendance" title="📅 Attendance" />
              <DashboardLink to="/generate-report" title="📊 Generate Report" />
              <DashboardLink to="/notifications" title="🔔 Notifications" />
              <DashboardLink to="/settings" title="⚙️ System Settings" />
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