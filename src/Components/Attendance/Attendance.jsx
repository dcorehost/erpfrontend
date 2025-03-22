// src/components/Attendance.jsx
import React, { useState } from 'react';
import styles from './Attendance.module.css'; // Import the CSS Module

const Attendance = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setIsCheckedIn(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance System</h1>
      <div>
        {!isCheckedIn ? (
          <button className={styles.button} onClick={handleCheckIn}>
            Check In
          </button>
        ) : (
          <button className={styles.button} onClick={handleCheckOut}>
            Check Out
          </button>
        )}
      </div>
      <div>
        <p className={styles.time}>
          Check In Time: {checkInTime ? checkInTime.toLocaleTimeString() : 'Not checked in yet'}
        </p>
        <p className={styles.time}>
          Check Out Time: {checkOutTime ? checkOutTime.toLocaleTimeString() : 'Not checked out yet'}
        </p>
      </div>
    </div>
  );
};

export default Attendance;

// import React, { useState } from 'react';
// import styles from './Attendance.module.css'; // Import the CSS Module

// const Attendance = () => {
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [lateMessage, setLateMessage] = useState(''); // State to store late message

//   const handleCheckIn = async () => {
//     try {
//       const response = await fetch('http://209.74.89.83/erpbackend/check-in', {
//         method: 'POST', // Assuming the API requires a POST request
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}), // Add any required body data here
//       });

//       const data = await response.json();

//       if (data.message === "You are running late!") {
//         setLateMessage(data.message); // Set the late message
//       } else {
//         setLateMessage(''); // Clear the late message if not late
//       }

//       const now = new Date(data.checkInStatus); // Use the check-in time from the API
//       setCheckInTime(now);
//       setIsCheckedIn(true);
//     } catch (error) {
//       console.error('Error during check-in:', error);
//     }
//   };

//   const handleCheckOut = () => {
//     const now = new Date();
//     setCheckOutTime(now);
//     setIsCheckedIn(false);
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Attendance System</h1>
//       <div>
//         {!isCheckedIn ? (
//           <button className={styles.button} onClick={handleCheckIn}>
//             Check In
//           </button>
//         ) : (
//           <button className={styles.button} onClick={handleCheckOut}>
//             Check Out
//           </button>
//         )}
//       </div>
//       <div>
//         <p className={styles.time}>
//           Check In Time: {checkInTime ? checkInTime.toLocaleTimeString() : 'Not checked in yet'}
//         </p>
//         <p className={styles.time}>
//           Check Out Time: {checkOutTime ? checkOutTime.toLocaleTimeString() : 'Not checked out yet'}
//         </p>
//         {lateMessage && <p className={styles.lateMessage}>{lateMessage}</p>} {/* Display late message if any */}
//       </div>
//     </div>
//   );
// };

// export default Attendance;