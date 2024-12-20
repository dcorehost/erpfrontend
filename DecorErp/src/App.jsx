
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/SideBar/Sidebar';
import Signup from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import UserProfile from './Components/UseProfile/UserProfile';
import Logout from './Components/Logout/Logout';

// import Navbar from './Navbar/Navbar';



const App = () => {
  return (
    <Router>
      {/* <Navbar />
      <SideBar /> */}

      <Routes>
        {/* <Route path="/" element={<h1>Welcome to Gymfluence</h1>} /> */}
        {/* <Route path="/features" element={<Features />} /> */}
           <Route path='/SignIn' element={<SignIn></SignIn>}></Route>
          <Route path='/Signup' element={<Signup></Signup>}></Route>
          <Route path='/UserProfile' element={<UserProfile></UserProfile>}></Route>
          <Route path='/Logout' element={<Logout></Logout>}></Route>
      </Routes>
   {/* <Footer /> */}
    </Router>
  );
};

export default App;