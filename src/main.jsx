import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Routes";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("piirs")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
