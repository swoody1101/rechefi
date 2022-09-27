import React from "react";
import { Button, Box, styled, Typography } from "@mui/material";

const ProfileFollow = (props) => {
  const followerCount = props.follower;
  const folloingCount = props.following;

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
        <FollowButton>팔로워</FollowButton>
        <Typography sx={{ textAlign: "center" }}>{followerCount}</Typography>
      </Box>
      <Box>
        <FollowButton>팔로잉</FollowButton>
        <Typography sx={{ textAlign: "center" }}>{folloingCount}</Typography>
      </Box>
    </Box>
  );
};

export default ProfileFollow;

const FollowButton = styled(Button)({
  variant: "text",
  color: "#E38B29",
});
