import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileDetail = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const imgUrl = props.imgUrl;
  const email = props.email;
  const nickname = props.nickname;
  const introduce = props.introduce;

  const isFollowHandler = (prop) => {
    if (loginInfo.followingList.includes(prop)) {
      return true;
    }
    return false;
  };

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
        {email === loginInfo.email ? (
          <></>
        ) : isFollowHandler(email) ? (
          <CheckCircleOutlineIcon />
        ) : (
          <AddCircleOutlineOutlinedIcon />
        )}
      </Box>
      <Typography textAlign={"center"}>
        {introduce ? introduce : "아직 소개 글이 없습니다."}
      </Typography>
    </Box>
  );
};

export default ProfileDetail;
