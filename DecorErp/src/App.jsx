
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/SideBar/Sidebar';
import Signup from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';

// import Navbar from './Navbar/Navbar';



const App = () => {
  return (
    <Router>
      <Navbar />
      <SideBar />

      <Routes>
        {/* <Route path="/" element={<h1>Welcome to Gymfluence</h1>} /> */}
        {/* <Route path="/features" element={<Features />} /> */}
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
           <Route path='/Signup' element={<SignIn></SignIn>}></Route>
          <Route path='/SignIn' element={<Signup></Signup>}></Route>
      </Routes>
   {/* <Footer /> */}
    </Router>
  );
};

export default App;