import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { LoadingProvider } from "./contexts/loading.tsx";
import { CartProvider } from "./contexts/Cart.tsx";
import { UserProvider } from "./contexts/user.tsx";
import { FlashProvider } from "./contexts/flash.tsx";

axios.defaults.baseURL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <CartProvider>
            <FlashProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FlashProvider>
          </CartProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
