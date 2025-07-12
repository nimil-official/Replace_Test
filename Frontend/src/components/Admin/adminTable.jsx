import React, { useEffect, useState } from 'react';
import Header from '../Headers/header';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetch('http://localhost:5001/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const refreshUsers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/admin/users'); // Adjust URL as needed
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to refresh users", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('User updated');
        setShowModal(false);
        refreshUsers(); // to reload updated data
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };


  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("User deleted");
        refreshUsers(); // Refresh the list after deletion
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Error deleting user");
    }
  };


  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
        
        <table className="w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="p-3 text-black">{user.name}</td>
                <td className="p-3 text-black">{user.phone}</td>
                <td className="p-3 text-black">{user.email}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-4 py-2 rounded text-black"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border px-4 py-2 rounded text-black"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border px-4 py-2 rounded text-black"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
