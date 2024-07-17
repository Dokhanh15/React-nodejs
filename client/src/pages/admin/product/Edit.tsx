import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { Product, ProductFormParams } from "src/types/Product";

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.put(`/products/${id}`, values);
      nav("/admin/product/list");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Chỉnh Sửa Sản Phẩm
          </Typography>
          {product ? (
            <ProductForm onSubmit={onSubmit} initialValues={product} isEdit />
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductEdit;
