import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../api";

interface IPostsState {
  list: Array<PostType>;
  detail: PostType;
}

const initialState: IPostsState = {
  list: [],
  detail: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsList(state, { payload }: PayloadAction<Array<PostType>>) {
      state.list = payload;
    },
    setPostDetail(state, { payload }: PayloadAction<PostType>) {
      state.detail = payload;
    },
  },
});

export const { setPostsList, setPostDetail } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
