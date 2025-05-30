// import React, { useEffect, useState } from "react";
// import styles from "./ClientDashboard.module.css";
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

//   date1.setHours(0, 0, 0, 0);
//   date2.setHours(0, 0, 0, 0);

//   return date1.getTime() === date2.getTime();
// };

// const ClientDashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [invoices, setInvoices] = useState([]);
//   const [supportTickets, setSupportTickets] = useState([]);

//   useEffect(() => {
//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("Client not authenticated.");
//       return;
//     }

//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     // Fetch projects data
//     axios
//       .get("http://209.74.89.83/erpbackend/client/projects", { headers })
//       .then((res) => {
//         setProjects(res.data.projects || []);
//       })
//       .catch((err) => {
//         console.error("Projects Error:", err);
//         toast.error("Failed to fetch projects.");
//       });

//     // Fetch invoices data
//     axios
//       .get("http://209.74.89.83/erpbackend/client/invoices", { headers })
//       .then((res) => {
//         setInvoices(res.data.invoices || []);
//       })
//       .catch((err) => {
//         console.error("Invoices Error:", err);
//         toast.error("Failed to fetch invoices.");
//       });

//     // Fetch support tickets data
//     axios
//       .get("http://209.74.89.83/erpbackend/client/support-tickets", { headers })
//       .then((res) => {
//         setSupportTickets(res.data.tickets || []);
//       })
//       .catch((err) => {
//         console.error("Support Tickets Error:", err);
//         toast.error("Failed to fetch support tickets.");
//       });
//   }, []);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     const dateObj = new Date(dateStr);
//     return dateObj.toLocaleDateString();
//   };

//   const calculateTotalAmount = (invoice) => {
//     return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
//   };

//   const openTickets = supportTickets.filter(ticket => ticket.status === 'Open' || ticket.status === 'Pending');
//   const closedTickets = supportTickets.filter(ticket => ticket.status === 'Closed' || ticket.status === 'Resolved');
//   const overdueInvoices = invoices.filter(invoice => new Date(invoice.dueDate) < new Date() && invoice.status !== 'Paid');
//   const recentProjects = projects.slice(0, 5); // Displaying the 5 most recent projects

//   return (
//     <div className={styles.dashboardContainer}>
//       <motion.h1
//         className={styles.heading}
//         animate={{ x: [-100, 0, 100, 0] }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         Client Dashboard 👋
//       </motion.h1>

//       <div className={styles.gridContainer}>
//         {/* Recent Projects */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Recent Projects</h2>
//           {recentProjects.length > 0 ? (
//             <ul className={styles.list}>
//               {recentProjects.map((project) => (
//                 <li key={project._id}>
//                   <span>{project.projectName}</span>
//                   <span className={styles.status}>{project.status}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No recent projects.</p>
//           )}
//           <a href="/client/projects" className={styles.linkButton}>
//             View All Projects
//           </a>
//         </motion.div>

//         {/* Invoices Overview */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Invoices Overview</h2>
//           <div className={styles.infoRow}>
//             <span>Total Invoices:</span>
//             <span>{invoices.length}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Paid Invoices:</span>
//             <span>{invoices.filter((inv) => inv.status === "Paid").length}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span className={styles.warning}>Overdue Invoices:</span>
//             <span>{overdueInvoices.length}</span>
//           </div>
//           <a href="/client/invoices" className={styles.linkButton}>
//             View All Invoices
//           </a>
//         </motion.div>

//         {/* Support Tickets */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Support Tickets</h2>
//           <div className={styles.infoRow}>
//             <span>Open Tickets:</span>
//             <span>{openTickets.length}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Closed Tickets:</span>
//             <span>{closedTickets.length}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Total Tickets:</span>
//             <span>{supportTickets.length}</span>
//           </div>
//           <a href="/client/support-tickets" className={styles.linkButton}>
//             View All Tickets
//           </a>
//         </motion.div>

//         {/* Key Metrics */}
//         <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
//           <h2>Key Metrics</h2>
//           <div className={styles.infoRow}>
//             <span>Active Projects:</span>
//             <span>{projects.filter(p => p.status === 'In Progress').length}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>Pending Payments:</span>
//             <span>₹{overdueInvoices.reduce((sum, inv) => sum + calculateTotalAmount(inv), 0).toLocaleString()}</span>
//           </div>
//           <div className={styles.infoRow}>
//             <span>New Tickets This Month:</span>
//             <span>{supportTickets.filter(ticket => new Date(ticket.createdAt).getMonth() === new Date().getMonth()).length}</span>
//           </div>
//         </motion.div>
//       </div>

