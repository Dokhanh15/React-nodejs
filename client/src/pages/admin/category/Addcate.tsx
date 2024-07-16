import React from 'react';
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { Category } from 'src/types/Product';



const Addcate: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: Category) => {
    try {
      await axios.post("/categories", values);
      navigate("/admin/category/list");
    } catch (error) {
      console.error(error);
      alert('Error creating category');
    }
  };

  const validate = (values: Category) => {
    const { name, description } = values;
    const errors: ValidationErrors = {};
    if (!name) errors.name = "Please enter category name";
    if (!description) errors.description = "Please enter category description";

    return errors;
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign={"center"}>
          Add Category
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <Stack component="form" onSubmit={handleSubmit} gap={2}>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <TextField
                    label="Category Name"
                    variant="standard"
                    {...input}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <TextField
                    label="Description"
                    variant="standard"
                    {...input}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
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
};

export default Addcate;
