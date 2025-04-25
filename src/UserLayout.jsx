import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import UserSidebar from './Components/UserSidebar/UserSidebar';

const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <UserSidebar />
    <main>{children}</main>
  </>
);

export default UserLayout;
