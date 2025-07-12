import React, { useState } from 'react';
import { useNavigate } from 'react-router';
export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits for phone number
    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const backToLogin = () => {
    navigate("/")
  }

  const handleRegister = async () => {
    try {
        const dataSub = JSON.stringify(formData)

        const res = await fetch('http://localhost:5001/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataSub,
        });
        console.log(formData)
        const data = await res.json();
        
        if (res.ok) {
          alert(data.message);
          navigate("/")
        } else {
          alert(data.message || 'Error');
        }
    } catch (err) {
        console.error('Register Error:', err);
        alert('Server error');
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Register</h2>

      <form className="space-y-6">
        {/* Name */}
        <div className="flex items-center gap-4">
          <label htmlFor="name" className="w-32 text-left text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <label htmlFor="phone" className="w-32 text-left text-gray-700 font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            maxLength={10}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-32 text-left text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-4">
          <label htmlFor="password" className="w-32 text-left text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center gap-4">
          <label htmlFor="confirmPassword" className="w-32 text-left text-gray-700 font-medium">
            Confirm
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Register Button */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Register
          </button>
          <button
            type="button"
            onClick={backToLogin}
            className="bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
