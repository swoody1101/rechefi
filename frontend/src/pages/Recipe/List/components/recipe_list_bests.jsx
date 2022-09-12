import React from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import BestRecipeCard from "./recipe_list_bests_card";

function RecipeListBests({ bestRecipes }) {
  return (
    <Container>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          베스트 레시피
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, mt: 1 }} />

      <Carousel
        animation="slide"
        interval="6000"
        sx={{ width: "100%" }}
      >
        {bestRecipes.map((item, i) => (
          <BestRecipeCard bestRecipe={item} key={i} />
        ))}
      </Carousel>
    </Container>
  );
}

export default RecipeListBests;
