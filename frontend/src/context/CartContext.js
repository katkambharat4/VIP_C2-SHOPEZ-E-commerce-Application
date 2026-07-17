import { createContext, useContext, useState } from "react";

// 1. Create Context
const CartContext = createContext();

// 2. Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // ❌ Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // 🧹 Clear cart (optional)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook
export const useCart = () => useContext(CartContext);