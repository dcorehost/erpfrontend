
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/AdminSideBar/AdminSideBar';
import Signup from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Logout from './Components/Logout/Logout'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserProfile from './Components/UseProfile/UserProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserManagement from './Components/UserManagement/UserManagement';
import SalesManagement from './Components/SalesManagement/Salesmanagement';
import EnquiryManagement from './Components/EnquiryManagement/Enquirymanagement';
import TaskManager    from './Components/TaskManager/TaskManager'
import EnquiryDetails from './Components/EnquiryDetails/EnquiryDetails';
import PurchaseManagement from './Components/PurchaseManagement/PurchaseManagement';
import PurchaseReport from './Components/PurchaseReport/PurchaseReport';
import SalesDetails from './Components/SalesDetails/SalesDetails';
import LeaveManagement from './Components/LeaveManagement/LeaveManagement';
import UserSidebar from './Components/UserSidebar/UserSidebar';
import SuperAdminSidebar from './Components/SuperAdminSidebar/SuperAdminsidebar';




const App = () => {
  return (
    <Router>
       {/* <Navbar /> */}
      <SideBar>
      <Routes>
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
         <Route path="/user-management" element={<UserManagement />} /> 
         <Route path="/resetpassword" element={<ResetPassword />} /> 
         <Route path="/logout" element={<Logout />} /> 
         <Route path='/signin' element={<SignIn />}></Route>
         {/* <Route path='/signup' element={<Signup />}></Route> */}
         <Route path='/userProfile' element={<UserProfile />}></Route>
         <Route path='/sales-management' element={<SalesManagement />}></Route>
         <Route path='/sales-report'  element={<SalesDetails/>}></Route>
         <Route path='/enquiry-management' element={<EnquiryManagement />}></Route>
         <Route path='/task-manager' element={<TaskManager />}></Route>
         <Route path='/enquiries-details' element={<EnquiryDetails />}></Route>
         <Route path='/purchase-management' element={<PurchaseManagement />}></Route>
         <Route path='/purchase-report' element={<PurchaseReport />}></Route>
         <Route path='/leave-management'  element={<LeaveManagement/>}></Route>
      </Routes>
      </SideBar>
      
      <Routes>
      <Route path="/user-sidebar" element={<UserSidebar />}></Route>
      </Routes>
      <Routes>
        <Route path="/Super-Admin-sidebar" element={<SuperAdminSidebar />}></Route>
      </Routes>
   {/* <Footer /> */}
    </Router>
  );
};

export default App;