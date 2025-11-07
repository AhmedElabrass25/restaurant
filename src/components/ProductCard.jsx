import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ item, addToCart }) => {
  const { cart } = useCart();
  const inCart = cart.some((p) => p.id === item.id);

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      {/* ✅ Product Image */}
      <Link to={`/productDetails/${item.id}`}>
        <div className="relative w-full h-60 overflow-hidden group">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* category badge */}
          <span className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
            {item.category}
          </span>
        </div>
      </Link>

      {/* ✅ Product Info */}
      <div className="p-5 flex flex-col">
        <div>
          <h2 className="text-xl font-bold text-gray-800 truncate mb-1">
            {item.name}
          </h2>
          <p className="text-green-700 font-extrabold text-2xl">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* ✅ Add to Cart Button */}
        <button
          onClick={() => addToCart(item)}
          disabled={inCart}
          className={`w-full flex items-center justify-center gap-2 py-3 mt-4 text-lg font-semibold rounded-xl transition-all duration-300
            ${
              inCart
                ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-lg shadow-green-200"
            }`}
        >
          <FaCartPlus className="text-xl" />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
