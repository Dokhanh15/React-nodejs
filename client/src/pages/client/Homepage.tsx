import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "src/components/loading/loading";
import { Product } from "src/types/Product";
import SnackbarAlert from "../../components/snackbar/Snackbar";
import { Link } from "react-router-dom";
import ListProduct from "./Listproducts";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const getAllProducts = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleCloseSnackbar = () => {
    setError("");
    setSuccess("");
  };

  return (
    <>
      <Loading isShow={loading} />
      <Grid container spacing={4} justifyContent="center" mt={3}>
        <SnackbarAlert
          message={error}
          severity="error"
          open={!!error}
          onClose={handleCloseSnackbar}
        />
        <SnackbarAlert
          message={success}
          severity="success"
          open={!!success}
          onClose={handleCloseSnackbar}
        />
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={4}
          alignItems="center"
          justifyContent="center"
          sx={{ px: 4, py: 6 }}
        >
          {products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
              <ListProduct product={product} />
            </Link>
          ))}
        </Stack>
      </Grid>
    </>
  );
}

export default Homepage;
