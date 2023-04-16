import React, { useState } from "react";
import { useLocation } from "react-router";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { ConfirmModal } from "../modals";
import { API, CommentType, PostType, UserType } from "../api";
import { useAppSelector } from "../store";

interface ICommentProps {
  comment: CommentType;
  users: Array<UserType>;
  setData(post: PostType): void;
}

const Comment: React.FC<ICommentProps> = ({ comment, users, setData }) => {
  const { search } = useLocation();
  const postId = search.split("=")[1];
  const { user: me } = useAppSelector((state) => state);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toggleOpenConfirmModal = () => setOpenConfirmModal((prevState) => !prevState);

  const delComment = async (commentId: string) => {
    const post = await API.DelComment(postId, commentId);
    setData(post);
  };
  return (
    <Box
      sx={({ palette }) => ({
        borderBottom: `1px solid ${palette.grey[800]}`,
        pb: 1,
        mt: 3,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Box display="flex" columnGap="10px" alignItems="center" mb={2}>
        <CardMedia
          component="img"
          src={users.find((user) => user.id === comment.author).avatar}
          sx={{ height: "50px", width: "50px", borderRadius: "50%" }}
        />
        <Typography variant="h5" mr="auto">
          {users.find((user) => user.id === comment.author).name}
        </Typography>
        <Typography variant="subtitle2" fontWeight="light">
          {new Date(comment.created_at).toLocaleString("ru", { dateStyle: "long" })}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          wordBreak: "break-word",
          p: 2,
          borderRadius: 2,
          backgroundColor: ({ palette }) => `${palette.info.main}0D`,
        }}
      >
        {comment.text}
      </Typography>
      {comment.author === me.id && (
        <>
          <Button
            variant="text"
            color="error"
            sx={{ ml: "auto", mt: 1 }}
            onClick={toggleOpenConfirmModal}
          >
            Удалить комментарий
          </Button>
          <ConfirmModal
            text="Вы точно хотите удалить комментарий?"
            open={openConfirmModal}
            close={toggleOpenConfirmModal}
            confirm={() => delComment(comment.id)}
          />
        </>
      )}
    </Box>
  );
};

export default Comment;
