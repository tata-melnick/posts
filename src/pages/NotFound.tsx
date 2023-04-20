import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { RouterNames } from "../constants";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goToWelcome = () => navigate(RouterNames.list);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography mb={5} variant="h3">
        Такой страницы не существует
      </Typography>
      <Button onClick={goToWelcome} variant="outlined" startIcon={<ArrowBack />}>
        К постам
      </Button>
    </Box>
  );
};

export default NotFound;
