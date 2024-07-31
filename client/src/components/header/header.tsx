import { AppBar, Button, IconButton, InputBase, Link, Stack, styled, Toolbar, Typography, Menu, MenuItem, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from '../../assets/img/logo.png';
import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "src/types/Product";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useMemo } from "react";
import { useCart } from "src/contexts/Cart";
import { useUser } from "src/contexts/user";

const GradientButton = styled(Button)(() => ({
  background: 'linear-gradient(45deg, #FE6B8B 50%, white 90%)',
  backgroundSize: '200% 200%',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  marginTop: '20px',
  padding: '0 30px',
  transition: 'background-position 1s ease',
  backgroundPosition: '0% 100%',
  '&:hover': {
    backgroundPosition: '200% 100%',
  },
}));

const GradientButtonLogin = styled(Button)(() => ({
  background: 'linear-gradient(45deg, #FFFFFF 50%, #FE6B8B 90%)',
  border: 0,
  backgroundSize: '200% 200%',
  borderRadius: 3,
  boxShadow: '0 0 5px 2px rgba(255, 105, 135, .3)',
  color: 'black',
  height: 48,
  marginTop: '20px',
  padding: '0 30px',
  transition: 'background-position 1s ease',
  backgroundPosition: '0% 100%',
  '&:hover': {
    backgroundPosition: '200% 100%',
  },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    backgroundColor: '#FE6B8B',
    transition: 'left 0.3s ease-out',
  },
  '&:hover::after': {
    left: 0,
  },
}));

const Header = ({ onCategorySelect }) => {
  const { user, setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { cart } = useCart();

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("Token");
    setUser(null);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorEl(null);
  };

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
            <Link href="/" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Trang chủ</Link>
            <Link href="#" color="black" underline="none" onMouseEnter={handleCategoryClick} sx={{ "&:hover": { borderBottom: "1px solid" } }}>
              Danh mục
            </Link>
            {/* <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Courses <span className="dropdown-toggle"></span></Link>
            <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Jobs</Link>
            <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Go Pro</Link> */}
          </Stack >
        </Stack >

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
      </Toolbar >
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCategoryClose}
        MenuListProps={{
          onMouseLeave: handleCategoryClose,
        }}
      >
        <MenuItemStyled
          onClick={() => { onCategorySelect(null); handleCategoryClose(); }}
        >
          Tất cả sản phẩm
        </MenuItemStyled>
        {categories.map((category) => (
          <MenuItemStyled
            key={category._id}
            onClick={() => { onCategorySelect(category.name); handleCategoryClose(); }}
          >
            {category.name}
          </MenuItemStyled>
        ))}
      </Menu>
    </AppBar >
  );
};

export default Header;
