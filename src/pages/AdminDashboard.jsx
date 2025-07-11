import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [admin, setAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    setAdmin(decoded);
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.fullName || u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'all' || u.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Admin Dashboard</h1>
        <p className="text-center text-gray-600 mb-4">Manage users, search, and delete</p>

        {admin && (
          <p className="text-sm text-right mb-4">
            Logged in as: <span className="font-semibold text-blue-600">{admin.role}</span>
          </p>
        )}

        {/* 🔍 Search & Role Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded focus:ring focus:ring-blue-200"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border rounded focus:ring focus:ring-blue-200"
          >
            <option value="all">All Roles</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* 👥 User Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Available</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{u.fullName || u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.role}</td>
                    <td className="px-4 py-2">{u.available ? '✅' : '❌'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
