import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import FilterCategory from "./FilterCategory";
import Search from "./Search";
import SkeletonCard from "./SkeletonCard";
import CardProduct from "./CardProduct";

const ITEMS_PER_PAGE = 8;

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        Swal.fire("❌ Error", error.message, "error");
      } else {
        setProducts(data);
        setCategories(["All", ...new Set(data.map((p) => p.category))]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  // ✅ Filter & search logic
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    setDisplayed(paginated);
  }, [products, selectedCategory, searchTerm, page]);

  // ✅ Delete product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      Swal.fire("❌ Error", error.message, "error");
    } else {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product deleted successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          🍀 All Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🍀 All Products
      </h2>
      <div className="container">
        {/* 🔍 Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search */}
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPage={setPage}
          />

          {/* Category Filter */}
          <FilterCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPage={setPage}
            categories={categories}
          />
        </div>

        {/* 🛒 Product List */}
        {displayed.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayed.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* 📄 Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          products={products}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default DisplayProducts;
