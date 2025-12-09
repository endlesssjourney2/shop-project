import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from 'react-router-dom'; 

import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import Home from "./pages/Home/Home.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.tsx";
import { CartProvider } from "./context/CartContext";
import { SuccessPage } from "./pages/SuccessPage/SuccessPage.tsx";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/admin", element: <Admin /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/checkout",      
    element: <CheckoutPage />, 
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);