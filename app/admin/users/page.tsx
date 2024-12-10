"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, User, LogOut } from "lucide-react";
import { toast } from "sonner"

// Define TypeScript interface for User
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Suspended";
  lastLogin: string;
  password?: string;
  phone?: string;
  activity?: string[];
}

// Define table headers as a constant
const TABLE_HEADERS = [
  "Name",
  "Email",
  "Role",
  "Status",
  "Last Login",
  "Actions",
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState<"All" | "Active" | "Suspended">(
    "All"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Optimize fetch with useCallback to prevent unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/user/getUsers");
      {
        /* console.log("The promise is " + await response.json()) */
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (userFilter === "All" || user.status === userFilter) &&
        (searchTerm === "" ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, userFilter, users]);

  // Handle View User Details
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  // Handle Logout
  const handleLogout = async (userId: string) => {
    try {
      console.log("the function was clicked ", userId)
      const userIdJson = {
        _id: userId,
      }
      const response = await fetch("http://localhost:3000/api/user/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userIdJson)
      });

      if (!response.ok) {
        throw new Error("Failed to Delete User")
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error is deleting User", error);
    }



  };

  // Handle Update User
  const handleUpdateUser = () => {
    {/* console.log("Updated user:", selectedUser); */ }
    setShowPopup(false);
  };


  const updateUserDetails = async () => {
    if (!selectedUser) return;

    const userDetails = {
      _id: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status,
      password: selectedUser.password || undefined,
    };

    try {
      const response = await fetch("http://localhost:3000/api/user/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      toast.success('User Updated', {
        description: "The user details of the user are updated",
      })

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setShowPopup(false);
      setError(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };



  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">User Management</h2>
        <div className="flex space-x-2">
          <select
            value={userFilter}
            onChange={(e) =>
              setUserFilter(e.target.value as "All" | "Active" | "Suspended")
            }
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
            <Search className="absolute left-2 top-2 text-gray-400" size={20} />
          </div>

          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> */}
          {/*   Add New User */}
          {/* </button> */}
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No users found</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {TABLE_HEADERS.map((header) => (
                <th key={header} className="text-left py-2 text-black">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 text-black">{user.name}</td>
                <td className="py-2 text-black">{user.email}</td>
                <td className="py-2 text-black">{user.role}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
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
                      onClick={() => handleViewDetails(user)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <User size={20} />
                    </button>
                    <button
                      onClick={() => handleLogout(user._id)}
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

      {/* Popup Modal */}
      {/* Popup Modal */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
              Update User Details
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Role
                </label>
                <select
                  value={selectedUser.role} // Assuming selectedUser has a role property
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 p-2 text-black"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Status
                </label>
                <select
                  value={selectedUser.status}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      status: e.target.value as "Active" | "Suspended",
                    })
                  }
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 p-2 text-black"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                <input
                  type="password"
                  value={selectedUser.password || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      password: e.target.value,
                    })
                  }
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 p-2 text-black"
                />
              </div>
            </form>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 px-4 py-[10px] rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Logic to update user can be added here
                  updateUserDetails()
                }}
                className="bg-blue-500 text-white px-4 py-[10px] rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
