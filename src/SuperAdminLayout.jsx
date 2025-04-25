import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import SuperAdminSidebar from './Components/SuperAdminSidebar/SuperAdminSidebar';

const SuperAdminLayout = ({ children }) => (
  <>
    <Navbar />
    <SuperAdminSidebar />
    <main>{children}</main>
  </>
);

export default SuperAdminLayout;
