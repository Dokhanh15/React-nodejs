import axios from "axios";
import { useCart } from "src/contexts/Cart";
import { useUser } from "src/contexts/user";
import { Product } from "src/types/Product";

type AddToCart = {
  product: Product;
  quantity: number;
};

export const useProductCart = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();

  const getCartUser = async () => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);
    setUser(user);

    if (!user._id) return;

    try {
      const { data } = await axios.get(`/carts/user/${user._id}`);
      console.log("Cart data from API:", data);  // Log để kiểm tra dữ liệu từ API
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  };
  

  const addToCart = async ({ product, quantity }: AddToCart) => {
    if (quantity <= 0 || !user) return;
    try {
      let updatedCart;
      if (cart) {
       const {data} = await axios.put(`/carts/${cart._id}`, {
          product,
          quantity,
          user: user._id,
        });
        updatedCart = data;
      } else {
        const { data } = await axios.post("/carts", {
          product,
          quantity,
          user: user._id,
        });
        updatedCart = data;
      }
      const { data } = await axios.get(`/carts/user/${user._id}`);
      updatedCart = data;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (productId: string) => {
    if (!user) return;
    if (window.confirm("Remove Item Cart")) {
      try {
        await axios.delete(`/carts/user/${user._id}/product/${productId}`);
        await getCartUser();  // Cập nhật giỏ hàng sau khi xóa sản phẩm
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };
  

  return { addToCart, removeToCart, getCartUser };
};
