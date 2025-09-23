import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ item, addToCart }) => {
  const { cart } = useCart();
  const inCart = cart.some((p) => p.id === item.id); // ✅ تحقق إذا موجود

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition p-3"
    >
      <Link to={"/productDetails/" + item.id}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="py-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {item.name}
          </h2>
          <p className="text-green-600 font-bold text-xl">${item.price}</p>
        </div>
      </Link>
      <button
        onClick={() => addToCart(item)}
        disabled={inCart} // ✅ Disable لو موجود
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${
          inCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        <FaCartPlus /> {inCart ? "In Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
