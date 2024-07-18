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
            <Stack>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <TextField
                    label="Tiêu đề"
                    variant="standard"
                    helperText={meta.touched && meta.error}
                    error={meta.touched && !!meta.error}
                    {...input}
                  />
                )}
              />
              <Field
                name="image"
                render={({ input, meta }) => (
                  <TextField
                    label="Hình ảnh"
                    variant="standard"
                    helperText={meta.touched && meta.error}
                    error={meta.touched && !!meta.error}
                    {...input}
                  />
                )}
              />
              <Field<string>
                name="description"
                render={({ input }) => (
                  <TextField label="Mô tả" variant="standard" {...input} />
                )}
              />
              <Field<number>
                name="price"
                render={({ input, meta }) => (
                  <TextField
                    label="Giá"
                    variant="standard"
                    {...input}
                    type="number"
                    helperText={meta.touched && meta.error}
                    error={meta.touched && !!meta.error}
                  />
                )}
              />
              <Field<string>
                name="isShow"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Checkbox {...input} />}
                    label="Check box"
                  />
                )}
              />
              <Field<string>
                name="category"
                render={({ input, meta }) => (
                  <FormControl fullWidth>
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
              <Button type="submit">
                {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              </Button>
            </Stack>
          </form>
        )}
      />
    );
  }
  
  export default ProductForm;
  