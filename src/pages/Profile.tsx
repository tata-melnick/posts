import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, CardMedia, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { StyledTextField } from "../componets";
import { API, UserType } from "../api";
import { setUserData } from "../store/user";
import { RouterNames } from "../constants";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state);
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleSetAvatar = (e: ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value);
  const handleSetAbout = (e: ChangeEvent<HTMLInputElement>) => setAbout(e.target.value);

  const goToPosts = () => navigate(RouterNames.list);
  const edit = async () => {
    setIsLoading(true);
    let userInfo: UserType;
    if (user?.name !== name || user?.about !== about) {
      const newUserInfo = await API.EditUserInfo({
        name: name || user.name,
        about: about || user.about,
      });
      userInfo = { ...newUserInfo };
    }
    if (user?.avatar !== avatar) {
      const newUserInfo = await API.EditUserAvatar(avatar);
      userInfo = { ...newUserInfo };
    }
    dispatch(setUserData(userInfo));
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAbout(user.about);
      setAvatar(user.avatar);
    }
  }, [user]);

  const disable =
    (!name || user?.name === name) &&
    (!avatar || user?.avatar === avatar) &&
    (!about || user?.about === about);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {!user || isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flex: 1,
            columnGap: 5,
            p: 4,
            maxHeight: "500px",
          }}
        >
          <CardMedia component="img" src={avatar} sx={{ width: "400px", borderRadius: "5%" }} />
          <Box display="flex" flexDirection="column" width="500px" justifyContent="space-between">
            <StyledTextField value={user.email} label="Email" />
            <StyledTextField value={name} label="Имя" onChange={handleSetName} />
            <StyledTextField
              value={about}
              label="Обо мне"
              onChange={handleSetAbout}
              multiline
              maxRows={4}
              minRows={4}
            />
            <StyledTextField value={avatar} label="Аватар" onChange={handleSetAvatar} />
            <Button variant="contained" disabled={disable} onClick={edit}>
              Сохранить изменения
            </Button>
          </Box>
        </Box>
      )}
      {!isLoading && (
        <Button
          sx={{ margin: "auto auto 16px", width: "940px" }}
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={goToPosts}
        >
          К постам
        </Button>
      )}
    </Box>
  );
};

export default Profile;
