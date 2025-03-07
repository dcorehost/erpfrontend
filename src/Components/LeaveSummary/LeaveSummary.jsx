import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaBars, FaCalendarAlt } from "react-icons/fa";
import styles from "./LeaveSummary.module.css";

const LeaveSummary = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openPopup = (leaveType) => {
    setSelectedLeaveType(leaveType);
    setShowPopup(true);
  };

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.headerContainer}>
        <p className={styles.statsText}>
          Leave booked this year: <span className={styles.statsValue}>0</span> | Absent: <span className={styles.statsValue}>0</span>
        </p>
       
        <div className={styles.dateNavigator}>
          <button className={styles.navButton}><FaChevronLeft /></button>
          <span>01-Jan-2025 - 31-Dec-2025</span>
          <button className={styles.navButton}><FaChevronRight /></button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.iconButton}><FaBars /></button>
          {/* Calendar Icon to Open Date Picker */}
          <button className={styles.iconButton} onClick={() => setShowCalendar(!showCalendar)}>
            <FaCalendarAlt />
          </button>
          {showCalendar && (
            <div className={styles.calendarPopup}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                inline
              />
            </div>
          )}
          <button className={styles.applyButton} onClick={() => openPopup("Casual Leave")}>
            Apply Leave
          </button>
        </div>
      </div>

      {/* Leave Summary */}
      <div className={styles.header}>
        {/* <h2>Leave Summary</h2> */}
      </div>

      <div className={styles.summary}>
        <LeaveCard type="Casual Leave" available={12} booked={0} color="blue" onClick={() => openPopup("Casual Leave")} />
        <LeaveCard type="Sick Leave" available={0} booked={0} color="green" onClick={() => openPopup("Sick Leave")} />
        {/* <LeaveCard type="Leave Without Pay" available={0} booked={0} color="red" onClick={() => openPopup("Leave Without Pay")} /> */}
      </div>

      <LeaveSection title="" options={["Upcoming Leave & Holidays", "Upcoming Leave", "Upcoming Holidays"]} />
      <LeaveSection title="" options={["Past Leave & Holidays", "Past Leave", "Past Holidays"]} />

      {showPopup && <ApplyLeavePopup leaveType={selectedLeaveType} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

// Leave Card Component
const LeaveCard = ({ type, available, booked, color, onClick }) => {
  return (
    <div className={styles.card} style={{ borderColor: color }} onClick={onClick}>
      <h3>{type}</h3>
      <p>Available: <span className={styles.available}>{available}</span></p>
      <p>Booked: <span className={styles.booked}>{booked}</span></p>
    </div>
  );
};

// Leave Section Component
const LeaveSection = ({ title, options }) => {
  return (
    <div className={styles.section}>
      <h4>{title}</h4>
      <select className={styles.dropdown}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <div className={styles.noData}>No Data Found</div>
    </div>
  );
};

// Apply Leave Popup
const ApplyLeavePopup = ({ leaveType, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>Apply Leave</h3>
          <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
        </div>

        <label>Leave Type *</label>
        <select value={leaveType}>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          {/* <option value="Leave Without Pay">Leave Without Pay</option> */}
        </select>

        <label>From  *</label>
        <input type="date" />

        <label>To  *</label>
        <input type="date" />

        <label>Reason for Leave *</label>
        <textarea></textarea>

        <div className={styles.popupActions}>
          <button className={styles.submitButton}>Submit</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveSummary;
