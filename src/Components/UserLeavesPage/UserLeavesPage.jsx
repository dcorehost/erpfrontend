
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Auth from '../Services/Auth';
import styles from './UserLeavesPage.module.css';
import Loader from '../Loader/Loader';

const UserLeavesPage = () => {
  const [loader, setLoader] = useState(false);
  
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication first
        if (!Auth.isAuthenticated()) {
          setError('Please login to view leave details');
          setLoading(false);
          setLoader(false)
          return;
        }

        // Get current user data
        const userData = Auth.getAuthData();
        setCurrentUser(userData);

        // Create Axios instance with base URL and authorization header
        const api = axios.create({
          baseURL: 'http://209.74.89.83/erpbackend', 
          headers: {
            'Authorization': `Bearer ${Auth.getToken()}`
          }
        });

        // Fetch leave data using Axios
        const response = await api.get('get-user-leaves-for-Superadmin');
        
        if (response.data && response.data.leaveDetails) {
          setLeaveData(response.data.leaveDetails);
        } else {
          setError('No leave data available');
        }
      } catch (err) {
        console.error('Error fetching leave data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch leave data');
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStatusBadge = (status) => {
    const statusClass = status.toLowerCase();
    return <span className={styles[`status-${statusClass}`]}>{status}</span>;
  };

  if (loading) {
    return (<Loader /> );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        {!Auth.isAuthenticated() && (
          <button 
            className={styles.loginButton}
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Leave Management</h1>
        {/* {currentUser && (
          <div className={styles.userInfo}>
            <span>Logged in as: {currentUser.email}</span>
          </div>
        )} */}
      </div>

      {leaveData.length === 0 ? (
        <div className={styles.noData}>No leave records found</div>
      ) : (
        leaveData.map(user => (
          <div key={user._id} className={styles.userSection}>
            <h2 className={styles.userName}>
              {user.username}
              <span className={styles.userType}>{user.typeOfUser}</span>
            </h2>
            <div className={styles.userDetails}>
              <span>Email: {user.contact.emailId}</span>
              {user.contact.phone && <span>Phone: {user.contact.phone}</span>}
            </div>
            
            <div className={styles.tableResponsive}>
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Period</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Applied On</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {user.userLeaves.map(leave => {
                    const fromDate = new Date(leave.from);
                    const toDate = new Date(leave.to);
                    const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <tr key={leave._id} className={styles[leave.state.toLowerCase()]}>
                        <td>{leave.leaveType}</td>
                        <td>
                          {formatDate(leave.from)} to {formatDate(leave.to)}
                        </td>
                        <td>{days} day{days > 1 ? 's' : ''}</td>
                        <td>{leave.reason}</td>
                        <td>{renderStatusBadge(leave.state)}</td>
                        <td>{leave.remarks || '-'}</td>
                        <td>{formatDate(leave.createdAt)}</td>
                        <td>{formatDate(leave.updatedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserLeavesPage;

// working  color not working 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import Auth from '../Services/Auth';
// import styles from './UserLeavesPage.module.css';
// import Loader from '../Loader/Loader';
// import { FiChevronLeft, FiChevronRight, FiUser, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';

// const UserLeavesPage = () => {
//   const [loader, setLoader] = useState(false);
//   const [leaveData, setLeaveData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!Auth.isAuthenticated()) {
//           setError('Please login to view leave details');
//           setLoading(false);
//           setLoader(false);
//           return;
//         }

//         const userData = Auth.getAuthData();
//         setCurrentUser(userData);

//         const api = axios.create({
//           baseURL: 'http://209.74.89.83/erpbackend', 
//           headers: {
//             'Authorization': `Bearer ${Auth.getToken()}`
//           }
//         });

//         const response = await api.get('get-user-leaves-for-Superadmin');
        
//         if (response.data && response.data.leaveDetails) {
//           setLeaveData(response.data.leaveDetails);
//         } else {
//           setError('No leave data available');
//         }
//       } catch (err) {
//         console.error('Error fetching leave data:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch leave data');
//       } finally {
//         setLoading(false);
//         setLoader(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const handleMonthChange = (increment) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + increment;
//       let newYear = currentYear;
      
//       if (newMonth > 11) {
//         newMonth = 0;
//         newYear++;
//       } else if (newMonth < 0) {
//         newMonth = 11;
//         newYear--;
//       }
      
//       setCurrentYear(newYear);
//       return newMonth;
//     });
//   };

//   const renderCalendar = (user) => {
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
//     // Create array of all days in the month
//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     // Get all leave dates for the user
//     const leaveDates = {};
//     user.userLeaves.forEach(leave => {
//       if (leave.state === 'Approved') {
//         const fromDate = new Date(leave.from);
//         const toDate = new Date(leave.to);
        
//         // Handle same day leave
//         if (fromDate.getTime() === toDate.getTime()) {
//           const dateKey = `${fromDate.getDate()}-${fromDate.getMonth()}-${fromDate.getFullYear()}`;
//           leaveDates[dateKey] = leave.leaveType;
//         } else {
//           // Handle multi-day leave
//           let currentDate = new Date(fromDate);
//           while (currentDate <= toDate) {
//             const dateKey = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
//             leaveDates[dateKey] = leave.leaveType;
//             currentDate.setDate(currentDate.getDate() + 1);
//           }
//         }
//       }
//     });

//     // Get all attendance dates for the user
//     const attendanceDates = {};
//     if (user.attendance) {
//       user.attendance.forEach(record => {
//         if (record.status) {
//           const date = new Date(record.checkInStatus);
//           const dateKey = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
//           attendanceDates[dateKey] = record.status;
//         }
//       });
//     }

//     // Create calendar grid
//     const calendarGrid = [];
//     const emptyCells = Array(firstDayOfMonth).fill(null);
    
//     // Add empty cells for days before the 1st of the month
//     calendarGrid.push(...emptyCells.map((_, i) => (
//       <div key={`empty-${i}`} className={styles.calendarDayEmpty}></div>
//     )));
    
//     // Add actual days of the month
//     days.forEach(day => {
//       const dateKey = `${day}-${currentMonth}-${currentYear}`;
//       const isLeaveDay = leaveDates[dateKey];
//       const attendanceStatus = attendanceDates[dateKey];
      
//       let dayClass = styles.calendarDay;
//       let statusIcon = null;
//       let tooltipText = '';
      
//       if (isLeaveDay) {
//         dayClass += ` ${styles.onLeave}`;
//         statusIcon = <FiXCircle className={styles.statusIcon} />;
//         tooltipText = `On Leave (${leaveDates[dateKey]})`;
//       } else if (attendanceStatus) {
//         if (attendanceStatus.toLowerCase() === 'present') {
//           dayClass += ` ${styles.present}`;
//           statusIcon = <FiCheckCircle className={styles.statusIcon} />;
//           tooltipText = 'Present';
//         } else {
//           dayClass += ` ${styles.absent}`;
//           statusIcon = <FiXCircle className={styles.statusIcon} />;
//           tooltipText = 'Absent';
//         }
//       }
      
//       calendarGrid.push(
//         <div key={`day-${day}`} className={dayClass}>
//           <div className={styles.dayNumber}>{day}</div>
//           {statusIcon && (
//             <div className={styles.statusIndicator}>
//               {statusIcon}
//               <span className={styles.tooltip}>{tooltipText}</span>
//             </div>
//           )}
//         </div>
//       );
//     });

//     return (
//       <div className={styles.calendarContainer}>
//         <div className={styles.calendarHeader}>
//           <button 
//             onClick={() => handleMonthChange(-1)}
//             className={styles.monthNavButton}
//           >
//             <FiChevronLeft />
//           </button>
//           <h3>
//             {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
//               month: 'long',
//               year: 'numeric'
//             })}
//           </h3>
//           <button 
//             onClick={() => handleMonthChange(1)}
//             className={styles.monthNavButton}
//           >
//             <FiChevronRight />
//           </button>
//         </div>
        
//         <div className={styles.weekDays}>
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className={styles.weekDay}>{day}</div>
//           ))}
//         </div>
        
//         <div className={styles.calendarGrid}>
//           {calendarGrid}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <h3>Error</h3>
//         <p>{error}</p>
//         {!Auth.isAuthenticated() && (
//           <button 
//             className={styles.loginButton}
//             onClick={() => window.location.href = '/login'}
//           >
//             Go to Login
//           </button>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>
//           <FiCalendar className={styles.headerIcon} />
//           Attendance Calendar
//         </h1>
//       </div>

//       {!selectedUser ? (
//         <div className={styles.userList}>
//           <h2>Select User to View Calendar</h2>
//           <div className={styles.userCards}>
//             {leaveData.slice(0, 2).map(user => (
//               <div 
//                 key={user._id} 
//                 className={styles.userCard}
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <div className={styles.userAvatar}>
//                   <FiUser />
//                 </div>
//                 <div className={styles.userInfo}>
//                   <h3>{user.username}</h3>
//                   <p>{user.contact.emailId}</p>
//                   <span className={styles.userType}>{user.typeOfUser}</span>
//                 </div>
//                 <div className={styles.leaveStats}>
//                   <div className={styles.statItem}>
//                     <span>Approved</span>
//                     <strong>
//                       {user.userLeaves.filter(l => l.state === 'Approved').length}
//                     </strong>
//                   </div>
//                   <div className={styles.statItem}>
//                     <span>Pending</span>
//                     <strong>
//                       {user.userLeaves.filter(l => l.state === 'Pending').length}
//                     </strong>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className={styles.calendarView}>
//           <button 
//             onClick={() => setSelectedUser(null)}
//             className={styles.backButton}
//           >
//             <FiChevronLeft /> Back to Users
//           </button>
          
//           <div className={styles.userHeader}>
//             <div className={styles.userAvatarLarge}>
//               <FiUser />
//             </div>
//             <div className={styles.userDetails}>
//               <h2>{selectedUser.username}</h2>
//               <p>{selectedUser.contact.emailId}</p>
//               <div className={styles.userMeta}>
//                 <span className={styles.userType}>{selectedUser.typeOfUser}</span>
//                 {selectedUser.contact.phone && (
//                   <span className={styles.userPhone}>{selectedUser.contact.phone}</span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {renderCalendar(selectedUser)}
          
//           <div className={styles.legend}>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.present}`}></div>
//               <span>Present</span>
//             </div>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.absent}`}></div>
//               <span>Absent</span>
//             </div>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.onLeave}`}></div>
//               <span>On Leave</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserLeavesPage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Auth from '../Services/Auth';
// import styles from './UserLeavesPage.module.css';
// import Loader from '../Loader/Loader';
// import {
//   FiChevronLeft,
//   FiChevronRight,
//   FiUser,
//   FiCalendar,
//   FiCheckCircle,
//   FiXCircle
// } from 'react-icons/fi';

// const UserLeavesPage = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!Auth.isAuthenticated()) {
//           setError('Please login to view leave details');
//           setLoading(false);
//           return;
//         }

//         const api = axios.create({
//           baseURL: 'http://209.74.89.83/erpbackend',
//           headers: {
//             'Authorization': `Bearer ${Auth.getToken()}`
//           }
//         });

//         const response = await api.get('get-user-leaves-for-Superadmin');
        
//         if (response.data?.leaveDetails) {
//           setLeaveData(response.data.leaveDetails);
//         } else {
//           setError('No leave data available');
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'Failed to fetch leave data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleMonthChange = (increment) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + increment;
//       let newYear = currentYear;
      
//       if (newMonth > 11) {
//         newMonth = 0;
//         newYear++;
//       } else if (newMonth < 0) {
//         newMonth = 11;
//         newYear--;
//       }
      
//       setCurrentYear(newYear);
//       return newMonth;
//     });
//   };

//   const renderCalendar = (user) => {
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
//     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//     const emptyCells = Array(firstDayOfMonth).fill(null);

//     const leaveDates = {};
//     user.userLeaves?.forEach(leave => {
//       if (leave.state === 'Approved') {
//         const fromDate = new Date(leave.from);
//         const toDate = new Date(leave.to);
        
//         let currentDate = new Date(fromDate);
//         while (currentDate <= toDate) {
//           const dateKey = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
//           leaveDates[dateKey] = leave.leaveType;
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
//       }
//     });

//     const attendanceDates = {};
//     user.attendance?.forEach(record => {
//       if (record.status) {
//         const date = new Date(record.checkInStatus);
//         const dateKey = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
//         attendanceDates[dateKey] = record.status;
//       }
//     });

//     return (
//       <div className={styles.calendarContainer}>
//         <div className={styles.calendarHeader}>
//           <button onClick={() => handleMonthChange(-1)} className={styles.monthNavButton}>
//             <FiChevronLeft />
//           </button>
//           <h3>
//             {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
//               month: 'long',
//               year: 'numeric'
//             })}
//           </h3>
//           <button onClick={() => handleMonthChange(1)} className={styles.monthNavButton}>
//             <FiChevronRight />
//           </button>
//         </div>
        
//         <div className={styles.weekDays}>
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className={styles.weekDay}>{day}</div>
//           ))}
//         </div>
        
//         <div className={styles.calendarGrid}>
//           {emptyCells.map((_, i) => (
//             <div key={`empty-${i}`} className={styles.calendarDayEmpty} />
//           ))}
          
//           {days.map(day => {
//             const dateKey = `${day}-${currentMonth}-${currentYear}`;
//             const isLeaveDay = leaveDates[dateKey];
//             const attendanceStatus = attendanceDates[dateKey];
            
//             let statusClass = '';
//             let statusIcon = null;
//             let tooltipText = '';
            
//             if (isLeaveDay) {
//               statusClass = styles.onLeave;
//               statusIcon = <FiXCircle className={styles.statusIcon} />;
//               tooltipText = `On Leave (${leaveDates[dateKey]})`;
//             } else if (attendanceStatus) {
//               statusClass = attendanceStatus.toLowerCase() === 'present' 
//                 ? styles.present 
//                 : styles.absent;
//               statusIcon = attendanceStatus.toLowerCase() === 'present' 
//                 ? <FiCheckCircle className={styles.statusIcon} /> 
//                 : <FiXCircle className={styles.statusIcon} />;
//               tooltipText = attendanceStatus;
//             }
            
//             return (
//               <div
//                 key={`day-${day}`}
//                 className={`${styles.calendarDay} ${statusClass}`}
//               >
//                 <div className={styles.dayNumber}>{day}</div>
//                 {statusIcon && (
//                   <div className={styles.statusIndicator}>
//                     {statusIcon}
//                     <span className={styles.tooltip}>{tooltipText}</span>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <Loader />;

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <h3>Error</h3>
//         <p>{error}</p>
//         {!Auth.isAuthenticated() && (
//           <button 
//             className={styles.loginButton}
//             onClick={() => window.location.href = '/login'}
//           >
//             Go to Login
//           </button>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>
//           <FiCalendar className={styles.headerIcon} />
//           Attendance Calendar
//         </h1>
//       </div>

//       {!selectedUser ? (
//         <div className={styles.userList}>
//           <h2>Select User to View Calendar</h2>
//           <div className={styles.userCards}>
//             {leaveData.map(user => (
//               <div 
//                 key={user._id} 
//                 className={styles.userCard}
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <div className={styles.userAvatar}>
//                   <FiUser />
//                 </div>
//                 <div className={styles.userInfo}>
//                   <h3>{user.username}</h3>
//                   <p>{user.contact?.emailId}</p>
//                   <span className={styles.userType}>{user.typeOfUser}</span>
//                 </div>
//                 <div className={styles.leaveStats}>
//                   <div className={styles.statItem}>
//                     <span>Approved</span>
//                     <strong>
//                       {user.userLeaves?.filter(l => l.state === 'Approved').length || 0}
//                     </strong>
//                   </div>
//                   <div className={styles.statItem}>
//                     <span>Pending</span>
//                     <strong>
//                       {user.userLeaves?.filter(l => l.state === 'Pending').length || 0}
//                     </strong>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className={styles.calendarView}>
//           <button 
//             onClick={() => setSelectedUser(null)}
//             className={styles.backButton}
//           >
//             <FiChevronLeft /> Back to Users
//           </button>
          
//           <div className={styles.userHeader}>
//             <div className={styles.userAvatarLarge}>
//               <FiUser />
//             </div>
//             <div className={styles.userDetails}>
//               <h2>{selectedUser.username}</h2>
//               <p>{selectedUser.contact?.emailId}</p>
//               <div className={styles.userMeta}>
//                 <span className={styles.userType}>{selectedUser.typeOfUser}</span>
//                 {selectedUser.contact?.phone && (
//                   <span className={styles.userPhone}>{selectedUser.contact.phone}</span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {renderCalendar(selectedUser)}
          
//           <div className={styles.legend}>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.present}`}></div>
//               <span>Present</span>
//             </div>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.absent}`}></div>
//               <span>Absent</span>
//             </div>
//             <div className={styles.legendItem}>
//               <div className={`${styles.legendColor} ${styles.onLeave}`}></div>
//               <span>On Leave</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserLeavesPage;
