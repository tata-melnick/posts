import React from "react";
import { Box } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: ({ palette }) => palette.primary.main,
        textAlign: "center",
        p: 2,
        mt: "auto",
      }}
    >
      Автор проекта: Татьяна Мельник 2023 ©
    </Box>
  );
};

export default Footer;
