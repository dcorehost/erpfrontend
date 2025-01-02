// src/components/LeaveManagement.jsx
import React, { useState } from 'react';
import styles from './LeaveManagement.module.css';

const LeaveManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeContact, setEmployeeContact] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeaveRequest = {
      employeeId,
      employeeName,
      employeeContact,
      leaveType,
      startDate,
      endDate,
    };

    setLeaveRequests([...leaveRequests, newLeaveRequest]);

    // Clear the form fields after submission
    setEmployeeId('');
    setEmployeeName('');
    setEmployeeContact('');
    setLeaveType('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className={styles.container}>
      <h2>Leave Management System</h2>

      <form onSubmit={handleSubmit} className={styles.leaveForm}>
        <div className={styles.formGroup}>
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employeeContact">Employee Contact (Mobile/E-mail):</label>
          <input
            type="text"
            id="employeeContact"
            value={employeeContact}
            onChange={(e) => setEmployeeContact(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal Leave</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Leave Request</button>
      </form>

      <div className={styles.leaveList}>
        <h3>Leave Requests</h3>
        <ul>
          {leaveRequests.map((request, index) => (
            <li key={index}>
              <strong>Employee ID:</strong> {request.employeeId} <br />
              <strong>Name:</strong> {request.employeeName} <br />
              <strong>Contact:</strong> {request.employeeContact} <br />
              <strong>Leave Type:</strong> {request.leaveType} <br />
              <strong>From:</strong> {request.startDate} <br />
              <strong>To:</strong> {request.endDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveManagement;
