import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import MyNav from "./components/MyNav";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
import AddProduct from "./components/AddProduct";
import DisplayProducts from "./components/DisplayProducts";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/checkout";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MyNav />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />

            {/* Protected User Pages */}
            <Route
              path="/cart"
              element={
                <ProtectRoute adminOnly={false}>
                  <Cart />
                </ProtectRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectRoute adminOnly={false}>
                  <Checkout />
                </ProtectRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectRoute adminOnly={false}>
                  <MyOrders />
                </ProtectRoute>
              }
            />

            {/* Protected Admin Pages */}
            <Route
              path="/addProduct"
              element={
                <ProtectRoute adminOnly={true}>
                  <AddProduct />
                </ProtectRoute>
              }
            />
            <Route
              path="/displayProducts"
              element={
                <ProtectRoute adminOnly={true}>
                  <DisplayProducts />
                </ProtectRoute>
              }
            />
            <Route
              path="/updateProduct/:id"
              element={
                <ProtectRoute adminOnly={true}>
                  <UpdateProduct />
                </ProtectRoute>
              }
            />

            {/* Public Routes (SignIn / SignUp) */}
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
