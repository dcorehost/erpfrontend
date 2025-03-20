// src/Components/PastLeaveTable/PastLeaveTable.jsx
import React, { useEffect, useState } from "react";
import styles from "./PastLeaveTable.module.css"; // Import CSS module
import httpServices from "../Httpservices/httpservices"; // Import httpServices

const PastLeaveTable = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch all leave data
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const data = await httpServices.get("/get-upcoming-leave");
        // Filter leave applications with "Completed" state
        const pastLeaves = data.leaveDetails.filter(
          (leave) => leave.state === "Completed"
        );
        setLeaveApplications(pastLeaves);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveApplications.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <h2>Past Leave Applications</h2>
      <table className={styles.leaveTable}>
        <thead>
          <tr>
          <th>Username</th>
          <th>Email</th>
            <th>From</th>
            <th>To</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
           
            
          </tr>
        </thead>
        <tbody>
          {currentItems.map((leave) => (
            <tr key={leave._id}>
                 <td>{leave.userId.username}</td>
                 <td>{leave.userId.contact.emailId}</td>
              <td>{new Date(leave.from).toLocaleDateString()}</td>
              <td>{new Date(leave.to).toLocaleDateString()}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.reason}</td>
              <td>{leave.state}</td>
             
             
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(leaveApplications.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PastLeaveTable;