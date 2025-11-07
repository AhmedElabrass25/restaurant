import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiInfo,
  FiMenu,
  FiPackage,
  FiPhone,
  FiPlusCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import MobileNav from "./nav/MobileNav";
import AuthButtons from "./nav/AuthButtons";
import { RiFolderInfoLine } from "react-icons/ri";

function MyNav() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const isAdmin = user?.email === "ahmed@admin.com";

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);
  // handle logout function

  const handleLogout = async () => {
    // Ask for confirmation before logout
    // 🔸 Ask for confirmation before logout
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      // If user confirmed, sign out of the account and set user to null
      // ✅ If user confirmed
      await supabase.auth.signOut();
      setUser(null);

      // Show success message when logged out successfully
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  // common links
  const commonLinks = (
    <>
      <Link to="/" className="hover:text-green-600 flex items-center gap-1">
        <FiHome className="text-lg lg:hidden" /> Home
      </Link>
      <Link
        to="/about"
        className="hover:text-green-600 flex items-center gap-1"
      >
        <RiFolderInfoLine className="text-lg lg:hidden" />
        About
      </Link>
      <Link to="/shop" className="hover:text-green-600 flex items-center gap-1">
        <FiShoppingBag className="text-lg lg:hidden" /> Shop
      </Link>
      <Link
        to="/contact"
        className="hover:text-green-600 flex items-center gap-1"
      >
        <FiPhone className="text-lg lg:hidden" /> Contact
      </Link>
    </>
  );
  // admin links
  const adminLinks = (
    <>
      <Link
        to="/addProduct"
        className="hover:text-green-600 flex items-center gap-1"
      >
        <FiPlusCircle className="text-lg lg:hidden" /> Add Product
      </Link>
      <Link
        to="/displayProducts"
        className="hover:text-green-600 flex items-center gap-1"
      >
        <FiPackage className="text-lg lg:hidden" /> Manage Products
      </Link>
    </>
  );
  // user links
  const userLinks = (
    <>
      <Link
        to="/cart"
        className="relative hover:text-green-600 flex items-center gap-1"
      >
        <FiShoppingCart className="text-lg lg:hidden" />
        Cart
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
      <Link
        to="/orders"
        className="hover:text-green-600 flex items-center gap-1"
      >
        <FiPackage className="text-lg lg:hidden" /> Orders
      </Link>
    </>
  );

  return (
    <nav className="bg-white sticky left-0 top-0 z-40 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">
          <Link to="/">🍽️ MyRestaurant</Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {commonLinks}
          {user && (isAdmin ? adminLinks : userLinks)}
        </div>

        {/* Auth Buttons */}
        <AuthButtons user={user} handleLogout={handleLogout} />
      </div>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isOpen}
        commonLinks={commonLinks}
        userLinks={userLinks}
        adminLinks={adminLinks}
        user={user}
        handleLogout={handleLogout}
        isAdmin={isAdmin}
      />
    </nav>
  );
}

export default MyNav;
