import React, { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()
    const handleLogout = () => {

      localStorage.removeItem('token');     // Remove JWT
      localStorage.removeItem('user');      // Optional: if you're storing user info too

      navigate('/'); // redirect to login page
    };
  return (
    <header className="bg-white shadow-md px-4 py-4 w-full relative">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        
        {/* Logo or App Name */}
        <div className="text-xl font-bold text-blue-600" onClick={() => navigate("/list")}>
          MyStore
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-gray-700 font-medium">
          <a href="#contact" className="hover:text-blue-600">Contact Us</a>
          <a href="#stores" className="hover:text-blue-600">Stores</a>
        </nav>

        {/* Right side icons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 relative">
          
          {/* Profile with dropdown */}
          <div className="relative">
            <button
              className="flex items-center hover:text-blue-600"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <User className="w-5 h-5 mr-1" />
              <span className="text-sm">Profile</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button className="flex items-center hover:text-blue-600">
            <ShoppingCart className="w-5 h-5 mr-1" />
            <span className="text-sm">Cart</span>
          </button>
        </div>
      </div>
    </header>

  );
}
