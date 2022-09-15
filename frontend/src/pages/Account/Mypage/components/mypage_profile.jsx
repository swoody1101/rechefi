import React from "react";

import { Avatar, Button, Box, Typography } from "@mui/material";

const MyPageProfile = () => {
  // const nickname  = useSelector(state => state.)
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
          김싸피
        </Typography>
        <Button>팔로우</Button>
      </Box>
      <Typography textAlign={"center"}>안녕안녕안녕안녕</Typography>
    </Box>
  );
};

export default MyPageProfile;
