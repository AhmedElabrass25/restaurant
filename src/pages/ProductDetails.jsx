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

        // get related products by category
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

  if (!product) {
    // Skeleton Loader
    return (
      <div className="container mx-auto px-6 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Skeleton */}
          <div className="h-[400px] bg-gray-300 rounded-2xl"></div>

          {/* Info Skeleton */}
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
    <motion.div
      className="container mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <span className="block text-2xl font-semibold text-green-600 mb-6">
            ${product.price}
          </span>

          {/* Add to cart button */}
          <motion.button
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.95 }}
            className="w-[200px] bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <RelatedProduct
          products={related}
          loading={!related.length && !product}
        />
      </div>
    </motion.div>
  );
}

export default ProductDetails;
