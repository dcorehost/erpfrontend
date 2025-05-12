import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import CLientSidebar from './Components/ClientSideBar/ClientSideBar';

const ClientLayout = ({ children }) => (
  <>
    <Navbar />
    <CLientSidebar />
    <main>{children}</main>
  </>
);

export default ClientLayout;
