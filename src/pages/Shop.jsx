// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import ProductCard from "../components/ProductCard";
// import { useCart } from "../context/CartContext";
// import SkeletonCard from "../components/Shop/SkeletonCard";
// import Pagination from "../components/Shop/Pagination";
// import FilterSection from "../components/Shop/FilterSection";
// import Hero from "../components/Shop/Hero";

// function Shop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const { addToCart } = useCart();
//   console.log(products);
//   const productsPerPage = 6;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       let { data, error } = await supabase.from("products").select("*");
//       if (error) console.error(error);
//       else setProducts(data);
//       setLoading(false);
//     };
//     fetchProducts();
//   }, []);

//   // 🟢Extract categories
//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   // 🟣 Filteration
//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   // 🟠 calc pages after filter
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // 🟡 Reset page when category changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategory]);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <Hero />
//       {/* ✅ Filter Section */}
//       <FilterSection
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />

//       {/* Products Grid */}
//       <section className="container py-10">
//         {loading ? (
//           // Skeleton Loader
//           <SkeletonCard />
//         ) : currentProducts.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No products found in this category.
//           </p>
//         ) : (
//           <>
//             <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//               {currentProducts.map((item) => (
//                 <ProductCard item={item} key={item.id} addToCart={addToCart} />
//               ))}
//             </div>

//             {/* Pagination */}
//             <Pagination
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               totalPages={totalPages}
//             />
//           </>
//         )}
//       </section>
//     </div>
//   );
// }

// export default Shop;
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import SkeletonCard from "../components/Shop/SkeletonCard";
import Pagination from "../components/Shop/Pagination";
import FilterSection from "../components/Shop/FilterSection";
import Hero from "../components/Shop/Hero";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 New state for search
  const { addToCart } = useCart();
  const productsPerPage = 6;

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

  // 🟢 Extract categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // 🟣 Filter by category + search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 🟠 Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 🟡 Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* ✅ Filter + Search Section */}
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
        {/* 🔍 Search Input */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
        {/* ✅ Filter Section */}
        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      <section className="container pb-10">
        {loading ? (
          <SkeletonCard />
        ) : currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {currentProducts.map((item) => (
                <ProductCard item={item} key={item.id} addToCart={addToCart} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default Shop;
