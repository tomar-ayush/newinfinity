"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Activity, Bell, Settings, Menu, Sun, Moon } from "lucide-react";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span
              className={`font-bold text-lg ${isSidebarOpen ? "" : "hidden"}`}
            >
              Admin Panel
            </span>
            <button
              className="text-gray-500 dark:text-gray-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
          <nav className="mt-4">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Activity size={24} />
              <span className={`ml-3 ${isSidebarOpen ? "" : "hidden"}`}>
                Dashboard
              </span>
            </Link>
            <Link
              href="/users"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Users size={24} />
              <span className={`ml-3 ${isSidebarOpen ? "" : "hidden"}`}>
                User Management
              </span>
            </Link>
            <Link
              href="/logs"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell size={24} />
              <span className={`ml-3 ${isSidebarOpen ? "" : "hidden"}`}>
                System Logs
              </span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings size={24} />
              <span className={`ml-3 ${isSidebarOpen ? "" : "hidden"}`}>
                Settings
              </span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-end">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          {/* Content here will be handled by Next.js page components */}
        </div>
      </div>
    </div>
  );
};

export default App;
