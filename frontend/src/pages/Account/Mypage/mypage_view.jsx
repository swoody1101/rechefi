import React from "react";
import MyPageProfile from "./components/mypage_porfile";
import MyPageFollowButton from "./components/mypage_follow_button";
import { Box, Stack } from "@mui/material";

const MyPage = () => {
  return (
    <Box maxWidth="sm" sx={{ width: "100%" }}>
      <Stack>
        <MyPageProfile></MyPageProfile>
      </Stack>
    </Box>
  );
};

export default MyPage;
