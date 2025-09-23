import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      {/* رقم 404 متحرك */}
      <motion.h1
        className="text-9xl font-extrabold text-gray-800 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* رسالة */}
      <motion.p
        className="mt-4 text-lg text-gray-600"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      {/* زر الرجوع */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
export default NotFound;
