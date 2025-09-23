// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // تحميل السلة عند تسجيل الدخول
  useEffect(() => {
    if (user) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, [user]);

  // حفظ السلة عند أي تغيير
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    if (!user) {
      alert("❌ You must be logged in to add a product to the cart!");
      return;
    }
    if (user.email === "ahmed@admin.com") {
      alert("❌ Admin cannot add products to the cart!");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev; // موجود بالفعل
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
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
