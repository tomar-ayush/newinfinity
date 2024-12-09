// components/admin/SystemStats.tsx
"use client"

import React from 'react';
import {
  Users,
  Server,
  Database
} from 'lucide-react';

const systemStatsData = [
  {
    icon: Users,
    color: 'text-blue-500',
    label: 'Total Users',
    value: '1,254',
  },
  {
    icon: Server,
    color: 'text-green-500',
    label: 'System Uptime',
    value: '99.99%',
  },
  {
    icon: Database,
    color: 'text-purple-500',
    label: 'Data Storage',
    value: '72% Used',
  }
];

const SystemStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {systemStatsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-6 flex items-center"
        >
          <stat.icon className={`${stat.color} mr-4`} size={40} />
          <div>
            <h3 className="text-gray-600">{stat.label}</h3>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemStats;
