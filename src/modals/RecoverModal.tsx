import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalAuth, setModalRecover } from "../store/modals";
import { StyledTextField } from "../componets";
import { API } from "../api";
import useValidate from "../hooks/useValidate";
import modalStyle from "./styles";
import { setUserData } from "../store/user";
import { TOKEN } from "../constants";

const RecoverModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { invalidEmail } = useValidate({ email });
  const { recover } = useAppSelector((state) => state.modals);

  const closeModal = () => {
    dispatch(setModalRecover(false));
    setEmail("");
    setIsConfirm(false);
    setPassword("");
  };
  const goBack = () => {
    closeModal();
    dispatch(setModalAuth(true));
  };
  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSetToken = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value);

  const handleRecover = async () => {
    const response = await API.Recover(email);
    // eslint-disable-next-line no-underscore-dangle
    if (response?.message === "Письмо успешно отправлено") setIsConfirm(true);
  };
  const handleConfirm = async () => {
    const response = await API.ResetPass(token, password);
    if (response?.token) {
      dispatch(setUserData(response.data));
      window.sessionStorage.setItem(TOKEN, response.token);
      closeModal();
    }
  };

  return (
    <Modal open={recover} onClose={closeModal}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Восстановление пароля</Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon sx={{ color: ({ palette }) => palette.text.primary }} />
          </IconButton>
        </Box>
        <Typography variant="body2" fontSize="12px" mb={1}>
          Для получения временного пароля необходимо ввести email, указанный при регистрации.
        </Typography>
        {!isConfirm && (
          <StyledTextField
            value={email}
            onChange={handleSetEmail}
            sx={{ mb: 1 }}
            label="Email"
            type="email"
            error={invalidEmail}
            helperText={invalidEmail && "Не корректный email"}
          />
        )}
        {isConfirm && (
          <>
            <StyledTextField
              value={token}
              onChange={handleSetToken}
              sx={{ mb: 1 }}
              label="Токен из письма"
              type="text"
            />
            <StyledTextField
              value={password}
              onChange={handleSetPassword}
              sx={{ mb: 1 }}
              label="Новый пароль"
              type="password"
            />
          </>
        )}
        <Typography variant="body2" fontSize="12px" mb={1}>
          Срок действия временного пароля 24 ч.
        </Typography>
        <Button
          disabled={(!isConfirm && (invalidEmail || !email)) || (isConfirm && !password)}
          sx={{ mb: 1 }}
          onClick={isConfirm ? handleConfirm : handleRecover}
          variant="contained"
        >
          {isConfirm ? "Установить новый пароль" : "Отправить токен"}
        </Button>
        <Button sx={{ fontSize: "12px", textTransform: "initial" }} onClick={goBack} variant="text">
          Назад
        </Button>
      </Box>
    </Modal>
  );
};

export default RecoverModal;
