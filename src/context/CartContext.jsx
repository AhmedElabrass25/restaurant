// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // load cart from local storage
  useEffect(() => {
    if (user) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, [user]);

  // save cart to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);
  // Add product to cart
  const addToCart = (product) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "You must be logged in!",
        text: "Please login to add a product to your cart.",
        confirmButtonColor: "#16a34a", // green button
      });
      return;
    }

    if (user.email === "ahmed@admin.com") {
      Swal.fire({
        icon: "warning",
        title: "Action not allowed!",
        text: "Admin cannot add products to the cart.",
        confirmButtonColor: "#facc15", // yellow button
      });
      return;
    }

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev; // ✅ لو المنتج موجود بالفعل ميتضافش تاني

      // ✅ add new product
      const updatedCart = [...prev, { ...product, quantity: 1 }];

      // 🎉 Toast notification
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${product.name} added to cart!`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#16a34a", // green bg
        color: "#fff",
      });

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "none", // remove default faded icon
      title: "🗑️ Product removed from cart",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#b91c1c", // deep red (Tailwind red-700)
      color: "#fff",
      customClass: {
        popup: "shadow-lg rounded-lg",
        title: "text-sm font-semibold",
      },
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
