import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

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
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center py-8 text-gray-600">
        You haven’t placed any orders yet.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-6 shadow-sm bg-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <span className="text-green-600 font-bold">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Customer Info */}
            <p className="text-gray-700 mb-1">
              <strong>Name:</strong> {order.customer_name}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Email:</strong> {order.customer_email}
            </p>

            {/* Order Details */}
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Address:</strong> {order.address}
            </p>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-2">Products:</h3>
              <ul className="space-y-3">
                {order.products.map((product, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-4 border-b pb-2"
                  >
                    {/* Product Image */}
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    )}
                    {/* Product Info */}
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.quantity} × ${product.price}
                      </p>
                    </div>
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
