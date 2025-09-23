// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold text-green-500">
              🍽️ MyRestaurant
            </h2>
          </Link>
          <p className="mt-3 text-gray-400">
            Delicious meals delivered with love. Enjoy the best dining
            experience with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="hover:text-green-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-green-500">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3 text-xl">
            <a href="#" className="hover:text-green-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-500">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyRestaurant. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
