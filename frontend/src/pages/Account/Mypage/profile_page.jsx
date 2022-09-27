import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ProfileDetail from "./components/profile_detail";
import ProfileFollow from "./components/profile_follow";
import ProfileGallery from "./components/profile_gallery";
import {
  loadMyProfileThunk,
  loadProfileThunk,
} from "../../../store/module/accountReducer";
import { getToken } from "../../../utils/JWT-token";

const ProfilePage = () => {
  const loginInfo = useSelector((store) => store.account);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = {
    email: "",
    nickname: "",
    img_url: "",
    introduce: "",
    follower: 0,
    following: 0,
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      if (state === loginInfo.email) {
        dispatch(loadMyProfileThunk());
      } else {
        dispatch(loadProfileThunk(state))
          .unwrap()
          .then((res) => {
            profile.email = res.email;
            profile.nickname = res.email;
            profile.introduce = res.about_me;
            profile.introduce = res.img_url;
            profile.follower = res.follower;
            profile.following = res.following;
          })
          .catch((err) => {
            alert("잘못된 요청입니다.");
            console.log(err);
          });
      }
    } else {
      alert("로그인 후 접근해 주세요");
      navigate("/login");
    }
  }, [profile]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <ProfileDetail />
        <ProfileFollow />
        <ProfileGallery />
      </Box>
    </Container>
  );
};

export default ProfilePage;
