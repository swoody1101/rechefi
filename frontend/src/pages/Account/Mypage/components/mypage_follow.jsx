import React from "react";
import { Button, Box, styled, Paper, Typography } from "@mui/material";
import {} from "@mui/system";

const MyPageFollowButton = () => {
  const followerCount = 100;
  const folloingCount = 100;

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

export default MyPageFollowButton;

const FollowButton = styled(Button)({
  variant: "text",
  color: "#E38B29",
});
