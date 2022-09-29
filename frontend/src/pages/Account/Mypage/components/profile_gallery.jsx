import React from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import RecipeListPage from "../../../Recipe/List/recipe_list_page";

const ProfileGallery = () => {
  const recipeButtonHandler = () => {};
  const myCookButtonHandler = () => {};

  return (
    <Box>
      <ButtonGroup variant="text">
        <GalleryButton onClick={recipeButtonHandler}>recipe</GalleryButton>
        <GalleryButton onClick={myCookButtonHandler}>my cook</GalleryButton>
      </ButtonGroup>
      <RecipeListPage />
    </Box>
  );
};

export default ProfileGallery;

const GalleryButton = styled(Button)({
  color: "gray",
  fontSize: "13px",
});
