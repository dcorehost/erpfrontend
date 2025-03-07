import { useState } from "react";
import { X } from "lucide-react"; // Lucide-react icons
import styles from "./LeaveBalance.module.css";

const LeaveBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const leaveData = [
    { type: "Casual Leave", available: 12, booked: 0, color: styles.casual },
    { type: "Compensatory off", available: 0, booked: 0, color: styles.compensatory },
    { type: "Leave Without Pay", available: 0, booked: 0, color: styles.unpaid },
  ];

  return (
    <div className={styles.container}>
      {leaveData.map((leave, index) => (
        <div key={index} className={`${styles.leaveCard} ${leave.color}`}>
          <div className={styles.leaveHeader}>{leave.type}</div>
          <div className={styles.leaveDetails}>
            <span>Available: <strong>{leave.available} {leave.available === 1 ? "day" : "days"}</strong></span>
            <span>Booked: <strong>{leave.booked} {leave.booked === 1 ? "day" : "days"}</strong></span>
          </div>
          <button className={styles.applyButton} onClick={() => setIsModalOpen(true)}>Apply Leave</button>
        </div>
      ))}

      {/* Modal for Apply Leave */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Close Icon (Cross) */}
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>

            <h2>Apply Leave</h2>

            <label>Leave Type:</label>
            <select>
              <option>Casual Leave</option>
              <option>Compensatory Off</option>
              <option>Leave Without Pay</option>
            </select>

            <label>From Date:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

            <label>To Date:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

            <label>Reason:</label>
            <textarea placeholder="Enter reason for leave" />

            <div className={styles.modalButtons}>
              <button className={styles.submitButton}>Submit</button>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveBalance;
