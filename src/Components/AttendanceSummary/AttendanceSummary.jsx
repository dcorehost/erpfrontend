import React, { useState, useEffect } from "react";
import styles from "./AttendanceSummary.module.css";
import axios from "axios";
import Auth from "../Httpservices/Auth";

// const getFormattedAddress = async (latitude, longitude) => {
//   const apiKey = '169f2b7e9da14a9abbc3375ce9214f2c'; // Replace with your actual API key
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//   console.log("ur",url)

//   try {
//     const response = await axios.get(url);
//     console.log("Geocoding API Response:", response.data);

//     if (response.data.status === 'OK') {
//       return response.data.results[0].formatted_address;
//     } else {
//       console.error("Geocoding error:", response.data.status);
//       return `${latitude}, ${longitude}`;
//     }
//   } catch (error) {
//     console.error("Error fetching address:", error);  
//     return `${latitude}, ${longitude}`;
//   }
// };

const AttendanceSummary = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [formattedLocations, setFormattedLocations] = useState({});
  const [filter, setFilter] = useState("daily");

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      const token = Auth.getToken();
      if (!token) {
        alert("User not authenticated.");
        return;
      }

      let url;
      switch (filter) {
        case "daily":
          url = "http://209.74.89.83/erpbackend/get-daily-report";
          break;
        case "weekly":
          url = "http://209.74.89.83/erpbackend/get-weekly-report";
          break;
        case "monthly":
          url = "http://209.74.89.83/erpbackend/get-monthly-report";
          break;
        default:
          url = "http://209.74.89.83/erpbackend/get-daily-report";
      }
      console.log("Current Filter:", filter);

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("API Response:", response.data);

        if (response.status === 200) {
          setAttendanceRecords(response.data.report);

          const locationsPromises = response.data.report.map(async (record) => {
            if (record.location) {
              const { latitude, longitude } = record.location;
              console.log("Fetching address for:", latitude, longitude);
              const address = await getFormattedAddress(latitude, longitude);
              return { userId: record.userId, address };
            }
            return { userId: record.userId, address: "N/A" };
          });

          const locations = await Promise.all(locationsPromises);
          const locationMap = locations.reduce((acc, { userId, address }) => {
            acc[userId] = address;
            return acc;
          }, {});
          setFormattedLocations(locationMap);
        } else {
          console.error("Error fetching attendance records:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, [filter]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Attendance Summary</h1>
      <div className={styles.container}>
        <div className={styles.filterButtons}>
          <button className={`${styles.filterButton} ${filter === "daily" ? styles.active : ""}`} onClick={() => setFilter("daily")}>Daily</button>
          <button className={`${styles.filterButton} ${filter === "weekly" ? styles.active : ""}`} onClick={() => setFilter("weekly")}>Weekly</button>
          <button className={`${styles.filterButton} ${filter === "monthly" ? styles.active : ""}`} onClick={() => setFilter("monthly")}>Monthly</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Id</th>
                <th>User name</th>
                <th>Display name</th>
                <th>Email Id</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>
                <th>Time Spent</th>
                {/* <th>Created At</th>
                <th>Updated At</th> */}
                {/* <th>Location</th> */}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.userId}</td>
                  <td>{record.username}</td>
                  <td>{record.displayName}</td>
                  <td>{record.emailId}</td>
                  <td>{record.phone}</td>
                  <td>{record.status}</td>
                  <td>{new Date(record.checkInStatus).toLocaleTimeString()}</td>
                  <td>{record.checkOutStatus ? new Date(record.checkOutStatus).toLocaleTimeString() : "N/A"}</td>
                  <td>{record.timeSpent}</td>
                  {/* <td>{record.createdAt}</td>
                  <td>{record.updatedAt}</td> */}

                  {/* <td>{formattedLocations[record.userId] || "Loading..."}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
