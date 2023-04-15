import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, CardMedia, Typography, Chip } from "@mui/material";
import { Forum, DeleteOutline } from "@mui/icons-material";
import { API, PostType } from "../api";
import Like from "./LIke";
import { useAppDispatch, useAppSelector } from "../store";
import { ConfirmModal } from "../modals";
import { setPostsList } from "../store/posts";
import { RouterNames } from "../constants";

const PostCard: React.FC<PostType> = ({
  author,
  image,
  text,
  title,
  likes,
  comments,
  tags,
  id,
  // eslint-disable-next-line camelcase
  created_at,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state);
  const { list } = useAppSelector((state) => state.posts);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toggleOpenConfirmModal = () => setOpenConfirmModal((prevState) => !prevState);
  const delPost = async () => {
    const resp = await API.DeletePost(id);
    if (resp) {
      const newPosts = list.filter((post) => post.id !== id);
      dispatch(setPostsList(newPosts));
    }
  };
  const goToDetail = () => navigate(`${RouterNames.detail}?id=${id}`);

  return (
    <>
      <Box
        sx={{
          backgroundColor: ({ palette }) => palette.background.paper,
          borderRadius: 1,
          width: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" padding={2} justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <CardMedia
              component="img"
              src={author.avatar}
              sx={{ height: "50px", width: "50px", borderRadius: "50%", mr: 1 }}
            />
            <Box>
              <Typography>{author.name}</Typography>
              <Typography fontSize="0.8rem">{author.about}</Typography>
            </Box>
          </Box>
          {author.id === user.id && (
            <DeleteOutline
              onClick={toggleOpenConfirmModal}
              sx={({ palette }) => ({
                color: `${palette.error.main}4d`,
                transition: "color 200ms",
                cursor: "pointer",
                ":hover": {
                  color: palette.error.light,
                },
              })}
            />
          )}
        </Box>
        <CardMedia
          onClick={goToDetail}
          sx={{ cursor: "pointer" }}
          component="img"
          src={image}
          height="200"
        />
        <Box padding={2} mb="auto">
          <Typography
            sx={{ cursor: "pointer", ":hover": { color: ({ palette }) => palette.info.main } }}
            onClick={goToDetail}
            variant="subtitle1"
            fontWeight={700}
          >
            {title}
          </Typography>
          <Typography variant="body2">{text}</Typography>
        </Box>
        <Box paddingLeft={2} paddingRight={2} display="flex" gap={1} flexWrap="wrap">
          {tags &&
            !!tags.length &&
            tags.map((tag) =>
              tag ? (
                <Chip key={Math.random().toString()} label={tag} variant="filled" color="primary" />
              ) : null
            )}
        </Box>
        <Box padding={2} display="flex" alignItems="center">
          {likes && <Like likes={likes} postId={id} />}
          <Box mr="auto" display="flex" alignItems="center">
            <Forum sx={{ mr: 0.5 }} />
            {comments && comments.length}
          </Box>
          <Typography>
            {new Date(created_at).toLocaleString("ru", { dateStyle: "long" })}
          </Typography>
        </Box>
      </Box>
      <ConfirmModal
        text="Вы точно хотите удалить пост?"
        open={openConfirmModal}
        close={toggleOpenConfirmModal}
        confirm={delPost}
      />
    </>
  );
};

export default PostCard;
