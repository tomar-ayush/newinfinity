"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Settings, Bell, LayoutDashboard } from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: Users,
    label: "User Management",
  },
  {
    href: "/admin/logs",
    icon: Bell,
    label: "System Logs",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false); // Sidebar state

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed inset-y-0 left-0 z-30 ${
          isExpanded ? "w-64" : "w-20"
        } bg-white border-r shadow-md p-4 transition-all duration-300`}
      >
        <div className="mb-8 flex items-center justify-center">
          {isExpanded ? (
            <h1 className="text-2xl font-bold text-black transition-opacity duration-300 whitespace-nowrap">
              Admin Panel
            </h1>
          ) : (
            <div className="text-black">
              <Bell size={24} />
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon
                  size={28}
                  className={`${isExpanded ? "mr-4" : "mx-auto"}`}
                />
                {isExpanded && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        } p-6`}
        style={{
          transition: "margin-left 0.3s ease", // Smooth transition
        }}
      ></div>
    </div>
  );
};

export default Sidebar;
