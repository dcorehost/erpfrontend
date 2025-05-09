
// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import SideBar from './Components/AdminSideBar/AdminSideBar';
// import Signup from './Components/Signup/Signup';
// import SignIn from './Components/SignIn/SignIn';
// import Logout from './Components/Logout/Logout';
// import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
// import UserProfile from './Components/ownUserProfile/ownUserProfile';
// import ResetPassword from './Components/ResetPassword/ResetPassword';
// // import UserManagement from './Components/UserManagement/UserManagement';
// import SalesManagement from './Components/SalesManagement/Salesmanagement';
// import EnquiryManagement from './Components/EnquiryManagement/EnquiryManagement';
// import TaskManager from './Components/TaskManager/TaskManager';
// import EnquiryDetails from './Components/EnquiryDetails/EnquiryDetails';
// import PurchaseManagement from './Components/PurchaseManagement/PurchaseManagement';
// import PurchaseReport from './Components/PurchaseReport/PurchaseReport';
// import SalesDetails from './Components/SalesDetails/SalesDetails';
// import UserSidebar from './Components/UserSidebar/UserSidebar';
// import SuperAdminSidebar from './Components/SuperAdminSidebar/SuperAdminSidebar';
// import LeaveSummary from './Components/LeaveSummary/LeaveSummary';
// import AddTask from './Components/AddTask/AddTask';
// import TaskList from './Components/TaskList/TaskList';
// import ApplyLeaveTable from './Components/ApplyLeaveTable/ApplyLeaveTable';
// import PastLeaveTable from './Components/PastLeaveTable/PastLeaveTable';
// import MarkAttendance from './Components/MarkAttendance/MarkAttendance';
// import AttendanceSummary from './Components/AttendanceSummary/AttendanceSummary';
// import TaskAndProjectDetails from './Components/TaskAndProjectDetails/TaskAndProjectDetails';
// import LeavePolicy from './Components/LeavePolicy/LeavePolicy';
// import PendingLeaves from './Components/PendingLeaves/PendingLeaves';
// import PayrollSummary from './Components/PayrollSummary/PayrollSummary';
// import Deductions from './Components/Deductions/Deductions'
// import PaymentMethods from './Components/PaymentMethod/PaymentMethod';
// import CreatePayrolls from './Components/CreatePayrolls/CreatePayrolls';
// import CreateUser from './Components/CreateUser/CreateUser';
// import TaskAssignment from './Components/TaskAssignment/TaskAssignment';
// import AdminPayroll from './Components/AdminPayroll/AdminPayroll';
// import AdminTaskSummary from './Components/AdminTaskSummary/AdminTaskSummary';
// import UserTaskList from './Components/UserTaskList/UserTaskList';
// import AdminUserTable from './Components/AdminUserTable/AdminUserTable';
// import UserTaskProgress from './Components/UserTaskProgress/UserTaskProgress';
// import CompletedLeaves from './Components/CompletedLeaves/CompletedLeaves';
// import RejectedLeaves from './Components/RejectedLeaves/RejectedLeaves';
// import UserTask from './Components/UserTask/UserTask';
// import CreateNewProject from './Components/CreateNewProject/CreateNewProject';
// import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
// // import AssignedTask from './Components/AssignedTask/AssignedTask';
// import UserDashboard from './Pages/UserDashboard/DashboardUser';
// import CreateHolidays from './Components/CreateHolidays/CreateHolidays';
// import HolidayList from './Components/HolidaysList/HolidaysList'; 
// import OwnUserProfile from './Pages/OwnUserProfile/OwnUserProfile'
// import SystemSetting from './Components/SystemSetting/SystemSetting';
// import UserAttendance from './Components/UserAttendance/UserAttendance';
// import TaskStatus from './Components/TaskStatus/TaskStatus';
// import AdminNotificationsHistory from './Components/AdminNotificationsHistory/AdminNotificationsHistory';
// import AdminNotification from './Components/AdminNotifications/AdminNotifications'
// import SuperAdminDashboard from './Pages/SuperAdminDashboard/SuperAminDashboard';
// import SuperAdminNotifications from './Components/SuperAdminNotifications/SuperAdminNotifications'
// import SuperAdminHistory from './Components/SuperAdminHistory/SuperAdminHistory'

// const App = () => {
//   const token = localStorage.getItem("token");
//   const typeOfUser = localStorage.getItem("typeOfUser");

