import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ValidationErrors } from 'final-form';
import { Field, Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from 'src/types/Product';

function AdminProductUpdate() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ProductForm | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setInitialValues(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const onSubmit = async (values: ProductForm) => {
    try {
      await axios.put(`/products/${id}`, values);
      nav('/admin/product/list');
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }
  };

  const validate = (values: ProductForm) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = 'Please enter title';
    if (!image) errors.image = 'Please enter image';
    if (!category) errors.category = 'Please select category';
    if (!price) errors.price = 'Please enter price';

    return errors;
  };

  if (!initialValues) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign={'center'}>
          Update Product
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <Stack component="form" onSubmit={handleSubmit} gap={2}>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <TextField
                    label="Title"
                    variant="standard"
                    {...input}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="image"
                render={({ input, meta }) => (
                  <TextField
                    label="Image"
                    variant="standard"
                    {...input}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              />
              <Field<string>
                name="description"
                render={({ input, meta }) => (
                  <TextField
                    label="Description"
                    variant="standard"
                    {...input}
                  />
                )}
              />
              <Field<number>
                name="price"
                render={({ input, meta }) => (
                  <TextField
                    label="Price"
                    variant="standard"
                    {...input}
                    type="number"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              />
              <Field<string>
                name="isShow"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Checkbox {...input} />}
                    label="Show Product"
                  />
                )}
              />
              <Field<string>
                name="category"
                render={({ input, meta }) => (
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" {...input} error={meta.touched && Boolean(meta.error)}>
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="66860195be9e04f02ea662d6">Thoi trang</MenuItem>
                      <MenuItem value="668601a7be9e04f02ea662d9">Phu Kien</MenuItem>
                    </Select>
                    {meta.touched && meta.error && (
                      <FormHelperText>{meta.error}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          )}
        />
      </Stack>
    </Container>
  );
}

export default AdminProductUpdate;
