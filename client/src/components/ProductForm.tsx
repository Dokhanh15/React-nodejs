import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Category, ProductFormParams } from "src/types/Product";
import axios from "axios";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: ProductFormParams;
  isEdit?: boolean;
};

function ProductForm({ onSubmit, initialValues, isEdit }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialValues && initialValues.category) {
      setSelectedCategoryId(initialValues.category._id);
    }
  }, [initialValues]);

  const validate = (values: ProductFormParams) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Vui lòng nhập tiêu đề";
    if (!image) errors.image = "Vui lòng nhập đường dẫn hình ảnh";
    if (!category) errors.category = "Vui lòng chọn danh mục";
    if (!price) errors.price = "Vui lòng nhập giá sản phẩm";

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues || { isShow: true }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.1)",
              padding: "30px",
              marginBottom: "20px",
              lineHeight:'60px'
            }}
          >
            <Typography variant="h3" textAlign={'center'} my={3}  gutterBottom>
              {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <TextField
                      label="Tiêu đề"
                      fullWidth
                      variant="outlined"
                      size="small"
                      helperText={meta.touched && meta.error}
                      error={meta.touched && !!meta.error}
                      {...input}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="image"
                  render={({ input, meta }) => (
                    <TextField
                      label="Đường dẫn hình ảnh"
                      fullWidth
                      variant="outlined"
                      size="small"
                      helperText={meta.touched && meta.error}
                      error={meta.touched && !!meta.error}
                      {...input}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field<string>
                  name="description"
                  render={({ input }) => (
                    <TextField
                      label="Mô tả"
                      fullWidth
                      variant="outlined"
                      size="small"
                      multiline
                      rows={3}
                      {...input}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field<number>
                  name="price"
                  render={({ input, meta }) => (
                    <TextField
                      label="Giá"
                      fullWidth
                      variant="outlined"
                      size="small"
                      {...input}
                      type="number"
                      helperText={meta.touched && meta.error}
                      error={meta.touched && !!meta.error}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field<string>
                  name="isShow"
                  type="checkbox"
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Hiển thị"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field<string>
                  name="category"
                  render={({ input, meta }) => (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Danh mục</InputLabel>
                      <Select
                        label="Danh mục"
                        {...input}
                        error={meta.touched && Boolean(meta.error)}
                        value={selectedCategoryId || ""}
                        onChange={(e) => {
                          input.onChange(e);
                          setSelectedCategoryId(e.target.value as string);
                        }}
                      >
                        <MenuItem value="">Chọn</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText sx={{ color: "red" }}>
                          {meta.error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "10px" }}
          >
            {isEdit ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </Button>
        </form>
      )}
    />
  );
}

export default ProductForm;
