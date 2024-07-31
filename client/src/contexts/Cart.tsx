import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { Cart } from "src/types/Product";

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  updateCart: () => Promise<void>;
  removeToCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : null;
  });

  const updateCart = async () => {
    try {
      const userStorage = localStorage.getItem("user") || "{}";
      const user = JSON.parse(userStorage);
      if (user._id) {
        const { data } = await axios.get(`/carts/user/${user._id}`);
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));  // Save to localStorage
        console.log("Cart data from API:", data);  // Log để kiểm tra dữ liệu từ API
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  const removeToCart = async (productId: string) => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);

    if (!user._id) return;
    if (window.confirm("Remove Item Cart")) {
      try {
        await axios.delete(`/carts/user/${user._id}/product/${productId}`);
        updateCart();  // Update cart after removing item
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart, removeToCart }}>
      {children}
    </CartContext.Provider>
  );
};
