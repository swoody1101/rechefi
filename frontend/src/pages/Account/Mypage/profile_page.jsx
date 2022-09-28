import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ProfileDetail from "./components/profile_detail";
import ProfileFollow from "./components/profile_follow";
import ProfileGallery from "./components/profile_gallery";
import {
  loadFollowListThunk,
  loadMyProfileThunk,
  loadProfileThunk,
} from "../../../store/module/accountReducer";
import { getToken } from "../../../utils/JWT-token";

const ProfilePage = () => {
  const loginInfo = useSelector((store) => store.account);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [introduce, setIntroduce] = useState();
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();

  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      if (state === loginInfo.email) {
        dispatch(loadMyProfileThunk());
        setEmail(loginInfo.email);
        setNickname(loginInfo.nickname);
        setImgUrl(loginInfo.img_url);
        setIntroduce(loginInfo.about_me);
        setFollower(loginInfo.follower);
        setFollowing(loginInfo.following);
      } else {
        dispatch(loadProfileThunk(state))
          .unwrap()
          .then((res) => {
            setEmail(res.data.email);
            setNickname(res.data.nickname);
            setImgUrl(res.data.img_url);
            setIntroduce(res.data.about_me);
            setFollower(res.data.follower);
            setFollowing(res.data.following);
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
  }, [dispatch, loginInfo]);

  useEffect(() => {
    // 팔로우 리스트
    dispatch(loadFollowListThunk(state))
      .unwrap()
      .then((res) => {
        setFollowerList([...res.follower]);
        setFollowingList([...res.following]);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <ProfileDetail
          img_url={imgUrl}
          email={email}
          nickname={nickname}
          introduce={introduce}
        />
        <ProfileFollow
          follower={follower}
          following={following}
          followerList={followerList}
          followingList={followingList}
        />
        <ProfileGallery />
      </Box>
    </Container>
  );
};

export default ProfilePage;
