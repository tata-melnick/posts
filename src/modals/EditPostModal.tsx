import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, CardMedia, Modal } from "@mui/material";
import { NoPhotography } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { setModalCreatePost, setModalEditPost } from "../store/modals";
import { StyledTextField } from "../componets";
import modalStyle from "./styles";
import { API } from "../api";
import { setPostsList, setPostDetail } from "../store/posts";

const EditPostModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, detail } = useAppSelector((state) => state.posts);
  const { editPost, createPost } = useAppSelector((state) => state.modals);
  const { isDark } = useAppSelector((state) => state.theme);
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const closeModal = () => {
    setImage("");
    setText("");
    setTitle("");
    setTags("");
    if (editPost) dispatch(setModalEditPost(false));
    if (createPost) dispatch(setModalCreatePost(false));
  };
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value);
  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleSetTags = (e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value);

  const create = async () => {
    const data = {
      tags: tags ? tags.split(",") : [],
      text,
      title,
      image,
    };
    if (editPost) {
      const response = await API.EditPost(data, detail.id);
      dispatch(setPostDetail(response));
      dispatch(setPostsList([response, ...list.filter((el) => el.id !== response.id)]));
    } else {
      const response = await API.CreatePost(data);
      dispatch(setPostsList([response, ...list]));
    }
    closeModal();
  };

  useEffect(() => {
    if (editPost) {
      setImage(detail.image);
      setText(detail.text);
      setTitle(detail.title);
      setTags(detail.tags.join(", "));
    }
  }, [editPost, detail]);

  return (
    <Modal open={editPost || createPost} onClose={closeModal}>
      <Box sx={{ ...modalStyle, width: "500px" }}>
        <StyledTextField
          sx={{ mb: 1 }}
          placeholder="URL картинки"
          onChange={handleSetImage}
          value={image}
        />
        {!image && (
          <NoPhotography
            sx={{ width: "100%", height: "300px", margin: "0 auto 8px" }}
            color={(isDark ? "white" : "black") as any}
          />
        )}
        {image && <CardMedia component="img" src={image} sx={{ height: "300px", width: "100%" }} />}
        <StyledTextField
          sx={{ mb: 1 }}
          placeholder="Заголовок"
          value={title}
          onChange={handleSetTitle}
        />
        <StyledTextField
          sx={{ mb: 1 }}
          placeholder="Текст поста"
          rows={4}
          multiline
          value={text}
          onChange={handleSetText}
        />
        <StyledTextField
          placeholder="Теги (вводите через запятую)"
          value={tags}
          onChange={handleSetTags}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={create}
          disabled={!image || !title || !text}
        >
          {editPost ? "Сохранить изменения" : "Создать пост"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditPostModal;
