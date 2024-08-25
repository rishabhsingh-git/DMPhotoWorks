import React from 'react';
import { Outlet } from 'react-router-dom'; 
import SideNavbar from '../Sidebar/SideNavbar';
import "./Admin.css"


const Admin = () => {
  return (
    <div className="admin-layout">
      <SideNavbar />
      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Admin;