import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./pages/Admin/Admin.tsx";
import Home from "./pages/Home/Home.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.tsx";

const router = createBrowserRouter(
  [
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
