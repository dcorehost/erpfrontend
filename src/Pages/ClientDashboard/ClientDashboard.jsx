import React, { useEffect, useState } from "react";
import styles from "./ClientDashboard.module.css";
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

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);

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
  const recentProjects = projects.slice(0, 5); // Displaying the 5 most recent projects

  return (
    <div className={styles.dashboardContainer}>
      <motion.h1
        className={styles.heading}
        animate={{ x: [-100, 0, 100, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        Client Dashboard 👋
      </motion.h1>

      <div className={styles.gridContainer}>
        {/* Recent Projects */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Recent Projects</h2>
          {recentProjects.length > 0 ? (
            <ul className={styles.list}>
              {recentProjects.map((project) => (
                <li key={project._id}>
                  <span>{project.projectName}</span>
                  <span className={styles.status}>{project.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent projects.</p>
          )}
          <a href="/client/projects" className={styles.linkButton}>
            View All Projects
          </a>
        </motion.div>

        {/* Invoices Overview */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Invoices Overview</h2>
          <div className={styles.infoRow}>
            <span>Total Invoices:</span>
            <span>{invoices.length}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Paid Invoices:</span>
            <span>{invoices.filter((inv) => inv.status === "Paid").length}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.warning}>Overdue Invoices:</span>
            <span>{overdueInvoices.length}</span>
          </div>
          <a href="/client/invoices" className={styles.linkButton}>
            View All Invoices
          </a>
        </motion.div>

        {/* Support Tickets */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Support Tickets</h2>
          <div className={styles.infoRow}>
            <span>Open Tickets:</span>
            <span>{openTickets.length}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Closed Tickets:</span>
            <span>{closedTickets.length}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Total Tickets:</span>
            <span>{supportTickets.length}</span>
          </div>
          <a href="/client/support-tickets" className={styles.linkButton}>
            View All Tickets
          </a>
        </motion.div>

        {/* Key Metrics */}
        <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
          <h2>Key Metrics</h2>
          <div className={styles.infoRow}>
            <span>Active Projects:</span>
            <span>{projects.filter(p => p.status === 'In Progress').length}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Pending Payments:</span>
            <span>₹{overdueInvoices.reduce((sum, inv) => sum + calculateTotalAmount(inv), 0).toLocaleString()}</span>
          </div>
          <div className={styles.infoRow}>
            <span>New Tickets This Month:</span>
            <span>{supportTickets.filter(ticket => new Date(ticket.createdAt).getMonth() === new Date().getMonth()).length}</span>
          </div>
        </motion.div>
      </div>

      <div className={styles.section}>
        <h2>Latest Invoices</h2>
        {invoices.slice(0, 3).map((invoice) => (
          <div key={invoice._id} className={styles.invoiceItem}>
            <span>Invoice #{invoice.invoiceNumber}</span>
            <span>Due Date: {formatDate(invoice.dueDate)}</span>
            <span>Amount: ₹{calculateTotalAmount(invoice).toLocaleString()}</span>
            <span className={styles.status}>{invoice.status}</span>
            <a href={`/client/invoices/${invoice._id}`} className={styles.viewButton}>View</a>
          </div>
        ))}
        {invoices.length > 3 && (
          <div className={styles.viewAllLink}>
            <a href="/client/invoices">View All Invoices</a>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2>Open Support Tickets</h2>
        {openTickets.length > 0 ? (
          openTickets.slice(0, 3).map((ticket) => (
            <div key={ticket._id} className={styles.ticketItem}>
              <span>Ticket #{ticket._id.substring(20)}</span>
              <span>Subject: {ticket.subject}</span>
              <span className={styles.priority}>{ticket.priority} Priority</span>
              <span className={styles.status}>{ticket.status}</span>
              <a href={`/client/support-tickets/${ticket._id}`} className={styles.viewButton}>View</a>
            </div>
          ))
        ) : (
          <p>No open support tickets.</p>
        )}
        {supportTickets.length > 3 && (
          <div className={styles.viewAllLink}>
            <a href="/client/support-tickets">View All Support Tickets</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;