"use client"

import React, { useState } from 'react';
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
  Shield,
  Activity,
  Server,
  Database,
  Bell,
  User,
  LogOut
} from 'lucide-react';

// Sample data for charts and tables
const userActivityData = [
  { name: 'Jan', activeUsers: 40, newUsers: 24, deletedUsers: 5 },
  { name: 'Feb', activeUsers: 30, newUsers: 18, deletedUsers: 3 },
  { name: 'Mar', activeUsers: 50, newUsers: 35, deletedUsers: 7 },
  { name: 'Apr', activeUsers: 45, newUsers: 27, deletedUsers: 6 },
  { name: 'May', activeUsers: 55, newUsers: 40, deletedUsers: 4 },
];

const systemLogs = [
  { id: 1, type: 'User', action: 'Login', details: 'John Doe logged in', timestamp: '2024-05-15 10:30' },
  { id: 2, type: 'System', action: 'Update', details: 'Security patch applied', timestamp: '2024-05-16 02:15' },
  { id: 3, type: 'Database', action: 'Backup', details: 'Full system backup completed', timestamp: '2024-05-17 00:05' },
];

const userManagementData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-05-20 14:45'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-05-19 09:22'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Suspended',
    lastLogin: '2024-05-10 11:15'
  },
];

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderSystemStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-6 flex items-center">
        <Users className="text-blue-500 mr-4" size={40} />
        <div>
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">1,254</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 flex items-center">
        <Server className="text-green-500 mr-4" size={40} />
        <div>
          <h3 className="text-gray-500">System Uptime</h3>
          <p className="text-2xl font-bold">99.99%</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 flex items-center">
        <Database className="text-purple-500 mr-4" size={40} />
        <div>
          <h3 className="text-gray-500">Data Storage</h3>
          <p className="text-2xl font-bold">72% Used</p>
        </div>
      </div>
    </div>
  );

  const renderUserActivityChart = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Activity</h2>
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
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">Action</th>
            <th className="text-left py-2">Details</th>
            <th className="text-left py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {systemLogs.map((log) => (
            <tr key={log.id} className="border-b">
              <td className="py-2">{log.type}</td>
              <td className="py-2">{log.action}</td>
              <td className="py-2">{log.details}</td>
              <td className="py-2">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderUserManagement = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New User
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Email</th>
            <th className="text-left py-2">Role</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Last Login</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userManagementData.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <span className={`
                  px-2 py-1 rounded text-xs 
                  ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {user.status}
                </span>
              </td>
              <td className="py-2">{user.lastLogin}</td>
              <td className="py-2">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <User size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
      {/* Tab Navigation */}
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

      {/* Conditional Rendering for Tabs */}
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
          <h2 className="text-xl font-semibold mb-4">Detailed System Logs</h2>
          {renderSystemLogs()}
        </div>
      )}

      {currentTab === 'settings' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
              <div className="flex items-center mb-4">
                <Shield className="mr-2 text-gray-600" size={24} />
                <span>Two-Factor Authentication</span>
                <div className="ml-auto">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Email Notifications
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  SMS Alerts
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
