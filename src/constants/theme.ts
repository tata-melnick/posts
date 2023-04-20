import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
      light: "#67bb6a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1f283e",
      light: "#344767",
    },
    info: {
      main: "#2290B5",
      light: "#259BC2",
    },
    warning: {
      main: "#E88620",
      light: "#F58F22",
    },
    error: {
      main: "#B54A2B",
      light: "#C24E2F",
    },
    background: {
      default: "#1a2035",
      paper: "#202940",
    },
    text: {
      primary: "#ffffffcc",
      disabled: "#ffffff30",
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#04577D",
      light: "#068DC9",
    },
    secondary: {
      main: "#7b809f",
      light: "#8f93a9",
    },
    info: {
      main: "#2E76AC",
      light: "#65BDFF",
    },
    success: {
      main: "#398151",
      light: "#35C691",
    },
    warning: {
      main: "#C9471A",
      light: "#FC8C08",
    },
    error: {
      main: "#C9102B",
      light: "#FF2E4D",
    },
    background: {
      default: "#ffffff",
      paper: "#e5f1f6",
    },
    text: {
      primary: "#344767",
      secondary: "#7b809a",
      disabled: "#ecefff",
    },
  },
});
