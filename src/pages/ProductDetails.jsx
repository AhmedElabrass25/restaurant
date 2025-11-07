import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import RelatedProduct from "../components/RelatedProduct";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProduct(data);

        // جلب المنتجات المشابهة
        const { data: relatedProducts } = await supabase
          .from("products")
          .select("*")
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(6);

        setRelated(relatedProducts || []);
      }
    };

    fetchProduct();
  }, [id]);

  // 🚀 شاشة التحميل (Skeleton Loader)
  if (!product) {
    return (
      <div className="container py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="h-[400px] bg-gray-300 rounded-2xl"></div>
          <div>
            <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded w-[200px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50">
      <motion.div
        className="container py-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* صورة المنتج */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* معلومات المنتج */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {product.description}
            </p>

            <span className="block text-3xl font-semibold text-green-600 mb-8">
              ${product.price}
            </span>

            <motion.button
              onClick={() => addToCart(product)}
              whileTap={{ scale: 0.95 }}
              className="w-[220px] bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 text-lg font-medium"
            >
              🛒 Add to Cart
            </motion.button>
          </div>
        </div>

        {/* منتجات مشابهة */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-2 border-gray-200">
            Related Products
          </h2>
          <RelatedProduct
            products={related}
            loading={!related.length && !product}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default ProductDetails;
