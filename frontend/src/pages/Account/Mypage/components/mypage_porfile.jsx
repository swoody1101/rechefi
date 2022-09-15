import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  styled,
  TextField,
} from "@mui/material";

const MyPageProfile = () => {
  // const nickname  = useSelector(state => state.)
  return (
    <React.Fragment>
      <Avatar sx={{ width: 140, height: 140 }}></Avatar>
      <Stack direction="row">
        <div>김싸피</div>
        <Button>팔로우</Button>
      </Stack>
      <p>안녕안녕안녕안녕</p>
    </React.Fragment>
  );
};

export default MyPageProfile;
