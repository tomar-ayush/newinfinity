"use client"

import React, { useState, useMemo } from 'react';
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
import {
  Users,
  Settings,
  Activity,
  Server,
  Database,
  Bell,
  User,
  LogOut,
  Search
} from 'lucide-react';

// Sample data remains the same as in previous version
export const userActivityData = [
  { name: 'Jan', activeUsers: 40, newUsers: 24, deletedUsers: 5 },
  { name: 'Feb', activeUsers: 30, newUsers: 18, deletedUsers: 3 },
  { name: 'Mar', activeUsers: 50, newUsers: 35, deletedUsers: 7 },
  { name: 'Apr', activeUsers: 45, newUsers: 27, deletedUsers: 6 },
  { name: 'May', activeUsers: 55, newUsers: 40, deletedUsers: 4 },
];

export const systemLogs = [
  { id: 1, type: 'User', action: 'Login', details: 'John Doe logged in', timestamp: '2024-05-15 10:30' },
  { id: 2, type: 'System', action: 'Update', details: 'Security patch applied', timestamp: '2024-05-16 02:15' },
  { id: 3, type: 'Database', action: 'Backup', details: 'Full system backup completed', timestamp: '2024-05-17 00:05' },
];

export const userManagementData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20 14:45' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-05-19 09:22' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Suspended', lastLogin: '2024-05-10 11:15' },
];

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userFilter, setUserFilter] = useState<'All' | 'Active' | 'Suspended'>('All');

  const filteredUsers = useMemo(() => {
    return userManagementData.filter(user =>
      (userFilter === 'All' || user.status === userFilter) &&
      (searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, userFilter]);

  const renderSystemStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
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
      ].map((stat, index) => (
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

  const renderUserActivityChart = () => (
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

  const renderSystemLogs = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">System Logs</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-black">Type</th>
            <th className="text-left py-2 text-black">Action</th>
            <th className="text-left py-2 text-black">Details</th>
            <th className="text-left py-2 text-black">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {systemLogs.map((log) => (
            <tr key={log.id} className="border-b">
              <td className="py-2 text-black">{log.type}</td>
              <td className="py-2 text-black">{log.action}</td>
              <td className="py-2 text-black">{log.details}</td>
              <td className="py-2 text-black">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderUserManagement = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">User Management</h2>
        <div className="flex space-x-2">
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value as 'All' | 'Active' | 'Suspended')}
            className="border rounded px-2 py-1 text-black"
          >
            <option value="All">All Users</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-2 py-1 pl-8 w-full text-black"
            />
            <Search
              className="absolute left-2 top-2 text-gray-400"
              size={20}
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New User
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            {['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map(header => (
              <th key={header} className="text-left py-2 text-black">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-2 text-black">{user.name}</td>
              <td className="py-2 text-black">{user.email}</td>
              <td className="py-2 text-black">{user.role}</td>
              <td className="py-2">
                <span
                  className={`
                    px-2 py-1 rounded text-xs 
                    ${user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'}
                  `}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 text-black">{user.lastLogin}</td>
              <td className="py-2">
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <User size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex mb-6 bg-white rounded-lg shadow">
        {[
          { key: 'dashboard', icon: <Activity size={20} />, label: 'Dashboard' },
          { key: 'users', icon: <Users size={20} />, label: 'User Management' },
          { key: 'logs', icon: <Bell size={20} />, label: 'System Logs' },
          { key: 'settings', icon: <Settings size={20} />, label: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.key}
            className={`
              flex-1 py-3 px-4 text-center flex items-center justify-center 
              ${currentTab === tab.key
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            onClick={() => setCurrentTab(tab.key)}
          >
            {tab.icon}
            <span className="ml-2 hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {currentTab === 'dashboard' && (
        <div className="space-y-6">
          {renderSystemStats()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderUserActivityChart()}
            {renderSystemLogs()}
          </div>
        </div>
      )}

      {currentTab === 'users' && renderUserManagement()}

      {currentTab === 'logs' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Detailed System Logs</h2>
          {renderSystemLogs()}
        </div>
      )}

      {currentTab === 'settings' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black">Settings</h2>
          <p className="text-black">Manage your settings here...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
