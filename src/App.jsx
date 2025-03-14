import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/AdminSideBar/AdminSideBar';
import Signup from './Components/Signup/Signup';
import SignIn from './Components/SignIn/SignIn';
import Logout from './Components/Logout/Logout';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserProfile from './Components/UseProfile/UserProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserManagement from './Components/UserManagement/UserManagement';
import SalesManagement from './Components/SalesManagement/Salesmanagement';
import EnquiryManagement from './Components/EnquiryManagement/EnquiryManagement';
import TaskManager from './Components/TaskManager/TaskManager';
import EnquiryDetails from './Components/EnquiryDetails/EnquiryDetails';
import PurchaseManagement from './Components/PurchaseManagement/PurchaseManagement';
import PurchaseReport from './Components/PurchaseReport/PurchaseReport';
import SalesDetails from './Components/SalesDetails/SalesDetails';
import LeaveManagement from './Components/LeaveManagement/LeaveManagement';
import UserSidebar from './Components/UserSidebar/UserSidebar';
import SuperAdminSidebar from './Components/SuperAdminSidebar/SuperAdminsidebar';
import LeaveSummary from './Components/LeaveSummary/LeaveSummary';




const App = () => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  return (
    <Router>[]
      {!token ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          {/* Show Sidebar based on user type */}
          <Routes>
          {typeOfUser === "superadmin" && <Route path="*" element={<Navigate to="/superadmin-sidebar" />} />}
            {typeOfUser === "Admin" && <Route path="*" element={<Navigate to="/admin-sidebar" />} />}
            {typeOfUser === "User" && <Route path="*" element={<Navigate to="/user-sidebar" />} />}
          </Routes>

          {/* 🔹 Sidebar Components */}
          <Routes>
            <Route path="/admin-sidebar" element={<SideBar />} />
            <Route path="/user-sidebar" element={<UserSidebar />} />
            <Route path="/superadmin-sidebar" element={<SuperAdminSidebar />} />
          {/* </Routes>

          <Routes> */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/us  erProfile" element={<UserProfile />} />
            <Route path="/sales-management" element={<SalesManagement />} />
            <Route path="/sales-report" element={<SalesDetails />} />
            <Route path="/enquiry-management" element={<EnquiryManagement />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="/enquiries-details" element={<EnquiryDetails />} />
            <Route path="/purchase-management" element={<PurchaseManagement />} />
            <Route path="/purchase-report" element={<PurchaseReport />} />
            <Route path="/leave-management" element={<LeaveManagement />} />
            <Route path="/leave-summary" element={<LeaveSummary />} />
          
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;


