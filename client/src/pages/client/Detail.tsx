import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  styled,
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

  const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 50%, white 90%)',
    backgroundSize: '200% 200%',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    width: 250,
    marginTop: '20px',
    padding: '0 30px',
    // transition: 'background-position 1s ease',
    // backgroundPosition: '0% 100%',
    '&:hover': {
      // backgroundPosition: '200% 100%',
      background: 'linear-gradient(45deg, #D25973 50% , #D25973 90%)',
    },
  }));

  const getProductDetail = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${id}`);
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
                <Typography variant="h3" component={"h1"} fontSize={"28px"}>
                  {product.title}
                </Typography>
                <Typography fontSize={"18px"}>Mô tả: {product.description ?? "N/A"}</Typography>
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
                    <Typography sx={{ marginTop: '5px' }} onClick={handleDecreaseQuantity}>
                      <RemoveIcon />
                    </Typography>
                    <Typography>{quantity}</Typography>
                    <Typography sx={{ marginTop: '5px' }} onClick={handleIncreaseQuantity}>
                      <AddIcon />
                    </Typography>
                  </ButtonGroup>
                </Stack>
                <GradientButton>
                  Thêm vào giỏ hàng
                </GradientButton>
              </Stack>
            </Stack>
          )}
        </Container>
      </Stack>
    </>
  );
}

export default Detail;
