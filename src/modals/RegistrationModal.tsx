import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalAuth, setModalRegistration } from "../store/modals";
import { StyledTextField } from "../componets";
import { API } from "../api";
import useValidate from "../hooks/useValidate";
import modalStyle from "./styles";

const RegistrationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const { invalidEmail, passValidInfo } = useValidate({
    email,
    passwords: { mainPass: password, verifyPass: verifyPassword },
  });
  const { registration } = useAppSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(setModalRegistration(false));
    setVerifyPassword("");
    setEmail("");
    setPassword("");
  };
  const goBack = () => {
    closeModal();
    dispatch(setModalAuth(true));
  };
  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSetVerifyPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setVerifyPassword(e.target.value);

  const handleSignUp = async () => {
    const response = await API.SignUp({ email, password, group: "group-10" });
    if (response?.id) goBack();
  };

  return (
    <Modal open={registration} onClose={closeModal}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Регистрация</Typography>
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
          error={invalidEmail}
          helperText={invalidEmail && "Не корректный email"}
        />
        <StyledTextField
          value={password}
          onChange={handleSetPassword}
          sx={{ mb: 1 }}
          label="Пароль"
          type="password"
          error={passValidInfo.mainPass.invalid}
          helperText={passValidInfo.mainPass.message}
        />
        <StyledTextField
          value={verifyPassword}
          onChange={handleSetVerifyPassword}
          sx={{ mb: 2 }}
          label="Подтвердите пароль"
          type="password"
          error={passValidInfo.verifyPass.invalid}
          helperText={passValidInfo.verifyPass.message}
        />
        <Typography variant="body2" fontSize="12px" mb={1}>
          Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности
          и соглашаетесь на информационную рассылку.
        </Typography>
        <Button
          disabled={
            invalidEmail ||
            passValidInfo.mainPass.invalid ||
            passValidInfo.verifyPass.invalid ||
            !email ||
            !password
          }
          sx={{ mb: 1 }}
          onClick={handleSignUp}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
        <Button sx={{ fontSize: "12px", textTransform: "initial" }} onClick={goBack} variant="text">
          Назад
        </Button>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
