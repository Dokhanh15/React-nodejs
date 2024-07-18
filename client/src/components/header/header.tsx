import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Link,
  Stack,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import logo from '../../assets/img/logo.png'
import { useUser } from "src/pages/client/userContext/userContext";

const Header = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setUser(null);
  };

  const GradientButton = styled(Button)(({ theme }) => ({
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
  const GradientButtonLogin = styled(Button)(({ theme }) => ({
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
              <GradientButtonLogin onClick={handleLogout}>Đăng xuất</GradientButtonLogin>
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
