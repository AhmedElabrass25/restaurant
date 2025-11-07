import React from "react";

const FilterCategory = ({
  selectedCategory,
  setSelectedCategory,
  setPage,
  categories,
}) => {
  return (
    <>
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setPage(1);
        }}
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-green-300 focus:border-green-500"
      >
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterCategory;
