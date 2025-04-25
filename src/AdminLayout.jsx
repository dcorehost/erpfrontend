import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import AdminSideBar from './Components/AdminSideBar/AdminSideBar';

const AdminLayout = ({ children }) => (
  <>
    <Navbar />
    <AdminSideBar />
    <main>{children}</main>
  </>
);

export default AdminLayout;
