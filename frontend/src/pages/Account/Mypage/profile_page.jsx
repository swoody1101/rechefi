import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ProfileIntroduce from "./introduce/profile_introduce";
import ProfileFollow from "./follow/profile_follow";
import ProfileGallery from "./gallery/profile_gallery";
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

  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [introduce, setIntroduce] = useState();
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();

  useEffect(() => {
    if (state === null) {
      dispatch(loadMyProfileThunk())
        .unwrap()
        .then((res) => {
          setId(res.id);
          setEmail(res.email);
          setNickname(res.nickname);
          setImgUrl(res.img_url);
          setIntroduce(res.about_me);
          setFollower(res.follower);
          setFollowing(res.following);
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
          console.log(err);
        });
    } else {
      if (getToken()) {
        dispatch(loadProfileThunk(state))
          .unwrap()
          .then((res) => {
            setId(res.id);
            setEmail(res.email);
            setNickname(res.nickname);
            setImgUrl(res.img_url);
            setIntroduce(res.about_me);
            setFollower(res.follower);
            setFollowing(res.following);
          })
          .catch((err) => {
            alert("잘못된 요청입니다.");
            console.log(err);
          });
      } else {
        alert("로그인 후 접근해 주세요");
        navigate("/login");
      }
    }
  }, [state]);

  const isFollowHandler = (prop) => {
    if (loginInfo.followingList.includes(prop)) {
      return true;
    }
    return false;
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <ProfileIntroduce
          imgUrl={imgUrl}
          email={email}
          nickname={nickname}
          introduce={introduce}
          isFollow={isFollowHandler(email)}
        />
        <ProfileFollow
          follower={follower}
          following={following}
          email={email}
        />
        <ProfileGallery userId={id} />
      </Box>
    </Container>
  );
};

export default ProfilePage;
