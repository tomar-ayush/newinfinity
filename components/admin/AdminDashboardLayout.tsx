"use client"

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
