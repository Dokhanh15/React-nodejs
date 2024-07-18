import { Navigate, useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminProductList from "./pages/admin/product/List";
import AdminProductAdd from "./pages/admin/product/Add";
import ClientLayout from "./layouts/ClientLayout";
import Homepage from "./pages/client/Homepage";
import Detail from "./pages/client/Detail";
import Register from "./pages/client/Register";
import Login from "./pages/client/Login";
import Addcate from "./pages/admin/category/Addcate";
import Listcate from "./pages/admin/category/Listcate";
import AdminProductUpdate from "./pages/admin/product/Edit";
import { UserProvider } from "./pages/client/userContext/userContext";
import NotFound from "./components/404!/Notfound";
import Updatecate from "./pages/admin/category/Updatecate";
import { FlashProvider } from "./contexts/flash";

const routeConfig = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "product/:id",
        element: <Detail />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="product/list" replace />,
      },
      {
        path: "product/list",
        element: <AdminProductList />,
      },
      {
        path: "product/add",
        element: <AdminProductAdd />,
      },
      {
        path: "product/edit/:id",
        element: <AdminProductUpdate />,
      },
      {
        path: "category/add",
        element: <Addcate />,
      },
      {
        path: "category/list",
        element: <Listcate />,
      },
      {
        path: "category/edit/:id",
        element: <Updatecate />
      }
    ],
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
  }
];


function App() {
  const routes = useRoutes(routeConfig);

  return <UserProvider>{routes}</UserProvider>;
}

export default App;
