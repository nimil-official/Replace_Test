import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async () => {
  try {
    console.log("formdata", formData)
    const res = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.username,
        password: formData.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate("/list");
      }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login Error:', err);
    alert('Server error');
  }
};

  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  const handleRegister = () => {
      navigate('/register')
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter username"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter password"
          required
        />
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          backgroundColor: '#007BFF',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        // className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
      >
        Login
      </button>

      {/* Links */}
      <div className="flex justify-between mt-4 text-sm">
        <button
          onClick={handleForgotPassword}
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
        <button
          onClick={handleRegister}
          style={{paddingLeft: "5px"}}
          className="text-gray-700 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
}
