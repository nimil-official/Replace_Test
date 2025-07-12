import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './pages/registerPage'
import './App.css'
import ProductPage from './pages/productPage';
import Configurator from './pages/configuratorPage';
import AdminPage from './components/Admin/adminTable';
import { useEffect } from 'react';

function App() {
  
// App.jsx or Layout.jsx

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<ProductPage />} />
        <Route path="/configurator/:detailsId" element={<Configurator />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App
