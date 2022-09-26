import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { loadProfileThunk } from "../../../../store/module/accountReducer";
import { getToken } from "../../../../utils/JWT-token";

const MyPageProfile = () => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(loadProfileThunk());
      return;
    } else {
      alert("로그인 후 접근해 주세요");
      navigate("/login");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Avatar
        sx={{
          width: 140,
          height: 140,
          mx: "auto",
        }}
      ></Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography align="center" sx={{ verticalAlign: "middle" }}>
          {loginInfo.nickname}
        </Typography>
        <Button>팔로우</Button>
      </Box>
      <Typography textAlign={"center"}>
        {loginInfo.introduce ? loginInfo.introduce : "아직 소개 글이 없습니다."}
      </Typography>
    </Box>
  );
};

export default MyPageProfile;
