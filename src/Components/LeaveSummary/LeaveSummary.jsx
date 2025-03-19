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
    setShowCalendar(false); // Close the calendar when opening the popup
  };

  const toggleCalendar = () => {
    // Ensure the calendar doesn't show when opening the popup
    if (showPopup) {
      setShowPopup(false);
    }
    setShowCalendar((prev) => !prev);
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
          <button className={styles.iconButton} onClick={toggleCalendar}>
            <FaCalendarAlt />
          </button>
          {showCalendar && (
            <div className={styles.calendarPopup}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false); // Close calendar on date select
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
      </div>

      {showPopup && <ApplyLeavePopup leaveType={selectedLeaveType} onClose={() => setShowPopup(false)} />}

      <div className={styles.holidayContainer}>
        <HolidayCalendar />
      </div>
    </div>
  );
};

// 👇 New HolidayCalendar Component
const HolidayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define holidays (you can fetch this from the backend)
  const holidays = [
    { date: new Date(2025, 0, 1), name: "New Year's Day" },
    { date: new Date(2025, 6, 4), name: "Independence Day" },
    { date: new Date(2025, 11, 25), name: "Christmas Day" },
  ];

  const isHoliday = (date) => {
    return holidays.some(holiday => holiday.date.toDateString() === date.toDateString());
  };

  const getHolidayDetails = (date) => {
    return holidays.find(holiday => holiday.date.toDateString() === date.toDateString());
  };

  return (
    <div className={styles.holidayCalendarWrapper}>
      <div className={styles.holidayCalendarContainer}>
        <div className={styles.calendarSection}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            dayClassName={(date) => (isHoliday(date) ? styles.holiday : null)}
          />
        </div>
        <div className={styles.holidayDetailsSection}>
          <h3>Holiday Details</h3>
          {isHoliday(selectedDate) ? (
            <div>
              <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
              <p><strong>Holiday:</strong> {getHolidayDetails(selectedDate).name}</p>
            </div>
          ) : (
            <p>No holiday on this date.</p>
          )}
        </div>
      </div>
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
