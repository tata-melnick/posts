import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Button, CircularProgress } from "@mui/material";
import { ArrowBack, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { DetailCard, Comments } from "../componets";
import { ConfirmModal } from "../modals";
import { API } from "../api";
import { setPostDetail, setPostsList } from "../store/posts";
import { setModalEditPost } from "../store/modals";

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const postId = search.split("=")[1];
  const { user } = useAppSelector((state) => state);
  const { list, detail } = useAppSelector((state) => state.posts);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const goBack = () => navigate(-1);
  const toggleOpenConfirmModal = () => setOpenConfirmModal((prevState) => !prevState);
  const openEditForm = () => dispatch(setModalEditPost(true));
  const delPost = async () => {
    const resp = await API.DeletePost(detail.id);
    if (resp) {
      const newPosts = list.filter((el) => el.id !== detail.id);
      dispatch(setPostsList(newPosts));
      goBack();
    }
  };

  useEffect(() => {
    if (!list.length)
      API.GetPostById(postId).then((resp) => {
        dispatch(setPostDetail(resp));
      });
    else dispatch(setPostDetail(list.find((el) => el.id === postId)));
    return () => {
      dispatch(setPostDetail(null));
    };
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="40px 100px"
        gap={5}
        flex={1}
      >
        {(!detail || !user) && (
          <CircularProgress size={70} sx={{ margin: "auto 0" }} color="info" />
        )}
        {detail && user && (
          <>
            <Box display="flex" width="100%">
              <Button
                sx={{ mr: "auto" }}
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={goBack}
              >
                назад
              </Button>
              {detail.author.id === user.id && (
                <>
                  <Button variant="text" color="warning" onClick={openEditForm}>
                    <EditOutlined />
                  </Button>
                  <Button variant="text" color="error" onClick={toggleOpenConfirmModal}>
                    <DeleteOutline />
                  </Button>
                </>
              )}
            </Box>
            <DetailCard {...detail} />
            <Comments initComments={detail.comments} />
          </>
        )}
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

export default PostDetail;
