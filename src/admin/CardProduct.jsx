import React from "react";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ product, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={product.id}
        className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col bg-white"
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
        )}
        <h3 className="text-lg font-semibold mt-3 text-gray-800">
          {product.name}
        </h3>
        <p className="text-green-700 font-medium mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>

        <div className="mt-auto flex gap-2">
          <button
            className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
            onClick={() => navigate(`/updateProduct/${product.id}`)}
          >
            Edit
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
