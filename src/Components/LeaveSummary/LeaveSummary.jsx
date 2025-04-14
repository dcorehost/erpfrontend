// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaChevronLeft, FaChevronRight, FaBars, FaCalendarAlt } from "react-icons/fa";
// import styles from "./LeaveSummary.module.css";
// // import httpServices from "../Httpservices/httpservices"; // Import the httpServices
// import Auth from "../Services/Auth";
// import axios from 'axios'


// const LeaveSummary = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedLeaveType, setSelectedLeaveType] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const openPopup = (leaveType) => {
//     setSelectedLeaveType(leaveType);
//     setShowPopup(true);
//     setShowCalendar(false); // Close the calendar when opening the popup
//   };

//   const toggleCalendar = () => {
//     // Ensure the calendar doesn't show when opening the popup
//     if (showPopup) {
//       setShowPopup(false);
//     }
//     setShowCalendar((prev) => !prev);
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
//           <button className={styles.iconButton} onClick={toggleCalendar}>
//             <FaCalendarAlt />
//           </button>
//           {showCalendar && (
//             <div className={styles.calendarPopup}>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => {
//                   setSelectedDate(date);
//                   setShowCalendar(false); // Close calendar on date select
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
//         <LeaveCard type="Casual Leave" available={0} booked={0} color="blue" onClick={() => openPopup("Casual Leave")} />
//         <LeaveCard type="Sick Leave" available={0} booked={0} color="green" onClick={() => openPopup("Sick Leave")} />
//       </div>

//       {showPopup && <ApplyLeavePopup leaveType={selectedLeaveType} onClose={() => setShowPopup(false)} />}

//       <div className={styles.holidayContainer}>
//         <HolidayCalendar />
//       </div>
//     </div>
//   );
// };

// // 👇 New HolidayCalendar Component
// const HolidayCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Define holidays (you can fetch this from the backend)
//   const holidays = [
//     { date: new Date(2025, 0, 1), name: "New Year's Day" },
//     { date: new Date(2025, 6, 4), name: "Independence Day" },
//     { date: new Date(2025, 11, 25), name: "Christmas Day" },
//   ];

//   const isHoliday = (date) => {
//     return holidays.some(holiday => holiday.date.toDateString() === date.toDateString());
//   };

//   const getHolidayDetails = (date) => {
//     return holidays.find(holiday => holiday.date.toDateString() === date.toDateString());
//   };

//   return (
//     <div className={styles.holidayCalendarWrapper}>
//       <div className={styles.holidayCalendarContainer}>
//         <div className={styles.calendarSection}>
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             inline
//             dayClassName={(date) => (isHoliday(date) ? styles.holiday : null)}
//           />
//         </div>
//         <div className={styles.holidayDetailsSection}>
//           <h3>Holiday Details</h3>
//           {isHoliday(selectedDate) ? (
//             <div>
//               <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
//               <p><strong>Holiday:</strong> {getHolidayDetails(selectedDate).name}</p>
//             </div>
//           ) : (
//             <p>No holiday on this date.</p>
//           )}
//         </div>
//       </div>
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

// // Apply Leave Popup


// // ApplyLeavePopup Component
// // ApplyLeavePopup Component
// const ApplyLeavePopup = ({ leaveType, onClose }) => {
//   const [formData, setFormData] = useState({
//     from: null, // Use null for DatePicker
//     to: null,   // Use null for DatePicker
//     leaveType: leaveType,
//     reason: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [successMessage, setSuccessMessage] = useState(null); // Success message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDateChange = (date, field) => {
//     setFormData({
//       ...formData,
//       [field]: date,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsSubmitting(true); // Set loading state
//     setError(null); // Clear previous errors
//     setSuccessMessage(null); // Clear previous success messages

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 120000); // 120-second timeout


//     const token = Auth.getToken();
//   if (!token) {
//     toast.error('User not authenticated.');
//     return null;
//   }


//     try {
//       // Prepare the data to be sent
//       const requestData = {
//         from: formData.from ? formData.from.toISOString().split("T")[0] : "", // Format date as "YYYY-MM-DD"
//         to: formData.to ? formData.to.toISOString().split("T")[0] : "", // Format date as "YYYY-MM-DD"
//         leaveType: formData.leaveType,
//         reason: formData.reason,
//       };

//       console.log("Sending request data:", requestData); // Log the request data

//       // Send the request
//       const response = await axios.post("http://209.74.89.83/erpbackend/apply-leave", requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//       } );



      

//       clearTimeout(timeoutId);

//       // Handle the response
//       console.log("Leave application successful:", response);
//       setSuccessMessage(response.message || "Leave request sent for approval.");
//       alert("Leave request sent for approval.");
//       onClose(); // Close the popup
//     } catch (error) {
//       console.error("Error submitting leave application:", error);
//       setError(error.message || "Failed to submit leave application. Please try again later.");
//     } finally {
//       setIsSubmitting(false); // Reset loading state
//     }
//   };

//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popup}>
//         <div className={styles.popupHeader}>
//           <h3>Apply Leave</h3>
//           <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <label>Leave Type *</label>
//           <select
//             name="leaveType"
//             value={formData.leaveType}
//             onChange={handleChange}
//             disabled={isSubmitting} // Disable during submission
//           >
//             <option value="Casual Leave">Casual Leave</option>
//             <option value="Sick Leave">Sick Leave</option>
//           </select>

//           <label>From *</label>
//           <DatePicker
//             selected={formData.from}
//             onChange={(date) => handleDateChange(date, "from")}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Select start date"
//             className={styles.dateInput}
//             disabled={isSubmitting} // Disable during submission
//             required
//           />

//           <label>To *</label>
//           <DatePicker
//             selected={formData.to}
//             onChange={(date) => handleDateChange(date, "to")}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Select end date"
//             className={styles.dateInput}
//             disabled={isSubmitting} // Disable during submission
//             required
//           />

//           <label>Reason for Leave *</label>
//           <textarea
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             disabled={isSubmitting} // Disable during submission
//             required
//           ></textarea>

//           {/* Display error message */}
//           {error && <div className={styles.errorMessage}>{error}</div>}

//           {/* Display success message */}
//           {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

//           <div className={styles.popupActions}>
//             <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//             <button
//               type="button"
//               className={styles.cancelButton}
//               onClick={onClose}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LeaveSummary;



import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaBars, FaCalendarAlt } from "react-icons/fa";
import styles from "./LeaveSummary.module.css";
import Auth from "../Services/Auth";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveSummary = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leaveData, setLeaveData] = useState({
    casualLeaves: { available: 0, booked: 0 },
    sickLeaves: { available: 0, booked: 0 }
  });
  const [loading, setLoading] = useState(true);

  // Fetch leave data on component mount
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const token = Auth.getToken();
        if (!token) {
          toast.error('User not authenticated.');
          return;
        }
  
        const response = await axios.get(
          "http://209.74.89.83/erpbackend/get-user-leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.data && response.data.users) {
          const { casualLeaves, sickLeaves } = response.data.users.leaveBalance; // यहां सुधार करें
          setLeaveData({
            casualLeaves: {
              available: casualLeaves?.available || 0,
              booked: casualLeaves?.booked || 0
            },
            sickLeaves: {
              available: sickLeaves?.available || 0,
              booked: sickLeaves?.booked || 0
            }
          });
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        toast.error("Failed to fetch leave data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaveData();
  }, []);

  const openPopup = (leaveType) => {
    setSelectedLeaveType(leaveType);
    setShowPopup(true);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    if (showPopup) {
      setShowPopup(false);
    }
    setShowCalendar((prev) => !prev);
  };

  const handleLeaveSubmitSuccess = () => {
    // Refresh leave data after successful submission
    const fetchLeaveData = async () => {
      try {
        const token = Auth.getToken();
        if (!token) {
          toast.error('User not authenticated.');
          return;
        }

        const response = await axios.get(
          "http://209.74.89.83/erpbackend/get-user-leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data && response.data.users) {
          const { casualLeaves, sickLeaves } = response.data.users;
          setLeaveData({
            casualLeaves: {
              available: casualLeaves?.available || 0,
              booked: casualLeaves?.booked || 0
            },
            sickLeaves: {
              available: sickLeaves?.available || 0,
              booked: sickLeaves?.booked || 0
            }
          });
        }
      } catch (error) {
        console.error("Error refreshing leave data:", error);
      }
    };

    fetchLeaveData();
  };

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.headerContainer}>
        <p className={styles.statsText}>
          Leave booked this year: <span className={styles.statsValue}>
            {leaveData.casualLeaves.booked + leaveData.sickLeaves.booked}
          </span> | Absent: <span className={styles.statsValue}>0</span>
        </p>

        <div className={styles.dateNavigator}>
          <button className={styles.navButton}><FaChevronLeft /></button>
          <span>01-Jan-2025 - 31-Dec-2025</span>
          <button className={styles.navButton}><FaChevronRight /></button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.iconButton}><FaBars /></button>
          <button className={styles.iconButton} onClick={toggleCalendar}>
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
        {loading ? (
          <p>Loading leave data...</p>
        ) : (
          <>
            <LeaveCard 
              type="Casual Leave" 
              available={leaveData.casualLeaves.available} 
              booked={leaveData.casualLeaves.booked} 
              color="blue" 
              onClick={() => openPopup("Casual Leave")} 
            />
            <LeaveCard 
              type="Sick Leave" 
              available={leaveData.sickLeaves.available} 
              booked={leaveData.sickLeaves.booked} 
              color="green" 
              onClick={() => openPopup("Sick Leave")} 
            />
          </>
        )}
      </div>

      {showPopup && (
        <ApplyLeavePopup 
          leaveType={selectedLeaveType} 
          onClose={() => setShowPopup(false)} 
          onSuccess={handleLeaveSubmitSuccess}
        />
      )}

      <div className={styles.holidayContainer}>
        <HolidayCalendar />
      </div>
    </div>
  );
};

// HolidayCalendar Component (unchanged)
const HolidayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

// Leave Card Component (unchanged)
const LeaveCard = ({ type, available, booked, color, onClick }) => {
  return (
    <div className={styles.card} style={{ borderColor: color }} onClick={onClick}>
      <h3>{type}</h3>
      <p>Available: <span className={styles.available}>{available}</span></p>
      <p>Booked: <span className={styles.booked}>{booked}</span></p>
    </div>
  );
};

// ApplyLeavePopup Component (updated with onSuccess prop)
const ApplyLeavePopup = ({ leaveType, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    from: null,
    to: null,
    leaveType: leaveType,
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      const requestData = {
        from: formData.from ? formData.from.toISOString().split("T")[0] : "",
        to: formData.to ? formData.to.toISOString().split("T")[0] : "",
        leaveType: formData.leaveType,
        reason: formData.reason,
      };

      const response = await axios.post(
        "http://209.74.89.83/erpbackend/apply-leave", 
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage(response.data?.message || "Leave request sent for approval.");
      toast.success("Leave request sent for approval.");
      onSuccess(); // Call the success handler to refresh data
      onClose();
    } catch (error) {
      console.error("Error submitting leave application:", error);
      setError(error.response?.data?.message || "Failed to submit leave application. Please try again later.");
      toast.error(error.response?.data?.message || "Failed to submit leave application.");
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            required
          />

          <label>To *</label>
          <DatePicker
            selected={formData.to}
            onChange={(date) => handleDateChange(date, "to")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className={styles.dateInput}
            disabled={isSubmitting}
            required
          />

          <label>Reason for Leave *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          ></textarea>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

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