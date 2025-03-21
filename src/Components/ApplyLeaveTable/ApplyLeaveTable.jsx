import React, { useEffect, useState } from "react";
import styles from "./ApplyLeaveTable.module.css"; // Import CSS module
import httpServices from "../Httpservices/httpservices"; // Import httpServices

const ApplyLeaveTable = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch upcoming leave data
  useEffect(() => {
    const fetchUpcomingLeave = async () => {
      try {
        const data = await httpServices.get("/get-upcoming-leave");
        setLeaveApplications(data.leaveDetails); // Assuming the response has a `leaveDetails` field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming leave:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUpcomingLeave();
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
      <h2>Upcoming Leave Applications</h2>
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

export default ApplyLeaveTable;
