import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./route/AppRoutes.tsx"; // Cambia esta línea a tu ruta de AppRouter

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter /> {/* Usa AppRouter de react-router-dom */}
  </StrictMode>
);
