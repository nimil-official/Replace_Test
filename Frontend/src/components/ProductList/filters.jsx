import React from 'react';

export default function Filters({ filters, setFilters }) {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">All</option>
          <option value="Sofa">Sofa</option>
          <option value="Table">Table</option>
        </select>
      </div>

      {/* Price Filter */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}
