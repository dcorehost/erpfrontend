
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/SideBar/SideBar';
import Signup from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserProfile from './Components/UseProfile/UserProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserManagement from './Components/UserManagement/UserManagement';
import SalesManagement from './Components/SalesManagement/Salesmanagement';
import EnquiryManagement from './Components/EnquiryManagement/Enquirymanagement';
import TaskManager    from './Components/TaskManager/TaskManager'




const App = () => {
  return (
    <Router>
       {/* <Navbar /> */}
      <SideBar>
      <Routes>
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
         <Route path="/user-management" element={<UserManagement />} /> 
         <Route path="/resetpassword" element={<ResetPassword />} /> 
         <Route path='/signin' element={<SignIn />}></Route>
         <Route path='/signup' element={<Signup />}></Route>
         <Route path='/userProfile' element={<UserProfile />}></Route>
         <Route path='/sales-management' element={<SalesManagement />}></Route>
         <Route path='/enquiry-management' element={<EnquiryManagement />}></Route>
         <Route path='/task-manager' element={<TaskManager />}></Route>
      </Routes>
      </SideBar>

   {/* <Footer /> */}
    </Router>
  );
};

export default App;