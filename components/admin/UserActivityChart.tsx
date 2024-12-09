// components/admin/UserActivityChart.tsx
"use client"

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { userActivityData } from '@/lib/data/admin-data';

const UserActivityChart: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">User Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userActivityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
          <Bar dataKey="newUsers" fill="#82ca9d" name="New Users" />
          <Bar dataKey="deletedUsers" fill="#ff7300" name="Deleted Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
