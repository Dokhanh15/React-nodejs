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
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();
  const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (values: ProductForm) => {
    try {
      await axios.post("/products", values);
      nav("/admin/product/list");
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  const validate = (values: ProductForm) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Can nhap title vao";
    if (!image) errors.image = "Can nhap image vao";
    if (!category) errors.category = "Can nhap category vao";
    if (!price) errors.price = "Can nhap price vao";

    return errors;
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Add Product
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{ isShow: true }}
            render={({ values }) => (
              <Stack>
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <TextField
                      label="Title"
                      variant="standard"
                      helperText={meta.touched && meta.error}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="image"
                  render={({ input, meta }) => (
                    <TextField
                      label="Image"
                      variant="standard"
                      helperText={meta.touched && meta.error}
                      {...input}
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
                      helperText={meta.touched && meta.error}
                    />
                  )}
                />
                <Field<string>
                  name="isShow"
                  type="checkbox"
                  render={({ input, meta }) => (
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
                      <Select
                        label="Category"
                        {...input}
                        error={meta.touched && Boolean(meta.error)}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Button type="submit" onClick={() => onSubmit(values)}>
                  Submit
                </Button>
              </Stack>
            )}
          />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