//       <div className={styles.section}>
//         <h2>Latest Invoices</h2>
//         {invoices.slice(0, 3).map((invoice) => (
//           <div key={invoice._id} className={styles.invoiceItem}>
//             <span>Invoice #{invoice.invoiceNumber}</span>
//             <span>Due Date: {formatDate(invoice.dueDate)}</span>
//             <span>Amount: ₹{calculateTotalAmount(invoice).toLocaleString()}</span>
//             <span className={styles.status}>{invoice.status}</span>
//             <a href={`/client/invoices/${invoice._id}`} className={styles.viewButton}>View</a>
//           </div>
//         ))}
//         {invoices.length > 3 && (
//           <div className={styles.viewAllLink}>
//             <a href="/client/invoices">View All Invoices</a>
//           </div>
//         )}
//       </div>

//       <div className={styles.section}>
//         <h2>Open Support Tickets</h2>
//         {openTickets.length > 0 ? (
//           openTickets.slice(0, 3).map((ticket) => (
//             <div key={ticket._id} className={styles.ticketItem}>
//               <span>Ticket #{ticket._id.substring(20)}</span>
//               <span>Subject: {ticket.subject}</span>
//               <span className={styles.priority}>{ticket.priority} Priority</span>
//               <span className={styles.status}>{ticket.status}</span>
//               <a href={`/client/support-tickets/${ticket._id}`} className={styles.viewButton}>View</a>
//             </div>
//           ))
//         ) : (
//           <p>No open support tickets.</p>
//         )}
//         {supportTickets.length > 3 && (
//           <div className={styles.viewAllLink}>
//             <a href="/client/support-tickets">View All Support Tickets</a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;

