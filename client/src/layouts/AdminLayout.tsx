import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "src/components/Sidebar";

function AdminLayout() {
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
