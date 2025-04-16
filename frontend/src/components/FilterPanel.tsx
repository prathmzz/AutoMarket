import React from "react";

type Props = {
  filters: {
    minPrice: string;
    maxPrice: string;
    minYear: string;
    maxYear: string;
    location: string;
  };
  updateFilters: (updates: Partial<typeof filters>) => void;
  clearFilters: () => void;
};

export const FilterPanel: React.FC<Props> = ({
  filters,
  updateFilters,
  clearFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minYear}
              onChange={(e) => updateFilters({ minYear: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxYear}
              onChange={(e) => updateFilters({ maxYear: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
