"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Mail, Users, TrendingUp, DollarSign } from "lucide-react";

// Sample data for charts and tables
const salesData = [
  { name: "Jan", leads: 40, conversions: 24, revenue: 2400 },
  { name: "Feb", leads: 30, conversions: 13, revenue: 1398 },
  { name: "Mar", leads: 20, conversions: 18, revenue: 9800 },
  { name: "Apr", leads: 27, conversions: 39, revenue: 3908 },
  { name: "May", leads: 18, conversions: 48, revenue: 4800 },
  { name: "Jun", leads: 23, conversions: 38, revenue: 3800 },
];

const potentialClientData = [
  {
    id: 1,
    name: "Acme Corp",
    status: "Pending",
    lastContacted: "2024-05-15",
    probability: "65%",
  },
  {
    id: 2,
    name: "Tech Innovations",
    status: "Negotiation",
    lastContacted: "2024-05-20",
    probability: "80%",
  },
  {
    id: 3,
    name: "Global Solutions",
    status: "Initial Contact",
    lastContacted: "2024-05-10",
    probability: "40%",
  },
];

const CRMDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  const generateEmailCampaign = () => {
    // Placeholder for email campaign generation logic
    alert("Email campaign generation initiated!");
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Key Metrics Cards */}
        <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                Total Leads
              </h3>
              <p className="text-2xl font-bold">254</p>
            </div>
            <Users className="text-blue-500 dark:text-blue-400" size={40} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                Conversion Rate
              </h3>
              <p className="text-2xl font-bold">42%</p>
            </div>
            <TrendingUp
              className="text-green-500 dark:text-green-400"
              size={40}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                Total Revenue
              </h3>
              <p className="text-2xl font-bold">$124,543</p>
            </div>
            <DollarSign
              className="text-purple-500 dark:text-purple-400"
              size={40}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                Email Campaigns
              </h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Mail className="text-red-500 dark:text-red-400" size={40} />
          </div>
        </div>
      </div>

      {/* Custom Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-lg shadow dark:bg-gray-800">
        {["overview", "leads", "campaigns"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 px-4 text-center capitalize 
              ${
                currentTab === tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering for Tabs */}
      {currentTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales Performance Chart */}
          <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sales Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.1)"
                  />
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="leads" stroke="#8884d8" />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#82ca9d"
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Potential Clients Table */}
          <div className="bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Top Potential Clients
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left py-2">Company</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {potentialClientData.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b dark:border-gray-600"
                    >
                      <td className="py-2">{client.name}</td>
                      <td className="py-2">{client.status}</td>
                      <td className="py-2">{client.probability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {currentTab === "leads" && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Potential Leads Management
            </h2>
            <button
              onClick={generateEmailCampaign}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Email Campaign
            </button>
          </div>
          <p>
            Leads management section with detailed tracking and interaction
            history.
          </p>
        </div>
      )}

      {currentTab === "campaigns" && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 dark:text-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Email Campaign Insights
          </h2>
          <p>
            Comprehensive email campaign tracking and performance analytics.
          </p>
        </div>
      )}
    </div>
  );
};

export default CRMDashboard;
