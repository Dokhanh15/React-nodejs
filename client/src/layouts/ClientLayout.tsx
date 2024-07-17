import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "src/components/footer/footer";
import Header from "src/components/header/header";

const ClientLayout = () => {
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