//   return (
//     <Router>
//       {!token ? (
//         // Routes for unauthenticated users
//         <>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<SignIn />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </>
//       ) : (
//         // Routes for authenticated users
//         <>
//           {/* Render Sidebar based on user type */}
//           {typeOfUser === "Admin" && <SideBar />}
//           {typeOfUser === "User" && <UserSidebar />}
//           {typeOfUser === "superadmin" && <SuperAdminSidebar />}

//           {/* Main content routes */}
//           <Routes>
//             {/* Common routes for all authenticated users */}
//             <Route path="/resetpassword" element={<ResetPassword />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/userProfile" element={<UserProfile />} />
//             <Route path="/add-task" element={<AddTask />} />

//             {/* Admin-specific routes */}
//             {typeOfUser === "Admin" && (
//               <>
//                 <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                 <Route path="/task-manager" element={<TaskManager />} />
//                 <Route path="/sales-management" element={<SalesManagement />} />
//                 <Route path="/sales-report" element={<SalesDetails />} />
//                 <Route path="/enquiry-management" element={<EnquiryManagement />} />
//                 <Route path="/enquiries-details" element={<EnquiryDetails />} />
//                 <Route path="/purchase-management" element={<PurchaseManagement />} />
//                 <Route path="/purchase-report" element={<PurchaseReport />} />
//                 <Route path="/ApplyLeaveTable" element={<ApplyLeaveTable />} />
//                 <Route path="/PastLeaveTable" element={<PastLeaveTable />} />
//                 <Route path="/leave-summary" element={<LeaveSummary />} />
//                 <Route path="/mark-attendance" element={<MarkAttendance />} />
//                 <Route path="/attendance-summary" element={<AttendanceSummary />} />
//                 {/* <Route path="/AssignedTask" element={<AssignedTask />} /> */}
//                 <Route path="/Leave-policy" element={<LeavePolicy />} />
//                 <Route  path='/Admin/Leave/Pending-Leaves' element={<PendingLeaves />}></Route>
//                 <Route  path='/Create-User-Payrolls' element={<CreatePayrolls />}></Route>
//                 <Route path='/create-user'  element={<CreateUser />}></Route>
//                 <Route path='/Admin/Leave/Task-Assignment' element={<TaskAssignment />}></Route>
//                 <Route path='/Admin-Payroll'  element={<AdminPayroll />}></Route>
//                 <Route path='/Admin-Task-Summary'  element={<AdminTaskSummary />}></Route>
//                 <Route path='/User-Task-List'  element={<UserTaskList />}></Route>
//                 <Route path='/AdminUserTable'  element={<AdminUserTable />}></Route>
//                 <Route path='/UserTaskProgress'  element={<UserTaskProgress />}></Route>
//                  <Route path='/CompletedLeaves'  element={<CompletedLeaves />}></Route>
//                  <Route path='/RejectedLeaves' element={<RejectedLeaves />}></Route>
//                  <Route path='/CreateNewProject'  element={<CreateNewProject />}></Route>
//                  <Route path='/ProjectDetails'  element={<ProjectDetails />}></Route>
//                  <Route path='/Admin/Assignment/task-status'  element={<TaskStatus />}></Route>
//                  <Route path='/Admin-system-setting'  element={<SystemSetting />}></Route>
//                  <Route path='/Admin-user-attendance'  element={<UserAttendance />}></Route>
//                  <Route path="/admin-notifications" element={<AdminNotification />} /> 
//                  <Route path="/admin-notifications-history" element={<AdminNotificationsHistory />} /> 

//               </>
//             )}

//             {/* User-specific routes */}
//             {typeOfUser === "User" && (
//               <>
//                 <Route path="/leave-summary" element={<LeaveSummary />} />
//                 <Route path="/task-list" element={<TaskList />} />
//                 <Route path="/ApplyLeaveTable" element={<ApplyLeaveTable />} />
//                 <Route path="/PastLeaveTable" element={<PastLeaveTable />} />
//                 <Route path="/mark-attendance" element={<MarkAttendance />} />
//                 <Route path="/attendance-summary" element={<AttendanceSummary />} />
//                 <Route path="/TaskAndProjectDetails" element={<TaskAndProjectDetails />} />
//                 <Route path="/Leave-policy" element={<LeavePolicy />} />
//                  <Route path='/payroll-summary' element={<PayrollSummary />}></Route>
//                  <Route path='/deductions' element={<Deductions />}></Route>
//                  <Route path='/payment-methods' element={<PaymentMethods />}></Route>
//                  <Route  path='/Create-Payrolls' element={<CreatePayrolls />}></Route>
//                  <Route path='/User-Task-List'  element={<UserTaskList />}></Route>
//                  <Route path='/UserTaskProgress'  element={<UserTaskProgress />}></Route>
//                  <Route path='/UserTask'  element={<UserTask />}></Route>
//                  <Route path='/Own-User-Profile'  element={<OwnUserProfile />}></Route>
//                  <Route path="/user-notifications" element={<UserNotifications />} /> {/* User Notifications Route */}

