// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabaseClient"; // ⬅️ make sure you have supabase client setup
import { useEffect } from "react";
import Swal from "sweetalert2";

function Checkout() {
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    getUser();
  }, []);

  const total = Number(
    cart
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      .toFixed(2)
  );

  console.log(total);
  const handleCheckout = async (e) => {
    e.preventDefault();

    // ✅ Simple validation

    if (!customerName.trim() || !customerEmail.trim() || !address.trim()) {
      Swal.fire({
        icon: "error",
        title: "❌ Missing Information",
        text: "All fields are required!",
        confirmButtonColor: "#dc2626", // Red
        background: "#fff",
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "❌ Empty Cart",
        text: "Your cart is empty!",
        confirmButtonColor: "#dc2626",
        background: "#fff",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("orders").insert([
        {
          user_id: userId, // ✅ link order to logged-in user
          customer_name: customerName,
          customer_email: customerEmail,
          address,
          total,
          products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            image: item.image,
          })),
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      clearCart(); // ✅ Empty cart after order
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Order Placed Successfully!
        </h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleCheckout} className="space-y-6 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        ></textarea>

        <div className="text-right font-bold text-lg">
          Total: <span className="text-green-600">$ {total.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
