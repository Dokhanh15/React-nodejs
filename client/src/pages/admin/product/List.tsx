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
import Flash from "src/components/Flash";
import { Product } from "src/types/Product";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AdminProductList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(4); // Số sản phẩm trên mỗi trang, bạn có thể thay đổi tại đây

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Tính chỉ số sản phẩm bắt đầu và kết thúc của trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Xác nhận xóa sản phẩm
  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  // Xử lý xóa sản phẩm
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

  // Chuyển đến trang sản phẩm khác
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <>
      <Container>
        <Flash isShow={showFlash} />
        <Stack gap={2}>
          <Typography variant="h2" textAlign={"center"}>
            Danh sách sản phẩm
          </Typography>
          <Link to="/admin/product/add">
            <Button variant="contained" color="primary">
              <AddIcon /> Thêm sản phẩm
            </Button>
          </Link>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 1000, textAlign: "center" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Mô tả</TableCell>
                  <TableCell align="center">Ảnh</TableCell>
                  <TableCell align="right">Danh mục</TableCell>
                  <TableCell align="center"></TableCell>
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
                          <Button variant="contained" color="warning" >
                            <EditIcon /> Sửa
                          </Button>
                        </Link>

                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => handleConfirm(product._id)}
                        >
                          <DeleteForeverIcon /> Xóa
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ConfirmDialog
              confirm={confirm}
              onConfirm={setConfirm}
              onDelete={handleDelete}
            />
          </TableContainer>
          {/* Phân trang */}
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
      </Container>
    </>
  );
}

export default AdminProductList;
