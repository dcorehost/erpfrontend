
import React from 'react';
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
import './App.css';
import EnquiryManagement from './Components/EnquiryManagement/Enquirymanagement';
import EnquiryDetails from './Components/EnquiryDetails/EnquiryDetails';



const App = () => {
  return (
    <Router>
       {/* <Navbar /> */}
      {/* <SideBar> */}
      <Routes>
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
         <Route path="/user-management" element={<UserManagement />} /> 
         <Route path="/user-management" element={<ResetPassword />} /> 
         <Route path='/Signin' element={<SignIn></SignIn>}></Route>
         <Route path='/Signup' element={<Signup></Signup>}></Route>
         <Route path='/UserProfile' element={<UserProfile></UserProfile>}></Route>
         <Route path='/Sales' element={<SalesManagement />}></Route>
         <Route path='/enquiry' element={<EnquiryManagement></EnquiryManagement>}></Route>
         <Route path='/enquiries' element={<EnquiryDetails></EnquiryDetails>}></Route>
      </Routes>
      {/* </SideBar> */}

   {/* <Footer /> */}
    </Router>
  );
};

export default App;