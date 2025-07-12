import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/configurator/${product.detailsId}`);
  };
  return (
    <div onClick={handleClick} className="bg-white shadow-md rounded-lg p-4 w-full max-h-[50vh] justify-between h-auto">
      <img src={product.image} alt={product.name} className="w-full h-30 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
    </div>
  );
}