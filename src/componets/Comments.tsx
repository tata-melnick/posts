import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { API, CommentType, PostType, UserType } from "../api";
import StyledTextField from "./StyledTextField";
import { useAppDispatch, useAppSelector } from "../store";
import { setPostDetail } from "../store/posts";
import { ConfirmModal } from "../modals";

interface ICommentsProps {
  initComments: Array<CommentType>;
}

const Comments: React.FC<ICommentsProps> = ({ initComments }) => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const postId = search.split("=")[1];
  const { user: me } = useAppSelector((state) => state);
  const [comments, setComments] = useState<Array<CommentType>>([...initComments].reverse() || null);
  const [users, setUsers] = useState<Array<UserType>>(null);
  const [text, setText] = useState<string>("");
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const setData = (post: PostType) => {
    if (text) setText("");
    dispatch(setPostDetail(post));
    setComments([...post.comments].reverse());
  };
  const toggleOpenConfirmModal = () => setOpenConfirmModal((prevState) => !prevState);

  const addComment = async () => {
    const post = await API.AddComment(postId, text);
    setData(post);
  };

  const delComment = async (commentId: string) => {
    const post = await API.DelComment(postId, commentId);
    setData(post);
  };

  useEffect(() => {
    API.GetUsersInfo().then((resp) => setUsers(resp));
  }, []);

  if (!users || !users.length) return null;

  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.background.paper,
        borderRadius: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        p: "32px",
      }}
    >
      <Typography variant="h5">Комментарии</Typography>
      <Accordion
        sx={{
          boxShadow: "none",
          borderBottom: ({ palette }) => `1px solid ${palette.grey[800]}`,
        }}
      >
        <AccordionSummary
          sx={{ p: 0 }}
          expandIcon={<ExpandMore sx={{ color: ({ palette }) => palette.text.primary }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Добавить комментарий</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ p: 0, pb: 3, display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <StyledTextField
            sx={{ width: "100%" }}
            multiline
            autoComplete="password"
            value={text}
            onChange={handleSetText}
            minRows={3}
            maxRows={3}
          />
          <Button sx={{ mt: 2 }} variant="contained" onClick={addComment} disabled={!text}>
            Отправить
          </Button>
        </AccordionDetails>
      </Accordion>
      {comments &&
        !!comments.length &&
        comments.map((comment) => (
          <Box
            key={`comment-${comment.id}`}
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
        ))}
    </Box>
  );
};

export default Comments;
