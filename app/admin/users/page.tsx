"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, User, LogOut } from 'lucide-react';

// Define TypeScript interface for User
interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
	status: 'Active' | 'Suspended';
	lastLogin: string;
}

// Define table headers as a constant
const TABLE_HEADERS = ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'];

export default function UsersPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [userFilter, setUserFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Optimize fetch with useCallback to prevent unnecessary re-renders
	const fetchUsers = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/users');

			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}

			const data: User[] = await response.json();
			setUsers(data);
			setError(null);
		} catch (error) {
			console.error('Error fetching users:', error);
			setError(error instanceof Error ? error.message : 'An unknown error occurred');
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch users on component mount
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	// Memoized filtered users with improved type safety and performance
	const filteredUsers = useMemo(() => {
		return users.filter(user =>
			(userFilter === 'All' || user.status === userFilter) &&
			(searchTerm === '' ||
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, userFilter, users]);

	// Render loading state
	if (loading) {
		return (
			<div className="flex justify-center items-center h-full">
				<p>Loading users...</p>
			</div>
		);
	}

	// Render error state
	if (error) {
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
				<strong className="font-bold">Error: </strong>
				<span>{error}</span>
				<button
					onClick={fetchUsers}
					className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-black">User Management</h2>
				<div className="flex space-x-2">
					<select
						value={userFilter}
						onChange={(e) => setUserFilter(e.target.value as 'All' | 'Active' | 'Suspended')}
						className="border rounded px-2 py-1"
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
							className="border rounded px-2 py-1 pl-8 w-full"
						/>
						<Search
							className="absolute left-2 top-2 text-gray-400"
							size={20}
						/>
					</div>

					<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Add New User
					</button>
				</div>
			</div>

			{filteredUsers.length === 0 ? (
				<div className="text-center text-gray-500 py-4">
					No users found
				</div>
			) : (
				<table className="w-full">
					<thead>
						<tr className="border-b">
							{TABLE_HEADERS.map(header => (
								<th key={header} className="text-left py-2 text-black">{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<tr key={user._id} className="border-b hover:bg-gray-50 transition">
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
								<td className="py-2 text-black">
									{new Date(user.lastLogin).toLocaleString()}
								</td>
								<td className="py-2">
									<div className="flex space-x-2">
										<button
											aria-label="View User Details"
											className="text-blue-500 hover:text-blue-700"
										>
											<User size={20} />
										</button>
										<button
											aria-label="Deactivate User"
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
			)}
		</div>
	);
}
