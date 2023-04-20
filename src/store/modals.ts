import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalsState {
  auth: boolean;
  registration: boolean;
  recover: boolean;
  createPost: boolean;
  editPost: boolean;
}

const initialState: IModalsState = {
  auth: false,
  registration: false,
  recover: false,
  editPost: false,
  createPost: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalAuth(state, { payload }: PayloadAction<boolean>) {
      state.auth = payload;
    },
    setModalRegistration(state, { payload }: PayloadAction<boolean>) {
      state.registration = payload;
    },
    setModalRecover(state, { payload }: PayloadAction<boolean>) {
      state.recover = payload;
    },
    setModalEditPost(state, { payload }: PayloadAction<boolean>) {
      state.editPost = payload;
    },
    setModalCreatePost(state, { payload }: PayloadAction<boolean>) {
      state.createPost = payload;
    },
  },
});

export const {
  setModalAuth,
  setModalRegistration,
  setModalRecover,
  setModalEditPost,
  setModalCreatePost,
} = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
