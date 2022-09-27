import React from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";

const ProfileDetail = (props) => {
  const img_url = props.img_url;
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
        <Button>팔로우</Button>
      </Box>
      <Typography textAlign={"center"}>
        {introduce ? introduce : "아직 소개 글이 없습니다."}
      </Typography>
    </Box>
  );
};

export default ProfileDetail;
