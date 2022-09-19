import React from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";

const MyPageProfileGallery = () => {
  const imglist = [];
  return (
    <Box>
      <ButtonGroup variant="text">
        <GalleryButton>recipe</GalleryButton>
        <GalleryButton>my cook</GalleryButton>
      </ButtonGroup>
    </Box>
  );
};

export default MyPageProfileGallery;

const GalleryButton = styled(Button)({
  color: "gray",
  fontSize: "13px",
});
