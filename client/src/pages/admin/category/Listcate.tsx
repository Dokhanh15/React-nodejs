import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDialog from 'src/components/ConfirmDialog';
import Flash from 'src/components/Flash';
import { Category } from 'src/types/Product';

const Listcate: React.FC = () => {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/categories/' + idDelete);
      setShowFlash(true);
      getAllCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Flash isShow={showFlash} />
      <Stack gap={2}>
        <Typography variant="h2" textAlign="center">
          Category List
        </Typography>
        <Link to="/admin/category/add">
          <Button variant="contained">Add Category</Button>
        </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category._id}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" gap={3} justifyContent="center">
                      <Link to={`/admin/category/edit/${category._id}`}>
                        <Button variant="contained" sx={{ bgcolor: "#f9a825" }}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: 'red' }}
                        onClick={() => handleConfirm(category._id)}
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
            onConfirm={setConfirm}
            onDelete={handleDelete}
          />
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default Listcate;
