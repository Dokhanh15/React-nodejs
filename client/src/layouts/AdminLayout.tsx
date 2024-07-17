// import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "src/components/Sidebar";

function AdminLayout() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
