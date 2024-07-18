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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";
import Flash from "src/components/Flash";// Import thành phần SnackbarAlert
import Loading from "src/components/loading/loading";
import SnackbarAlert from "src/components/snackbar/Snackbar";
import { Product } from "src/types/Product";

function AdminProductList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  const getAllProduct = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { data } = await axios.get("/products");
      setProducts(data);
      setError(null); // Reset lỗi nếu tải thành công
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!"); // Thiết lập thông báo lỗi
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
      setShowFlash(true);
      getAllProduct();
      setConfirm(false);
      setIdDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCancel = () => {
    setConfirm(false);
  };

  return (
    <>
      <Container>
        <Flash isShow={showFlash} />
        <Stack gap={2}>
          <Typography variant="h2" textAlign={"center"}>
            Product List
          </Typography>
          <Link to="/admin/product/add">
            <Button variant="contained">Add Product</Button>
          </Link>
          {isLoading ? (
            <Loading isShow={isLoading} />
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 1000, textAlign: "center" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Desc</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentProducts.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.title}
                      </TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="center">{product.image}</TableCell>
                      <TableCell align="right">{product.category?.name}</TableCell>

                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          gap={3}
                          justifyContent={"center"}
                        >
                          <Link to={`/admin/product/edit/${product._id}`}>
                            <Button variant="contained" sx={{ bgcolor: "#f9a825" }}>
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="contained"
                            sx={{ bgcolor: "red" }}
                            onClick={() => handleConfirm(product._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ConfirmDialog
                confirm={confirm}
                onConfirm={handleDelete}
                onCancel={handleCancel}
              />
            </TableContainer>
          )}
          <Stack gap={1} direction="row" justifyContent="center" mt={2}>
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  border: '1px solid',
                  padding: '3px',
                  color: 'black',
                  bgcolor: index + 1 === currentPage ? 'lightgray' : 'white',
                  fontWeight: index + 1 === currentPage ? 'bold' : 'normal'
                }}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
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
      </Container>
    </>
  );
}

export default AdminProductList;
