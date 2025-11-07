import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id) // ✅ فقط طلبات هذا المستخدم
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch orders ❌",
          text: "Something went wrong while fetching your orders.",
          confirmButtonColor: "#ef4444", // red
        });
      } else {
        setOrders(data);

        // ✅ Show success toast if orders fetched successfully
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Orders loaded successfully ✅",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: "#16a34a", // green
          color: "#fff",
        });
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-8">
        <Loading />
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mt-7">
        <h1 className="text-3xl font-bold mb-3 text-center">📦 My Orders</h1>
        <p className="text-center pb-8 text-xl text-gray-600">
          You haven’t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12 mt-5">
      <h1 className="text-3xl text-center font-bold mb-10">📦 My Orders</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                🧾 Order <span className="text-green-600">#{order.id}</span>
              </h2>
              <span className="text-2xl font-extrabold text-green-600 mt-2 sm:mt-0">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Customer Info */}
            <div className="grid sm:grid-cols-2 gap-3 text-gray-700 mb-4">
              <p>
                <strong className="text-gray-800">👤 Name:</strong>{" "}
                {order.customer_name}
              </p>
              <p>
                <strong className="text-gray-800">📧 Email:</strong>{" "}
                {order.customer_email}
              </p>
              <p>
                <strong className="text-gray-800">📦 Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="sm:col-span-2">
                <strong className="text-gray-800">📍 Address:</strong>{" "}
                {order.address}
              </p>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-800 text-lg flex items-center gap-2">
                🛍️ Products
              </h3>
              <ul className="space-y-4">
                {order.products.map((product, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-4 border-b last:border-none pb-3"
                  >
                    {/* Left side: Image + Info */}
                    <div className="flex items-center gap-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          📷
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.quantity} × ${product.price}
                        </p>
                      </div>
                    </div>

                    {/* Right side: Subtotal */}
                    <p className="font-semibold text-gray-700">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
