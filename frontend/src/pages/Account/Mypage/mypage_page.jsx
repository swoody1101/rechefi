import React from "react";
import { Box, Container } from "@mui/material";
import MyPageProfile from "./components/mypage_profile";
import MyPageFollow from "./components/mypage_follow";
import MyPageProfileGallery from "./components/mypage_gallery";

const MyPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <MyPageProfile />
        <MyPageFollow />
        <MyPageProfileGallery />
      </Box>
    </Container>
  );
};

export default MyPage;
