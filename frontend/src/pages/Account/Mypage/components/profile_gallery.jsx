import React from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";

const ProfileGallery = () => {
  return (
    <Box>
      <ButtonGroup variant="text">
        <GalleryButton>recipe</GalleryButton>
        <GalleryButton>my cook</GalleryButton>
      </ButtonGroup>
    </Box>
  );
};

export default ProfileGallery;

const GalleryButton = styled(Button)({
  color: "gray",
  fontSize: "13px",
});
