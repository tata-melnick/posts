import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalAuth } from "../store/modals";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  const openAuthModal = () => dispatch(setModalAuth(true));

  return (
    <AppBar position="static" sx={{ padding: "0 76px" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Посты
        </Typography>
        {user?.name ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
          </Box>
        ) : (
          <Button color="inherit" onClick={openAuthModal}>
            Авторизация
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
