import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../api";

const initialState: UserType = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<UserType>) {
      return payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