import React, { useEffect, useState } from "react";
import styles from "./ClientDashboard.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Auth from "../../Components/Services/Auth";
import { FiExternalLink, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock, FiDollarSign, FiHardDrive, FiHelpCircle } from "react-icons/fi";

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

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("Client not authenticated.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch projects data
    axios
      .get("http://209.74.89.83/erpbackend/client/projects", { headers })
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Projects Error:", err);
        toast.error("Failed to fetch projects.");
      });

    // Fetch invoices data
    axios
      .get("http://209.74.89.83/erpbackend/client/invoices", { headers })
      .then((res) => {
        setInvoices(res.data.invoices || []);
      })
      .catch((err) => {
        console.error("Invoices Error:", err);
        toast.error("Failed to fetch invoices.");
      });

    // Fetch support tickets data
    axios
      .get("http://209.74.89.83/erpbackend/client/support-tickets", { headers })
      .then((res) => {
        setSupportTickets(res.data.tickets || []);
      })
      .catch((err) => {
        console.error("Support Tickets Error:", err);
        toast.error("Failed to fetch support tickets.");
      });

    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString();
  };

  const calculateTotalAmount = (invoice) => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const openTickets = supportTickets.filter(ticket => ticket.status === 'Open' || ticket.status === 'Pending');
  const closedTickets = supportTickets.filter(ticket => ticket.status === 'Closed' || ticket.status === 'Resolved');
  const overdueInvoices = invoices.filter(invoice => new Date(invoice.dueDate) < new Date() && invoice.status !== 'Paid');
  const recentProjects = projects.slice(0, 5);
  const paidInvoices = invoices.filter(inv => inv.status === "Paid");
  const activeProjects = projects.filter(p => p.status === 'In Progress');
  const newTicketsThisMonth = supportTickets.filter(ticket => new Date(ticket.createdAt).getMonth() === new Date().getMonth());

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.dashboardContainer} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.header}>
        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Your Dashboard <span className={styles.wave}></span>
        </motion.h1>
        
        <button onClick={toggleDarkMode} className={styles.themeToggle}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className={styles.gridContainer}>
        {/* Projects Card */}
        <motion.div 
          className={`${styles.card} ${styles.projectsCard}`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.cardHeader}>
            <FiHardDrive className={styles.cardIcon} />
            <h2>Projects</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{projects.length}</span>
              <span className={styles.statLabel}>Total Projects</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{activeProjects.length}</span>
              <span className={styles.statLabel}>Active</span>
            </div>
          </div>
          {recentProjects.length > 0 ? (
            <ul className={styles.list}>
              {recentProjects.map((project) => (
                <motion.li 
                  key={project._id}
                  whileHover={{ x: 5 }}
                >
                  <span>{project.projectName}</span>
                  <span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '')]}`}>
                    {project.status}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className={styles.noData}>No recent projects</p>
          )}
          <a href="/client/projects" className={styles.linkButton}>
            View All Projects <FiExternalLink />
          </a>
        </motion.div>

        {/* Invoices Card */}
        <motion.div 
          className={`${styles.card} ${styles.invoicesCard}`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.cardHeader}>
            <FiDollarSign className={styles.cardIcon} />
            <h2>Invoices</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{invoices.length}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{paidInvoices.length}</span>
              <span className={styles.statLabel}>Paid</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{overdueInvoices.length}</span>
              <span className={styles.statLabel}>Overdue</span>
            </div>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>
              <span>Payment Completion</span>
              <span>{Math.round((paidInvoices.length / invoices.length) )* 100 || 0}%</span>
            </div>
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${(paidInvoices.length / invoices.length) * 100 || 0}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
          <a href="/client/invoices" className={styles.linkButton}>
            View All Invoices <FiExternalLink />
          </a>
        </motion.div>

        {/* Support Card */}
        <motion.div 
          className={`${styles.card} ${styles.supportCard}`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.cardHeader}>
            <FiHelpCircle className={styles.cardIcon} />
            <h2>Support</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{supportTickets.length}</span>
              <span className={styles.statLabel}>Total Tickets</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{openTickets.length}</span>
              <span className={styles.statLabel}>Open</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>{closedTickets.length}</span>
              <span className={styles.statLabel}>Closed</span>
            </div>
          </div>
          <div className={styles.ticketStatus}>
            <div className={styles.statusIndicator}>
              <div className={styles.indicatorLine} style={{ width: `${(closedTickets.length / supportTickets.length) * 100 || 0}%` }}></div>
            </div>
            <div className={styles.statusLabels}>
              <span>Open: {openTickets.length}</span>
              <span>Closed: {closedTickets.length}</span>
            </div>
          </div>
          <a href="/client/support-tickets" className={styles.linkButton}>
            View All Tickets <FiExternalLink />
          </a>
        </motion.div>

        {/* Metrics Card */}
        <motion.div 
          className={`${styles.card} ${styles.metricsCard}`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.cardHeader}>
            <FiTrendingUp className={styles.cardIcon} />
            <h2>Key Metrics</h2>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricIcon}>
              <FiHardDrive />
            </div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Active Projects</span>
              <span className={styles.metricValue}>{activeProjects.length}</span>
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricIcon}>
              <FiAlertCircle />
            </div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Pending Payments</span>
              <span className={styles.metricValue}>
                ₹{overdueInvoices.reduce((sum, inv) => sum + calculateTotalAmount(inv), 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricIcon}>
              <FiClock />
            </div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>New Tickets (Month)</span>
              <span className={styles.metricValue}>{newTicketsThisMonth.length}</span>
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricIcon}>
              <FiCheckCircle />
            </div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Completed Projects</span>
              <span className={styles.metricValue}>
                {projects.filter(p => p.status === 'Completed').length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.activityContainer}>
        <motion.div 
          className={styles.activitySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Recent Invoices</h2>
            <a href="/client/invoices" className={styles.viewAllLink}>
              View All <FiExternalLink />
            </a>
          </div>
          {invoices.slice(0, 3).length > 0 ? (
            <div className={styles.activityList}>
              {invoices.slice(0, 3).map((invoice) => (
                <motion.div 
                  key={invoice._id} 
                  className={styles.activityItem}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.activityMain}>
                    <span className={styles.activityTitle}>Invoice #{invoice.invoiceNumber}</span>
                    <span className={styles.activityDate}>Due: {formatDate(invoice.dueDate)}</span>
                  </div>
                  <div className={styles.activityMeta}>
                    <span className={styles.activityAmount}>₹{calculateTotalAmount(invoice).toLocaleString()}</span>
                    <span className={`${styles.activityStatus} ${styles[invoice.status.toLowerCase()]}`}>
                      {invoice.status}
                    </span>
                    <a href={`/client/invoices/${invoice._id}`} className={styles.activityAction}>
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No recent invoices found</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          className={styles.activitySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Open Support Tickets</h2>
            <a href="/client/support-tickets" className={styles.viewAllLink}>
              View All <FiExternalLink />
            </a>
          </div>
          {openTickets.slice(0, 3).length > 0 ? (
            <div className={styles.activityList}>
              {openTickets.slice(0, 3).map((ticket) => (
                <motion.div 
                  key={ticket._id} 
                  className={styles.activityItem}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.activityMain}>
                    <span className={styles.activityTitle}>{ticket.subject}</span>
                    <span className={styles.activityDate}>Created: {formatDate(ticket.createdAt)}</span>
                  </div>
                  <div className={styles.activityMeta}>
                    <span className={`${styles.activityPriority} ${styles[ticket.priority.toLowerCase()]}`}>
                      {ticket.priority}
                    </span>
                    <span className={`${styles.activityStatus} ${styles[ticket.status.toLowerCase()]}`}>
                      {ticket.status}
                    </span>
                    <a href={`/client/support-tickets/${ticket._id}`} className={styles.activityAction}>
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No open support tickets</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
};

export default ClientDashboard;