// app/admin/logs/page.tsx
import React from 'react';
import SystemLogs from '@/components/admin/SystemLogs';

export default function LogsPage() {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-semibold text-black mb-4">Detailed System Logs</h2>
			<SystemLogs />
		</div>
	);
}
