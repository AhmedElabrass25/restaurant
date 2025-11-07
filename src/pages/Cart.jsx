import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // ✅ Calculate total
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className="pb-10">
      <div className="container mt-10">
        <h2 className="text-3xl text-center font-bold mb-6">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center text-3xl pb-6 ">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-lg p-4 shadow-sm bg-white"
              >
                {/* image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 font-bold">
                    Price: {item.price} $
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-xl font-bold">Total : </h3>
                <span className="text-xl"> {totalPrice} $</span>
              </div>

              {/* Clear Cart */}
              <div className="flex items-center gap-1">
                <button
                  onClick={clearCart}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="px-6 py-2 bg-green-600 text-white hover:bg-green-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
