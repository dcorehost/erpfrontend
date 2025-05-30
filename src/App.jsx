import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/AdminSideBar/AdminSideBar";
import Signup from "./Components/Signup/Signup";
import SignIn from "./Components/SignIn/SignIn";
import Logout from "./Components/Logout/Logout";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import UserProfile from "./Components/ownUserProfile/ownUserProfile";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserSidebar from "./Components/UserSidebar/UserSidebar";
import SuperAdminSidebar from "./Components/SuperAdminSidebar/SuperAdminSidebar";
import LeaveSummary from "./Components/LeaveSummary/LeaveSummary";
import AddTask from "./Components/AddTask/AddTask";
import TaskList from "./Components/TaskList/TaskList";
import ApplyLeaveTable from "./Components/ApplyLeaveTable/ApplyLeaveTable";
import PastLeaveTable from "./Components/PastLeaveTable/PastLeaveTable";
import MarkAttendance from "./Components/MarkAttendance/MarkAttendance";
import AttendanceSummary from "./Components/AttendanceSummary/AttendanceSummary";
import TaskAndProjectDetails from "./Components/TaskAndProjectDetails/TaskAndProjectDetails";
import LeavePolicy from "./Components/LeavePolicy/LeavePolicy";
import PendingLeaves from "./Components/PendingLeaves/PendingLeaves";
import PayrollSummary from "./Components/PayrollSummary/PayrollSummary";
import Deductions from "./Components/Deductions/Deductions";
import PaymentMethods from "./Components/PaymentMethod/PaymentMethod";
import CreatePayrolls from "./Components/CreatePayrolls/CreatePayrolls";
import CreateUser from "./Components/CreateUser/CreateUser";
import TaskAssignment from "./Components/TaskAssignment/TaskAssignment";
import AdminPayroll from "./Components/AdminPayroll/AdminPayroll";
import AdminTaskSummary from "./Components/AdminTaskSummary/AdminTaskSummary";
import UserTaskList from "./Components/UserTaskList/UserTaskList";
import AdminUserTable from "./Components/AdminUserTable/AdminUserTable";
import UserTaskProgress from "./Components/UserTaskProgress/UserTaskProgress";
import CompletedLeaves from "./Components/CompletedLeaves/CompletedLeaves";
import RejectedLeaves from "./Components/RejectedLeaves/RejectedLeaves";
import UserTask from "./Components/UserTask/UserTask";
import CreateNewProject from "./Components/CreateNewProject/CreateNewProject";
// import CreateHolidays from './Components/CreateHolidays/CreateHolidays';
// import HolidayList from './Components/HolidaysList/HolidaysList'
// import TaskStatus from  './Components/TaskStatus/TaskStatus'
import ProjectDetails from "./Components/ProjectDetails/ProjectDetails";
import UserDashboard from "./Pages/UserDashboard/DashboardUser";
import CreateHolidays from "./Components/CreateHolidays/CreateHolidays";
import HolidayList from "./Components/HolidaysList/HolidaysList";
import OwnUserProfile from "./Pages/OwnUserProfile/OwnUserProfile";
import UserAttendance from "./Components/UserAttendance/UserAttendance";
import TaskStatus from "./Components/TaskStatus/TaskStatus";
import AdminNotificationsHistory from "./Components/AdminNotificationsHistory/AdminNotificationsHistory";
import AdminNotification from "./Components/AdminNotifications/AdminNotifications";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard/SuperAminDashboard";
import SuperAdminNotifications from "./Components/SuperAdminNotifications/SuperAdminNotifications";
import SuperAdminHistory from "./Components/SuperAdminHistory/SuperAdminHistory";
import UserNotifications from "./Components/UserNotifications/UserNotifications";
import UserList from "./Components/UserList/UserList";
import AdminList from "./Components/AdminList/AdminList";
import ApplyLeaveAdmin from "./Components/ApplyLeaveAdmin/ApplyLeaveAdmin";
import UserLeavesPage from "./Components/UserLeavesPage/UserLeavesPage";
import PendingLeavesPage from "./Components/PendingLeavesPage/PendingLeavesPage";
import CompletedLeavesPage from "./Components/CompletedLeavesPage/CompletedLeavesPage";
import ClientSideBar from "./Components/ClientSideBar/ClientSideBar";
import ClientDashboard from "./Pages/ClientDashboard/ClientDashboard";
import ClientProjects from "./Components/ClientProjects/ClientProjects";
import ClientProjectDetails from "./Components/ClientProjectDetails/ClientProjectDetails";
import ClientProjectRequest from "./Components/ClientProjectsRequests/ClientProjectsRequests";
import ClientTasks from "./Components/ClientTasks/ClientTasks"; // ✅ Correct import
import MyProfile from "./Pages/MyProfile/MyProfile";
import UpdateUserProfile from "./Components/UpdateUserProfile/UpdateUserProfile";
// import ClientTasks from './Components/ClientTasks/ClientTasks';
import CLientSidebar from "./Components/ClientSideBar/ClientSideBar";
import RedirectBasedOnUser from "./RedirectBasedOnUser";
import ClientCreateProject from "./Components/ClientCreateProject/ClientCreateProject";
import ClientNewRequest from "./Components/ClientNewRequest/ClientNewRequest";
import CreateClient from "./Components/CreateClient/CreateClient";
import ClientCommunication from "./Components/ClientCommunication/ClientCommunication";
import ClientMessages from "./Components/ClientMessageDetails/ClientMessageDetails";

