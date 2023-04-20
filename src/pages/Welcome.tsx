import React, { ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { RouterNames } from "../constants";
import bgColored from "../assets/bg-welcome.jpg";
import { useAppDispatch, useAppSelector } from "../store";
import { setTheme } from "../store/theme";

const Welcome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useAppSelector((state) => state);

  const goToPosts = useCallback(() => navigate(RouterNames.list), []);
  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(e.target.value === "dark"));
  };

  return (
    <Box
      sx={{
        background: `url("${bgColored}") center center no-repeat`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "100%",
          background: ({ palette }) =>
            theme.isDark ? `${palette.background.default}e6` : `${palette.background.default}80`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{
            mb: 5,
            background: ({ palette }) => `${palette.background.default}b3`,
            borderRadius: 1,
            p: "1rem 2rem",
          }}
          onChange={toggleTheme}
        >
          <Typography mb={1} variant="h6" textTransform="uppercase">
            Выберите тему оформления
          </Typography>
          <RadioGroup value={theme.isDark ? "dark" : "light"} name="change-theme">
            <FormControlLabel
              sx={{ justifyContent: "center" }}
              value="dark"
              control={<Radio />}
              label="Темная"
            />
            <FormControlLabel
              sx={{ justifyContent: "center" }}
              value="light"
              control={<Radio />}
              label="Светлая"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={goToPosts}>
          перейти к постам
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
