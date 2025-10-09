import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-5">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
