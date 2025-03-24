import React from "react";
import {
  Box,
  CssBaseline,
} from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: `${drawerWidth}px` }, // Se asegura que el contenido no quede oculto detrás del Sidebar
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // Espaciado para que el contenido no se esconda detrás del AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
