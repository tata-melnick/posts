import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./Layout";
import { darkTheme, lightTheme, RouterNames, TOKEN } from "./constants";
import { NotFound, PostDetail, PostsList, Profile, Welcome } from "./pages";
import { useAppDispatch, useAppSelector } from "./store";
import { setModalAuth } from "./store/modals";
import { API } from "./api";
import { setUserData } from "./store/user";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme } = useAppSelector((state) => state);
  const { auth } = useAppSelector((state) => state.modals);
  const { user } = useAppSelector((state) => state);

  useEffect(() => {
    const token = window.sessionStorage.getItem(TOKEN);
    if (!token) dispatch(setModalAuth(true));
    else API.GetUserInfo().then((resp) => dispatch(setUserData(resp)));
  }, []);

  useEffect(() => {
    if (!user && !auth && !window.sessionStorage.getItem("token")) dispatch(setModalAuth(true));
  }, [auth]);

  useEffect(() => {
    if (!user && !window.sessionStorage.getItem("token")) navigate("/");
  }, [pathname]);

  return (
    <ThemeProvider theme={theme.isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
          <Route path={RouterNames.list} element={<PostsList />} />
          <Route path={RouterNames.detail} element={<PostDetail />} />
          <Route path={RouterNames.profile} element={<Profile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
