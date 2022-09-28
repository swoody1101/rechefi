import React from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileDetail = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const imgUrl = props.imgUrl;
  const email = props.email;
  const nickname = props.nickname;
  const introduce = props.introduce;

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
          {nickname}
        </Typography>
        {email !== loginInfo.email ? <Button>팔로우</Button> : <></>}
      </Box>
      <Typography textAlign={"center"}>
        {introduce ? introduce : "아직 소개 글이 없습니다."}
      </Typography>
    </Box>
  );
};

export default ProfileDetail;
