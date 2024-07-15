import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Link,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useEffect, useState } from 'react';
import axiosInstance from 'src/pages/client/axiosInstance/axiosInstance';
import { Users } from 'src/types/user';
import logo from '../../assets/img/logo.png'

const Header = () => {
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (token) {
          const response = await axiosInstance.get('/auth', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setUser(null);
  };

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
            {/* <Typography variant="h6" sx={{ fontFamily:'sans-serif', fontWeight: 'revert', color: 'primary.main', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>CODER</Typography> */}
          <img src={logo} width={115} alt="" />
          </Link>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Home</Link>
            <Link href="/products" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Products</Link>
            <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Courses <span className="dropdown-toggle"></span></Link>
            <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Jobs</Link>
            <Link href="#" color="black" underline="none" sx={{ "&:hover": { borderBottom: "1px solid" } }}>Go Pro</Link>
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
              <Typography color="black">Hi, {user.username}</Typography>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
              <Button variant="outlined" color="primary" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary" href="/login">
                Đăng nhập
              </Button>
              <Button variant="contained" color="primary" href="/register">
                Đăng ký
              </Button>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
