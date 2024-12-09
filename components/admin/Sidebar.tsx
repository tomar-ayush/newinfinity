"use client"

import {
  Bell,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SIDEBAR_ITEMS = [
  {
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    href: '/admin/users',
    icon: Users,
    label: 'User Management'
  },
  {
    href: '/admin/logs',
    icon: Bell,
    label: 'System Logs'
  },
  {
    href: '/admin/settings',
    icon: Settings,
    label: 'Settings'
  }
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center p-3 rounded-lg transition-colors duration-200
                ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <Icon className="mr-3" size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
