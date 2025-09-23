// src/pages/Shop.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // ✅ الصفحة الحالية
  const productsPerPage = 6; // ✅ عدد المنتجات في الصفحة
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let { data, error } = await supabase.from("products").select("*");
      if (error) console.error(error);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // ✅ حساب المنتجات لكل صفحة
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Menu</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Discover our delicious dishes made with love and the finest
          ingredients.
        </p>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 md:px-12 py-16">
        {loading ? (
          // Skeleton Loader
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        ) : currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products available yet.
          </p>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {currentProducts.map((item) => (
                <ProductCard item={item} key={item.id} addToCart={addToCart} />
              ))}
            </div>

            {/* ✅ Pagination Controls */}
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Shop;
