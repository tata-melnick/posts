import React from "react";
import { Box, CardMedia, Typography, Chip } from "@mui/material";
import { Forum } from "@mui/icons-material";
import { PostType } from "../api";
import Like from "./LIke";

const DetailCard: React.FC<PostType> = (post) => {
  // eslint-disable-next-line camelcase
  const { id, title, image, text, tags, created_at, likes, author, comments } = post;
  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.background.paper,
        borderRadius: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box display="flex" padding={4} alignItems="center">
        <Typography mr="auto" variant="h5" textAlign="center" fontWeight={700}>
          {title}
        </Typography>
        <Box mr={2}>
          <Typography>{author.name}</Typography>
          <Typography fontSize="0.8rem">{author.about}</Typography>
        </Box>
        <CardMedia
          component="img"
          src={author.avatar}
          sx={{ height: "50px", width: "50px", borderRadius: "50%" }}
        />
      </Box>
      <CardMedia component="img" src={image} sx={{ objectFit: "contain", height: "500px" }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box padding={4} mb="auto">
          <Typography variant="body2">{text}</Typography>
        </Box>
        <Box paddingLeft={4} paddingRight={4} display="flex" gap={1} flexWrap="wrap">
          {tags &&
            !!tags.length &&
            tags.map((tag) =>
              tag ? (
                <Chip
                  key={Math.random().toString()}
                  label={tag}
                  title={tag}
                  variant="filled"
                  color="primary"
                />
              ) : null
            )}
        </Box>
        <Box padding={4} display="flex" alignItems="center">
          {likes && <Like likes={likes} postId={id} />}
          <Box mr="auto" display="flex" alignItems="center">
            <Forum sx={{ mr: 0.5 }} />
            {comments && comments.length}
          </Box>
          <Typography sx={{ ml: "auto" }}>
            {new Date(created_at).toLocaleString("ru", { dateStyle: "long" })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailCard;
