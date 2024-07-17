import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "src/components/Sidebar";

function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
 useEffect(() => {
    if (!token) {
      navigate("/404");
      return;
    }
  }, [token, navigate]);
  return (
    <>
      <Stack direction={"row"} gap={2}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
}

export default AdminLayout;
