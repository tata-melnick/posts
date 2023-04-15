import React, { useEffect, useState } from "react";
import { Box, Typography, Pagination, CircularProgress } from "@mui/material";
import { API, PostType } from "../api";
import { PostCard, PostsHeadLine } from "../componets";
import { useAppDispatch, useAppSelector } from "../store";
import { setPostsList } from "../store/posts";

const count = 12;
const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.posts);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postsOnPage, setPostsOnPage] = useState<Array<PostType>>([]);
  const [error, setError] = useState<boolean>(false);

  const handleSetPage = (_, pageNumber: number) => setPage(pageNumber - 1);

  useEffect(() => {
    setPostsOnPage(list.slice(page * count, page * count + count));
  }, [page, list]);

  useEffect(() => {
    if (!list.length) {
      setIsLoading(true);
      API.GetPosts().then((resp) => {
        if ("err" in resp) setError(true);
        else dispatch(setPostsList(resp));
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Box
      display="flex"
      gap={5}
      padding="40px 100px"
      flexWrap="wrap"
      justifyContent="center"
      flex={1}
    >
      {isLoading ? (
        <CircularProgress size={70} sx={{ margin: "auto 0" }} color="info" />
      ) : (
        <>
          {!error && <PostsHeadLine />}
          {!!postsOnPage.length && postsOnPage.map((post) => <PostCard key={post?.id} {...post} />)}
          {error && <Typography>Для просмотра постов, Вам необходимо авторизоваться</Typography>}
          {list?.length > count && (
            <Pagination
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                ".css-14bp4dh-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
                  background: ({ palette }) => palette.info.main,
                },
                ".css-14bp4dh-MuiButtonBase-root-MuiPaginationItem-root": {
                  borderColor: ({ palette }) => palette.info.main,
                },
              }}
              count={Math.ceil(list.length / count)}
              page={page + 1}
              onChange={handleSetPage}
              variant="outlined"
              shape="rounded"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PostsList;
