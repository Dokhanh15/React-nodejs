import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { LoadingProvider } from "./contexts/loading.tsx";
import { UserProvider } from "./pages/client/userContext/userContext.tsx";
import { CartProvider } from "./contexts/Cart.tsx";
import { UsercartProvider } from "./contexts/user.tsx";

axios.defaults.baseURL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <UsercartProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UsercartProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
