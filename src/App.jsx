
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
import UserManagement from './Components/UserManagement/UserManagement';
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
import Deductions from './Components/Deductions/Deductions'
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
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import TaskStatus from './Components/TaskStatus/TaskStatus';
// import AssignedTask from './Components/AssignedTask/AssignedTask';
import UserDashboard from './Pages/UserDashboard/DashboardUser';
import OwnUserProfile from './Pages/OwnUserProfile/OwnUserProfile'

const App = () => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  return (
    <Router>
      {!token ? (
        // Routes for unauthenticated users
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        // Routes for authenticated users
        <>
          {/* Render Sidebar based on user type */}
          {typeOfUser === "Admin" && <SideBar />}
          {typeOfUser === "User" && <UserSidebar />}
          {typeOfUser === "superadmin" && <SuperAdminSidebar />}

          {/* Main content routes */}
          <Routes>
            {/* Common routes for all authenticated users */}
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/add-task" element={<AddTask />} />

            {/* Admin-specific routes */}
            {typeOfUser === "Admin" && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-management" element={<UserManagement />} />
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
                {/* <Route path="/AssignedTask" element={<AssignedTask />} /> */}
                <Route path="/Leave-policy" element={<LeavePolicy />} />
                <Route  path='/Admin/Leave/Pending-Leaves' element={<PendingLeaves />}></Route>
                <Route  path='/Create-User-Payrolls' element={<CreatePayrolls />}></Route>
                <Route path='/create-user'  element={<CreateUser />}></Route>
                <Route path='/Admin/Leave/Task-Assignment' element={<TaskAssignment />}></Route>
                <Route path='/Admin-Payroll'  element={<AdminPayroll />}></Route>
                <Route path='/Admin-Task-Summary'  element={<AdminTaskSummary />}></Route>
                <Route path='/User-Task-List'  element={<UserTaskList />}></Route>
                <Route path='/AdminUserTable'  element={<AdminUserTable />}></Route>
                <Route path='/UserTaskProgress'  element={<UserTaskProgress />}></Route>
                 <Route path='/CompletedLeaves'  element={<CompletedLeaves />}></Route>
                 <Route path='/RejectedLeaves' element={<RejectedLeaves />}></Route>
                 <Route path='/CreateNewProject'  element={<CreateNewProject />}></Route>
                 <Route path='/ProjectDetails'  element={<ProjectDetails />}></Route>
                 <Route path='/Admin/Assignment/task-status'  element={<TaskStatus />}></Route>

              </>
            )}

            {/* User-specific routes */}
            {typeOfUser === "User" && (
              <>
                <Route path="/leave-summary" element={<LeaveSummary />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/ApplyLeaveTable" element={<ApplyLeaveTable />} />
                <Route path="/PastLeaveTable" element={<PastLeaveTable />} />
                <Route path="/mark-attendance" element={<MarkAttendance />} />
                <Route path="/attendance-summary" element={<AttendanceSummary />} />
                <Route path="/TaskAndProjectDetails" element={<TaskAndProjectDetails />} />
                <Route path="/Leave-policy" element={<LeavePolicy />} />
                 <Route path='/payroll-summary' element={<PayrollSummary />}></Route>
                 <Route path='/deductions' element={<Deductions />}></Route>
                 <Route path='/payment-methods' element={<PaymentMethods />}></Route>
                 <Route  path='/Create-Payrolls' element={<CreatePayrolls />}></Route>
                 <Route path='/User-Task-List'  element={<UserTaskList />}></Route>
                 <Route path='/UserTaskProgress'  element={<UserTaskProgress />}></Route>
                 <Route path='/UserTask'  element={<UserTask />}></Route>
                 <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-profile" element={<OwnUserProfile />} />

                
 
              </>
            )}

            {/* Superadmin-specific routes */}
            {typeOfUser === "superadmin" && (
              <>
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/task-manager" element={<TaskManager />} />
              </>
            )}

            {/* Redirect to appropriate dashboard based on user type */}
            {typeOfUser === "admin" && (
              <>
                <Route  path='/Admin/Leave/Pending-Leaves' element={<PendingLeaves />}></Route>
                <Route path='/create-user' element={<CreateUser />}></Route>
                <Route path='/Admin/Leave/Task-Assignment'  element={<TaskAssignment />}></Route>
                 <Route path='/Admin-Payroll' element={<AdminPayroll />}></Route>
                 <Route path='/Admin-Task-Summary'  element={<AdminTaskSummary />}></Route>
                 <Route path='/AdminUserTable'  element={<AdminUserTable />}></Route>
                 <Route path='/CompletedLeaves'  element={<CompletedLeaves />}></Route>
                 <Route path='/RejectedLeaves'  element={<RejectedLeaves />}></Route>
                 <Route path='/CreateNewProject'  element={<CreateNewProject />}></Route>
                 <Route path='/ProjectDetails'  element={<ProjectDetails />}></Route>
                </>
            )}

          
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App; 