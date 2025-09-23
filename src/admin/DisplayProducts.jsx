import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("❌ Error deleting product: " + error.message);
    } else {
      alert("✅ Product deleted successfully!");
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>

              {/* Buttons */}
              <div className="mt-auto flex gap-2">
                <button
                  className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/updateProduct/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayProducts;
