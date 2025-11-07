import React from "react";

const Pagination = ({
  page,
  setPage,
  products,
  selectedCategory,
  searchTerm,
  ITEMS_PER_PAGE,
}) => {
  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of{" "}
          {Math.ceil(
            (selectedCategory === "All"
              ? products
              : products.filter((p) => p.category === selectedCategory)
            ).filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length / ITEMS_PER_PAGE
          )}
        </span>

        <button
          disabled={
            page >=
            Math.ceil(
              (selectedCategory === "All"
                ? products
                : products.filter((p) => p.category === selectedCategory)
              ).filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length / ITEMS_PER_PAGE
            )
          }
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 rounded ${
            page >=
            Math.ceil(
              (selectedCategory === "All"
                ? products
                : products.filter((p) => p.category === selectedCategory)
              ).filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length / ITEMS_PER_PAGE
            )
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
