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
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();

  const onSubmit = async (values: ProductForm) => {
    try {
      await axios.post("/products", values);
      nav("/admin/product/list");
    } catch (error) {}
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
            render={({ values }) => {
              return (
                <Stack>
                  <Field
                    name="title"
                    render={({ input, meta }) => {
                      console.log(meta);

                      return (
                        <TextField
                          // error
                          label="Title"
                          variant="standard"
                          helperText={meta.touched && meta.error}
                          {...input}
                        />
                      );
                    }}
                  />
                  <Field
                    name="image"
                    render={({ input, meta }) => {
                      return (
                        <TextField
                          label="Image"
                          variant="standard"
                          helperText={meta.touched && meta.error}
                          {...input}
                        />
                      );
                    }}
                  />
                  <Field<string>
                    name="description"
                    render={({ input, meta }) => {
                      return (
                        <TextField
                          label="Description"
                          variant="standard"
                          {...input}
                        />
                      );
                    }}
                  />
                  <Field<number>
                    name="price"
                    render={({ input, meta }) => {
                      return (
                        <TextField
                          error
                          label="Price"
                          variant="standard"
                          {...input}
                          type="number"
                          helperText={meta.touched && meta.error}
                        />
                      );
                    }}
                  />
                  <Field<string>
                    name="isShow"
                    type="checkbox"
                    render={({ input, meta }) => {
                      return (
                        <FormControlLabel
                          control={<Checkbox {...input} />}
                          label="Show Product"
                        />
                      );
                    }}
                  />
                  <Field<string>
                    name="category"
                    render={({ input, meta }) => {
                      return (
                        <FormControl fullWidth>
                          <InputLabel>Category</InputLabel>
                          <Select label="Category" {...input} error>
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value={"66860195be9e04f02ea662d6"}>
                              Thoi trang
                            </MenuItem>
                            <MenuItem value={"668601a7be9e04f02ea662d9"}>
                              Phu Kien
                            </MenuItem>
                          </Select>
                          {meta.touched && meta.error && (
                            <FormHelperText>{meta.error}</FormHelperText>
                          )}
                        </FormControl>
                      );
                    }}
                  />

                  <Button type="submit" onClick={() => onSubmit(values)}>
                    Submit
                  </Button>
                </Stack>
              );
            }}
          />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
