import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThemeState {
  isDark: boolean;
}

const initialState: IThemeState = {
  isDark: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<boolean>) {
      state.isDark = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
