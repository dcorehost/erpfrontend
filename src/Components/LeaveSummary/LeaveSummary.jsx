// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaChevronLeft, FaChevronRight, FaBars, FaCalendarAlt } from "react-icons/fa";
// import styles from "./LeaveSummary.module.css";

// const LeaveSummary = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedLeaveType, setSelectedLeaveType] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const openPopup = (leaveType) => {
//     setSelectedLeaveType(leaveType);
//     setShowPopup(true);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Top Section */}
//       <div className={styles.headerContainer}>
//         <p className={styles.statsText}>
//           Leave booked this year: <span className={styles.statsValue}>0</span> | Absent: <span className={styles.statsValue}>0</span>
//         </p>
       
//         <div className={styles.dateNavigator}>
//           <button className={styles.navButton}><FaChevronLeft /></button>
//           <span>01-Jan-2025 - 31-Dec-2025</span>
//           <button className={styles.navButton}><FaChevronRight /></button>
//         </div>

//         <div className={styles.actionButtons}>
//           <button className={styles.iconButton}><FaBars /></button>
//           {/* Calendar Icon to Open Date Picker */}
//           <button className={styles.iconButton} onClick={() => setShowCalendar(!showCalendar)}>
//             <FaCalendarAlt />
//           </button>
//           {showCalendar && (
//             <div className={styles.calendarPopup}>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => {
//                   setSelectedDate(date);
//                   setShowCalendar(false);
//                 }}
//                 inline
//               />
//             </div>
//           )}
//           <button className={styles.applyButton} onClick={() => openPopup("Casual Leave")}>
//             Apply Leave
//           </button>
//         </div>
//       </div>

//       {/* Leave Summary */}
//       <div className={styles.header}>
//         {/* <h2>Leave Summary</h2> */}
//       </div>

//       <div className={styles.summary}>
//         <LeaveCard type="Casual Leave" available={12} booked={0} color="blue" onClick={() => openPopup("Casual Leave")} />
//         <LeaveCard type="Sick Leave" available={0} booked={0} color="green" onClick={() => openPopup("Sick Leave")} />
//         {/* <LeaveCard type="Leave Without Pay" available={0} booked={0} color="red" onClick={() => openPopup("Leave Without Pay")} /> */}
//       </div>

//       <LeaveSection title="" options={["Upcoming Leave & Holidays", "Upcoming Leave", "Upcoming Holidays"]} />
//       <LeaveSection title="" options={["Past Leave & Holidays", "Past Leave", "Past Holidays"]} />

//       {showPopup && <ApplyLeavePopup leaveType={selectedLeaveType} onClose={() => setShowPopup(false)} />}
//     </div>
//   );
// };

// // Leave Card Component
// const LeaveCard = ({ type, available, booked, color, onClick }) => {
//   return (
//     <div className={styles.card} style={{ borderColor: color }} onClick={onClick}>
//       <h3>{type}</h3>
//       <p>Available: <span className={styles.available}>{available}</span></p>
//       <p>Booked: <span className={styles.booked}>{booked}</span></p>
//     </div>
//   );
// };

// // Leave Section Component
// const LeaveSection = ({ title, options }) => {
//   return (
//     <div className={styles.section}>
//       <h4>{title}</h4>
//       <select className={styles.dropdown}>
//         {options.map((option, index) => (
//           <option key={index} value={option}>{option}</option>
//         ))}
//       </select>
//       <div className={styles.noData}>No Data Found</div>
//     </div>
//   );
// };

// // Apply Leave Popup
// const ApplyLeavePopup = ({ leaveType, onClose }) => {
//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popup}>
//         <div className={styles.popupHeader}>
//           <h3>Apply Leave</h3>
//           <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
//         </div>

//         <label>Leave Type *</label>
//         <select value={leaveType}>
//           <option value="Casual Leave">Casual Leave</option>
//           <option value="Sick Leave">Sick Leave</option>
//           {/* <option value="Leave Without Pay">Leave Without Pay</option> */}
//         </select>

//         <label>From  *</label>
//         <input type="date" />

//         <label>To  *</label>
//         <input type="date" />

//         <label>Reason for Leave *</label>
//         <textarea></textarea>

//         <div className={styles.popupActions}>
//           <button className={styles.submitButton}>Submit</button>
//           <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveSummary;

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
  const [formData, setFormData] = useState({
    from: null, // Use null for DatePicker
    to: null,   // Use null for DatePicker
    leaveType: leaveType,
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Set loading state
    setError(null); // Clear previous errors

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120-second timeout

    try {
      const response = await fetch("http://209.74.89.83/erpbackend/apply-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: formData.from ? formData.from.toISOString().split("T")[0] : "",
          to: formData.to ? formData.to.toISOString().split("T")[0] : "",
          leaveType: formData.leaveType,
          reason: formData.reason,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle non-JSON responses
        const text = await response.text();
        throw new Error(text || "Failed to submit leave application");
      }

      const data = await response.json();
      console.log("Leave application successful:", data);
      alert("Leave request sent for approval.");
      onClose();
    } catch (error) {
      console.error("Error submitting leave application:", error);
      setError(error.message || "Failed to submit leave application. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>Apply Leave</h3>
          <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <label>Leave Type *</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            disabled={isSubmitting} // Disable during submission
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>

          <label>From *</label>
          <DatePicker
            selected={formData.from}
            onChange={(date) => handleDateChange(date, "from")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className={styles.dateInput}
            disabled={isSubmitting} // Disable during submission
            required
          />

          <label>To *</label>
          <DatePicker
            selected={formData.to}
            onChange={(date) => handleDateChange(date, "to")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className={styles.dateInput}
            disabled={isSubmitting} // Disable during submission
            required
          />

          <label>Reason for Leave *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isSubmitting} // Disable during submission
            required
          ></textarea>

          {/* Display error message */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.popupActions}>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveSummary;