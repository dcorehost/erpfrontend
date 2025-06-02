// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlineClose } from "react-icons/ai";
// import styles from "./LeaveSummary.module.css";
// import Auth from "../Services/Auth";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LeaveSummary = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedLeaveType, setSelectedLeaveType] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [leaveData, setLeaveData] = useState({
//     casualLeaves: { available: 0, booked: 0 },
//     sickLeaves: { available: 0, booked: 0 },
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const token = Auth.getToken();
//         if (!token) {
//           toast.error("User not authenticated.");
//           return;
//         }

//         const response = await axios.get(
//           "http://209.74.89.83/erpbackend/get-user-leaves",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data && response.data.users) {
//           const { casualLeaves, sickLeaves } = response.data.users.leaveBalance;
//           setLeaveData({
//             casualLeaves: {
//               available: casualLeaves?.available || 0,
//               booked: casualLeaves?.booked || 0,
//             },
//             sickLeaves: {
//               available: sickLeaves?.available || 0,
//               booked: sickLeaves?.booked || 0,
//             },
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching leave data:", error);
//         toast.error("Failed to fetch leave data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   const openPopup = (leaveType) => {
//     setSelectedLeaveType(leaveType);
//     setShowPopup(true);
//     setShowCalendar(false);
//   };

//   const toggleCalendar = () => {
//     if (showPopup) {
//       setShowPopup(false);
//     }
//     setShowCalendar((prev) => !prev);
//   };

//   const handleLeaveSubmitSuccess = () => {
//     const fetchLeaveData = async () => {
//       try {
//         const token = Auth.getToken();
//         if (!token) {
//           toast.error("User not authenticated.");
//           return;
//         }

//         const response = await axios.get(
//           "http://209.74.89.83/erpbackend/get-user-leaves",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data && response.data.users) {
//           const { casualLeaves, sickLeaves } = response.data.users;
//           setLeaveData({
//             casualLeaves: {
//               available: casualLeaves?.available || 0,
//               booked: casualLeaves?.booked || 0,
//             },
//             sickLeaves: {
//               available: sickLeaves?.available || 0,
//               booked: sickLeaves?.booked || 0,
//             },
//           });
//         }
//       } catch (error) {
//         console.error("Error refreshing leave data:", error);
//       }
//     };

//     fetchLeaveData();
//   };

//   return (
//     <div className={styles.container}>
//       {/* Top Section */}
//       <div className={styles.headerContainer}>
//         <div className={styles.actionButtons}>
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

//           <button
//             className={styles.applyButton}
//             onClick={() => openPopup("Casual Leave")}
//           >
//             Apply Leave
//           </button>
//         </div>
//       </div>

//       {/* Leave Summary */}
//       <div className={styles.header}></div>

//       <div className={styles.summary}>
//         {loading ? (
//           <p>Loading leave data...</p>
//         ) : (
//           <>
//             <LeaveCard
//               type="Casual Leave"
//               available={leaveData.casualLeaves.available}
//               booked={leaveData.casualLeaves.booked}
//               color="blue"
//               onClick={() => openPopup("Casual Leave")}
//             />
//             <LeaveCard
//               type="Sick Leave"
//               available={leaveData.sickLeaves.available}
//               booked={leaveData.sickLeaves.booked}
//               color="green"
//               onClick={() => openPopup("Sick Leave")}
//             />
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <ApplyLeavePopup
//           leaveType={selectedLeaveType}
//           onClose={() => setShowPopup(false)}
//           onSuccess={handleLeaveSubmitSuccess}
//         />
//       )}

//       <ToastContainer />

//       <div className={styles.holidayContainer}>
//         <HolidayCalendar />
//       </div>
//     </div>
//   );
// };

// const HolidayCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       try {
//         const token = Auth.getToken();
//         if (!token) {
//           toast.error("User not authenticated.");
//           return;
//         }

//         const response = await axios.get(
//           "http://209.74.89.83/erpbackend/get-holidays",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data?.holidays) {
//           const expanded = [];

//           response.data.holidays.forEach(
//             ({ startDate, endDate, description }) => {
//               const start = new Date(startDate);
//               const end = new Date(endDate);

//               for (
//                 let d = new Date(start);
//                 d <= end;
//                 d.setDate(d.getDate() + 1)
//               ) {
//                 expanded.push({ date: new Date(d), description });
//               }
//             }
//           );

//           setHolidays(expanded);
//         }
//       } catch (error) {
//         console.error("Error fetching holidays:", error);
//         toast.error("Failed to fetch holiday data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, []);

//   const isHoliday = (date) => {
//     return holidays.some(
//       (holiday) => holiday.date.toDateString() === date.toDateString()
//     );
//   };

//   const getHolidayDetails = (date) => {
//     return holidays.find(
//       (holiday) => holiday.date.toDateString() === date.toDateString()
//     );
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
//           {loading ? (
//             <p>Loading holidays...</p>
//           ) : isHoliday(selectedDate) ? (
//             <div>
//               <p>
//                 <strong>Date:</strong> {selectedDate.toDateString()}
//               </p>
//               <p>
//                 <strong>Holiday:</strong>{" "}
//                 {getHolidayDetails(selectedDate)?.description}
//               </p>
//             </div>
//           ) : (
//             <p>No holiday on this date.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const LeaveCard = ({ type, available, booked, color, onClick }) => {
//   return (
//     <div
//       className={styles.card}
//       style={{ borderColor: color }}
//       onClick={onClick}
//     >
//       <h3>{type}</h3>
//       <p>
//         Available: <span className={styles.available}>{available}</span>
//       </p>
//       <p>
//         Booked: <span className={styles.booked}>{booked}</span>
//       </p>
//     </div>
//   );
// };

// const ApplyLeavePopup = ({ leaveType, onClose, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     from: null,
//     to: null,
//     leaveType: leaveType,
//     reason: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

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

//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);

//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User not authenticated.");
//       return;
//     }

//     try {
//       const requestData = {
//         from: formData.from ? formData.from.toISOString().split("T")[0] : "",
//         to: formData.to ? formData.to.toISOString().split("T")[0] : "",
//         leaveType: formData.leaveType,
//         reason: formData.reason,
//       };

//       const response = await axios.post(
//         "http://209.74.89.83/erpbackend/apply-leave",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccessMessage(
//         response.data?.message || "Leave request sent for approval."
//       );
//       toast.success("Leave request sent for approval.");
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Error submitting leave application:", error);
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit leave application. Please try again later."
//       );
//       toast.error(
//         error.response?.data?.message || "Failed to submit leave application."
//       );
//     } finally {
//       setIsSubmitting(false);
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
//             disabled={isSubmitting}
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
//             disabled={isSubmitting}
//             required
//           />

//           <label>To *</label>
//           <DatePicker
//             selected={formData.to}
//             onChange={(date) => handleDateChange(date, "to")}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Select end date"
//             className={styles.dateInput}
//             disabled={isSubmitting}
//             required
//           />

//           <label>Reason for Leave *</label>
//           <textarea
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             disabled={isSubmitting}
//             required
//           ></textarea>

//           {error && <div className={styles.errorMessage}>{error}</div>}
//           {successMessage && (
//             <div className={styles.successMessage}>{successMessage}</div>
//           )}

//           <div className={styles.popupActions}>
//             <button
//               type="submit"
//               className={styles.submitButton}
//               disabled={isSubmitting}
//             >
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


import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./LeaveSummary.module.css";
import Auth from "../Services/Auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to fetch leave data
const fetchUserLeaveData = async (token) => {
  if (!token) {
    toast.error("User not authenticated.");
    throw new Error("Authentication token not found.");
  }

  const response = await axios.get(
    "http://209.74.89.83/erpbackend/get-user-leaves",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data && response.data.users && response.data.users.leaveBalance) {
    const { casualLeaves, sickLeaves } = response.data.users.leaveBalance;
    return {
      casualLeaves: {
        available: casualLeaves?.available || 0,
        booked: casualLeaves?.booked || 0,
      },
      sickLeaves: {
        available: sickLeaves?.available || 0,
        booked: sickLeaves?.booked || 0,
      },
    };
  }
  return {
    casualLeaves: { available: 0, booked: 0 },
    sickLeaves: { available: 0, booked: 0 },
  };
};

// Helper function to fetch holidays
const fetchHolidayData = async (token) => {
  if (!token) {
    toast.error("User not authenticated.");
    throw new Error("Authentication token not found.");
  }

  const response = await axios.get(
    "http://209.74.89.83/erpbackend/get-holidays",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data?.holidays) {
    const expandedHolidays = [];
    response.data.holidays.forEach(({ startDate, endDate, description }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      for (
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
      ) {
        expandedHolidays.push({ date: new Date(d), description });
      }
    });
    return expandedHolidays;
  }
  return [];
};


const LeaveSummary = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [leaveData, setLeaveData] = useState({
    casualLeaves: { available: 0, booked: 0 },
    sickLeaves: { available: 0, booked: 0 },
  });
  const [loadingLeaveData, setLoadingLeaveData] = useState(true);

  // Memoize the fetch function to prevent unnecessary re-renders
  const getLeaveData = useCallback(async () => {
    setLoadingLeaveData(true);
    try {
      const data = await fetchUserLeaveData(Auth.getToken());
      setLeaveData(data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
      toast.error("Failed to fetch leave data.");
    } finally {
      setLoadingLeaveData(false);
    }
  }, []);

  useEffect(() => {
    getLeaveData();
  }, [getLeaveData]);

  const openPopup = (leaveType) => {
    setSelectedLeaveType(leaveType);
    setShowPopup(true);
  };

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.headerContainer}>
        <div className={styles.actionButtons}>
          <button
            className={styles.applyButton}
            onClick={() => openPopup("Casual Leave")}
          >
            Apply Leave
          </button>
        </div>
      </div>

      {/* Leave Summary */}
      <div className={styles.header}></div>

      <div className={styles.summary}>
        {loadingLeaveData ? (
          <p>Loading leave data...</p>
        ) : (
          <>
            <LeaveCard
              type="Casual Leave"
              available={leaveData.casualLeaves.available}
              booked={leaveData.casualLeaves.booked}
              color="var(--blue-color)"
              onClick={() => openPopup("Casual Leave")}
            />
            <LeaveCard
              type="Sick Leave"
              available={leaveData.sickLeaves.available}
              booked={leaveData.sickLeaves.booked}
              color="var(--green-color)"
              onClick={() => openPopup("Sick Leave")}
            />
          </>
        )}
      </div>

      {showPopup && (
        <ApplyLeavePopup
          leaveType={selectedLeaveType}
          onClose={() => setShowPopup(false)}
          onSuccess={getLeaveData} // Pass the memoized function to refresh data
        />
      )}

      <ToastContainer />

      <div className={styles.holidayContainer}>
        <HolidayCalendar />
      </div>
    </div>
  );
};

const HolidayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);

  // Memoize the fetch function
  const getHolidayData = useCallback(async () => {
    setLoadingHolidays(true);
    try {
      const data = await fetchHolidayData(Auth.getToken());
      setHolidays(data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      toast.error("Failed to fetch holiday data.");
    } finally {
      setLoadingHolidays(false);
    }
  }, []);

  useEffect(() => {
    getHolidayData();
  }, [getHolidayData]);

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    );
  };

  const getHolidayDetails = (date) => {
    return holidays.find(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    );
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
          {loadingHolidays ? (
            <p>Loading holidays...</p>
          ) : isHoliday(selectedDate) ? (
            <div>
              <p>
                <strong>Date:</strong> {selectedDate.toDateString()}
              </p>
              <p>
                <strong>Holiday:</strong>{" "}
                {getHolidayDetails(selectedDate)?.description}
              </p>
            </div>
          ) : (
            <p>No holiday on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LeaveCard = ({ type, available, booked, color, onClick }) => {
  return (
    <div
      className={styles.card}
      style={{ borderColor: color }}
      onClick={onClick}
    >
      <h3>{type}</h3>
      <p>
        Available: <span className={styles.available}>{available}</span>
      </p>
      <p>
        Booked: <span className={styles.booked}>{booked}</span>
      </p>
    </div>
  );
};

const ApplyLeavePopup = ({ leaveType, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    from: null,
    to: null,
    leaveType: leaveType,
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, leaveType }));
  }, [leaveType]);

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

    setError(null);

    const { from, to, reason } = formData;

    // Basic validation
    if (!from || !to || !reason) {
      setError("All fields are required.");
      toast.error("Please fill in all required fields.");
      return;
    }

    if (from > to) {
      setError("End date cannot be before start date.");
      toast.error("End date cannot be before start date.");
      return;
    }

    setIsSubmitting(true);
    const token = Auth.getToken();

    if (!token) {
      toast.error("User not authenticated.");
      setIsSubmitting(false);
      return;
    }

    try {
      const requestData = {
        from: from.toISOString().split("T")[0],
        to: to.toISOString().split("T")[0],
        leaveType: formData.leaveType,
        reason: reason,
      };

      const response = await axios.post(
        "http://209.74.89.83/erpbackend/apply-leave",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Leave request sent for approval.");
      onSuccess(); // Call to refresh leave data in parent
      onClose();
    } catch (err) {
      console.error("Error submitting leave application:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to submit leave application. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
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
          <label htmlFor="leaveType">Leave Type *</label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>

          <label htmlFor="from">From *</label>
          <DatePicker
            id="from"
            selected={formData.from}
            onChange={(date) => handleDateChange(date, "from")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className={styles.dateInput}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="to">To *</label>
          <DatePicker
            id="to"
            selected={formData.to}
            onChange={(date) => handleDateChange(date, "to")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className={styles.dateInput}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="reason">Reason for Leave *</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          ></textarea>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.popupActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
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