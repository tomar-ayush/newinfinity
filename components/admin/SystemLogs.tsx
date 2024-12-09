"use client"

import React from 'react';
import { systemLogs } from '@/lib/data/admin-data';

const SystemLogs: React.FC = () => {
  return (
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
};

export default SystemLogs;
