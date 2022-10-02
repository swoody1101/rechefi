import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileFollowThunk } from "../../../../store/module/accountReducer";

const ProfileFollowItem = (props) => {
  const [follow, setfollow] = useState(props.isFollow);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileTransitionHandler = () => {
    navigate("/profile", { state: props.email });
  };

  const followHandler = () => {
    dispatch(profileFollowThunk(props.email))
      .unwrap()
      .then((res) => {
        alert(res.detail);
      });
    setfollow(!follow);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Avatar sx={{ width: 40, height: 40 }}></Avatar>
        <Typography onClick={profileTransitionHandler} sx={{ fontSize: 20 }}>
          {props.email}
        </Typography>
      </Box>
      {follow ? (
        <Button onClick={followHandler}>팔로잉</Button>
      ) : (
        <Button onClick={followHandler}>팔로우</Button>
      )}
    </Box>
  );
};

export default ProfileFollowItem;
