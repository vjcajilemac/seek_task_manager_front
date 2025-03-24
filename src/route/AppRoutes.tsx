import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import InternalRoutes from "./InternalRoutes";

const AppRouter = () => {
  const isAuthenticated = false; // Cambia esto con tu lógica de autenticación

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige según la autenticación 
        {isAuthenticated ? (*/}
          <Route path="/*" element={<InternalRoutes/>} />
        {/*) : (*/}
          <Route path="/auth/*" element={<AuthRoutes/>} />
        {/*)}
         Redirigir a una ruta específica si no coincide ninguna */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;