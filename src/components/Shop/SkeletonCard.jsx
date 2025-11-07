import React from "react";

const SkeletonCard = () => {
  return (
    <>
      {" "}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white shadow animate-pulse"
            >
              <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SkeletonCard;
