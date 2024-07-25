import React from 'react';

const FilterControls = ({ nameFilter, onNameChange, cities, cityFilter, onCityChange, highlightOldest, onHighlightChange }) => {
  return (
    <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={onNameChange}
        className="p-2 border border-gray-300 rounded"
      />
      <select
        value={cityFilter}
        onChange={onCityChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <label className="flex items-center p-2 border border-gray-300 rounded space-x-2 bg-white">
        <input
          type="checkbox"
          checked={highlightOldest}
          onChange={onHighlightChange}
          className="h-4 w-4"
        />
        <span>Highlight Oldest</span>
      </label>
    </div>
  );
};

export default FilterControls;
