import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/components/loading/loading";
import { Product } from "src/types/Product";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const getProductDetail = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
      navigate("/notfound");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProductDetail(id);
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Loading isShow={loading} />
      <Stack sx={{ marginLeft: "120px" }} mt={10}>
        <Container>
          {product && (
            <Stack
              sx={{ display: "flex", gap: "100px" }}
              direction={"row"}
              gap={3}
            >
              <img src={product.image} alt="" width={"350px"} />
              <Stack gap={"25px"}>
                <Typography variant="h3" component={"h1"} fontSize={"24px"}>
                  {product.title}
                </Typography>
                <Typography fontSize={"18px"}>{product.description}</Typography>
                <Typography color={"red"} fontWeight={"bold"}>
                  Giá: {product.price}$
                </Typography>
                <Typography>Danh mục: {product.category?.name ?? "N/A"}</Typography>
                <Typography>Đánh giá: 4.8/5</Typography>
                <Stack sx={{ gap: "50px" }} direction="row" alignItems="center">
                  <Typography>Số lượng:</Typography>
                  <ButtonGroup
                    sx={{
                      padding: "2px",
                      border: "1px solid",
                      gap: "15px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography onClick={handleDecreaseQuantity}>
                      <RemoveIcon />
                    </Typography>
                    <Typography>{quantity}</Typography>
                    <Typography onClick={handleIncreaseQuantity}>
                      <AddIcon />
                    </Typography>
                  </ButtonGroup>
                </Stack>
                <Button sx={{width:'200px'}} variant="outlined" color="primary">
                  Thêm vào giỏ hàng
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </Stack>
    </>
  );
}

export default Detail;