//               </>
//             )}

//             {/* Superadmin-specific routes */}
//             {typeOfUser === "superadmin" && (
//               <>
//                 {/* <Route path="/user-management" element={<UserManagement />} /> */}
//                 <Route path="/task-manager" element={<TaskManager />} />
//                 <Route path="/create-holidays" element={<CreateHolidays />} />
//                 <Route path="/holiday-list" element={<HolidayList />} />
//                 <Route path="/superadmin-notifications" element={<SuperAdminNotifications />} /> 
//                 <Route path="/superadmin-notifications-history" element={<SuperAdminHistory />} /> 
//                 <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} /> 



//               </>
//             )}

//             {/* Redirect to appropriate dashboard based on user type */}
//             {typeOfUser === "admin" && (
//               <>
//                 <Route  path='/Admin/Leave/Pending-Leaves' element={<PendingLeaves />}></Route>
//                 <Route path='/create-user' element={<CreateUser />}></Route>
//                 <Route path='/Admin/Leave/Task-Assignment'  element={<TaskAssignment />}></Route>
//                  <Route path='/Admin-Payroll' element={<AdminPayroll />}></Route>
//                  <Route path='/Admin-Task-Summary'  element={<AdminTaskSummary />}></Route>
//                  <Route path='/AdminUserTable'  element={<AdminUserTable />}></Route>
//                  <Route path='/CompletedLeaves'  element={<CompletedLeaves />}></Route>
//                  <Route path='/RejectedLeaves'  element={<RejectedLeaves />}></Route>
//                  <Route path='/CreateNewProject'  element={<CreateNewProject />}></Route>
//                  <Route path='/ProjectDetails'  element={<ProjectDetails />}></Route>
//                 </>
//             )}
          
//           </Routes>
//         </>
//       )}
//     </Router>
//   );
// };

// export default App; 




