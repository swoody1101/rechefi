import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const MyPageFollowItem = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
      }}
      key={props.id}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Avatar sx={{ width: 40, height: 40 }}></Avatar>
        <Typography>{props.nickname}</Typography>
      </Box>
      {props.isFollow ? <Button>팔로잉</Button> : <Button>팔로우</Button>}
    </Box>
  );
};

export default MyPageFollowItem;
