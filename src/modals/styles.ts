import { SxProps } from "@mui/material";

const modalStyle: SxProps<any> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08), 0px 20px 32px rgba(0, 0, 0, 0.24)",
  borderRadius: 10,
  p: 4,
  display: "flex",
  flexDirection: "column",
  "> *": {
    mb: 1.5,
  },
};

export default modalStyle;