import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/AdminSideBar/AdminSideBar';
import Signup from './Components/Signup/Signup';
import SignIn from './Components/SignIn/SignIn';
import Logout from './Components/Logout/Logout';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserProfile from './Components/ownUserProfile/ownUserProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SalesManagement from './Components/SalesManagement/Salesmanagement';
import EnquiryManagement from './Components/EnquiryManagement/EnquiryManagement';
import TaskManager from './Components/TaskManager/TaskManager';
import EnquiryDetails from './Components/EnquiryDetails/EnquiryDetails';
import PurchaseManagement from './Components/PurchaseManagement/PurchaseManagement';
import PurchaseReport from './Components/PurchaseReport/PurchaseReport';
import SalesDetails from './Components/SalesDetails/SalesDetails';
import UserSidebar from './Components/UserSidebar/UserSidebar';
import SuperAdminSidebar from './Components/SuperAdminSidebar/SuperAdminSidebar';
import LeaveSummary from './Components/LeaveSummary/LeaveSummary';
import AddTask from './Components/AddTask/AddTask';
import TaskList from './Components/TaskList/TaskList';
import ApplyLeaveTable from './Components/ApplyLeaveTable/ApplyLeaveTable';
import PastLeaveTable from './Components/PastLeaveTable/PastLeaveTable';
import MarkAttendance from './Components/MarkAttendance/MarkAttendance';
import AttendanceSummary from './Components/AttendanceSummary/AttendanceSummary';
import TaskAndProjectDetails from './Components/TaskAndProjectDetails/TaskAndProjectDetails';
import LeavePolicy from './Components/LeavePolicy/LeavePolicy';
import PendingLeaves from './Components/PendingLeaves/PendingLeaves';
import PayrollSummary from './Components/PayrollSummary/PayrollSummary';
import Deductions from './Components/Deductions/Deductions';
import PaymentMethods from './Components/PaymentMethod/PaymentMethod';
import CreatePayrolls from './Components/CreatePayrolls/CreatePayrolls';
import CreateUser from './Components/CreateUser/CreateUser';
import TaskAssignment from './Components/TaskAssignment/TaskAssignment';
import AdminPayroll from './Components/AdminPayroll/AdminPayroll';
import AdminTaskSummary from './Components/AdminTaskSummary/AdminTaskSummary';
import UserTaskList from './Components/UserTaskList/UserTaskList';
import AdminUserTable from './Components/AdminUserTable/AdminUserTable';
import UserTaskProgress from './Components/UserTaskProgress/UserTaskProgress';
import CompletedLeaves from './Components/CompletedLeaves/CompletedLeaves';
import RejectedLeaves from './Components/RejectedLeaves/RejectedLeaves';
import UserTask from './Components/UserTask/UserTask';
import CreateNewProject from './Components/CreateNewProject/CreateNewProject';
// import CreateHolidays from './Components/CreateHolidays/CreateHolidays';
// import HolidayList from './Components/HolidaysList/HolidaysList'
// import TaskStatus from  './Components/TaskStatus/TaskStatus'
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import UserDashboard from './Pages/UserDashboard/DashboardUser';
import CreateHolidays from './Components/CreateHolidays/CreateHolidays';
import HolidayList from './Components/HolidaysList/HolidaysList';
import OwnUserProfile from './Pages/OwnUserProfile/OwnUserProfile';
import SystemSetting from './Components/SystemSetting/SystemSetting';
import UserAttendance from './Components/UserAttendance/UserAttendance';
import TaskStatus from './Components/TaskStatus/TaskStatus';
import AdminNotificationsHistory from './Components/AdminNotificationsHistory/AdminNotificationsHistory';
import AdminNotification from './Components/AdminNotifications/AdminNotifications';
import SuperAdminDashboard from './Pages/SuperAdminDashboard/SuperAminDashboard';
import SuperAdminNotifications from './Components/SuperAdminNotifications/SuperAdminNotifications';
import SuperAdminHistory from './Components/SuperAdminHistory/SuperAdminHistory';
import UserNotifications from './Components/UserNotifications/UserNotifications'; 
import UserList from './Components/UserList/UserList';
import AdminList from './Components/AdminList/AdminList';
import ApplyLeaveAdmin from './Components/ApplyLeaveAdmin/ApplyLeaveAdmin';
import UserLeavesPage from './Components/UserLeavesPage/UserLeavesPage';
import PendingLeavesPage from './Components/PendingLeavesPage/PendingLeavesPage';
import CompletedLeavesPage from './Components/CompletedLeavesPage/CompletedLeavesPage';
import ClientSideBar from './Components/ClientSideBar/ClientSideBar';
import ClientDashboard from './Pages/ClientDashboard/ClientDashboard';
import ClientProjects from './Components/ClientProjects/ClientProjects';
import ClientProjectDetails from './Components/ClientProjectDetails/ClientProjectDetails';
import ClientProjectRequest from './Components/ClientProjectsRequests/ClientProjectsRequests'; // Import the new component
import MyProfile from './Pages/MyProfile/MyProfile';
import OwnAdminProfile from './Pages/OwnAdminProfile/OwnAdminProfile';
import ClientTasks from './Components/ClientTasks/ClientTasks'; // ✅ Correct import


