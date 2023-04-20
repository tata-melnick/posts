import React from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { AuthModal, RegistrationModal, RecoverModal, EditPostModal } from "../modals";

const Layout: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Outlet />
      <Footer />
      <AuthModal />
      <RegistrationModal />
      <RecoverModal />
      <EditPostModal />
    </Box>
  );
};

export default Layout;
