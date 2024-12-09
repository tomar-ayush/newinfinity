// app/admin/users/page.tsx
"use client"

import React, { useState, useMemo } from 'react';
import { userManagementData } from '@/lib/data/admin-data';
import { Search, User, LogOut } from 'lucide-react';

export default function UsersPage() {
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

	return (
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
}
