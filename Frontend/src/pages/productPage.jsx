import React, { useEffect, useState } from 'react';
import Header from '../components/Headers/header';
import ProductCard from '../components/ProductList/productCard';
import Filters from '../components/ProductList/filters';

// const initialProducts = [
//   {
//     name: 'Comfort Sofa',
//     price: 12000,
//     category: 'Sofa',
//     image: 'Images/sofa.webp',
//     file: "Models/sofa_-_ikea_nockeby.glb"
//   },
//   {
//     name: 'Wooden Table',
//     price: 8000,
//     category: 'Table',
//     image: 'Images/table.webp',
//     file: "Models/victorian_coffee_table.glb"
//   }
// ];


export default function ProductPage() {
  const [initialProducts, setInitialProducts] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => setInitialProducts(data))
      .catch(err => console.error("Product fetch failed", err));
  }, []);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  const filteredProducts = initialProducts.filter((product) => {
    const matchCategory = filters.category ? product.category === filters.category : true;
    const matchMin = filters.minPrice ? product.price >= parseInt(filters.minPrice) : true;
    const matchMax = filters.maxPrice ? product.price <= parseInt(filters.maxPrice) : true;
    return matchCategory && matchMin && matchMax;
  });

  return (
    <div  className='min-h-screen w-full flex flex-col' style={{ backgroundColor: '#e1e1e1' }}>
        <Header />
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 gap-6">
    
            {/* Left Sidebar */}
            <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Filters filters={filters} setFilters={setFilters} />
            </div>

            {/* Right Product Listing */}
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>

        </div>
    </div>

  );
}
