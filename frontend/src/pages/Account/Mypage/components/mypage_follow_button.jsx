import React from "react";
import { Button, Box, Grid, Stack, styled } from "@mui/material";
import {} from "@mui/system";

const MyPageFollowButton = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <FollowButton>팔로워</FollowButton>
      </Grid>
      <Grid xs={6}>
        <FollowButton>팔로잉</FollowButton>
      </Grid>
      <Grid xs={6}>
        <Box>123</Box>
      </Grid>
    </Grid>
  );
};

export default MyPageFollowButton;

const FollowButton = styled(Button)({
  variant: "text",
  color: "#E38B29",
});
