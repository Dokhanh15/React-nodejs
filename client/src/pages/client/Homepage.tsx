import { Grid, Stack, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const totalPages = Math.ceil(products.length / productsPerPage);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          {currentProducts.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
              <ListProduct product={product} />
            </Link>
          ))}
        </Stack>
        <Stack direction="row" justifyContent="center" mt={2}>
          {currentPage > 3 && (
            <Button
              onClick={() => paginate(1)}
              sx={{ mx: 0.5, minWidth: 40, borderRadius: 2, boxShadow: 2, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              1
            </Button>
          )}
          {currentPage > 3 && (
            <IconButton
              onClick={handleMenuClick}
              sx={{ mx: 0.5, borderRadius: 2, boxShadow: 2, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <MoreHorizIcon />
            </IconButton>
          )}
          {[...Array(totalPages).keys()]
            .map(n => n + 1)
            .filter(n => n >= currentPage - 1 && n <= currentPage + 1)
            .map(number => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                sx={{
                  padding: '3px',
                  color: number === currentPage ? 'white' : 'black',
                  bgcolor: number === currentPage ? 'black' : 'white',
                  fontWeight: number === currentPage ? 'bold' : 'normal',
                  borderRadius: 2,
                  boxShadow: 2,
                  mx: 0.5,
                  minWidth: 40,
                  '&:hover': {
                    bgcolor: number === currentPage ? 'black' : 'grey.200'
                  }
                }}
              >
                {number}
              </Button>
            ))}
          {currentPage < totalPages - 2 && (
            <IconButton
              onClick={handleMenuClick}
              sx={{ mx: 0.5, borderRadius: 2, boxShadow: 2, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <MoreHorizIcon />
            </IconButton>
          )}
          {currentPage < totalPages - 2 && (
            <Button
              onClick={() => paginate(totalPages)}
              sx={{ mx: 0.5, minWidth: 40, borderRadius: 2, boxShadow: 2, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {totalPages}
            </Button>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {[...Array(totalPages).keys()]
              .map(n => n + 1)
              .filter(n => n < currentPage - 1 || n > currentPage + 1)
              .map(number => (
                <MenuItem
                  key={number}
                  onClick={() => {
                    paginate(number);
                    handleMenuClose();
                  }}
                >
                  {number}
                </MenuItem>
              ))}
          </Menu>
        </Stack>
      </Grid>
    </>
  );
}

export default Homepage;
