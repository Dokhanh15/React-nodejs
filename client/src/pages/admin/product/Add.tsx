import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { ProductFormParams } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.post("/products", values);
      nav("/admin/product/list");
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Thêm Sản Phẩm
          </Typography>
          <ProductForm onSubmit={onSubmit} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
