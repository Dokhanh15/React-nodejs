import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/footer/footer";
import Header from "src/components/header/header";
import { useProductCart } from "src/Hooks/CartProducts";

const ClientLayout = () => {
  const { getCartUser } = useProductCart();

  useEffect(() => {
    getCartUser();
  }, []);
  return (
    <Stack>
      <Header />
      <Stack mt={14.5} >
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default ClientLayout;
