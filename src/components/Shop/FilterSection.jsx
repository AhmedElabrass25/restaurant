import React from "react";

const FilterSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="">
      <div className="flex flex-col sm:flex-row items-center justify-right gap-4">
        <label
          htmlFor="category"
          className="text-gray-700 font-semibold text-lg"
        >
          Filter by Category:
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-60 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default FilterSection;
