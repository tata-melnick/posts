import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "../store";
import { setModalCreatePost } from "../store/modals";

const breadCrumbStyle = {
  p: 0,
  textTransform: "initial",
  minWidth: "max-content",
  height: "100%",
  ".MuiTouchRipple-root": { display: "none" },
};
const delimiterStyle = {
  color: ({ palette }) => palette.info.main,
  fontSize: "1rem",
  ml: 0.3,
  mr: 0.3,
};

const PostsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToWelcome = () => navigate("/");
  const openNewPostForm = () => dispatch(setModalCreatePost(true));

  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" height="20px">
        <Button
          onClick={goToWelcome}
          sx={{ ...breadCrumbStyle, fontWeight: 300 }}
          color="info"
          variant="text"
        >
          Главная
        </Button>
        <Typography sx={delimiterStyle}>/</Typography>
        <Button
          disabled
          sx={{
            ...breadCrumbStyle,
            "&.Mui-disabled": { color: ({ palette }) => palette.info.light },
          }}
          color="info"
          variant="text"
        >
          Посты
        </Button>
      </Box>
      <Typography mt={3} mb={2} variant="h6">
        Добро пожаловать на страничку с постми
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Typography>Здесь Вы можете посмотреть посты других участников и создать свои</Typography>
        <Button variant="contained" color="primary" onClick={openNewPostForm}>
          Создать пост
        </Button>
      </Box>
    </Box>
  );
};

export default PostsList;
