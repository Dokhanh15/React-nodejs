import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
  } from "@mui/material";
  import { FC, useState } from "react";
  import { Link } from "react-router-dom";
  import { Product } from "src/types/Product";
  
  type ProductCardProps = {
    product: Product;
  };
  
  const ListProduct: FC<ProductCardProps> = ({ product }) => {
    const [hovered, setHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    return (
      <Stack>
        <Card
          sx={{
            maxWidth: 345,
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/product/${product._id}`}>
            <CardMedia
              component="div"
              sx={{
                height: 250,
                position: "relative",
                background: `url(${product.image}) center center / cover no-repeat`,
                backgroundSize: 150,
                backgroundPosition: "center",
              }}
            >
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0, 0, 0, 0.5)",
                  height: 150,
                  color: "#fff",
                  padding: "8px",
                  transition: "opacity 0.3s ease-in-out",
                  opacity: hovered ? 1 : 0,
                }}
              >
                <Typography variant="body1" component="div" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" component="div" sx={{ color: 'primary' }}>
                  Giá: {product.price} $
                </Typography>
                <Typography variant="body2" component="div">
                  Đánh giá: {product.rating?.rate ?? 'N/A'}/5
                </Typography>
              </CardContent>
            </CardMedia>
          </Link>
          <CardActions>
            <Button size="small" variant="outlined" color="primary">
              Mua
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={{ ml: "auto" }}
            >
              Thêm vào giỏ hàng
            </Button>
          </CardActions>
        </Card>
      </Stack>
    );
  };
  
  export default ListProduct;
  