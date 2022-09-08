import React from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

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
      <Divider sx={{mb:2, mt:1}} />

      <Carousel
        animation="slide"
        interval="6000"
        sx={{ width: "100%" }}>
        {bestRecipes.map((item, i) => (
          <BestRecipeCard bestRecipe={item} key={i} />  
        ))}
      </Carousel>
    </Container>
  );
}

// Carousel list items
function BestRecipeCard({bestRecipe}) {
  return <Box sx={{position: "relative"}}>
    <Chip label={bestRecipe.title} sx={{position: "absolute", top: "5px", left: "5px", bottom: "auto", right: "auto", opacity:"0.7"}} />
    <img style={{width: "100%", maxHeight: 160, objectFit:"cover", userDrag: "none", userSelect: "none"}}  src={require("../../../../assets/img/food_example_2.jpg")} alt={bestRecipe.title} />
  </Box>;
}

export default RecipeListBests;
