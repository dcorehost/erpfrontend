
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SideBar from './Components/SideBar/Sidebar';
// import Navbar from './Navbar/Navbar';



const App = () => {
  return (
    <Router>
      <Navbar />
      <SideBar />

      <Routes>
        {/* <Route path="/" element={<h1>Welcome to Gymfluence</h1>} /> */}
        {/* <Route path="/features" element={<Features />} /> */}
       
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;