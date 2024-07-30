import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { Cart } from "src/types/Product";

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  updateCart: () => Promise<void>;
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
  const [cart, setCart] = useState<Cart | null>(null);

  const updateCart = async () => {
    try {
      const userStorage = localStorage.getItem("user") || "{}";
      const user = JSON.parse(userStorage);
      if (user._id) {
        const { data } = await axios.get(`/carts/user/${user._id}`);
        setCart(data);
        console.log("Cart data from API:", data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
