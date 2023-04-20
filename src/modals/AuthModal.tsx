import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalAuth, setModalRecover, setModalRegistration } from "../store/modals";
import { StyledTextField } from "../componets";
import { API } from "../api";
import { setUserData } from "../store/user";
import { TOKEN } from "../constants";
import modalStyle from "./styles";

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { auth } = useAppSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(setModalAuth(false));
    setEmail("");
    setPassword("");
  };
  const openRecover = () => {
    closeModal();
    dispatch(setModalRecover(true));
  };
  const openRegistration = () => {
    closeModal();
    dispatch(setModalRegistration(true));
  };
  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSignIn = async () => {
    const response = await API.SignIn({ email, password });
    if (response?.token) {
      dispatch(setUserData(response.data));
      window.sessionStorage.setItem(TOKEN, response.token);
      closeModal();
    }
  };
  return (
    <Modal open={auth} onClose={closeModal}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Авторизация</Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon sx={{ color: ({ palette }) => palette.text.primary }} />
          </IconButton>
        </Box>
        <StyledTextField
          value={email}
          onChange={handleSetEmail}
          sx={{ mb: 1 }}
          label="Email"
          type="email"
        />
        <StyledTextField
          value={password}
          onChange={handleSetPassword}
          sx={{ mb: 1 }}
          label="Пароль"
          type="password"
        />
        <Button
          sx={{ fontSize: "12px", textTransform: "initial", ml: "auto", mb: 1 }}
          onClick={openRecover}
          variant="text"
        >
          Забыли пароль?
        </Button>
        <Button
          disabled={!email || !password}
          sx={{ mb: 1 }}
          onClick={handleSignIn}
          variant="contained"
        >
          Войти
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 0 }}>
          <Typography sx={{ fontSize: "12px" }}>Нет аккаунтта?</Typography>
          <Button
            sx={{ fontSize: "12px", textTransform: "initial" }}
            onClick={openRegistration}
            variant="text"
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
