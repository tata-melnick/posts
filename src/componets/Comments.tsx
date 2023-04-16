import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { API, CommentType, PostType, UserType } from "../api";
import StyledTextField from "./StyledTextField";
import { useAppDispatch } from "../store";
import { setPostDetail } from "../store/posts";
import Comment from "./Comment";

interface ICommentsProps {
  initComments: Array<CommentType>;
}

const Comments: React.FC<ICommentsProps> = ({ initComments }) => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const postId = search.split("=")[1];
  const [comments, setComments] = useState<Array<CommentType>>([...initComments].reverse() || null);
  const [users, setUsers] = useState<Array<UserType>>(null);
  const [text, setText] = useState<string>("");

  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const setData = (post: PostType) => {
    if (text) setText("");
    dispatch(setPostDetail(post));
    setComments([...post.comments].reverse());
  };

  const addComment = async () => {
    const post = await API.AddComment(postId, text);
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
        comments.map((comment) => <Comment comment={comment} users={users} setData={setData} />)}
    </Box>
  );
};

export default Comments;
