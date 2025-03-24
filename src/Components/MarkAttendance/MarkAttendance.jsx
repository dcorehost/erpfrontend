import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./MarkAttendance.module.css";
import Auth from "../Httpservices/Auth";
import { toast } from 'react-toastify';

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: null,
    checkOutTime: null,
    location: null,
    timer: 0,
    isTimerRunning: false,
  });

  const [timeSpent, setTimeSpent] = useState("00:00:00");

  useEffect(() => {
    let interval;
    if (attendanceStatus.isTimerRunning) {
      interval = setInterval(() => {
        setAttendanceStatus((prevState) => ({
          ...prevState,
          timer: prevState.timer + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [attendanceStatus.isTimerRunning]);

  useEffect(() => {
    const hours = Math.floor(attendanceStatus.timer / 3600);
    const minutes = Math.floor((attendanceStatus.timer % 3600) / 60);
    const seconds = attendanceStatus.timer % 60;
    setTimeSpent(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }, [attendanceStatus.timer]);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            alert("Unable to fetch your location. Please enable location services.");
            reject(error);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const handleCheckIn = async () => {
    try {
      const token = Auth.getToken();
      if (!token) {
        alert('User not authenticated.');
        return;
      }

      const { latitude, longitude } = await getLocation();
      const requestData = {
        latitude,
        longitude,
        accuracy: 10,
        altitude: 20,
      };

      const response = await axios.post('http://209.74.89.83/erpbackend/check-in', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const { message, location } = response.data;
      alert(message); // Use alert for success message

      setAttendanceStatus((prevState) => ({
        ...prevState,
        checkedIn: true,
        checkInTime: new Date().toLocaleTimeString(),
        isTimerRunning: true,
        location: location.formatted,
      }));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Failed to check in. Please try again.";
      alert(errorMessage); // Use alert for error messages
    }
  };

  const handleCheckOut = async () => {
    try {
      const token = Auth.getToken();
      if (!token) {
        alert('User not authenticated.');
        return;
      }

      const { latitude, longitude } = await getLocation();
      const payload = {
        latitude,
        longitude,
        accuracy: 10,
        altitude: 20,
      };

      const response = await axios.post('http://209.74.89.83/erpbackend/check-out', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const { message } = response.data;
      alert(message); // Use alert for success message

      setAttendanceStatus((prevState) => ({
        ...prevState,
        checkedOut: true,
        checkOutTime: new Date().toLocaleTimeString(),
        isTimerRunning: false,
      }));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Failed to check out. Please try again.";
      alert(errorMessage); // Use alert for error messages
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Mark Attendance</h1>
      <div className={styles.container}>
        <div className={styles.markAttendanceSection}>
          <div className={styles.buttons}>
            {!attendanceStatus.checkedIn ? (
              <button
                className={`${styles.button} ${styles.checkInButton}`}
                onClick={handleCheckIn}
              >
                Check In
              </button>
            ) : (
              <p className={styles.checkedInMessage}>
                Checked in at: {attendanceStatus.checkInTime}
              </p>
            )}

            {attendanceStatus.checkedIn && !attendanceStatus.checkedOut && (
              <button
                className={`${styles.button} ${styles.checkOutButton}`}
                onClick={handleCheckOut}
              >
                Check Out
              </button>
            )}

            {attendanceStatus.checkedOut && (
              <p className={styles.checkedOutMessage}>
                Checked out at: {attendanceStatus.checkOutTime}
              </p>
            )}
          </div>

          <div className={styles.timer}>
            <p>
              <strong>Time Spent:</strong> {timeSpent}
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <h3>Today's Details</h3>
          <div className={styles.details}>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            {attendanceStatus.location && (
              <p>
                <strong>Location:</strong> {attendanceStatus.location}
              </p>
            )}
            {attendanceStatus.checkedOut && (
              <p>
                <strong>Total Time Spent:</strong> {timeSpent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
