import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance/axiosInstance";
import SnackbarAlert from "./snackbar/Snackbar";
import Loading from "src/components/loading/loading";
import { Users } from "src/types/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Users>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Users> = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await axiosInstance.post("/auth/login", data);
      setSuccess("Đăng nhập thành công!");
      console.log("Đăng nhập thành công:", response.data);

      // Lưu token vào localStorage
      localStorage.setItem("Token", response.data.token);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
    setSuccess("");
  };

  return (
    <Container maxWidth="sm">
      <Loading isShow={loading} />
      <Typography variant="h3" textAlign="center" mb={2}>
        Đăng nhập
      </Typography>
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors?.email ? "Email là bắt buộc" : ""}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors?.password ? "Mật khẩu là bắt buộc" : ""}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Đăng nhập
            </Button>
          </Stack>
        </form>
      </Stack>

      <SnackbarAlert
        message={error}
        severity="error"
        open={!!error}
        onClose={handleCloseSnackbar}
      />
      <SnackbarAlert
        message={success}
        severity="success"
        open={!!success}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Login;
