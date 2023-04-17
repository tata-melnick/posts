import React, { useState } from "react";
import { Box } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { API, PostType } from "../api";
import { useAppSelector } from "../store";

interface ILikeProps {
  likes: PostType["likes"];
  postId: PostType["id"];
}

const Like: React.FC<ILikeProps> = ({ likes: initLikes, postId }) => {
  const { user } = useAppSelector((state) => state);
  const [likes, setLikes] = useState<Array<string>>(initLikes || []);

  const changeLike = async () => {
    const response = await API.ChangeLikePost(postId, !likes?.includes(user.id));
    setLikes(response.likes);
  };

  return (
    <Box
      sx={{ cursor: "pointer", mr: 2, display: "flex", alignItems: "center" }}
      onClick={changeLike}
    >
      {likes.includes(user.id) ? (
        <Favorite sx={{ mr: 0.5, color: ({ palette }) => palette.error.main }} />
      ) : (
        <FavoriteBorder sx={{ mr: 0.5 }} />
      )}
      {likes.length}
    </Box>
  );
};

export default Like;
