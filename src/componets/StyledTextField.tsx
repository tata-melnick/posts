import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const StyledTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      variant="outlined"
      sx={{
        ...sx,
        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
          borderColor: "initial",
        },
        ".css-15wgb3s-MuiFormLabel-root-MuiInputLabel-root": {
          color: ({ palette }) => palette.text.primary,
        },
        ".css-1mqd58a-MuiFormLabel-root-MuiInputLabel-root": {
          color: ({ palette }) => palette.text.primary,
        },
        ".css-vb0z00-MuiFormLabel-root-MuiInputLabel-root": {
          color: ({ palette }) => palette.text.primary,
        },
      }}
      {...props}
    />
  );
};

export default StyledTextField;
