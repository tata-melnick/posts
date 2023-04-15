import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import modalStyle from "./styles";

interface IConfirmModalProps {
  text: string;
  open: boolean;
  close(): void;
  confirm(): void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({ confirm, text, open, close }) => {
  const handleConfirm = async () => {
    await confirm();
    close();
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={{ ...modalStyle, p: 2, width: "385px", borderRadius: "10px" }}>
        <Typography variant="h5" color="error">
          {text}
        </Typography>
        <Box display="flex" columnGap={2}>
          <Button sx={{ flex: 1 }} onClick={handleConfirm} variant="contained" color="error">
            ДА
          </Button>
          <Button sx={{ flex: 1 }} onClick={close} variant="contained" color="success">
            НЕТ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
