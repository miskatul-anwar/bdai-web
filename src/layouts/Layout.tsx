import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#ecf0f1] font-sans">
      <Navbar />
      {/* Offset for fixed navbar height (h-14 = 3.5rem) */}
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
}
