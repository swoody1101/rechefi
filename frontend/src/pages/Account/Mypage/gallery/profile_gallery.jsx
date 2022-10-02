import React, { useState } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import ProfileGalleryMyCookList from "./profile_gallery_mycook_list";
import ProfileGalleryRecipeList from "./profile_gallery_recipe_list";
import { useDispatch } from "react-redux";

const ProfileGallery = () => {
  const dispatch = useDispatch();
  const [isRecipeBoard, setIsRecipeBoard] = useState(true);

  const recipeButtonHandler = () => {
    setIsRecipeBoard(true);
  };

  const myCookButtonHandler = () => {
    setIsRecipeBoard(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <GalleryButton
          onClick={recipeButtonHandler}
          sx={{ color: isRecipeBoard ? "#E38B29" : "gray" }}
        >
          recipe
        </GalleryButton>
        <GalleryButton
          onClick={myCookButtonHandler}
          sx={{ color: isRecipeBoard ? "gray" : "#E38B29  " }}
        >
          my cook
        </GalleryButton>
      </Box>
      {isRecipeBoard ? (
        <ProfileGalleryMyCookList />
      ) : (
        <ProfileGalleryRecipeList />
      )}
    </Box>
  );
};

export default ProfileGallery;

const GalleryButton = styled(Button)({
  variant: "text",
  fontSize: "13px",
});
