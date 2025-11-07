import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ searchTerm, setSearchTerm, setPage }) => {
  return (
    <>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white w-full md:w-1/2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="outline-none w-full"
        />
      </div>
    </>
  );
};

export default Search;
