import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  InputBase,
  Link,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../assets/img/logo.png";
import { useMemo } from "react";
import { useCart } from "src/contexts/Cart";
import { useUser } from "src/contexts/user";

const Header = () => {
  const { user, setUser } = useUser();
  const { cart } = useCart();

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("Token");
    setUser(null);
  };

  // Định nghĩa styled component cho nút Gradient
  const GradientButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FE6B8B 50%, white 90%)",
    backgroundSize: "200% 200%",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    marginTop: "20px",
    padding: "0 30px",
    transition: "background-position 1s ease",
    backgroundPosition: "0% 100%",
    "&:hover": {
      backgroundPosition: "200% 100%",
    },
  }));

  const GradientButtonLogin = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FFFFFF 50%, #FE6B8B 90%)",
    border: 0,
    backgroundSize: "200% 200%",
    borderRadius: 3,
    boxShadow: "0 0 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 48,
    marginTop: "20px",
    padding: "0 30px",
    transition: "background-position 1s ease",
    backgroundPosition: "0% 100%",
    "&:hover": {
      backgroundPosition: "200% 100%",
    },
  }));

  // Tính số lượng sản phẩm trong giỏ hàng
  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#fff", borderBottom: "1px solid #ddd" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={15} sx={{ flexGrow: 1 }}>
          <Link href="/" sx={{ textDecoration: "none" }}>
            <img src={logo} width={115} alt="Logo" />
          </Link>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link
              href="/"
              color="black"
              underline="none"
              sx={{ "&:hover": { borderBottom: "1px solid" } }}
            >
              Home
            </Link>
            <Link
              href="/products"
              color="black"
              underline="none"
              sx={{ "&:hover": { borderBottom: "1px solid" } }}
            >
              Products
            </Link>
            <Link
              href="#"
              color="black"
              underline="none"
              sx={{ "&:hover": { borderBottom: "1px solid" } }}
            >
              Courses
            </Link>
            <Link
              href="#"
              color="black"
              underline="none"
              sx={{ "&:hover": { borderBottom: "1px solid" } }}
            >
              Jobs
            </Link>
            <Link
              href="#"
              color="black"
              underline="none"
              sx={{ "&:hover": { borderBottom: "1px solid" } }}
            >
              Go Pro
            </Link>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ position: "relative" }}>
            <InputBase
              type="search"
              placeholder="Search..."
              sx={{
                px: 2,
                py: 1,
                borderRadius: 10,
                border: "1px solid #ccc",
                bgcolor: "#fff",
                "&:focus": { borderColor: "#aaa" },
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </Typography>
          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href="/carts">
                <IconButton color="inherit">
                  <Badge badgeContent={cartQuantity} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Typography color="black">Hi, {user.username}</Typography>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
              <GradientButtonLogin onClick={handleLogout}>
                Đăng xuất
              </GradientButtonLogin>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <GradientButtonLogin type="submit" href="/login">
                Đăng nhập
              </GradientButtonLogin>
              <GradientButton type="submit" href="/register">
                Đăng ký
              </GradientButton>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
