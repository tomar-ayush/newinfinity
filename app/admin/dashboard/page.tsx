import React from 'react';
import SystemStats from '@/components/admin/SystemStats';
import UserActivityChart from '@/components/admin/UserActivityChart';
import SystemLogs from '@/components/admin/SystemLogs';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SystemStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivityChart />
        <SystemLogs />
      </div>
    </div>
  );
}
