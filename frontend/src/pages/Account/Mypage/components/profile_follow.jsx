import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Box, styled, Typography } from "@mui/material";

const ProfileFollow = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const followerCount = props.follower;
  const followingCount = props.following;
  const followerList = props.followerList;
  const followingList = props.followingList;

  const followerClickHandler = () => {
    navigate("/follow");
  };
  const followingClickHandler = () => {
    navigate("/follow");
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-evenly",
        borderColor: "black",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FollowButton onClick={followerClickHandler}>팔로워</FollowButton>
        <Typography sx={{ textAlign: "center" }}>{followerCount}</Typography>
      </Box>
      <Box>
        <FollowButton onClick={followingClickHandler}>팔로잉</FollowButton>
        <Typography sx={{ textAlign: "center" }}>{followingCount}</Typography>
      </Box>
    </Box>
  );
};

export default ProfileFollow;

const FollowButton = styled(Button)({
  variant: "text",
  color: "#E38B29",
});
