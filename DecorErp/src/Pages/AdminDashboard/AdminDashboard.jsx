// import React from "react";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   return (
//     <div className={styles.dashboardContainer}>
//       <header className={styles.header}>Admin Dashboard</header>

//       <div className={styles.contentContainer}>
//         <section className={styles.section}>
//           <h2>Key Metrics</h2>
//           <div className={styles.cardContainer}>
//             <div className={styles.card}>Number Of Users: 1,200</div>
//             <div className={styles.card}>Revenue: $34,500</div>
//             <div className={styles.card}>New Signups: 35</div>
//           </div>
//         </section>

//         <section className={styles.section}>
//           <h2>Recent Activities</h2>
//           <ul className={styles.list}>
//             <li>User Ram updated their profile.</li>
//             <li>New content "Guide to React" added.</li>
//             <li>System backup completed successfully.</li>
//           </ul>
//         </section>

//         <section className={styles.section}>
//           <h2>User Management</h2>
//           <button className={styles.button}>View All Users</button>
//         </section>
       
//         <section className={styles.section}>
//           <h2>Project & Time Management</h2>
//           <button className={styles.button}>View All Workflow Managemen</button>
//         </section>

//         <section className={styles.section}>
//           <h2>Sales Management</h2>
//           <button className={styles.button}>view sales report</button>
//         </section>

//         <section className={styles.section}>
//           <h2>Reporting & Analytics</h2>
//           <button className={styles.button}>Generate Report</button>
//         </section>
//         <section className={styles.section}>
//           <h2>Notifications and Alerts</h2>
//           <button className={styles.button}>View Notification</button>
//         </section>

//         <section className={styles.section}>
//           <h2>Enquiry Management</h2>
//           <button className={styles.button}>View Enquiry</button>
//         </section>

//         <section className={styles.section}>
//           <h2>Support</h2>
//           <button className={styles.button}>Contact Support</button>
//         </section>
//       </div>

//       <footer className={styles.footer}>
//         <button className={styles.logoutButton}>Logout</button>
//       </footer>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>Admin Dashboard</header>

      <div className={styles.contentContainer}>
        <section className={styles.section}>
          <h2>Key Metrics</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>Number Of Users: 1,200</div>
            <div className={styles.card}>Revenue: $34,500</div>
            <div className={styles.card}>New Signups: 35</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Recent Activities</h2>
          <ul className={styles.list}>
            <li>User Ram updated their profile.</li>
            <li>New content "Guide to React" added.</li>
            <li>System backup completed successfully.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>User Management</h2>
          <Link to="/user-management" className={styles.button}>
            View All Users
          </Link>
        </section>
       
        <section className={styles.section}>
          <h2>Project & Time Management</h2>
          <Link to="/task-manager" className={styles.button}>
            View All Workflow Management
          </Link>
        </section>

        <section className={styles.section}>
          <h2>Sales Management</h2>
          <Link to="/sales-management" className={styles.button}>
            View Sales Report
          </Link>
        </section>

        <section className={styles.section}>
          <h2>Reporting & Analytics</h2>
          <Link to="/generate-report" className={styles.button}>
            Generate Report
          </Link>
        </section>

        <section className={styles.section}>
          <h2>Notifications and Alerts</h2>
          <Link to="/notifications" className={styles.button}>
            View Notifications
          </Link>
        </section>

        <section className={styles.section}>
          <h2>Enquiry Management</h2>
          <Link to="/enquiry-management" className={styles.button}>
            View Enquiries
          </Link>
        </section>

        <section className={styles.section}>
          <h2>Support</h2>
          <Link to="/support" className={styles.button}>
            Contact Support
          </Link>
        </section>
      </div>

      <footer className={styles.footer}>
        <Link to="/logout" className={styles.logoutButton}>
          Logout
        </Link>
      </footer>
    </div>
  );
};

export default AdminDashboard;
