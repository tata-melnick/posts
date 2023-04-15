import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./theme";
import { modalsReducer } from "./modals";
import { userReducer } from "./user";
import { postsReducer } from "./posts";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modals: modalsReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
