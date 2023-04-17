import React from "react";
import { useLocation, useNavigate } from "react-router";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { PostAdd } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalAuth } from "../store/modals";
import { RouterNames } from "../constants";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state);

  const openAuthModal = () => dispatch(setModalAuth(true));
  const goToProfile = () => navigate(RouterNames.profile);

  return (
    <AppBar position="static" sx={{ p: "0 76px" }}>
      <Toolbar>
        <PostAdd sx={{ mr: 1, mb: "5px" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Посты
        </Typography>
        {user?.name ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              ...(pathname !== RouterNames.profile && {
                "&:hover": { cursor: "pointer", color: ({ palette }) => palette.warning.light },
              }),
            }}
            onClick={pathname !== RouterNames.profile ? goToProfile : undefined}
          >
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
