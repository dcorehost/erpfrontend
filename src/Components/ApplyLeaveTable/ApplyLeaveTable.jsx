
import React, { useEffect, useState } from "react";
import styles from "./ApplyLeaveTable.module.css"; 
import httpServices from "../Httpservices/httpservices"; 
import Auth from "../Services/Auth";
import axios from "axios";

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
        const token = Auth.getToken();
        const response = await axios.get("/get-upcoming-leave", {
          baseURL: "http://209.74.89.83/erpbackend",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        setLeaveApplications(response.data.leaveDetails); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming leave:", error);
        setError(error.response?.data?.message || error.message);
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

  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(leaveApplications.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <h2>Upcoming Leave Applications</h2>
      <div className={styles.tableWrapper}>
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
              <th>Created At</th>
              <th>Updated At</th>
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
                <td>{leave.createdAt}</td>
                <td>{leave.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Arrow Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          &lt; Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(leaveApplications.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(leaveApplications.length / itemsPerPage)}
          className={styles.paginationButton}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default ApplyLeaveTable;
