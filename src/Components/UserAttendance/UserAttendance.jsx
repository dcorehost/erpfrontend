import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../Httpservices/Auth";
import styles from "./UserAttendance.module.css";

const UserAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    fetchAttendanceRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchAttendanceRecords = async (customSearch = false) => {
    const token = Auth.getToken();
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    setIsLoading(true);
    let url = "";

    if (customSearch && startDate && endDate) {
      const start = new Date(startDate);
      const month = start.getMonth() + 1;
      const year = start.getFullYear();

      url = `http://209.74.89.83/erpbackend/get-attendance-Report-forAdmin?startDate=${startDate}&endDate=${endDate}&month=${month}&year=${year}`;
    } else {
      switch (filter) {
        case "daily":
          url = "http://209.74.89.83/erpbackend/get-dailyReport-forAdmin";
          break;
        case "weekly":
          url = "http://209.74.89.83/erpbackend/get-weeklyReport-forAdmin";
          break;
        case "monthly":
          url = "http://209.74.89.83/erpbackend/get-monthlyReport-forAdmin";
          break;
        default:
          url = "http://209.74.89.83/erpbackend/get-dailyReport-forAdmin";
      }
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setAttendanceRecords(response.data.report);
        setSearchActive(customSearch);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    fetchAttendanceRecords(true);
  };

  const resetSearch = () => {
    setStartDate("");
    setEndDate("");
    setSearchActive(false);
    fetchAttendanceRecords();
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceRecords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(attendanceRecords.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format time spent for better readability
  const formatTimeSpent = (time) => {
    if (!time) return "N/A";
    const parts = time.split(":");
    if (parts.length === 3) {
      return `${parts[0]}h ${parts[1]}m`;
    }
    return time;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {/* <span className={styles.titleIcon}>📊</span> */}
          Attendance Summary
        </h1>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${
              filter === "daily" ? styles.active : ""
            }`}
            onClick={() => setFilter("daily")}
          >
            <span className={styles.buttonIcon}>📅</span> Daily
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "weekly" ? styles.active : ""
            }`}
            onClick={() => setFilter("weekly")}
          >
            <span className={styles.buttonIcon}>🗓️</span> Weekly
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "monthly" ? styles.active : ""
            }`}
            onClick={() => setFilter("monthly")}
          >
            <span className={styles.buttonIcon}>📆</span> Monthly
          </button>
        </div>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.searchSection}>
          <div className={styles.dateSearch}>
            <div className={styles.dateInputGroup}>
              <label>From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label>To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <button onClick={handleSearch} className={styles.searchButton}>
              <span className={styles.searchIcon}>🔍</span> Search
            </button>
            {searchActive && (
              <button onClick={resetSearch} className={styles.resetButton}>
                <span className={styles.resetIcon}>🔄</span> Reset
              </button>
            )}
          </div>
          <div className={styles.resultsInfo}>
            {!isLoading && (
              <span className={styles.recordCount}>
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, attendanceRecords.length)} of{" "}
                {attendanceRecords.length} records
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p>Loading attendance data...</p>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Time Spent</th>
                    <th>Date</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((record, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? styles.evenRow : styles.oddRow
                        }
                      >
                        <td data-label="Employee ID">{record.employeeId}</td>
                        <td data-label="User">
                          <div className={styles.userCell}>
                            <span className={styles.userName}>
                              {record.displayName}
                            </span>
                            <span className={styles.userDetail}>
                              @{record.username}
                            </span>
                          </div>
                        </td>
                        <td data-label="Email">{record.emailId}</td>
                        <td data-label="Status">
                          <span
                            className={`${styles.statusBadge} ${
                              record.status === "Present"
                                ? styles.present
                                : styles.absent
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td data-label="Check-in">
                          {record.checkInStatus
                            ? new Date(
                                record.checkInStatus
                              ).toLocaleTimeString()
                            : "N/A"}
                        </td>
                        <td data-label="Check-out">
                          {record.checkOutStatus
                            ? new Date(
                                record.checkOutStatus
                              ).toLocaleTimeString()
                            : "N/A"}
                        </td>
                        <td data-label="Time Spent">
                          {formatTimeSpent(record.timeSpent)}
                        </td>
                        <td data-label="Date">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </td>
                        <td>{new Date(record.createdAt).toLocaleString()}</td>
                        <td>{new Date(record.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className={styles.noData}>
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  &laquo; Previous
                </button>

                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`${styles.pageButton} ${
                          currentPage === pageNum ? styles.activePage : ""
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className={styles.pageEllipsis}>...</span>
                  )}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.activePage : ""
                      }`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserAttendance;
