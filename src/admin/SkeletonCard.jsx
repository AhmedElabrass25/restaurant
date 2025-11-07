import React from "react";

const SkeletonCard = () => (
  <div className="border rounded-lg p-4 shadow animate-pulse flex flex-col">
    <div className="w-full h-40 bg-gray-300 rounded"></div>
    <div className="h-4 bg-gray-300 rounded mt-3 w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
    <div className="mt-auto flex gap-2 mt-4">
      <div className="flex-1 h-8 bg-gray-300 rounded"></div>
      <div className="flex-1 h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export default SkeletonCard;
