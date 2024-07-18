import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";
import Loading from "src/components/loading/loading";
import SnackbarAlert from "src/components/snackbar/Snackbar";
import { Product } from "src/types/Product";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AdminProductList() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const getAllProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/products/" + idDelete);
      setShowSuccess(true);
      getAllProduct();
      setConfirm(false);
      setIdDelete(null);
    } catch (error) {
      setError("Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lại sau!");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Danh sách sản phẩm
          </Typography>
          <Link to="/admin/product/add">
            <Button variant="contained" color="primary">
              <AddIcon /> Thêm sản phẩm
            </Button>
          </Link>
          {isLoading ? (
            <Loading isShow={isLoading} />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000, textAlign: "center" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell align="center">Ảnh</TableCell>
                    <TableCell align="right">Giá</TableCell>
                    <TableCell align="right">Mô tả</TableCell>
                    <TableCell align="right">Danh mục</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentProducts.map((product, index) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">{product.title}</TableCell>
                      <TableCell align="center"><img src={product.image} alt="" width={80} /></TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="right">{product.category?.name}</TableCell>
                      <TableCell align="center">
                        <Stack direction={"row"} gap={3} justifyContent={"center"}>
                          <Link to={`/admin/product/edit/${product._id}`}>
                            <Button variant="contained" color="warning">
                              <EditIcon /> Sửa
                            </Button>
                          </Link>
                          <Button color="error" variant="contained" onClick={() => handleConfirm(product._id)}>
                            <DeleteForeverIcon /> Xóa
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ConfirmDialog confirm={confirm} onConfirm={setConfirm} onDelete={handleDelete} />
            </TableContainer>
          )}

          {/* Phân trang */}
          <Stack gap={1} direction="row" justifyContent="center" mt={2}>
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
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
        </Stack>

        {error && (
          <SnackbarAlert
            message={error}
            severity="error"
            open={Boolean(error)}
            onClose={() => setError(null)}
          />
        )}

        {showSuccess && (
          <SnackbarAlert
            message="Xóa sản phẩm thành công!"
            severity="success"
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </Container>
    </>
  );
}

export default AdminProductList;
