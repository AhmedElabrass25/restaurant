// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import foodImg from "../assets/food.webp";

function Home() {
  return (
    <section className="bg-white min-h-[80vh] py-20 flex items-center">
      <div className="w-full h-full container">
        <div className="w-full h-full flex items-center justify-between flex-wrap">
          {/* Left Content */}
          <div className="w-full lg:w-[45%] lg:mb-0 mb-10">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Welcome to <span className="text-green-600">MyRestaurant</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Discover delicious meals made with love. Fresh ingredients,
                authentic flavors, and fast delivery — right to your table.
              </p>

              <div className="mt-8 flex space-x-4">
                <Link
                  to="/shop"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-green-700 transition"
                >
                  Order Now
                </Link>
                <Link
                  to="/about"
                  className="border border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-100 transition"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[45%]">
            <motion.div
              className="w-full mt-10 md:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={foodImg}
                alt="Delicious food"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
