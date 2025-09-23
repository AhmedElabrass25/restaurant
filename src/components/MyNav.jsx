// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useCart } from "../context/CartContext"; // 👈 Import cart context

// function MyNav() {
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const { cart } = useCart(); // 👈 get cart

//   useEffect(() => {
//     // Check current user
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUser(user);
//     };
//     getUser();

//     // Listen for login/logout changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user ?? null);
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <nav className="bg-white sticky left-0 top-0 z-40 shadow-md px-6 py-4">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-green-600">
//           <Link to="/">🍽️ MyRestaurant</Link>
//         </div>

//         {/* Hamburger Button (mobile only) */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Links */}
//         <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
//           <Link to="/" className="hover:text-green-600">
//             Home
//           </Link>
//           <Link to="/about" className="hover:text-green-600">
//             About
//           </Link>
//           <Link to="/shop" className="hover:text-green-600">
//             Shop
//           </Link>
//           <Link to="/contact" className="hover:text-green-600">
//             Contact
//           </Link>

//           {user && (
//             <>
//               <Link to="/cart" className="relative hover:text-green-600">
//                 Cart
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>
//               <Link to="/orders" className="hover:text-green-600">
//                 Orders
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Auth Buttons (desktop only) */}
//         <div className="hidden md:flex">
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           ) : (
//             <div className="space-x-3">
//               <Link
//                 to="/signin"
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/signup"
//                 className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden mt-4 space-y-3 text-gray-700 font-medium">
//           <Link to="/" className="block hover:text-green-600">
//             Home
//           </Link>
//           <Link to="/about" className="block hover:text-green-600">
//             About
//           </Link>
//           <Link to="/shop" className="block hover:text-green-600">
//             Shop
//           </Link>
//           <Link to="/contact" className="block hover:text-green-600">
//             Contact
//           </Link>

//           {user && (
//             <>
//               <Link to="/cart" className="relative block hover:text-green-600">
//                 Cart
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-6 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>
//               <Link to="/orders" className="block hover:text-green-600">
//                 Orders
//               </Link>
//             </>
//           )}

//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           ) : (
//             <div className="space-y-2">
//               <Link
//                 to="/signin"
//                 className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default MyNav;
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const commonLinks = (
    <>
      <Link to="/" className="hover:text-green-600">
        Home
      </Link>
      <Link to="/about" className="hover:text-green-600">
        About
      </Link>
      <Link to="/shop" className="hover:text-green-600">
        Shop
      </Link>
      <Link to="/contact" className="hover:text-green-600">
        Contact
      </Link>
    </>
  );

  const adminLinks = (
    <>
      <Link to="/addProduct" className="hover:text-green-600">
        Add Product
      </Link>
      <Link to="/displayProducts" className="hover:text-green-600">
        Manage Products
      </Link>
    </>
  );

  const userLinks = (
    <>
      <Link to="/cart" className="relative hover:text-green-600">
        Cart
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
      <Link to="/orders" className="hover:text-green-600">
        Orders
      </Link>
    </>
  );

  return (
    <nav className="bg-white sticky left-0 top-0 z-40 shadow-md px-6 py-4">
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
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-3">
              <Link
                to="/signin"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-3 text-gray-700 font-medium">
          {commonLinks}
          {user && (isAdmin ? adminLinks : userLinks)}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/signin"
                className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default MyNav;
