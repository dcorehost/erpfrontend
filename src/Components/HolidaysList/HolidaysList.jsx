import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HolidaysList.module.css";
import Auth from "../Services/Auth";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token = Auth.getToken();

  useEffect(() => {
    if (!token) {
      toast.error("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "http://209.74.89.83/erpbackend/get-own-holidays",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHolidays(response.data.holidays || []);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        toast.error("Failed to fetch holidays.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [token]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredHolidays = holidays.filter((holiday) =>
    holiday.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      toast.error("Please enter a search term.");
    }
  };

  if (!token) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.heading}>🌴 My Holidays</h2>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {/* <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button> */}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.skeletonWrapper}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.skeletonRow}></div>
            ))}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredHolidays.length > 0 ? (
                filteredHolidays.map((holiday, index) => (
                  <tr key={index} className={styles.clickableRow}>
                    <td>{index + 1}</td>
                    <td>{formatDate(holiday.startDate)}</td>
                    <td>{formatDate(holiday.endDate)}</td>
                    <td>{holiday.description}</td>
                    <td>{formatDate(holiday.createdAt)}</td>
                    <td>{formatDate(holiday.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    😕 No holidays found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HolidayList;