const App = () => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  return (
    <Router>
      {!token ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          {/* Show Sidebar based on user type */}
          {typeOfUser === "Admin" && <SideBar />}
          {typeOfUser === "User" && <UserSidebar />}
          {typeOfUser === "superadmin" && <SuperAdminSidebar />}
          {typeOfUser === "Client" && <ClientSideBar />}

          <Routes>
            {/* Redirect '/' to appropriate dashboard */}
            <Route
              path="/"
              element={
                <Navigate to={
                  typeOfUser === "Admin"
                    ? "/admin-dashboard"
                    : typeOfUser === "superadmin"
                      ? "/superadmin-dashboard"
                      : typeOfUser === "Client"
                      ? "/client-dashboard"
                      : "/user-dashboard"
                } />
              }
            />

            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/my-profile" element={<MyProfile />} />

            {/* Admin Routes */}
            {typeOfUser === "Admin" && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route path="/sales-management" element={<SalesManagement />} />
                <Route path="/sales-report" element={<SalesDetails />} />
                <Route path="/enquiry-management" element={<EnquiryManagement />} />
                <Route path="/enquiries-details" element={<EnquiryDetails />} />
                <Route path="/purchase-management" element={<PurchaseManagement />} />
                <Route path="/purchase-report" element={<PurchaseReport />} />
                <Route path="/ApplyLeaveTable" element={<ApplyLeaveTable />} />
                <Route path="/PastLeaveTable" element={<PastLeaveTable />} />
                <Route path="/leave-summary" element={<LeaveSummary />} />
                <Route path="/mark-attendance" element={<MarkAttendance />} />
                <Route path="/attendance-summary" element={<AttendanceSummary />} />
                <Route path="/Leave-policy" element={<LeavePolicy />} />
                <Route path='/Admin/Leave/Pending-Leaves' element={<PendingLeaves />} />
                <Route path='/Create-User-Payrolls' element={<CreatePayrolls />} />
                <Route path='/create-user' element={<CreateUser />} />
                <Route path='/Admin/Leave/Task-Assignment' element={<TaskAssignment />} />
                <Route path='/Admin-Payroll' element={<AdminPayroll />} />
                <Route path='/Admin-Task-Summary' element={<AdminTaskSummary />} />
                <Route path='/User-Task-List' element={<UserTaskList />} />
                <Route path='/AdminUserTable' element={<AdminUserTable />} />
                <Route path='/UserTaskProgress' element={<UserTaskProgress />} />
                <Route path='/CompletedLeaves' element={<CompletedLeaves />} />
                <Route path='/RejectedLeaves' element={<RejectedLeaves />} />
                <Route path='/CreateNewProject' element={<CreateNewProject />} />
                <Route path='/ProjectDetails' element={<ProjectDetails />} />
                <Route path='/Admin/Assignment/task-status' element={<TaskStatus />} />
                <Route path='/Admin-system-setting' element={<SystemSetting />} />
                <Route path='/Admin-user-attendance' element={<UserAttendance />} />
                <Route path="/admin-notifications" element={<AdminNotification />} />
                <Route path="/admin-notifications-history" element={<AdminNotificationsHistory />} />
                <Route path='/Own-Admin-Profile'  element={<OwnAdminProfile />}></Route>
                <Route path='/ApplyLeaveAdmin'  element={<ApplyLeaveAdmin />}></Route>
              </>
            )}

            {/* User Routes */}
            {typeOfUser === "User" && (
              <>
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/leave-summary" element={<LeaveSummary />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/ApplyLeaveTable" element={<ApplyLeaveTable />} />
                <Route path="/PastLeaveTable" element={<PastLeaveTable />} />
                <Route path="/mark-attendance" element={<MarkAttendance />} />
                <Route path="/attendance-summary" element={<AttendanceSummary />} />
                <Route path="/TaskAndProjectDetails" element={<TaskAndProjectDetails />} />
                <Route path="/Leave-policy" element={<LeavePolicy />} />
                <Route path='/payroll-summary' element={<PayrollSummary />} />
                <Route path='/deductions' element={<Deductions />} />
                <Route path='/payment-methods' element={<PaymentMethods />} />
                <Route path='/Create-Payrolls' element={<CreatePayrolls />} />
                <Route path='/User-Task-List' element={<UserTaskList />} />
                <Route path='/UserTaskProgress' element={<UserTaskProgress />} />
                <Route path='/UserTask' element={<UserTask />} />
                <Route path='/Own-User-Profile' element={<OwnUserProfile />} />
                <Route path="/user-notifications" element={<UserNotifications />} />
              </>
            )}

            {/* Super Admin Routes */}
            {typeOfUser === "superadmin" && (
              <>
                <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route path="/create-holidays" element={<CreateHolidays />} />
                <Route path="/holiday-list" element={<HolidayList />} />
                <Route path="/superadmin-notifications" element={<SuperAdminNotifications />} />
                <Route path="/superadmin-notifications-history" element={<SuperAdminHistory />} />
                <Route path="/superadmin-userlist" element={<UserList />} />
                <Route path="/superadmin-adminlist" element={<AdminList />} />
                <Route path="/superadmin-userleave" element={<UserLeavesPage />} />
                <Route path="/superadmin-adminleave" element={<PendingLeavesPage />} />
                <Route path="/superadmin-adminleave-summary" element={<CompletedLeavesPage />} />
              </>
            )}


              {typeOfUser === "Client" && (
              <>
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/projects" element={<ClientProjects />} />
                <Route path="/client-project-details" element={<ClientProjectDetails />} />
                <Route path="/client-project-requests" element={<ClientProjectRequest/>} /> {/* Add this route */}
                <Route path="/client-tasks" element={<ClientTasks />} /> {/* ✅ Correctly linked */}
                </>
            )}


            {/* Default catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