const App = () => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  return (
    <Router>
      {!token ? (
        <>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          {/* Show Sidebar based on user type */}
          {/* {typeOfUser === "Admin" && <SideBar />} */}
          {/* {typeOfUser === "User" && <UserSidebar />} */}
          {/* {typeOfUser === "superadmin" && <SuperAdminSidebar />} */}
          {/* {typeOfUser === "Client" && <CLientSidebar />} */}

          <Routes>
            {/* Redirect '/' to appropriate dashboard */}
            {/* <Route
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
            /> */}
            <Route
              path="/"
              element={
                !typeOfUser ? (
                  <div>Loading...</div> // Show loader while checking user type
                ) : (
                  <Navigate
                    to={
                      typeOfUser === "Admin"
                        ? "/admin-dashboard"
                        : typeOfUser === "superadmin"
                        ? "/superadmin-dashboard"
                        : typeOfUser === "Client"
                        ? "/client-dashboard"
                        : "/user-dashboard"
                    }
                    replace // Important: prevents history stack buildup
                  />
                )
              }
            />

            {/* //common routes */}

            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/Own-User-Profile" element={<OwnUserProfile />} />
            <Route path="/mark-attendance" element={<MarkAttendance />} />

            {/* Admin Routes */}
            {typeOfUser === "Admin" && (
              <>
                <Route   path="/admin-dashboard"
                  element={
                    <SideBar>
                      <AdminDashboard />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin/Leave/Pending-Leaves"
                  element={
                    <SideBar>
                      <PendingLeaves />
                    </SideBar>
                  }
                />
                <Route
                  path="/CompletedLeaves"
                  element={
                    <SideBar>
                      <CompletedLeaves />
                    </SideBar>
                  }
                />
                <Route
                  path="/RejectedLeaves"
                  element={
                    <SideBar>
                      <RejectedLeaves />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin/Leave/ApplyLeave"
                  element={
                    <SideBar>
                      <ApplyLeaveAdmin />
                    </SideBar>
                  }
                />
                <Route
                  path="/CreateNewProject"
                  element={
                    <SideBar>
                      <CreateNewProject />
                    </SideBar>
                  }
                />
                <Route
                  path="/ProjectDetails"
                  element={
                    <SideBar>
                      <ProjectDetails />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin/Leave/Task-Assignment"
                  element={
                    <SideBar>
                      <TaskAssignment />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin/Assignment/task-status"
                  element={
                    <SideBar>
                      <TaskStatus />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin-Task-Summary"
                  element={
                    <SideBar>
                      <AdminTaskSummary />
                    </SideBar>
                  }
                />
                <Route
                  path="/create-user"
                  element={
                    <SideBar>
                      <CreateUser />
                    </SideBar>
                  }
                />
                <Route
                  path="/AdminUserTable"
                  element={
                    <SideBar>
                      <AdminUserTable />
                    </SideBar>
                  }
                />

                <Route
                  path="/attendance-summary"
                  element={
                    <SideBar>
                      <AttendanceSummary />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin-user-attendance"
                  element={
                    <SideBar>
                      <UserAttendance />
                    </SideBar>
                  }
                />

                <Route
                  path="/Create-User-Payrolls"
                  element={
                    <SideBar>
                      <CreatePayrolls />
                    </SideBar>
                  }
                />
                <Route
                  path="/Admin-Payroll"
                  element={
                    <SideBar>
                      <AdminPayroll />
                    </SideBar>
                  }
                />

                <Route
                  path="/admin-notifications"
                  element={
                    <SideBar>
                      <AdminNotification />
                    </SideBar>
                  }
                />
                <Route
                  path="/admin-notifications-history"
                  element={
                    <SideBar>
                      <AdminNotificationsHistory />
                    </SideBar>
                  }
                />
              </>
            )}

            {/* User Routes */}
            {typeOfUser === "User" && (
              <>
                <Route
                  path="/user-dashboard"
                  element={
                    <UserSidebar>
                      <UserDashboard />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/leave-summary"
                  element={
                    <UserSidebar>
                      <LeaveSummary />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/ApplyLeaveTable"
                  element={
                    <UserSidebar>
                      <ApplyLeaveTable />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/PastLeaveTable"
                  element={
                    <UserSidebar>
                      <PastLeaveTable />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/Leave-policy"
                  element={
                    <UserSidebar>
                      <LeavePolicy />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/add-task"
                  element={
                    <UserSidebar>
                      <AddTask />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/task-list"
                  element={
                    <UserSidebar>
                      <TaskList />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/User-Task-List"
                  element={
                    <UserSidebar>
                      <UserTaskList />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/UserTaskProgress"
                  element={
                    <UserSidebar>
                      <UserTaskProgress />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/attendance-summary"
                  element={
                    <UserSidebar>
                      <AttendanceSummary />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/user-notifications"
                  element={
                    <UserSidebar>
                      <UserNotifications />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/payroll-summary"
                  element={
                    <UserSidebar>
                      <PayrollSummary />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/deductions"
                  element={
                    <UserSidebar>
                      <Deductions />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/Create-Payrolls"
                  element={
                    <UserSidebar>
                      <CreatePayrolls />
                    </UserSidebar>
                  }
                />
                <Route
                  path="/UserTask"
                  element={
                    <UserSidebar>
                      <UserTask />
                    </UserSidebar>
                  }
                />
              </>
            )}

            {/* Super Admin Routes */}
            {typeOfUser === "superadmin" && (
              <>
                <Route
                  path="/superadmin-dashboard"
                  element={
                    <SuperAdminSidebar>
                      <SuperAdminDashboard />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/create-holidays"
                  element={
                    <SuperAdminSidebar>
                      <CreateHolidays />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/holiday-list"
                  element={
                    <SuperAdminSidebar>
                      <HolidayList />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-notifications"
                  element={
                    <SuperAdminSidebar>
                      <SuperAdminNotifications />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-notifications-history"
                  element={
                    <SuperAdminSidebar>
                      <SuperAdminHistory />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-userlist"
                  element={
                    <SuperAdminSidebar>
                      <UserList />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-adminlist"
                  element={
                    <SuperAdminSidebar>
                      <AdminList />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-userleave"
                  element={
                    <SuperAdminSidebar>
                      <UserLeavesPage />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-adminleave"
                  element={
                    <SuperAdminSidebar>
                      <PendingLeavesPage />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-userupdate"
                  element={
                    <SuperAdminSidebar>
                      <UpdateUserProfile />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-adminleave-summary"
                  element={
                    <SuperAdminSidebar>
                      <CompletedLeavesPage />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-clientsection-createproject"
                  element={
                    <SuperAdminSidebar>
                      <ClientCreateProject />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-clientsection-clientrequest"
                  element={
                    <SuperAdminSidebar>
                      <ClientNewRequest />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-clientsection-Createclient"
                  element={
                    <SuperAdminSidebar>
                      <CreateClient />
                    </SuperAdminSidebar>
                  }
                />
                <Route
                  path="/superadmin-client-messages"
                  element={
                    <SuperAdminSidebar>
                      <ClientMessages />
                    </SuperAdminSidebar>
                  }
                />{" "}
                {/* ✅ Correctly linked */}
              </>
            )}

            {typeOfUser === "Client" && (
              <>
                <Route
                  path="/client-dashboard"
                  element={
                    <CLientSidebar>
                      <ClientDashboard />
                    </CLientSidebar>
                  }
                />
                <Route
                  path="/client-projects"
                  element={
                    <CLientSidebar>
                      <ClientProjects />
                    </CLientSidebar>
                  }
                />
                <Route
                  path="/client-project-details"
                  element={
                    <CLientSidebar>
                      <ClientProjectDetails />
                    </CLientSidebar>
                  }
                />
                <Route
                  path="/client-project-requests"
                  element={
                    <CLientSidebar>
                      <ClientProjectRequest />
                    </CLientSidebar>
                  }
                />{" "}
                {/* Add this route */}
                <Route
                  path="/client-tasks"
                  element={
                    <CLientSidebar>
                      <ClientTasks />
                    </CLientSidebar>
                  }
                />{" "}
                {/* ✅ Correctly linked */}
                <Route
                  path="/client-communication"
                  element={
                    <CLientSidebar>
                      <ClientCommunication />
                    </CLientSidebar>
                  }
                />{" "}
                {/* ✅ Correctly linked */}
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
