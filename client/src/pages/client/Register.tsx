import {
    Button,
    Container,
    Stack,
    TextField,
    Typography
  } from "@mui/material";
  import axios from "axios";
  import { useState } from "react";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import SnackbarAlert from "./snackbar/Snackbar";
  import Loading from "src/components/loading/loading";
import { Users } from "src/types/user";
  
  const Register = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      watch,
    } = useForm<Users & { confirmPassword: string }>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    
    const password = watch("password");
  
    const onSubmit: SubmitHandler<Users & { confirmPassword: string }> = async (data) => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");
  
        const response = await axios.post("http://localhost:3000/auth/register", data);
        console.log("User registered successfully:", response.data);
        setSuccess("Đăng ký thành công!");
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } catch (error) {
        setError("Có lỗi xảy ra, vui lòng thử lại sau!");
        console.log(error);
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
          Đăng ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Tên đăng nhập"
              {...register("username", {
                required: "Tên đăng nhập là bắt buộc",
              })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "Email là bắt buộc" })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <TextField
              label="Xác nhận mật khẩu"
              type="password"
              {...register("confirmPassword", {
                required: "Xác nhận mật khẩu là bắt buộc",
                validate: value =>
                  value === password || "Mật khẩu không khớp"
              })}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Đăng ký
            </Button>
          </Stack>
        </form>
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
  
  export default Register;
  