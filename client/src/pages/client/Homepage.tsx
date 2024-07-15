import { Stack, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product";
import Loading from "src/components/loading/loading";
import ListProduct from "./Listproducts";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getAllProduct = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous error
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleCloseSnackbar = () => {
    setError("");
  };

  return (
    <>
      <Loading isShow={loading} />
      <Typography sx={{ textAlign: 'center', fontSize: 50, mb: 10 }}>
        Danh sách sản phẩm
      </Typography>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', mt:10 }}>
          {error}
        </Alert>
      </Snackbar>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {products.map((product, index) => (
          <ListProduct key={index} product={product} />
        ))}
      </Stack>
    </>
  );
}

export default Homepage;
