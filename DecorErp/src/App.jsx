
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
import TaskManager from './Components/TaskManager/TaskManager';




const App = () => {
  return (
    <Router>
       <Navbar />
      <SideBar />

      <Routes>
      
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
         <Route path="/user-management" element={<UserManagement />} /> 
         <Route path="/reset-password" element={<ResetPassword />} /> 
         <Route path='/signin' element={<SignIn />}></Route>
         <Route path='/signup' element={<Signup />}></Route>
         <Route path='/userProfile' element={<UserProfile />}></Route>
         <Route path='/sales' element={<SalesManagement />}></Route>
         <Route path='/task-manager' element={<TaskManager />}></Route>
          
      </Routes>
   {/* <Footer /> */}
    </Router>
  );
};

export default App;